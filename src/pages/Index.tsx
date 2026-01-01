import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Zap, 
  Wrench, 
  PaintBucket, 
  Truck, 
  ArrowRight, 
  CheckCircle2,
  Star,
  TrendingUp,
  Shield,
  Users,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';
import SupplierCard from '@/components/cards/SupplierCard';
import CategoryCard from '@/components/cards/CategoryCard';

const categories = [
  { id: 'building-materials', icon: Building2, color: 'from-blue-500 to-blue-600' },
  { id: 'electrical', icon: Zap, color: 'from-amber-500 to-orange-600' },
  { id: 'plumbing', icon: Wrench, color: 'from-cyan-500 to-teal-600' },
  { id: 'finishing', icon: PaintBucket, color: 'from-pink-500 to-rose-600' },
  { id: 'equipment', icon: Truck, color: 'from-purple-500 to-violet-600' },
];

const featuredSuppliers = [
  {
    id: '1',
    name: 'Premium Steel Works',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop',
    category: 'Building Materials',
    location: 'Cairo, Egypt',
    rating: 4.9,
    reviewCount: 128,
    verified: true,
    featured: true,
  },
  {
    id: '2',
    name: 'ElectroPro Supplies',
    logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
    category: 'Electrical Supplies',
    location: 'Dubai, UAE',
    rating: 4.8,
    reviewCount: 95,
    verified: true,
    featured: false,
  },
  {
    id: '3',
    name: 'AquaFlow Systems',
    logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop',
    category: 'Plumbing Supplies',
    location: 'Riyadh, KSA',
    rating: 4.7,
    reviewCount: 73,
    verified: true,
    featured: false,
  },
  {
    id: '4',
    name: 'FinishMaster Pro',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop',
    category: 'Finishing & Interior',
    location: 'Jeddah, KSA',
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    featured: true,
  },
];

const stats = [
  { value: '2,500+', label: 'hero.stats.suppliers' },
  { value: '10,000+', label: 'hero.stats.contractors' },
  { value: '50,000+', label: 'hero.stats.transactions' },
];

const features = [
  {
    icon: Shield,
    title: 'Verified Suppliers',
    description: 'All suppliers undergo rigorous verification to ensure quality and reliability.',
  },
  {
    icon: MessageSquare,
    title: 'Direct Communication',
    description: 'Chat directly with suppliers to negotiate terms and discuss project needs.',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Pricing',
    description: 'Get quotes from multiple suppliers to ensure you get the best deals.',
  },
  {
    icon: Users,
    title: 'Trusted Network',
    description: 'Join thousands of construction professionals who trust our platform.',
  },
];

const Index: React.FC = () => {
  const { t } = useLanguage();

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero py-20 lg:py-32">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 animate-fade-in">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in stagger-1">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in stagger-2">
              <Button variant="hero" size="xl" asChild>
                <Link to="/register?role=supplier">
                  {t('hero.cta.supplier')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/suppliers">
                  {t('hero.cta.contractor')}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-primary-foreground/10 animate-fade-in stagger-3">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/60">{t(stat.label)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('nav.categories')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse our comprehensive categories to find exactly what your project needs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                icon={category.icon}
                color={category.color}
                className={`animate-fade-in stagger-${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose BuildConnect?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We make construction procurement simple, efficient, and reliable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-soft card-hover animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Suppliers Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured Suppliers
              </h2>
              <p className="text-muted-foreground">
                Top-rated suppliers trusted by thousands of contractors.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/suppliers">
                {t('common.viewAll')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredSuppliers.map((supplier, index) => (
              <SupplierCard
                key={supplier.id}
                {...supplier}
                className={`animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Construction Business?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              Join thousands of suppliers and contractors who are already using BuildConnect to streamline their operations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/register">
                  {t('common.getStarted')}
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                <Link to="/about">
                  {t('common.learnMore')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
