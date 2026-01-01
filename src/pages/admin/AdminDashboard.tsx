import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Shield, 
  Settings,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  Clock,
  TrendingUp,
  UserPlus,
  FileText,
  Folder
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Users, label: 'Users', href: '/admin/users' },
  { icon: Shield, label: 'Moderators', href: '/admin/moderators' },
  { icon: Building2, label: 'Suppliers', href: '/admin/suppliers' },
  { icon: Folder, label: 'Categories', href: '/admin/categories' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: AlertTriangle, label: 'Disputes', href: '/admin/disputes' },
  { icon: Settings, label: 'Settings', href: '/admin/settings' },
];

const stats = [
  { label: 'Total Users', value: '12,456', change: '+15%', icon: Users, trend: 'up' },
  { label: 'Active Suppliers', value: '2,534', change: '+8%', icon: Building2, trend: 'up' },
  { label: 'Pending Verifications', value: '45', change: '-12%', icon: Clock, trend: 'down' },
  { label: 'Open Disputes', value: '12', change: '-25%', icon: AlertTriangle, trend: 'down' },
];

const recentUsers = [
  { id: '1', name: 'Ahmed Construction Co.', email: 'ahmed@construction.com', role: 'supplier', status: 'pending', date: '2 hours ago' },
  { id: '2', name: 'Mohamed Builders', email: 'mohamed@builders.com', role: 'contractor', status: 'active', date: '5 hours ago' },
  { id: '3', name: 'Cairo Steel Works', email: 'info@cairosteel.com', role: 'supplier', status: 'pending', date: '1 day ago' },
  { id: '4', name: 'Nile Construction', email: 'nile@construction.com', role: 'contractor', status: 'active', date: '2 days ago' },
];

const pendingVerifications = [
  { id: '1', name: 'Premium Steel Ltd.', category: 'Building Materials', submitted: '3 days ago' },
  { id: '2', name: 'ElectroMax Co.', category: 'Electrical', submitted: '5 days ago' },
  { id: '3', name: 'PlumbPro Services', category: 'Plumbing', submitted: '1 week ago' },
];

const AdminDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <DashboardLayout navItems={navItems} title="Admin Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Admin Dashboard
        </h2>
        <p className="text-muted-foreground">
          Manage users, suppliers, and platform operations.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                  <TrendingUp className={`h-3.5 w-3.5 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Users */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Registrations</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/users">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                      {user.role === 'supplier' ? <Building2 className="h-5 w-5" /> : <Users className="h-5 w-5" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={user.status === 'active' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}>
                      {user.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">{user.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Verifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pending Verifications</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/suppliers?filter=pending">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingVerifications.map((item) => (
                <div key={item.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{item.name}</p>
                    <Badge variant="outline" className="text-xs">{item.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Submitted {item.submitted}</span>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs">
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/admin/users">
                <Users className="h-5 w-5" />
                <span>Manage Users</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/admin/moderators">
                <UserPlus className="h-5 w-5" />
                <span>Add Moderator</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/admin/categories">
                <Folder className="h-5 w-5" />
                <span>Categories</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/admin/disputes">
                <AlertTriangle className="h-5 w-5" />
                <span>Disputes</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AdminDashboard;
