
import React, { JSX, useState ,useEffect} from 'react';
import { useLocation} from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './Contexts/BookServiceContext'; 
import { useNavigate } from 'react-router-dom';
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
  ArrowRight,
  Key,
  LayoutGrid,
  Leaf,
  Tv
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import axios from 'axios';

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
  address: string;
  fullName: string;
  email: string;
  category: string;
  calloutfee: number;
  phoneNumber: string;
  baseHourlyRate: number;
  specality: string;
  totalreviews: number;
  averageRating: number;
}

// Categories
const categories: Category[] = [
  { id: 'all', name: 'All', icon: null },
  { id: 'תחזוקה', name: 'תחזוקה', icon: Wrench, color: 'from-amber-400 to-orange-500' },
  { id: 'חשמל', name: 'חשמל', icon: Zap, color: 'from-yellow-400 to-amber-500' },
  { id: 'אינסטלציה', name: 'אינסטלציה', icon: Droplets, color: 'from-blue-400 to-cyan-500' },
  { id: 'צביעה', name: 'צביעה', icon: Paintbrush, color: 'from-purple-400 to-pink-500' },
  { id: 'מערכות מיזוג אויר', name: 'מערכות מיזוג אויר', icon: Wind, color: 'from-teal-400 to-emerald-500' },
  { id: 'אבטחה', name: 'אבטחה', icon: Shield, color: 'from-slate-400 to-gray-600' },
  { id: 'בנייה', name: 'בנייה', icon: Hammer, color: 'from-orange-400 to-red-500' },
  { id: 'ניקיון', name: 'ניקיון', icon: Sparkles, color: 'from-cyan-400 to-blue-500' },
  { id: 'מכשירי חשמל', name: 'מכשירי חשמל', icon: Tv, color: 'from-indigo-400 to-blue-600' },
  { id: 'גינון', name: 'גינון', icon: Leaf, color: 'from-green-400 to-emerald-600' },
  { id: 'חיפוי קירות', name: 'חיפוי קירות', icon: LayoutGrid, color: 'from-rose-400 to-red-600' },
  { id: 'מנעולן', name: 'מנעולן', icon: Key, color: 'from-gray-500 to-slate-800' }, 
];

// Service icons mapping
const serviceIcons: Record<string, ServiceIcon> = {
  'תחזוקה': { icon: Wrench, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
  'חשמל': { icon: Zap, color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50' },
  'אינסטלציה': { icon: Droplets, color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50' },
  'צביעה': { icon: Paintbrush, color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50' },
  'מערכות מיזוג אויר': { icon: Wind, color: 'from-teal-400 to-emerald-500', bg: 'bg-teal-50' },
  'אבטחה': { icon: Shield, color: 'from-slate-400 to-gray-600', bg: 'bg-slate-50' },
  'בנייה': { icon: Hammer, color: 'from-orange-400 to-red-500', bg: 'bg-orange-50' },
  'ניקיון': { icon: Sparkles, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50' },
  'מכשירי חשמל': { icon: Tv, color: 'from-indigo-400 to-blue-600', bg: 'bg-indigo-50' },
  'גינון': { icon: Leaf, color: 'from-green-400 to-emerald-600', bg: 'bg-green-50' },
  'חיפוי קירות': { icon: LayoutGrid, color: 'from-rose-400 to-red-600', bg: 'bg-rose-50' },
  'מנעולן': { icon: Key, color: 'from-gray-500 to-slate-800', bg: 'bg-gray-100' },  
};

// Services
const services: Service[] = [
  { id: 1, fullName: 'תיקון כללי', category: 'תחזוקה', phoneNumber: '050-1234567', baseHourlyRate: 49, email: 'repair@example.com', calloutfee: 50, specality: 'תיקון כללי', totalreviews: 234, averageRating: 4.9, address: 'רחוב הגליל 1, תל אביב' },
];



export default function Services(): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { setSelectedPro } = useBooking(); // שליפת הפונקציה מהקונטקסט
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const urlParams = new URLSearchParams(window.location.search);
  const initialCategory: string = urlParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryFromUrl = urlParams.get('category');
    
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory('all');
    }
  }, [location.search]);

 const mapSpecialtyToCategory = (specialty: string) => {
  const mapping: { [key: string]: string } = {
    'טכנאי מוצרי חשמל': 'מכשירי חשמל',
    'חשמלאי': 'חשמל',
    'אינסטלטור': 'אינסטלציה',
    'צבעי': 'צביעה',
    'טכנאי מזגנים': 'מערכות מיזוג אויר',
    'מתקין מערכות אבטחה': 'אבטחה',
    'שיפוצניק/קבלן בניה': 'בנייה',
    'ניקיון': 'ניקיון',
    'גנן': 'גינון',
    'רצף/מתקין חיפויים': 'חיפוי קירות',
    'מנעולן': 'מנעולן',
    'איש תחזוקה/הנידמן': 'תחזוקה',
  };

  return mapping[specialty] || 'תחזוקה'; 
};
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://fixup-fullstack.onrender.com/api/Professionals');
        
        if (!response.data) {
          throw new Error('שגיאה בטעינת הנתונים מהשרת');
        }

        const data = await response.data;
        console.log(data);

      const formattedServices = data.map((item: any) => ({
        id: item.id,
  fullName: item.fullName,
  category: mapSpecialtyToCategory(item.specialty),
  baseHourlyRate: item.baseHourlyRate, 
  averageRating: item.averageRating,
  totalreviews: item.totalReviews || 0, 
  address: item.address || '',
  phoneNumber: item.phoneNumber || '',
  email: item.email || '',             
  calloutfee: item.calloutFee || 0,    
  specality: item.specialty || ''       
    }));
        
        // כאן אנחנו מעדכנים את הסטייט בנתונים שהגיעו
        setServices(formattedServices);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'שגיאה לא ידועה');
      } finally {
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
  // בדיקה אם הקטגוריה מתאימה (או שנבחר "הכל")
  const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
  
  // בדיקה אם שם בעל המקצוע מכיל את הטקסט שחיפשנו
  const matchesSearch = service.fullName.toLowerCase().includes(searchQuery.toLowerCase());

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
              placeholder="...חפש שירות"
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
          שירותים זמינים: <span className="font-semibold text-gray-900">{filteredServices.length}</span>
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
              <div 
                className="cursor-pointer group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                onClick={() => {
                  setSelectedPro(service as any); 
                  // תיקון מחרוזת הניווט
                  navigate(`${createPageUrl('BookService')}?id=${service.id}`); 
                }}
              >
                {/* תיקון ה-className כאן עם Backticks */}
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
                    {service.fullName}
                  </h3>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium text-gray-900">{service.averageRating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>30 דקות</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900">₪{service.baseHourlyRate}</span>
                      <span className="text-sm text-gray-500 ml-1">לשעה</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
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
          <h3 className="text-xl font-bold text-gray-900 mb-2">לא נמצאו שירותים</h3>
          <p className="text-gray-600">נסה להתאים את החיפוש או את קריטריוני הסינון שלך</p>
        </motion.div>
      )}
    </div>
  </div>
)}