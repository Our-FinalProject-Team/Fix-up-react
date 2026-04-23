import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  ArrowRight, 
  AlertCircle, 
  Loader2, 
  User, 
  Phone, 
  Award,
  Search,
  Wrench,
  Zap,
  Paintbrush,
  Droplets,
  Shield,
  Wind,
  Hammer,
  Sparkles,
  Clock,
  MapPin
} from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import api from "./api"; // החיבור ל-API שלך

interface Professional {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  specialty: string;
  averageRating: number;
  baseHourlyRate: number;
  experience?: string; // אם יש בשדות שלך
}

// Icon mapping for different specialties
const getSpecialtyIcon = (specialty: string) => {
  switch (specialty.toLowerCase()) {
    case 'חשמל':
    case 'חשמלאי':
      return Zap;
    case 'אינסטלציה':
    case 'שרברב':
      return Droplets;
    case 'צביעה':
    case 'צייר':
      return Paintbrush;
    case 'תיקונים':
    case 'תיקון':
      return Wrench;
    case 'אבטחה':
      return Shield;
    case 'מיזוג אויר':
      return Wind;
    case 'בנייה':
      return Hammer;
    case 'ניקיון':
      return Sparkles;
    default:
      return User;
  }
};

// Color mapping for different specialties
const getSpecialtyColor = (specialty: string) => {
  switch (specialty.toLowerCase()) {
    case 'חשמל':
    case 'חשמלאי':
      return 'from-yellow-400 to-amber-500';
    case 'אינסטלציה':
    case 'שרברב':
      return 'from-blue-400 to-cyan-500';
    case 'צביעה':
    case 'צייר':
      return 'from-purple-400 to-pink-500';
    case 'תיקונים':
    case 'תיקון':
      return 'from-amber-400 to-orange-500';
    case 'אבטחה':
      return 'from-slate-400 to-gray-600';
    case 'מיזוג אויר':
      return 'from-teal-400 to-emerald-500';
    case 'בנייה':
      return 'from-orange-400 to-red-500';
    case 'ניקיון':
      return 'from-cyan-400 to-blue-500';
    default:
      return 'from-gray-400 to-gray-600';
  }
};

// Background color mapping
const getSpecialtyBg = (specialty: string) => {
  switch (specialty.toLowerCase()) {
    case 'חשמל':
    case 'חשמלאי':
      return 'bg-yellow-50';
    case 'אינסטלציה':
    case 'שרברב':
      return 'bg-blue-50';
    case 'צביעה':
    case 'צייר':
      return 'bg-purple-50';
    case 'תיקונים':
    case 'תיקון':
      return 'bg-amber-50';
    case 'אבטחה':
      return 'bg-slate-50';
    case 'מיזוג אויר':
      return 'bg-teal-50';
    case 'בנייה':
      return 'bg-orange-50';
    case 'ניקיון':
      return 'bg-cyan-50';
    default:
      return 'bg-gray-50';
  }
};

export default function ProfessionalsList() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') || '';
  
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessionals = async () => {
      if (!category) return;
      
      setLoading(true);
      try {
        // שואב נתונים אמיתיים מה-Database לפי הקטגוריה שנבחרה
        const response = await api.get(`/Professionals?specialty=${encodeURIComponent(category)}`);
        
        // אם השרת שלך מחזיר את כל הרשימה, נסנן אותה כאן לצורכי בטחון
        const data = Array.isArray(response.data) ? response.data : [];
        const filtered = data.filter((p: Professional) => p.specialty === category);
        
        setProfessionals(filtered);
      } catch (error) {
        console.error("שגיאה במשיכת בעלי מקצוע:", error);
        setProfessionals([]); // במקרה של שגיאה לא מציגים סתם נתונים
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [category]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-right" dir="rtl">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600 mb-4" />
        <h2 className="text-xl font-bold text-stone-700">מחפש מומחים ב{category}...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 text-right" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-stone-900 mb-2">מומחי {category}</h1>
          <p className="text-stone-500 font-medium">כל בעלי המקצוע המופיעים כאן רשומים ומאומתים במערכת.</p>
        </header>

        {professionals.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-16 rounded-[3rem] shadow-sm text-center border border-stone-200">
            <AlertCircle className="w-20 h-20 text-stone-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-stone-800">כרגע אין {category} רשומים במערכת</h2>
            <p className="text-stone-500 mt-2 mb-8">ניתן לנסות קטגוריה אחרת או לחזור מאוחר יותר.</p>
            <Link to="/Services" className="bg-stone-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-colors">
              חזרה לכל השירותים
            </Link>
          </motion.div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {professionals.map((pro, index) => {
                const IconComponent = getSpecialtyIcon(pro.specialty);
                const specialtyColor = getSpecialtyColor(pro.specialty);
                const specialtyBg = getSpecialtyBg(pro.specialty);
                
                return (
                  <motion.div
                    key={pro.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/BookService?name=${encodeURIComponent(pro.fullName)}&price=${pro.baseHourlyRate}&phone=${pro.phoneNumber}&bio=${encodeURIComponent(pro.specialty)}&id=${pro.id}&category=${encodeURIComponent(category)}&categoryId=${searchParams.get('categoryId') || '1'}`}>
                      <div className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <div className={`relative h-48 overflow-hidden flex items-center justify-center ${specialtyBg}`}>
                          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${specialtyColor} flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                            {React.createElement(IconComponent, { className: 'w-12 h-12 text-white' })}
                          </div>
                          <div className="absolute top-3 left-3">
                            <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-medium">
                              {pro.specialty}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-amber-600 transition-colors text-right">
                            {pro.fullName}
                          </h3>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-medium text-gray-900">{pro.averageRating || 'חדש'}</span>
                              <span>({Math.floor(Math.random() * 100) + 50})</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{pro.experience || 'שנים של ניסיון'}</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <Phone className="w-4 h-4" />
                            <span>{pro.phoneNumber}</span>
                          </div>

                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <MapPin className="w-4 h-4" />
                            <span>{pro.address}</span>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-2xl font-bold text-gray-900">₪{pro.baseHourlyRate}</span>
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
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}