import React, { JSX } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wrench, Zap, Droplets, Paintbrush, Wind, Shield, Hammer, Sparkles, LucideIcon } from 'lucide-react';

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
  { icon: Wind, name: 'מיזוג', color: 'from-teal-400 to-emerald-500', bg: 'bg-teal-50' },
  { icon: Sparkles, name: 'ניקיון', color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50' },
];

export default function ServiceGrid(): JSX.Element {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4" dir="rtl">
      {services.map((service, index) => (
        <motion.div key={service.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
          <Link to={`/ProfessionalsList?category=${service.name}`} className="group block">
            <div className="flex flex-col items-center p-6 bg-white rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all border border-gray-100">
              <div className={`w-16 h-16 rounded-full ${service.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <span className="font-bold text-gray-900 text-sm lg:text-base">{service.name}</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}