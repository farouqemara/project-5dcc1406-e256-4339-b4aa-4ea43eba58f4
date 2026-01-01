import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  MessageSquare, 
  FileText, 
  BarChart3, 
  Settings,
  TrendingUp,
  Eye,
  CheckCircle2,
  Clock
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/supplier' },
  { icon: Package, label: 'Products', href: '/supplier/products' },
  { icon: FileText, label: 'Requests', href: '/supplier/requests' },
  { icon: MessageSquare, label: 'Messages', href: '/supplier/messages' },
  { icon: BarChart3, label: 'Analytics', href: '/supplier/analytics' },
  { icon: Settings, label: 'Settings', href: '/supplier/settings' },
];

const stats = [
  { label: 'Profile Views', value: '1,234', change: '+12%', icon: Eye, trend: 'up' },
  { label: 'Requests Received', value: '56', change: '+8%', icon: FileText, trend: 'up' },
  { label: 'Acceptance Rate', value: '89%', change: '+3%', icon: CheckCircle2, trend: 'up' },
  { label: 'Avg Response Time', value: '2.4h', change: '-15%', icon: Clock, trend: 'down' },
];

const recentRequests = [
  { id: '1', project: 'Commercial Building Project', contractor: 'Elite Construction', status: 'new', date: '2 hours ago' },
  { id: '2', project: 'Residential Complex', contractor: 'HomeBuilders Inc', status: 'negotiation', date: '5 hours ago' },
  { id: '3', project: 'Industrial Warehouse', contractor: 'Industrial Devs', status: 'accepted', date: '1 day ago' },
  { id: '4', project: 'Office Renovation', contractor: 'Office Solutions', status: 'progress', date: '2 days ago' },
];

const SupplierDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { class: string; label: string }> = {
      new: { class: 'status-new', label: t('status.new') },
      negotiation: { class: 'status-negotiation', label: t('status.negotiation') },
      accepted: { class: 'status-accepted', label: t('status.accepted') },
      progress: { class: 'status-progress', label: t('status.progress') },
      completed: { class: 'status-completed', label: t('status.completed') },
      cancelled: { class: 'status-cancelled', label: t('status.cancelled') },
    };
    const config = statusConfig[status] || statusConfig.new;
    return <Badge className={config.class}>{config.label}</Badge>;
  };

  return (
    <DashboardLayout navItems={navItems} title={t('dashboard.overview')}>
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Welcome back, {user?.name}!
        </h2>
        <p className="text-muted-foreground">
          Here's what's happening with your business today.
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
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">{t('dashboard.requests')}</CardTitle>
            <Button variant="ghost" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{request.project}</p>
                    <p className="text-sm text-muted-foreground">{request.contractor}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(request.status)}
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{request.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <Package className="h-5 w-5" />
                <span>Add Product</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>View Messages</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <FileText className="h-5 w-5" />
                <span>Pending Requests</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                <BarChart3 className="h-5 w-5" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default SupplierDashboard;
