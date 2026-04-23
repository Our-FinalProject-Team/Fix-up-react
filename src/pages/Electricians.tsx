import React, { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Zap, 
  Wrench, 
  Shield, 
  Home,
  Settings,
  Power,
  Lightbulb,
  Star,
  Clock,
  ArrowRight,
  Phone,
  MapPin,
  Award
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

// Type definitions
interface ElectricianCategory {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>> | null;
  color?: string;
}

interface ElectricianIcon {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bg: string;
}

interface Electrician {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  experience: string;
  phone: string;
  location: string;
  certifications: string[];
}

// Categories
const categories: ElectricianCategory[] = [
  { id: 'all', name: 'כל החשמלאים', icon: null },
  { id: 'תיקונים כלליים', name: 'תיקונים כלליים', icon: Wrench, color: 'from-amber-400 to-orange-500' },
  { id: 'חיווט ביתי', name: 'חיווט ביתי', icon: Home, color: 'from-blue-400 to-cyan-500' },
  { id: 'תאורה', name: 'תאורה', icon: Lightbulb, color: 'from-yellow-400 to-amber-500' },
  { id: 'מערכות חשמל', name: 'מערכות חשמל', icon: Power, color: 'from-purple-400 to-pink-500' },
  { id: 'אבטחה', name: 'אבטחה', icon: Shield, color: 'from-slate-400 to-gray-600' },
  { id: 'תחזוקה', name: 'תחזוקה', icon: Settings, color: 'from-teal-400 to-emerald-500' },
];

// Electrician icons mapping
const electricianIcons: Record<string, ElectricianIcon> = {
  'תיקונים כלליים': { icon: Wrench, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
  'חיווט ביתי': { icon: Home, color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50' },
  'תאורה': { icon: Lightbulb, color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50' },
  'מערכות חשמל': { icon: Power, color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50' },
  'אבטחה': { icon: Shield, color: 'from-slate-400 to-gray-600', bg: 'bg-slate-50' },
  'תחזוקה': { icon: Settings, color: 'from-teal-400 to-emerald-500', bg: 'bg-teal-50' },
};

// Electricians data
const electricians: Electrician[] = [
  { 
    id: 1, 
    name: 'יוסי החשמלאי', 
    category: 'תיקונים כלליים', 
    price: 120, 
    rating: 4.9, 
    reviews: 234, 
    experience: '15 שנים',
    phone: '052-1234567',
    location: 'תל אביב והמרכז',
    certifications: ['תעודת חשמלאי מוסמך', 'בטיחות בעבודה']
  },
  { 
    id: 2, 
    name: 'דוד כהן', 
    category: 'חיווט ביתי', 
    price: 150, 
    rating: 4.8, 
    reviews: 189, 
    experience: '12 שנים',
    phone: '054-9876543',
    location: 'חיפה והצפון',
    certifications: ['חשמלאי ראשי', 'מערכות חכמות']
  },
  { 
    id: 3, 
    name: 'משה לוי', 
    category: 'תאורה', 
    price: 100, 
    rating: 4.9, 
    reviews: 312, 
    experience: '10 שנים',
    phone: '050-4567890',
    location: 'ירושלים והסביבה',
    certifications: ['מומחה תאורה', 'עיצוב תאורה']
  },
  { 
    id: 4, 
    name: 'אברהם ישראלי', 
    category: 'מערכות חשמל', 
    price: 180, 
    rating: 4.7, 
    reviews: 156, 
    experience: '20 שנים',
    phone: '053-2345678',
    location: 'מרכז ושפלה',
    certifications: ['חשמלאי תעשייתי', 'מערכות משנה']
  },
  { 
    id: 5, 
    name: 'שמעון גולן', 
    category: 'אבטחה', 
    price: 140, 
    rating: 4.8, 
    reviews: 278, 
    experience: '8 שנים',
    phone: '052-3456789',
    location: 'תל אביב והמרכז',
    certifications: ['מערכות אבטחה', 'מצלמות ואזעקות']
  },
  { 
    id: 6, 
    name: 'יעקב אברהם', 
    category: 'תחזוקה', 
    price: 110, 
    rating: 4.9, 
    reviews: 98, 
    experience: '18 שנים',
    phone: '054-5678901',
    location: 'דרום והנגב',
    certifications: ['תחזוקה מתקדמת', 'חירום 24/7']
  },
  { 
    id: 7, 
    name: 'חיים מזרחי', 
    category: 'תיקונים כלליים', 
    price: 130, 
    rating: 4.6, 
    reviews: 167, 
    experience: '14 שנים',
    phone: '050-6789012',
    location: 'שרון והשומרון',
    certifications: ['תיקונים דחופים', 'שירות 24 שעות']
  },
  { 
    id: 8, 
    name: 'בנימין יעקב', 
    category: 'חיווט ביתי', 
    price: 160, 
    rating: 4.8, 
    reviews: 389, 
    experience: '11 שנים',
    phone: '053-7890123',
    location: 'גוש דן',
    certifications: ['חיווט מתקדם', 'בתים חכמים']
  },
];

export default function Electricians(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredElectricians = electricians.filter(electrician => {
    const matchesCategory = selectedCategory === 'all' || electrician.category === selectedCategory;
    const matchesSearch = electrician.name.toLowerCase().includes(searchQuery.toLowerCase());
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
                placeholder="...חפש חשמלאי"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-2xl border-gray-200 bg-gray-50 focus:bg-white transition-colors text-right"
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
            <span className="font-semibold text-gray-900">{filteredElectricians.length}</span> : חשמלאים זמינים
          </p>
        </div>

        {/* Electricians Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredElectricians.map((electrician, index) => (
              <motion.div
                key={electrician.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link to={createPageUrl('BookService') + `?name=${encodeURIComponent(electrician.name)}&price=${electrician.price}&phone=${electrician.phone}&bio=${encodeURIComponent(electrician.category)}&id=${electrician.id}&category=${encodeURIComponent(electrician.category)}`}>
                  <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <div className={`relative h-48 overflow-hidden flex items-center justify-center ${electricianIcons[electrician.category]?.bg || 'bg-gray-50'}`}>
                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${electricianIcons[electrician.category]?.color || 'from-gray-400 to-gray-600'} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                        {React.createElement(electricianIcons[electrician.category]?.icon || Zap, { className: 'w-12 h-12 text-white' })}
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-medium">
                          {categories.find(c => c.id === electrician.category)?.name}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-amber-600 transition-colors text-right">
                        {electrician.name}
                      </h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium text-gray-900">{electrician.rating}</span>
                          <span>({electrician.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{electrician.experience}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Phone className="w-4 h-4" />
                        <span>{electrician.phone}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{electrician.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-gray-900">₪{electrician.price}</span>
                          <span className="text-sm text-gray-500 mr-1">לשעה</span>
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

        {filteredElectricians.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">לא נמצאו חשמלאים</h3>
            <p className="text-gray-600">נסה להתאים את החיפוש או את קריטריוני הסינון שלך</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
