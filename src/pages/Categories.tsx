import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Zap, Wrench, PaintBucket, Truck, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/contexts/LanguageContext';

const categories = [
  { id: 'building-materials', icon: Building2, color: 'from-blue-500 to-blue-600', count: 450 },
  { id: 'electrical', icon: Zap, color: 'from-amber-500 to-orange-600', count: 320 },
  { id: 'plumbing', icon: Wrench, color: 'from-cyan-500 to-teal-600', count: 280 },
  { id: 'finishing', icon: PaintBucket, color: 'from-pink-500 to-rose-600', count: 390 },
  { id: 'equipment', icon: Truck, color: 'from-purple-500 to-violet-600', count: 150 },
];

const Categories: React.FC = () => {
  const { t } = useLanguage();
  const categoryLabels: Record<string, string> = {
    'building-materials': 'category.building',
    'electrical': 'category.electrical',
    'plumbing': 'category.plumbing',
    'finishing': 'category.finishing',
    'equipment': 'category.equipment',
  };

  return (
    <MainLayout>
      <div className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">{t('nav.categories')}</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Explore our comprehensive categories to find the right suppliers for your construction needs.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/categories/${category.id}`}
              className="group bg-card rounded-xl p-8 border shadow-soft card-hover"
            >
              <div className={`inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                <category.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">{t(categoryLabels[category.id])}</h3>
              <p className="text-muted-foreground mb-4">{category.count} suppliers available</p>
              <span className="inline-flex items-center gap-1 text-accent group-hover:gap-2 transition-all">
                Browse <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Categories;
