import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Phone, 
  MapPin, 
  Star, 
  Clock, 
  Award, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Calendar,
  MessageCircle,
  Zap,
  Wrench,
  Home,
  Lightbulb,
  Power,
  Settings,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

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
  bio?: string;
  availability?: string[];
  completedJobs?: number;
}

const electriciansData: Electrician[] = [
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
    certifications: ['תעודת חשמלאי מוסמך', 'בטיחות בעבודה'],
    bio: 'חשמלאי מוסמך עם ניסיון של 15 שנים בתחום התיקונים הכלליים. מתמחה בפתרון בעיות מורכבות ושירות מהיר ואמין.',
    availability: ['ראשון-חמישי: 8:00-18:00', 'שישי: 8:00-13:00', 'חירום 24/7'],
    completedJobs: 456
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
    certifications: ['חשמלאי ראשי', 'מערכות חכמות'],
    bio: 'מומחה לחיווט ביתי ומערכות חכמות. מספק פתרונות מתקדמים לבית החכם עם טכנולוגיה עדכנית.',
    availability: ['ראשון-חמישי: 7:00-17:00', 'שישי: סגור'],
    completedJobs: 312
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
    certifications: ['מומחה תאורה', 'עיצוב תאורה'],
    bio: 'מעצב תאורה מקצועי עם ניסיון בפרויקטים מסחריים ופרטיים. מתמחה בתאורה אדריכלית ונוף.',
    availability: ['ראשון-חמישי: 9:00-19:00', 'שישי: 9:00-14:00'],
    completedJobs: 278
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
    certifications: ['חשמלאי תעשייתי', 'מערכות משנה'],
    bio: 'חשמלאי תעשייתי ותיק עם ניסיון במערכות משנה וציוד כבד. מומחה בפרויקטים גדולים.',
    availability: ['ראשון-חמישי: 6:00-16:00', 'שישי: סגור'],
    completedJobs: 189
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
    certifications: ['מערכות אבטחה', 'מצלמות ואזעקות'],
    bio: 'מומחה למערכות אבטחה מתקדמות. מתמחה במצלמות אבטחה, מערכות אזעקה ופתרונות חכמים.',
    availability: ['ראשון-חמישי: 8:00-18:00', 'שישי: 8:00-12:00', 'חירום 24/7'],
    completedJobs: 234
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
    certifications: ['תחזוקה מתקדמת', 'חירום 24/7'],
    bio: 'מומחה לתחזוקה מתקדמת ופתרונות חירום. זמין 24/7 למקרי חירום ותיקונים דחופים.',
    availability: ['זמין 24/7 לחירומים', 'ראשון-חמישי: 7:00-19:00'],
    completedJobs: 567
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
    certifications: ['תיקונים דחופים', 'שירות 24 שעות'],
    bio: 'חשמלאי מנוסה לתיקונים דחופים ושירות מהיר. מתמחה בפתרון בעיות בזמן אמת.',
    availability: ['זמין 24/7', 'שירות מיידי'],
    completedJobs: 389
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
    certifications: ['חיווט מתקדם', 'בתים חכמים'],
    bio: 'מומחה לחיווט מתקדם ובתים חכמים. מספק פתרונות חדשניים לבית המודרני.',
    availability: ['ראשון-חמישי: 8:00-17:00', 'שישי: 8:00-13:00'],
    completedJobs: 423
  },
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'תיקונים כלליים': return Wrench;
    case 'חיווט ביתי': return Home;
    case 'תאורה': return Lightbulb;
    case 'מערכות חשמל': return Power;
    case 'אבטחה': return Shield;
    case 'תחזוקה': return Settings;
    default: return Zap;
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'תיקונים כלליים': return 'from-amber-400 to-orange-500';
    case 'חיווט ביתי': return 'from-blue-400 to-cyan-500';
    case 'תאורה': return 'from-yellow-400 to-amber-500';
    case 'מערכות חשמל': return 'from-purple-400 to-pink-500';
    case 'אבטחה': return 'from-slate-400 to-gray-600';
    case 'תחזוקה': return 'from-teal-400 to-emerald-500';
    default: return 'from-gray-400 to-gray-600';
  }
};

export default function ElectricianProfile() {
  const { id } = useParams<{ id: string }>();
  const electrician = electriciansData.find(e => e.id === parseInt(id || '1'));

  if (!electrician) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-right" dir="rtl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">החשמלאי לא נמצא</h1>
          <Link to="/Electricians">
            <Button className="bg-gray-900 text-white hover:bg-gray-800">
              חזרה לרשימת החשמלאים
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = getCategoryIcon(electrician.category);
  const categoryColor = getCategoryColor(electrician.category);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/Electricians" className="text-gray-600 hover:text-gray-900 font-medium">
            ← חזרה לחשמלאים
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Profile Card */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-lg overflow-hidden"
            >
              {/* Hero Section */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${categoryColor} flex items-center justify-center shadow-2xl`}>
                  <IconComponent className="w-16 h-16 text-white" />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-medium">
                    {electrician.category}
                  </Badge>
                </div>
              </div>

              {/* Profile Info */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{electrician.name}</h1>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium text-gray-900">{electrician.rating}</span>
                        <span>({electrician.reviews} ביקורות)</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{electrician.experience}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <div className="text-3xl font-bold text-gray-900">₪{electrician.price}</div>
                    <div className="text-sm text-gray-500">לשעה</div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">אודות</h3>
                  <p className="text-gray-600 leading-relaxed">{electrician.bio}</p>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">טלפון</div>
                      <div className="font-medium text-gray-900">{electrician.phone}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">אזור שירות</div>
                      <div className="font-medium text-gray-900">{electrician.location}</div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">תעודות והסמכות</h3>
                  <div className="flex flex-wrap gap-2">
                    {electrician.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-amber-50 text-amber-700 border-amber-200">
                        <CheckCircle className="w-3 h-3 ml-1" />
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">זמינות</h3>
                  <div className="space-y-2">
                    {electrician.availability?.map((time, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        {time}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Link to={`/BookService?name=${encodeURIComponent(electrician.name)}&price=${electrician.price}&phone=${electrician.phone}&bio=${encodeURIComponent(electrician.category)}&id=${electrician.id}&category=${encodeURIComponent(electrician.category)}`}>
                    <Button className="flex-1 bg-gray-900 text-white hover:bg-gray-800 py-3 rounded-2xl">
                      הזמן שירות
                      <ArrowLeft className="w-5 h-5 mr-2" />
                    </Button>
                  </Link>
                  <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-2xl">
                    <MessageCircle className="w-5 h-5 ml-2" />
                    שלח הודעה
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">סטטיסטיקה</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">עבודות שהושלמו</span>
                  <span className="font-bold text-gray-900">{electrician.completedJobs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">דירוג</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-900">{electrician.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">ניסיון</span>
                  <span className="font-bold text-gray-900">{electrician.experience}</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-lg p-6"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4">פעולות מהירות</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Phone className="w-4 h-4 ml-2" />
                  התקשר עכשיו
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                  <MessageCircle className="w-4 h-4 ml-2" />
                  שלח הודעה
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50">
                  <Calendar className="w-4 h-4 ml-2" />
                  קבע פגישה
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
