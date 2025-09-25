import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';
import { getUserFromSession } from '@/lib/auth';

const companySchema = z.object({
  companyName: z.string().min(1),
  industry: z.string().optional(),
  companyType: z.string().default('private_limited'),
  incorporationDate: z.string().optional(),
  cin: z.string().optional(),
  gstin: z.string().optional(),
  pan: z.string().optional(),
  registeredAddress: z.string().optional(),
  businessAddress: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  pincode: z.string().optional(),
  authorizedCapital: z.number().optional(),
  paidUpCapital: z.number().optional(),
  directorDetails: z.any().optional()
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
    const companyData = companySchema.parse(body);
    
    const company = await prisma.company.create({
      data: {
        ...companyData,
        userId: user.id,
        incorporationDate: companyData.incorporationDate ? 
          new Date(companyData.incorporationDate) : undefined
      }
    });
    
    return NextResponse.json({
      success: true,
      data: company
    });
  } catch (error) {
    console.error('Company creation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
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
    
    const companies = await prisma.company.findMany({
      where: { userId: user.id },
      include: {
        subscriptions: {
          where: { status: 'active' }
        }
      }
    });
    
    return NextResponse.json({
      success: true,
      data: companies
    });
  } catch (error) {
    console.error('Companies fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
