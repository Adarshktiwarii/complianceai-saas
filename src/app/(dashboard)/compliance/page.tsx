import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function CompliancePage() {
  // Mock data - in real app, this would come from API
  const tasks = [
    {
      id: 1,
      title: 'GST Return Filing',
      dueDate: '2024-01-20',
      status: 'Pending',
      priority: 'High',
      description: 'Monthly GST return for December 2023'
    },
    {
      id: 2,
      title: 'TDS Return Filing',
      dueDate: '2024-01-25',
      status: 'Pending',
      priority: 'Medium',
      description: 'Quarterly TDS return for Q3 FY24'
    },
    {
      id: 3,
      title: 'Annual Compliance Certificate',
      dueDate: '2024-02-15',
      status: 'Completed',
      priority: 'Low',
      description: 'Annual compliance certificate filing'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Pending':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'Overdue':
        return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default:
        return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Compliance Tracking</h1>
          <p className="text-gray-600">Monitor your regulatory compliance tasks</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Calendar className="h-4 w-4 mr-2" />
          Add New Task
        </Button>
      </div>

      <div className="grid gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <CardTitle>{task.title}</CardTitle>
                    <CardDescription>{task.description}</CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    task.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  Due: {task.dueDate}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  {task.status !== 'Completed' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
