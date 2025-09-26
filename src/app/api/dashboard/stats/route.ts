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

    // Get stats
    const [
      totalDocuments,
      pendingTasks,
      upcomingDeadlines,
      recentActivity
    ] = await Promise.all([
      db.generatedDocument.count({
        where: { companyId: company.id },
      }),
      db.complianceTask.count({
        where: { 
          companyId: company.id,
          status: 'PENDING'
        },
      }),
      db.complianceTask.count({
        where: { 
          companyId: company.id,
          dueDate: {
            gte: new Date(),
            lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
          }
        },
      }),
      db.auditLog.count({
        where: { 
          companyId: company.id,
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalDocuments,
        pendingTasks,
        upcomingDeadlines,
        recentActivity,
        company: {
          name: company.companyName,
          industry: company.industry,
        }
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    );
  }
}
