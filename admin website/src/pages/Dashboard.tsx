
import { User, Users, Activity, Calendar } from 'lucide-react';
import StatsCard from '@/components/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Doctors',
      value: 127,
      icon: User,
      color: 'bg-blue-600',
      trend: 12
    },
    {
      title: 'Total Patients',
      value: 2847,
      icon: Users,
      color: 'bg-green-600',
      trend: 8
    },
    {
      title: 'Scans Completed',
      value: 1243,
      icon: Activity,
      color: 'bg-purple-600',
      trend: 15
    },
    {
      title: 'Appointments Today',
      value: 34,
      icon: Calendar,
      color: 'bg-orange-600',
      trend: -3
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New doctor registration', name: 'Dr. Sarah Wilson', time: '2 minutes ago' },
                { action: 'Patient appointment scheduled', name: 'John Doe', time: '15 minutes ago' },
                { action: 'MRI scan completed', name: 'Patient ID: #1247', time: '1 hour ago' },
                { action: 'Doctor verified', name: 'Dr. Michael Chen', time: '2 hours ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.name}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-gray-800">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Verifications</span>
                <span className="font-bold text-orange-600">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Sessions</span>
                <span className="font-bold text-green-600">156</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">System Health</span>
                <span className="font-bold text-green-600">98.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Storage Used</span>
                <span className="font-bold text-blue-600">67%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
