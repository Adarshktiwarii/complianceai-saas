'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Calendar, AlertCircle, TrendingUp, Users, DollarSign } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  documentsGenerated: number;
  pendingTasks: number;
  overdueTasks: number;
  totalCompanies: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    documentsGenerated: 12,
    pendingTasks: 5,
    overdueTasks: 2,
    totalCompanies: 3
  });
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      description: "Generated Employment Agreement for TechStart India",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      type: "document_generated"
    },
    {
      id: 2,
      description: "GST Return filed for InnovateLabs Pvt Ltd",
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      type: "compliance_completed"
    },
    {
      id: 3,
      description: "New company 'StartupHub' added to management",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      type: "company_added"
    },
    {
      id: 4,
      description: "NDA template generated for client meeting",
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      type: "document_generated"
    }
  ]);
  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      id: 1,
      taskName: "File Quarterly GST Return (GSTR-1)",
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
      priority: "high",
      category: "Tax"
    },
    {
      id: 2,
      taskName: "Pay TDS for June Salaries",
      dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      priority: "critical",
      category: "Tax"
    },
    {
      id: 3,
      taskName: "Annual General Meeting (AGM) Filing",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      priority: "medium",
      category: "Corporate"
    },
    {
      id: 4,
      taskName: "Professional Tax Payment (June)",
      dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      priority: "high",
      category: "Tax"
    }
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsResponse = await fetch('/api/dashboard/stats');
      const statsData = await statsResponse.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch recent activity
      const activityResponse = await fetch('/api/dashboard/activity');
      const activityData = await activityResponse.json();
      if (activityData.success) {
        setRecentActivity(activityData.data);
      }

      // Fetch upcoming tasks
      const tasksResponse = await fetch('/api/compliance/tasks?upcoming=true');
      const tasksData = await tasksResponse.json();
      if (tasksData.success) {
        setUpcomingTasks(tasksData.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Overview of your compliance and document generation activities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Documents Generated</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documentsGenerated}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
            <Calendar className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingTasks}</div>
            <p className="text-xs text-gray-600">Compliance items</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{stats.overdueTasks}</div>
            <p className="text-xs text-gray-600">Immediate attention needed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Companies</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompanies}</div>
            <p className="text-xs text-gray-600">Under management</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/documents/generate">
              <Button className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Generate New Document
              </Button>
            </Link>
            <Link href="/compliance">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                View Compliance Calendar
              </Button>
            </Link>
            <Link href="/subscription">
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="mr-2 h-4 w-4" />
                Upgrade Subscription
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingTasks.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No upcoming deadlines</p>
              ) : (
                upcomingTasks.slice(0, 5).map((task: any) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{task.taskName}</p>
                      <p className="text-xs text-gray-600">{new Date(task.dueDate).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium ${
                      task.priority === 'critical' ? 'bg-red-100 text-red-800' :
                      task.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.priority}
                    </div>
                  </div>
                ))
              )}
            </div>
            {upcomingTasks.length > 5 && (
              <Link href="/compliance">
                <Button variant="link" className="w-full mt-3">
                  View All Tasks
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            ) : (
              recentActivity.map((activity: any, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 border-l-4 border-blue-500 bg-blue-50 rounded-r-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.description}</p>
                    <p className="text-xs text-gray-600">{new Date(activity.createdAt).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
