'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Users, 
  Brain, 
  Shield, 
  Zap, 
  BarChart3,
  ArrowRight,
  Plus,
  Eye,
  Download,
  Edit,
  Trash2,
  Star,
  Target,
  Award,
  Sparkles,
  Flame,
  Crown,
  Diamond,
  Rocket,
  Lightbulb,
  MessageSquare,
  Calendar,
  Bell,
  Settings,
  Search,
  Filter,
  SortAsc,
  MoreHorizontal
} from 'lucide-react';

interface DashboardStats {
  totalDocuments: number;
  pendingTasks: number;
  completedTasks: number;
  aiInteractions: number;
  complianceScore: number;
  upcomingDeadlines: number;
}

interface RecentActivity {
  id: string;
  type: 'document' | 'task' | 'ai_chat' | 'compliance';
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'in_progress';
  priority: 'low' | 'medium' | 'high';
}

interface UpcomingTask {
  id: string;
  title: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
  progress: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalDocuments: 0,
    pendingTasks: 0,
    completedTasks: 0,
    aiInteractions: 0,
    complianceScore: 0,
    upcomingDeadlines: 0
  });

  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([]);

  useEffect(() => {
    // Simulate loading data
    setStats({
      totalDocuments: 47,
      pendingTasks: 8,
      completedTasks: 23,
      aiInteractions: 156,
      complianceScore: 87,
      upcomingDeadlines: 3
    });

    setRecentActivity([
      {
        id: '1',
        type: 'document',
        title: 'Employment Agreement Generated',
        description: 'Created employment agreement for new hire',
        timestamp: '2 hours ago',
        status: 'completed',
        priority: 'high'
      },
      {
        id: '2',
        type: 'ai_chat',
        title: 'AI Legal Consultation',
        description: 'Discussed GST registration requirements',
        timestamp: '4 hours ago',
        status: 'completed',
        priority: 'medium'
      },
      {
        id: '3',
        type: 'compliance',
        title: 'Monthly Compliance Check',
        description: 'Review pending compliance tasks',
        timestamp: '1 day ago',
        status: 'pending',
        priority: 'high'
      },
      {
        id: '4',
        type: 'task',
        title: 'Annual Return Filing',
        description: 'Prepare documents for annual return',
        timestamp: '2 days ago',
        status: 'in_progress',
        priority: 'high'
      }
    ]);

    setUpcomingTasks([
      {
        id: '1',
        title: 'GST Return Filing',
        dueDate: '2024-01-15',
        priority: 'high',
        category: 'Tax Compliance',
        progress: 75
      },
      {
        id: '2',
        title: 'Annual Return Submission',
        dueDate: '2024-01-20',
        priority: 'high',
        category: 'Corporate Compliance',
        progress: 60
      },
      {
        id: '3',
        title: 'TDS Return Filing',
        dueDate: '2024-01-25',
        priority: 'medium',
        category: 'Tax Compliance',
        progress: 40
      }
    ]);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600';
      case 'pending': return 'text-yellow-600';
      case 'in_progress': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'in_progress': return <Zap className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-4 w-4" />;
      case 'ai_chat': return <Brain className="h-4 w-4" />;
      case 'compliance': return <Shield className="h-4 w-4" />;
      case 'task': return <Target className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your compliance.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-200">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                New Document
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">Total Documents</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{stats.totalDocuments}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <FileText className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">Pending Tasks</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-yellow-600 transition-colors">{stats.pendingTasks}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-yellow-600">
                <AlertTriangle className="h-4 w-4 mr-1" />
                {stats.upcomingDeadlines} due soon
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">AI Interactions</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">{stats.aiInteractions}</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Brain className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-purple-600">
                <Sparkles className="h-4 w-4 mr-1" />
                +8 this week
              </div>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors">Compliance Score</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">{stats.complianceScore}%</p>
                </div>
                <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={stats.complianceScore} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <Card className="lg:col-span-2 group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Recent Activity
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div 
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group/item"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white group-hover/item:scale-110 transition-transform duration-300">
                      {getTypeIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-900 group-hover/item:text-blue-600 transition-colors">
                        {activity.title}
                      </h4>
                      <Badge className={`text-xs ${getPriorityColor(activity.priority)}`}>
                        {activity.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center mt-2 space-x-4">
                      <div className={`flex items-center text-xs ${getStatusColor(activity.status)}`}>
                        {getStatusIcon(activity.status)}
                        <span className="ml-1 capitalize">{activity.status}</span>
                      </div>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  Upcoming Tasks
                </CardTitle>
                <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id}
                  className="p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group/task border border-gray-100 hover:border-blue-200"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900 group-hover/task:text-blue-600 transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-sm text-gray-600">{task.category}</p>
                    </div>
                    <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium text-gray-900">{task.progress}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">Due: {task.dueDate}</span>
                    <Button size="sm" variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm border-0 hover:bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <FileText className="h-6 w-6" />
                <span className="text-sm font-medium">Generate Document</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-2 border-gray-300 hover:border-blue-500 hover:text-blue-600 transition-all duration-300 transform hover:scale-105">
                <Brain className="h-6 w-6" />
                <span className="text-sm font-medium">Ask AI Assistant</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-2 border-gray-300 hover:border-green-500 hover:text-green-600 transition-all duration-300 transform hover:scale-105">
                <Shield className="h-6 w-6" />
                <span className="text-sm font-medium">Check Compliance</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col items-center justify-center space-y-2 border-2 border-gray-300 hover:border-purple-500 hover:text-purple-600 transition-all duration-300 transform hover:scale-105">
                <BarChart3 className="h-6 w-6" />
                <span className="text-sm font-medium">View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}