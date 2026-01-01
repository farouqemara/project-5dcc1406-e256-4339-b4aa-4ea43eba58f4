import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  FileText, 
  Heart, 
  Settings,
  TrendingUp,
  Clock,
  CheckCircle2,
  Building2
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/contractor' },
  { icon: Search, label: 'Browse Suppliers', href: '/contractor/browse' },
  { icon: FileText, label: 'My Requests', href: '/contractor/requests' },
  { icon: MessageSquare, label: 'Messages', href: '/contractor/messages' },
  { icon: Heart, label: 'Favorites', href: '/contractor/favorites' },
  { icon: Settings, label: 'Settings', href: '/contractor/settings' },
];

const stats = [
  { label: 'Active Requests', value: '12', icon: FileText },
  { label: 'Pending Quotes', value: '8', icon: Clock },
  { label: 'Completed Orders', value: '45', icon: CheckCircle2 },
  { label: 'Saved Suppliers', value: '23', icon: Heart },
];

const recentRequests = [
  { id: '1', title: 'Steel Beams for Commercial Project', supplier: 'Premium Steel Works', status: 'negotiation', date: '2 hours ago' },
  { id: '2', title: 'Electrical Wiring Package', supplier: 'ElectroPro Supplies', status: 'accepted', date: '1 day ago' },
  { id: '3', title: 'Plumbing Materials', supplier: 'AquaFlow Systems', status: 'progress', date: '3 days ago' },
  { id: '4', title: 'Interior Finishing Kit', supplier: 'FinishMaster Pro', status: 'completed', date: '1 week ago' },
];

const recommendedSuppliers = [
  { id: '1', name: 'Premium Steel Works', category: 'Building Materials', rating: 4.9, verified: true },
  { id: '2', name: 'ElectroPro Supplies', category: 'Electrical', rating: 4.8, verified: true },
  { id: '3', name: 'AquaFlow Systems', category: 'Plumbing', rating: 4.7, verified: true },
];

const ContractorDashboard: React.FC = () => {
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
          Find suppliers and manage your construction projects efficiently.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Requests */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Requests</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contractor/requests">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{request.title}</p>
                    <p className="text-sm text-muted-foreground">{request.supplier}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(request.status)}
                    <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">{request.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Suppliers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recommended</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/contractor/browse">Browse</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recommendedSuppliers.map((supplier) => (
                <Link
                  key={supplier.id}
                  to={`/suppliers/${supplier.id}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="h-10 w-10 rounded-full bg-accent/10 text-accent flex items-center justify-center">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="font-medium text-foreground truncate">{supplier.name}</p>
                      {supplier.verified && <CheckCircle2 className="h-3.5 w-3.5 text-success flex-shrink-0" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{supplier.category}</p>
                  </div>
                  <div className="text-sm font-medium text-foreground">★ {supplier.rating}</div>
                </Link>
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
            <Button variant="accent" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/contractor/browse">
                <Search className="h-5 w-5" />
                <span>Find Suppliers</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/contractor/requests/new">
                <FileText className="h-5 w-5" />
                <span>New Request</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/contractor/messages">
                <MessageSquare className="h-5 w-5" />
                <span>Messages</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/equipment">
                <Building2 className="h-5 w-5" />
                <span>Rent Equipment</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ContractorDashboard;
