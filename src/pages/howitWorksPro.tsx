import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  UserCheck,
  Bell,
  Navigation,
  Star,
  ArrowLeft,
  Shield,
  DollarSign,
  Clock,
  TrendingUp,
  MessageCircle,
  CalendarCheck,
  Zap,
  ThumbsUp,
  LucideIcon,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// הגדרת טיפוס עבור שלבי העבודה
interface Step {
  number: string;
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
}

// הגדרת טיפוס עבור מאפייני המערכת
interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: UserCheck,
    title: 'הירשם והצטרף',
    description: 'צור פרופיל מקצועי, הוסף את תחומי ההתמחות שלך ועבור תהליך אימות קצר. תוך שעות תהיה מוכן לקבל עבודות.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50',
  },
  {
    number: '02',
    icon: Bell,
    title: 'קבל הזמנות',
    description: 'המערכת תתאים אותך ללקוחות בסביבתך בהתאם לתחום מקצועיותך וזמינותך. קבל התראה בזמן אמת על כל משימה חדשה.',
    color: 'from-teal-400 to-emerald-500',
    bg: 'bg-teal-50',
  },
  {
    number: '03',
    icon: Navigation,
    title: 'בצע את העבודה',
    description: 'נסע ללקוח, עדכן את הסטטוס בלוח הבקרה שלך בכל שלב — הגעתי, בביצוע, הושלם — הכל בלחיצה אחת.',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
  },
  {
    number: '04',
    icon: DollarSign,
    title: 'קבל תשלום וצבור דירוג',
    description: 'התשלום מועבר ישירות לחשבונך לאחר השלמת העבודה. ביקורות חיוביות מעלות אותך בדירוגים ומביאות יותר לקוחות.',
    color: 'from-purple-400 to-pink-500',
    bg: 'bg-purple-50',
  },
];

const features: Feature[] = [
  { icon: Shield, title: 'הגנה מלאה', desc: 'כיסוי ביטוחי לכל עבודה שמבוצעת דרך הפלטפורמה' },
  { icon: Clock, title: 'שעות גמישות', desc: 'אתה קובע מתי אתה עובד — מלא-משרה או בצד' },
  { icon: TrendingUp, title: 'צמיחה מתמדת', desc: 'ככל שהדירוג שלך עולה, כך גם ההכנסות שלך' },
  { icon: DollarSign, title: 'הכנסה שקופה', desc: 'מחיר ידוע מראש לכל עבודה, ללא עמלות מפתיעות' },
  { icon: MessageCircle, title: 'תקשורת ישירה', desc: 'צ׳אט ישיר עם הלקוח לפני ובמהלך העבודה' },
  { icon: CalendarCheck, title: 'לוח זמינות חכם', desc: 'נהל את היומן שלך בקלות דרך לוח הבקרה' },
];

export default function HowItWorksPro() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero */}
      <section className="bg-gradient-to-bl from-gray-50 to-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              לבעלי מקצוע
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              איך FIXUP עובד עבורך?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              הצטרף לאלפי בעלי מקצוע שמרוויחים יותר, עובדים בגמישות ובונים מוניטין חזק — הכל דרך פלטפורמה אחת.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 right-1/2 w-full h-0.5 bg-gradient-to-l from-gray-200 to-gray-100" />
                )}
                <div className="relative z-10 text-center">
                  <div className={`w-32 h-32 mx-auto rounded-3xl ${step.bg} flex items-center justify-center mb-6 relative`}>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <span className="absolute -top-2 -left-2 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              למה לעבוד עם FIXUP?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              פיתחנו את הפלטפורמה כדי שבעלי מקצוע יוכלו להתמקד במה שהם עושים הכי טוב — לעבוד.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 rounded-3xl border-0 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-100 to-amber-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-orange-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                לוח בקרה חכם — הכל במקום אחד
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                נהל את כל העבודות שלך, עדכן סטטוסים, תקשר עם לקוחות ועקוב אחר ההכנסות שלך — הכל ממסך אחד, פשוט ומהיר.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'קבל ודחה בקשות בזמן אמת',
                  'עדכן סטטוס משימה בלחיצה אחת',
                  'צ׳אט ישיר עם הלקוח',
                  'מעקב הכנסות ודירוג ביצועים',
                ].map((item: string, i: number) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <ThumbsUp className="w-3 h-3 text-orange-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/prodashboard">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-2xl text-lg">
                  עבור ללוח הבקרה
                  <ArrowLeft className="mr-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-[3rem] p-4 aspect-[3/4] max-w-sm mx-auto shadow-2xl">
                <div className="absolute inset-4 bg-gray-950 rounded-[2rem] overflow-hidden p-4 flex flex-col gap-3">
                  {/* Mock header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-xs font-bold">לוח בקרה</p>
                        <p className="text-gray-500 text-[10px]">קרלוס מ.</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold">מחובר</span>
                    </div>
                  </div>

                  {/* Mock mission card */}
                  <div className="bg-gray-800 rounded-2xl p-3 border border-orange-500/30">
                    <p className="text-orange-400 text-[10px] font-bold mb-1">משימה פעילה</p>
                    <p className="text-white text-sm font-bold">תיקון לוח חשמל</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-gray-400 text-[10px]">אחמד כ. · רחוב האלון 14</span>
                      <span className="text-green-400 text-xs font-bold">₪650</span>
                    </div>
                    <div className="mt-2 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full w-2/4 bg-orange-500 rounded-full" />
                    </div>
                  </div>

                  {/* Mock stats */}
                  <div className="grid grid-cols-3 gap-2">
                    {[{ v: '32', l: 'עבודות' }, { v: '4.9', l: 'דירוג' }, { v: '₪10K', l: 'החודש' }].map((s, i) => (
                      <div key={i} className="bg-gray-800 rounded-xl p-2 text-center">
                        <p className="text-orange-400 text-xs font-bold">{s.v}</p>
                        <p className="text-gray-600 text-[10px]">{s.l}</p>
                      </div>
                    ))}
                  </div>

                  {/* Mock inbox item */}
                  <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700">
                    <p className="text-white text-xs font-semibold">ברז מטבח מטפטף</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-gray-500 text-[10px]">מריה ס.</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] text-orange-300 font-semibold">₪220</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-400 to-amber-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              מוכן להתחיל להרוויח?
            </h2>
            <p className="text-xl text-gray-800 mb-10 max-w-2xl mx-auto">
              הצטרף לאלפי בעלי מקצוע שכבר עובדים עם FIXUP ובונים קריירה מצליחה.
            </p>
            <Link to="/TechnicianDashboard">
              <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-6 text-lg rounded-2xl shadow-lg">
                הצטרף עכשיו
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}