import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifySession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await verifySession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.userId;

    // Get user's company
    const company = await db.company.findFirst({
      where: { userId },
    });

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 });
    }

    // Get recent activity
    const recentActivity = await db.auditLog.findMany({
      where: { companyId: company.id },
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: recentActivity
    });
  } catch (error) {
    console.error('Dashboard activity error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard activity' },
      { status: 500 }
    );
  }
}
