import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, AlertCircle, Loader2, User, Phone, Award } from 'lucide-react';
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {professionals.map((pro, index) => (
              <motion.div 
                key={pro.id} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/BookService?name=${encodeURIComponent(pro.fullName)}&price=${pro.baseHourlyRate}&phone=${pro.phoneNumber}&bio=${encodeURIComponent(pro.specialty)}&id=${pro.id}&category=${encodeURIComponent(category)}&categoryId=${searchParams.get('categoryId') || '1'}`}>
                  <div className="group bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-300 border border-stone-100 flex flex-col h-full relative overflow-hidden">
                    
                    {/* עיצוב הריבוע המקצועי */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                        <User className="w-8 h-8 text-stone-400 group-hover:text-emerald-600" />
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="text-amber-700 font-bold">{pro.averageRating || 'חדש'}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-black text-stone-900 mb-2">{pro.fullName}</h3>
                    <p className="text-stone-500 text-sm mb-6 flex-1">
                      מומחה בתחום ה{pro.specialty}. זמין לעבודות באזור {pro.address}.
                    </p>

                    <div className="pt-6 border-t border-stone-50 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-stone-400 font-bold uppercase tracking-wider">מחיר לשעה</span>
                        <span className="text-2xl font-black text-stone-900">₪{pro.baseHourlyRate}</span>
                      </div>
                      <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center group-hover:bg-emerald-600 transition-all transform group-hover:-translate-x-2">
                        <ArrowRight className="w-6 h-6 text-white rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}