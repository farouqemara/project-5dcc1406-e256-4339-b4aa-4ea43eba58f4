import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Star, CheckCircle2 } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import SupplierCard from '@/components/cards/SupplierCard';

const suppliers = [
  { id: '1', name: 'Premium Steel Works', logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop', category: 'Building Materials', location: 'Cairo, Egypt', rating: 4.9, reviewCount: 128, verified: true, featured: true },
  { id: '2', name: 'ElectroPro Supplies', logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop', category: 'Electrical Supplies', location: 'Dubai, UAE', rating: 4.8, reviewCount: 95, verified: true, featured: false },
  { id: '3', name: 'AquaFlow Systems', logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop', category: 'Plumbing Supplies', location: 'Riyadh, KSA', rating: 4.7, reviewCount: 73, verified: true, featured: false },
  { id: '4', name: 'FinishMaster Pro', logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop', category: 'Finishing & Interior', location: 'Jeddah, KSA', rating: 4.9, reviewCount: 156, verified: true, featured: true },
  { id: '5', name: 'HeavyLift Equipment', logo: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=100&h=100&fit=crop', category: 'Heavy Equipment', location: 'Alexandria, Egypt', rating: 4.6, reviewCount: 89, verified: true, featured: false },
  { id: '6', name: 'BuildRight Materials', logo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop', category: 'Building Materials', location: 'Doha, Qatar', rating: 4.5, reviewCount: 67, verified: false, featured: false },
];

const Suppliers: React.FC = () => {
  return (
    <MainLayout>
      <div className="bg-muted/30 py-8 border-b">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-4">Browse Suppliers</h1>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search suppliers..." className="pl-10" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {suppliers.map((supplier) => (
            <SupplierCard key={supplier.id} {...supplier} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Suppliers;
