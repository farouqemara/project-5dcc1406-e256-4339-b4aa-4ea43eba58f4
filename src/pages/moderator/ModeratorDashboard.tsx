import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Flag, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Building2,
  Eye
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const navItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/moderator' },
  { icon: FileText, label: 'Review Listings', href: '/moderator/listings' },
  { icon: Flag, label: 'Reports', href: '/moderator/reports' },
  { icon: AlertTriangle, label: 'Issues', href: '/moderator/issues' },
];

const stats = [
  { label: 'Pending Reviews', value: '23', icon: Clock },
  { label: 'Approved Today', value: '45', icon: CheckCircle2 },
  { label: 'Flagged Content', value: '8', icon: Flag },
  { label: 'Open Issues', value: '5', icon: AlertTriangle },
];

const pendingListings = [
  { id: '1', title: 'Premium Steel Beams', supplier: 'Cairo Steel Works', category: 'Building Materials', submitted: '2 hours ago' },
  { id: '2', title: 'Industrial Wiring Kit', supplier: 'ElectroPro Supplies', category: 'Electrical', submitted: '5 hours ago' },
  { id: '3', title: 'Copper Pipes Set', supplier: 'AquaFlow Systems', category: 'Plumbing', submitted: '1 day ago' },
  { id: '4', title: 'Marble Flooring Tiles', supplier: 'FinishMaster Pro', category: 'Finishing', submitted: '1 day ago' },
];

const recentReports = [
  { id: '1', type: 'Misleading Info', content: 'Product listing claims false specs', reporter: 'contractor@demo.com', status: 'pending' },
  { id: '2', type: 'Inappropriate Content', content: 'Profile contains spam links', reporter: 'user@demo.com', status: 'pending' },
  { id: '3', type: 'Fake Reviews', content: 'Suspected fake positive reviews', reporter: 'supplier@demo.com', status: 'resolved' },
];

const ModeratorDashboard: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  return (
    <DashboardLayout navItems={navItems} title="Moderator Dashboard">
      {/* Welcome Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-1">
          Welcome, {user?.name}
        </h2>
        <p className="text-muted-foreground">
          Review content and manage platform quality.
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
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Listings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pending Listings</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/moderator/listings">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingListings.map((listing) => (
                <div key={listing.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium text-foreground">{listing.title}</p>
                    <Badge variant="outline" className="text-xs">{listing.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Building2 className="h-3.5 w-3.5" />
                      <span>{listing.supplier}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="ghost" className="h-7 text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        Review
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Reports</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/moderator/reports">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={report.status === 'pending' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'}>
                      {report.type}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {report.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground mb-2">{report.content}</p>
                  <p className="text-xs text-muted-foreground">Reported by: {report.reporter}</p>
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Button variant="accent" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/moderator/listings">
                <FileText className="h-5 w-5" />
                <span>Review Listings</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/moderator/reports">
                <Flag className="h-5 w-5" />
                <span>View Reports</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
              <Link to="/moderator/issues">
                <AlertTriangle className="h-5 w-5" />
                <span>Report to Admin</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default ModeratorDashboard;
