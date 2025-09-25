import OpenAI from 'openai';
import { prisma } from './db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export interface DocumentGenerationRequest {
  templateId: string;
  companyData: any;
  userInputs: Record<string, any>;
}

export interface DocumentGenerationResponse {
  content: string;
  tokensUsed: number;
  cost: number;
}

export async function generateDocument(
  companyId: string,
  request: DocumentGenerationRequest
): Promise<DocumentGenerationResponse> {
  const template = await prisma.documentTemplate.findUnique({
    where: { id: request.templateId }
  });
  
  if (!template) {
    throw new Error('Template not found');
  }
  
  const prompt = buildDocumentPrompt(template, request.companyData, request.userInputs);
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a legal document generation AI specialized in Indian corporate law. Generate professional, legally compliant documents based on the provided template and company information.'
      },
      {
        role: 'user',
        content: prompt
      }
    ],
    max_tokens: 3000,
    temperature: 0.3
  });
  
  const content = completion.choices[0].message.content || '';
  const tokensUsed = completion.usage?.total_tokens || 0;
  const cost = calculateTokenCost(tokensUsed);
  
  // Log AI interaction
  await prisma.aiInteraction.create({
    data: {
      companyId,
      interactionType: 'document_generation',
      userQuery: prompt,
      aiResponse: content,
      tokensUsed,
      cost
    }
  });
  
  return { content, tokensUsed, cost };
}

function buildDocumentPrompt(
  template: any,
  companyData: any,
  userInputs: Record<string, any>
): string {
  return `
Generate a ${template.name} document with the following specifications:

COMPANY INFORMATION:
- Company Name: ${companyData.companyName}
- Industry: ${companyData.industry}
- State: ${companyData.state}
- CIN: ${companyData.cin || 'Not provided'}
- GSTIN: ${companyData.gstin || 'Not provided'}
- Registered Address: ${companyData.registeredAddress}

DOCUMENT REQUIREMENTS:
${JSON.stringify(template.requiredFields, null, 2)}

USER INPUTS:
${JSON.stringify(userInputs, null, 2)}

INSTRUCTIONS:
1. Generate a professionally formatted document
2. Ensure compliance with Indian laws and regulations
3. Include all necessary legal clauses and terms
4. Use formal legal language appropriate for business documents
5. Include proper formatting with headers, sections, and numbering
6. Add placeholder fields for signatures and dates where appropriate
7. Ensure all company information is correctly incorporated

TEMPLATE CONTENT:
${template.templateContent}

Please generate the complete document content:
`;
}

function calculateTokenCost(tokens: number): number {
  // GPT-4 pricing: $0.03 per 1K prompt tokens + $0.06 per 1K completion tokens
  // Simplified calculation assuming 50/50 split
  const costPer1kTokens = 0.045; // Average of input/output costs
  return (tokens / 1000) * costPer1kTokens;
}

export async function generateLegalAssistance(
  companyId: string,
  query: string
): Promise<string> {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: 'You are a legal AI assistant specialized in Indian corporate law and startup compliance. Provide accurate, helpful advice while noting that users should consult with qualified lawyers for specific legal matters.'
      },
      {
        role: 'user',
        content: query
      }
    ],
    max_tokens: 1000,
    temperature: 0.7
  });
  
  const response = completion.choices[0].message.content || '';
  const tokensUsed = completion.usage?.total_tokens || 0;
  const cost = calculateTokenCost(tokensUsed);
  
  // Log AI interaction
  await prisma.aiInteraction.create({
    data: {
      companyId,
      interactionType: 'legal_assistance',
      userQuery: query,
      aiResponse: response,
      tokensUsed,
      cost
    }
  });
  
  return response;
}
