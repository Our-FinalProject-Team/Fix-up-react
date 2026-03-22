import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, MessageCircle, CreditCard } from 'lucide-react';
import { LucideIcon } from 'lucide-react'; // טיפוס לכל אייקון

// טיפוס לכל feature
interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const features: Feature[] = [
  {
    icon: Calendar,
    title: 'הזמנה קלה',
    description: 'קבעו שירותים תוך שניות. בחרו את הזמן שלכם, ואנחנו נטפל בשאר',
    color: 'from-amber-500 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    icon: MapPin,
    title: 'מעקב בזמן אמת',
    description: 'דע בדיוק מתי יגיע איש המקצוע שלך  ',
    color: 'from-teal-500 to-emerald-500',
    bg: 'bg-teal-50',
  },
  {
    icon: MessageCircle,
    title: 'תקשורת ישירה',
    description:'שוחחו בצאט עם המקצוען שהוקצה לכם',
    color: 'from-blue-500 to-indigo-500',
    bg: 'bg-blue-50',
  },
  {
    icon: CreditCard,
    title: 'תשלומים מאובטחים',
    description: 'שלמו בצורה מאובטחת דרך האפליקציה. אין צורך במזומן, אין עמלות נסתרות',
    color: 'from-purple-500 to-pink-500',
    bg: 'bg-purple-50',
  },
];

export default function FeatureCards(): JSX.Element {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          className="group"
        >
          <div className="h-full p-6 lg:p-8 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
            <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center`}>
                <feature.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600 leading-relaxed">{feature.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}