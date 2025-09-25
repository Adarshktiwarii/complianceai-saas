import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    
    const where: any = { isActive: true };
    
    if (category) {
      where.category = category;
    }
    
    if (state) {
      where.OR = [
        { applicableStates: { array_contains: [state] } },
        { applicableStates: null }
      ];
    }
    
    const templates = await prisma.documentTemplate.findMany({
      where,
      select: {
        id: true,
        name: true,
        category: true,
        description: true,
        price: true,
        complexityLevel: true,
        estimatedTime: true,
        legalCategory: true,
        requiredFields: true,
        optionalFields: true
      },
      orderBy: { name: 'asc' }
    });
    
    return NextResponse.json({
      success: true,
      data: templates
    });
  } catch (error) {
    console.error('Templates fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
