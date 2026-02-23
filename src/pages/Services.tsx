import React, { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Wrench, 
  Zap, 
  Paintbrush, 
  Droplets, 
  Shield, 
  Wind,
  Hammer,
  Sparkles,
  Star,
  Clock,
  ArrowRight
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

// Type definitions
interface Category {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  color?: string;
}

interface ServiceIcon {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bg: string;
}

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
}

// Categories
const categories: Category[] = [
  { id: 'all', name: 'All', icon: null },
  { id: 'maintenance', name: 'Maintenance', icon: Wrench, color: 'from-amber-400 to-orange-500' },
  { id: 'electrical', name: 'Electrical', icon: Zap, color: 'from-yellow-400 to-amber-500' },
  { id: 'plumbing', name: 'Plumbing', icon: Droplets, color: 'from-blue-400 to-cyan-500' },
  { id: 'painting', name: 'Painting', icon: Paintbrush, color: 'from-purple-400 to-pink-500' },
  { id: 'hvac', name: 'HVAC', icon: Wind, color: 'from-teal-400 to-emerald-500' },
  { id: 'security', name: 'Security', icon: Shield, color: 'from-slate-400 to-gray-600' },
  { id: 'construction', name: 'Construction', icon: Hammer, color: 'from-orange-400 to-red-500' },
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles, color: 'from-cyan-400 to-blue-500' },
];

// Service icons mapping
const serviceIcons: Record<string, ServiceIcon> = {
  maintenance: { icon: Wrench, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
  electrical: { icon: Zap, color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50' },
  plumbing: { icon: Droplets, color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50' },
  painting: { icon: Paintbrush, color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50' },
  hvac: { icon: Wind, color: 'from-teal-400 to-emerald-500', bg: 'bg-teal-50' },
  security: { icon: Shield, color: 'from-slate-400 to-gray-600', bg: 'bg-slate-50' },
  construction: { icon: Hammer, color: 'from-orange-400 to-red-500', bg: 'bg-orange-50' },
  cleaning: { icon: Sparkles, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50' },
};

// Services
const services: Service[] = [
  { id: 1, name: 'General Repair', category: 'maintenance', price: 49, rating: 4.9, reviews: 234, duration: '1-2 hrs' },
  { id: 2, name: 'Electrical Wiring', category: 'electrical', price: 79, rating: 4.8, reviews: 189, duration: '2-3 hrs' },
  { id: 3, name: 'Pipe Repair', category: 'plumbing', price: 89, rating: 4.9, reviews: 312, duration: '1-3 hrs' },
  { id: 4, name: 'Interior Painting', category: 'painting', price: 199, rating: 4.7, reviews: 156, duration: '4-8 hrs' },
  { id: 5, name: 'AC Service', category: 'hvac', price: 99, rating: 4.8, reviews: 278, duration: '1-2 hrs' },
  { id: 6, name: 'Security Installation', category: 'security', price: 149, rating: 4.9, reviews: 98, duration: '2-4 hrs' },
  { id: 7, name: 'Wall Construction', category: 'construction', price: 299, rating: 4.6, reviews: 67, duration: '1-2 days' },
  { id: 8, name: 'Deep Cleaning', category: 'cleaning', price: 129, rating: 4.9, reviews: 445, duration: '3-5 hrs' },
  { id: 9, name: 'Faucet Installation', category: 'plumbing', price: 59, rating: 4.8, reviews: 201, duration: '30-60 min' },
  { id: 10, name: 'Light Fixture Install', category: 'electrical', price: 69, rating: 4.7, reviews: 167, duration: '1 hr' },
  { id: 11, name: 'Furniture Assembly', category: 'maintenance', price: 45, rating: 4.8, reviews: 389, duration: '1-2 hrs' },
  { id: 12, name: 'Heating Repair', category: 'hvac', price: 119, rating: 4.9, reviews: 134, duration: '2-3 hrs' },
];

export default function Services(): JSX.Element {
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory: string = urlParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category.icon && <category.icon className="w-4 h-4" />}
              <span className="font-medium">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            <span className="font-semibold text-gray-900">{filteredServices.length}</span> services available
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={createPageUrl('BookService') + `?id=${service.id}`}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`relative h-48 overflow-hidden flex items-center justify-center ${serviceIcons[service.category]?.bg || 'bg-gray-50'}`}>
                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${serviceIcons[service.category]?.color || 'from-gray-400 to-gray-600'} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        {React.createElement(serviceIcons[service.category]?.icon || Wrench, { className: 'w-12 h-12 text-white' })}
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-medium">
                          {categories.find(c => c.id === service.category)?.name}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-amber-600 transition-colors">
                        {service.name}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-gray-900">{service.rating}</span>
                          <span>({service.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">${service.price}</span>
                          <span className="text-sm text-gray-500 ml-1">starting</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                          <ArrowRight className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}