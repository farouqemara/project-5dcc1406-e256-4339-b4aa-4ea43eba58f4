import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle2, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

interface SupplierCardProps {
  id: string;
  name: string;
  logo: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  verified?: boolean;
  featured?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SupplierCard: React.FC<SupplierCardProps> = ({
  id,
  name,
  logo,
  category,
  location,
  rating,
  reviewCount,
  verified = false,
  featured = false,
  className,
  style,
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={cn(
        "bg-card rounded-xl border border-border overflow-hidden card-hover",
        className
      )}
      style={style}
    >
      {/* Header */}
      <div className="relative p-4 pb-0">
        {featured && (
          <Badge className="absolute top-2 left-2 bg-warning/10 text-warning border-warning/20 text-xs">
            {t('common.featured')}
          </Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-accent"
        >
          <Bookmark className="h-4 w-4" />
        </Button>
        <div className="flex flex-col items-center pt-4">
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-border bg-muted mb-3">
            <img
              src={logo}
              alt={name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex items-center gap-1.5 mb-1">
            <h3 className="font-semibold text-foreground text-center line-clamp-1">{name}</h3>
            {verified && (
              <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-warning fill-warning" />
            <span className="font-medium text-foreground">{rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">({reviewCount} reviews)</span>
        </div>

        <Button variant="outline" asChild className="w-full">
          <Link to={`/suppliers/${id}`}>View Profile</Link>
        </Button>
      </div>
    </div>
  );
};

export default SupplierCard;
