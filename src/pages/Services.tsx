import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Droplets, Zap, Wind, Paintbrush, 
  Sparkles, Wrench, Shield, Hammer, ArrowRight 
} from 'lucide-react';
import { Input } from '../components/ui/input';

const categories = [
  { id: 1, name: 'אינסטלטור', icon: Droplets, color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50' },
  { id: 2, name: 'חשמלאי', icon: Zap, color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50' },
  { id: 3, name: 'טכנאי מזגנים', icon: Wind, color: 'from-teal-400 to-emerald-500', bg: 'bg-teal-50' },
  { id: 4, name: 'צבעי', icon: Paintbrush, color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50' },
  { id: 5, name: 'ניקיון', icon: Sparkles, color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50' },
  { id: 6, name: 'איש תחזוקה/הידמן', icon: Wrench, color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
  { id: 7, name: 'שיפוצניק/קבלן בניה', icon: Hammer, color: 'from-orange-400 to-red-500', bg: 'bg-orange-50' },
  { id: 8, name: 'גנן', icon: Shield, color: 'from-emerald-400 to-green-500', bg: 'bg-emerald-50' },
];

export default function Services() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(cat =>
    cat.name.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-stone-50 py-20 px-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-stone-900 mb-6 tracking-tight">איזה שירות <span className="text-emerald-600">דרוש לך?</span></h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-stone-400 w-6 h-6" />
            <Input 
              className="w-full h-18 pr-16 rounded-[2rem] border-none bg-white shadow-xl text-xl"
              placeholder="חיפוש שירות (למשל: אינסטלטור...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link to={`/ProfessionalsList?category=${encodeURIComponent(cat.name)}&categoryId=${cat.id}`}>
                <div className="group bg-white rounded-[3rem] p-2 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full">
                  <div className={`h-48 rounded-[2.5rem] flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-[0.98] ${cat.bg}`}>
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-transform`}>
                      <cat.icon className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <div className="p-6 flex justify-between items-center">
                    <span className="font-black text-2xl text-stone-800">{cat.name}</span>
                    <div className="w-12 h-12 rounded-2xl bg-stone-900 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                      <ArrowRight className="w-6 h-6 text-white rotate-180" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}