import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import OpenAI from 'openai';
import { generateFreeAIResponse } from '@/lib/ai-free';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'sk-proj-your-key-here'
});

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { message, context } = body;

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get user's company information for context
    const company = await db.company.findFirst({
      where: { userId: session.userId }
    });

    // Build context-aware prompt
    const systemPrompt = `You are ComplianceAI, an expert legal assistant specialized in Indian corporate law, startup compliance, and business legal requirements. You help Indian startups and businesses with:

1. **Legal Compliance**: GST, TDS, ROC filings, labor laws
2. **Document Generation**: Contracts, agreements, legal documents
3. **Business Formation**: Company registration, legal structures
4. **Tax Compliance**: Income tax, GST, TDS, professional tax
5. **Employment Law**: HR policies, employment contracts
6. **Intellectual Property**: Trademarks, patents, copyrights
7. **Regulatory Requirements**: Industry-specific compliance

${company ? `
CURRENT COMPANY CONTEXT:
- Company: ${company.companyName}
- Industry: ${company.industry}
- Type: ${company.companyType}
- State: ${company.state || 'Not specified'}
` : ''}

INSTRUCTIONS:
- Provide accurate, helpful legal guidance
- Always mention that users should consult qualified lawyers for specific legal matters
- Focus on Indian laws and regulations
- Give step-by-step guidance when appropriate
- Include relevant deadlines, penalties, and requirements
- Be conversational but professional
- If asked about non-legal topics, politely redirect to legal/business matters`;

    let response: string;
    let suggestions: string[];
    let tokensUsed = 0;
    let cost = 0;
    let usingFreeAPI = false;

    // Try OpenAI first if API key is available
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your-openai-api-key') {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: systemPrompt
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: 1500,
          temperature: 0.7,
          presence_penalty: 0.1,
          frequency_penalty: 0.1
        });

        response = completion.choices[0].message.content || 'I apologize, but I could not generate a response. Please try again.';
        tokensUsed = completion.usage?.total_tokens || 0;
        cost = calculateTokenCost(tokensUsed);
      } catch (openaiError) {
        console.error('OpenAI API error:', openaiError);
        // Fall back to free API
        const freeResponse = await generateFreeAIResponse(message);
        response = freeResponse.response;
        suggestions = freeResponse.suggestions;
        usingFreeAPI = true;
      }
    } else {
      // Use free API directly
      const freeResponse = await generateFreeAIResponse(message);
      response = freeResponse.response;
      suggestions = freeResponse.suggestions;
      usingFreeAPI = true;
    }

    // Generate suggestions if not using free API
    if (!usingFreeAPI) {
      suggestions = generateSuggestions(message, response);
    }

    // Log the interaction
    try {
      await db.aiInteraction.create({
        data: {
          companyId: company?.id || 'unknown',
          interactionType: 'legal_assistance',
          userQuery: message,
          aiResponse: response,
          tokensUsed,
          cost
        }
      });
    } catch (logError) {
      console.error('Failed to log AI interaction:', logError);
    }

    return NextResponse.json({
      success: true,
      response,
      suggestions,
      tokensUsed,
      cost,
      usingFreeAPI,
      source: usingFreeAPI ? 'free-api' : 'openai'
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    
    // Fallback response if OpenAI fails
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties. Here's some general guidance:

${getFallbackResponse(message)}

Please note: This is general information and should not be considered as legal advice. Always consult with a qualified lawyer for specific legal matters.`;

    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      suggestions: [
        "Tell me more about this",
        "What are the legal requirements?",
        "How can I get started?"
      ],
      tokensUsed: 0,
      cost: 0,
      fallback: true
    });
  }
}

function calculateTokenCost(tokens: number): number {
  // GPT-4 pricing: $0.03 per 1K prompt tokens + $0.06 per 1K completion tokens
  const costPer1kTokens = 0.045; // Average cost
  return (tokens / 1000) * costPer1kTokens;
}

function generateSuggestions(userMessage: string, aiResponse: string): string[] {
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('gst') || lowerMessage.includes('tax')) {
    return [
      "How to file GSTR-1?",
      "What is the GST rate for my product?",
      "How to claim GST input credit?",
      "What are the GST penalties?"
    ];
  }
  
  if (lowerMessage.includes('tds')) {
    return [
      "TDS rates for different payments",
      "How to generate TDS certificate?",
      "TDS return filing process",
      "TDS due dates"
    ];
  }
  
  if (lowerMessage.includes('company') || lowerMessage.includes('registration')) {
    return [
      "What documents are needed for company registration?",
      "How to get CIN number?",
      "What is the incorporation process?",
      "ROC compliance requirements"
    ];
  }
  
  if (lowerMessage.includes('employment') || lowerMessage.includes('hr')) {
    return [
      "Employment agreement template",
      "HR policy requirements",
      "Labor law compliance",
      "Employee benefits"
    ];
  }
  
  if (lowerMessage.includes('compliance') || lowerMessage.includes('legal')) {
    return [
      "Monthly compliance checklist",
      "Annual compliance requirements",
      "Industry-specific regulations",
      "Penalty for non-compliance"
    ];
  }
  
  return [
    "Tell me more about this",
    "What are the next steps?",
    "How can I implement this?",
    "What documents do I need?"
  ];
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('gst')) {
    return `For GST-related queries, you should know:
- GST registration is mandatory for businesses with turnover > ₹20 lakhs
- GSTR-1 must be filed monthly by the 11th
- GSTR-3B must be filed monthly by the 20th
- Late filing attracts ₹200 per day penalty`;
  }
  
  if (lowerMessage.includes('tds')) {
    return `For TDS compliance:
- TDS must be deducted on salary, rent, professional fees
- TDS returns must be filed quarterly
- TDS certificates must be issued within 15 days
- Late filing attracts ₹200 per day penalty`;
  }
  
  if (lowerMessage.includes('company')) {
    return `For company registration:
- Choose between Private Limited, LLP, or One Person Company
- Obtain DSC and DIN for directors
- File incorporation documents with ROC
- Get CIN and start business operations`;
  }
  
  return `For legal compliance in India:
- Ensure proper business registration
- File all required returns on time
- Maintain proper books of accounts
- Comply with labor and tax laws
- Consult qualified professionals for specific guidance`;
}
