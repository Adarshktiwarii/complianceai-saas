import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserFromSession } from '@/lib/auth';
import { createSubscriptionOrder } from '@/lib/payments';
import { prisma } from '@/lib/db';

const createOrderSchema = z.object({
  companyId: z.string(),
  planType: z.enum(['starter', 'growth', 'scale'])
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
    const { companyId, planType } = createOrderSchema.parse(body);
    
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
    
    const order = await createSubscriptionOrder(companyId, planType);
    
    return NextResponse.json({
      success: true,
      data: order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
