import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryCardProps {
  id: string;
  icon: React.ElementType;
  color: string;
  className?: string;
}

const categoryLabels: Record<string, string> = {
  'building-materials': 'category.building',
  'electrical': 'category.electrical',
  'plumbing': 'category.plumbing',
  'finishing': 'category.finishing',
  'equipment': 'category.equipment',
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  icon: Icon,
  color,
  className,
}) => {
  const { t } = useLanguage();

  return (
    <Link
      to={`/categories/${id}`}
      className={cn(
        "group relative bg-card rounded-xl p-6 border border-border overflow-hidden card-hover text-center",
        className
      )}
    >
      <div
        className={cn(
          "mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br mb-4 transition-transform duration-300 group-hover:scale-110",
          color
        )}
      >
        <Icon className="h-7 w-7 text-white" />
      </div>
      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-sm md:text-base">
        {t(categoryLabels[id] || id)}
      </h3>
      <div className="flex items-center justify-center gap-1 text-sm text-accent opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Browse</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </Link>
  );
};

export default CategoryCard;
