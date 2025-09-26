import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getUserFromSession } from '@/lib/auth';
import { generateDocument } from '@/lib/ai';
import { checkSubscriptionLimits, incrementDocumentUsage } from '@/lib/payments';

const generateDocumentSchema = z.object({
  companyId: z.string(),
  templateId: z.string(),
  documentName: z.string(),
  userInputs: z.record(z.any())
});

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('session')?.value;
    if (!sessionToken) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const user = await getUserFromSession(sessionToken);
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Invalid session' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { companyId, templateId, documentName, userInputs } = generateDocumentSchema.parse(body);
    
    // Verify company ownership
    const company = await prisma.company.findFirst({
      where: { id: companyId, userId: user.id }
    });
    
    if (!company) {
      return NextResponse.json(
        { success: false, error: 'Company not found' },
        { status: 404 }
      );
    }
    
    // Check subscription limits
    const { canGenerate } = await checkSubscriptionLimits(companyId);
    if (!canGenerate) {
      return NextResponse.json(
        { success: false, error: 'Document generation limit exceeded' },
        { status: 403 }
      );
    }
    
    // Generate document using AI
    const { content } = await generateDocument(companyId, {
      templateId,
      companyData: company,
      userInputs
    });
    
    // Save generated document
    const document = await prisma.generatedDocument.create({
      data: {
        companyId,
        templateId,
        documentName,
        documentType: 'legal',
        content: JSON.stringify(content),
        filledData: JSON.stringify(userInputs),
        status: 'completed'
      }
    });
    
    // Increment usage counter
    await incrementDocumentUsage(companyId);
    
    return NextResponse.json({
      success: true,
      data: document
    });
  } catch (error) {
    console.error('Document generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
