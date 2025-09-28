import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { generateSimpleAIResponse } from '@/lib/ai-simple';

// Simple authentication check
async function checkAuth(request: NextRequest) {
  try {
    // Get session token from cookies
    const sessionToken = request.cookies.get('session-token')?.value;
    
    if (!sessionToken) {
      return null;
    }

    // Check if session exists and is valid
    const session = await db.userSession.findFirst({
      where: {
        sessionToken: sessionToken,
        expires: {
          gt: new Date()
        }
      },
      include: {
        user: true
      }
    });

    if (!session) {
      return null;
    }

    return {
      userId: session.userId,
      user: session.user
    };
  } catch (error) {
    console.error('Auth check error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const auth = await checkAuth(request);
    if (!auth) {
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
      where: { userId: auth.userId }
    });

    // Build context-aware prompt
    const systemPrompt = `You are Kavach.ai, an expert legal assistant specialized in Indian corporate law, startup compliance, and business legal requirements. You help Indian startups and businesses with:

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

    // Use simple AI response
    const aiResponse = generateSimpleAIResponse(message);

    // Log the interaction
    try {
      await db.aiInteraction.create({
        data: {
          companyId: company?.id || 'unknown',
          interactionType: 'legal_assistance',
          userQuery: message,
          aiResponse: aiResponse.response,
          tokensUsed: 0,
          cost: 0
        }
      });
    } catch (logError) {
      console.error('Failed to log AI interaction:', logError);
    }

    return NextResponse.json({
      success: true,
      response: aiResponse.response,
      suggestions: aiResponse.suggestions,
      tokensUsed: 0,
      cost: 0,
      usingFreeAPI: true,
      source: aiResponse.source
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    
    // Fallback response if any error occurs
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties. Please try again later or contact support if the issue persists.

Please note: This is general information and should not be considered as legal advice. Always consult with a qualified lawyer for specific legal matters.`;

    return NextResponse.json({
      success: true,
      response: fallbackResponse,
      suggestions: [
        "Try asking again",
        "Contact support",
        "Browse our help center"
      ],
      tokensUsed: 0,
      cost: 0,
      usingFreeAPI: true,
      source: 'fallback'
    });
  }
}
