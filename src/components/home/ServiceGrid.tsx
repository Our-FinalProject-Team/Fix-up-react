import React, { JSX } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../../utils';
import { motion } from 'framer-motion';
import { 
  Wrench, 
  Zap, 
  Paintbrush, 
  Droplets, 
  Shield, 
  Wind,
  Hammer,
  Home,
  Leaf,
  Lock,
  Tv,
  Sparkles,
  LucideIcon
} from 'lucide-react';

// טיפוס לכל שירות
interface Service {
  icon: LucideIcon;
  name: string;
  color: string;
  bg: string;
}

const services: Service[] = [
  { icon: Wrench, name: 'תחזוקה', color: 'from-amber-400 to-orange-500', bg: 'bg-amber-50' },
  { icon: Zap, name: 'חשמל', color: 'from-yellow-400 to-amber-500', bg: 'bg-yellow-50' },
  { icon: Droplets, name: 'אינסטלציה', color: 'from-blue-400 to-cyan-500', bg: 'bg-blue-50' },
  { icon: Paintbrush, name: 'צביעה', color: 'from-purple-400 to-pink-500', bg: 'bg-purple-50' },
  { icon: Wind, name: 'מערכות מיזוג אויר', color: 'from-teal-400 to-emerald-500', bg: 'bg-teal-50' },
  { icon: Shield, name: 'אבטחה', color: 'from-slate-400 to-gray-600', bg: 'bg-slate-50' },
  { icon: Hammer, name: 'בנייה', color: 'from-orange-400 to-red-500', bg: 'bg-orange-50' },
  { icon: Home, name: 'חיפוי קירות', color: 'from-rose-400 to-pink-500', bg: 'bg-rose-50' },
  { icon: Leaf, name: 'גינון', color: 'from-green-400 to-emerald-500', bg: 'bg-green-50' },
  { icon: Lock, name: 'מנעולנות', color: 'from-gray-400 to-zinc-600', bg: 'bg-gray-50' },
  { icon: Tv, name: 'מכשירי חשמל', color: 'from-indigo-400 to-violet-500', bg: 'bg-indigo-50' },
  { icon: Sparkles, name: 'ניקיון', color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50' },
];

export default function ServiceGrid(): JSX.Element {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6">
      {services.map((service, index) => (
        <motion.div
          key={service.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
        >
          <Link 
            to={createPageUrl('Services') + `?category=${service.name.toLowerCase()}`}
            className="group block"
          >
            <div className="flex flex-col items-center p-4 lg:p-6 bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:-translate-y-1">
              <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-full ${service.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                </div>
              </div>
              <span className="text-sm lg:text-base font-medium text-gray-800 text-center">
                {service.name}
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}