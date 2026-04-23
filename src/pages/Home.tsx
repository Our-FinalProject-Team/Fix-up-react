import React, { JSX } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Clock, Star, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { createPageUrl } from '../utils';
import AppShowcase from '../components/home/AppShowcase';
import ServiceGrid from '../components/home/ServiceGrid';
import FeatureCards from '../components/home/FeatureCards';

interface TrustBadge {
  icon: React.ElementType;
  text: string;
  sub: string;
}

export default function Home(): JSX.Element {
  const trustBadges: TrustBadge[] = [
    { icon: Shield, text: 'מומחים מאומתים', sub: 'בדיקת רקע' },
    { icon: Clock, text: 'באותו יום', sub: 'שירות זמין' },
    { icon: Star, text: 'שביעות רצון', sub: 'מובטח' },
    { icon: CheckCircle, text: 'מחיר קבוע', sub: 'אין הפתעות' },
  ];

  const avatarLetters: string[] = ['A', 'B', 'C', 'D'];
  const avatarColors: string[] = ['bg-amber-500', 'bg-teal-500', 'bg-blue-500', 'bg-purple-500'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-x-hidden rtl">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-teal-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* אלמנט 1: האייפון (מוצמד לשמאל) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:order-1 flex justify-center lg:justify-start"
            >
              <AppShowcase />
            </motion.div>

            {/* אלמנט 2: הטקסט והכפתורים (מיושרים חזק לימין) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:order-2 flex flex-col items-end text-right" // items-end דוחף הכל לקצה הימני
            >
              {/* תגית סטטוס */}
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">זמין 24/7 באזור שלך</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 w-full">
                תיקוני בית
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  פשוטים יותר
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                צור קשר עם אנשי מקצוע מאומתים לכל צרכי תחזוקת הבית שלך. תמחור מהיר, אמין ושקוף.
              </p>

             
              <div className="flex flex-col gap-5 w-full max-w-md items-end">
                
                
                <div className="grid grid-cols-2 gap-4 w-full">
                  <Link to={createPageUrl('Services')}>
                    <Button size="lg" className="w-full bg-[#111827] hover:bg-black text-white py-7 text-lg rounded-2xl shadow-xl flex items-center justify-center gap-2">
                      הזמן שירות
                      <ArrowLeft className="w-5 h-5" />
                    </Button>
                  </Link>

                  <Link to={createPageUrl('HowItWorks')}>
                    <Button size="lg" variant="outline" className="w-full py-7 text-lg rounded-2xl border-4 border-gray-200 bg-white hover:bg-gray-50 text-gray-900 font-medium">
                      איך זה עובד
                    </Button>
                  </Link>
                </div>

                {/* כפתור ה-Live Chat המרכזי */}
                <Link to={createPageUrl('FullScreenChat')} className="w-full">
                  <Button 
                    size="lg" 
                    className="w-full py-7 text-lg rounded-2xl bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg flex items-center justify-center gap-3 border-none font-bold"
                  >
                    <span className="text-2xl opacity-90">💬</span>
                    Live-chat
                  </Button>
                </Link>

                {/* שורת הדירוג - עכשיו מוצמדת חזק לימין מתחת לכפתור */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex -space-x-3 rtl:space-x-reverse">
                    {avatarLetters.map((letter, i) => (
                      <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs ${avatarColors[i]}`}>
                        {letter}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-end leading-tight">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 font-medium mt-1">4.9/5 מתוך +2000 ביקורות</p>
                  </div>
                </div>
              </div>
            </motion.div> 
          </div>
        </div>
      </section>

      {/* Trust Badges - סידור ה-Text Align לימין */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3 justify-end lg:justify-start"
              >
                <div className="text-right order-1">
                  <p className="font-semibold text-gray-900">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center order-2">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              במה אתה צריך עזרה?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              עיין בשירותים שלנו והזמן באופן מיידי. אנשי המקצוע שלנו מוכנים לעזור.
            </p>
          </motion.div>
          <ServiceGrid />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureCards />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-white/5 opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              מוכן להתחיל?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              הצטרף לאלפי בעלי הבתים שסומכים עלינו לצורכי תחזוקת הבית שלהם.
            </p>
            <Link to={createPageUrl('Services')}>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-10 py-6 text-lg rounded-2xl shadow-lg shadow-amber-500/30">
                הזמן את השירות הראשון שלך
                <ArrowRight className="mr-2 w-5 h-5 inline-block" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}