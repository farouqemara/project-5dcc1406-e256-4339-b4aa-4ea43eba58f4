import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Truck, Calendar, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const equipment = [
  { id: '1', name: 'Excavator CAT 320', image: 'https://images.unsplash.com/photo-1580901368919-7738efb0f87e?w=400&h=300&fit=crop', daily: 500, weekly: 3000, monthly: 10000, location: 'Cairo, Egypt', available: true },
  { id: '2', name: 'Tower Crane TC 7030', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop', daily: 800, weekly: 5000, monthly: 18000, location: 'Dubai, UAE', available: true },
  { id: '3', name: 'Concrete Mixer Truck', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', daily: 300, weekly: 1800, monthly: 6500, location: 'Riyadh, KSA', available: false },
  { id: '4', name: 'Bulldozer D6', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop', daily: 450, weekly: 2700, monthly: 9500, location: 'Jeddah, KSA', available: true },
];

const Equipment: React.FC = () => {
  return (
    <MainLayout>
      <div className="gradient-hero py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-primary-foreground mb-4">Heavy Equipment Rental</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Rent construction equipment from verified suppliers at competitive rates.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((item) => (
            <Card key={item.id} className="overflow-hidden card-hover">
              <div className="relative h-48">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                <Badge className={`absolute top-3 right-3 ${item.available ? 'bg-success' : 'bg-muted'}`}>
                  {item.available ? 'Available' : 'Booked'}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg text-foreground mb-2">{item.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-3.5 w-3.5" /> {item.location}
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-sm mb-4">
                  <div className="p-2 bg-muted rounded-lg">
                    <div className="font-bold text-foreground">${item.daily}</div>
                    <div className="text-xs text-muted-foreground">Daily</div>
                  </div>
                  <div className="p-2 bg-muted rounded-lg">
                    <div className="font-bold text-foreground">${item.weekly}</div>
                    <div className="text-xs text-muted-foreground">Weekly</div>
                  </div>
                  <div className="p-2 bg-muted rounded-lg">
                    <div className="font-bold text-foreground">${item.monthly}</div>
                    <div className="text-xs text-muted-foreground">Monthly</div>
                  </div>
                </div>
                <Button variant="accent" className="w-full" disabled={!item.available}>
                  {item.available ? 'Request Rental' : 'Not Available'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Equipment;
