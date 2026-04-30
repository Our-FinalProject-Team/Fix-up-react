import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from './api';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin, User, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ProOrders() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchJobs = async () => {
    try {
      setLoading(true);
      // שליפה מהירה של המשתמש מהזיכרון
      const userData = localStorage.getItem('user');
      if (!userData) {
        console.error("לא נמצא משתמש מחובר");
        return;
      }
      
      const user = JSON.parse(userData);
      // בדיקה של כל האופציות ל-ID (אות גדולה או קטנה)
      const proId = user.id || user.Id;

      if (!proId) {
        console.error("לא נמצא מזהה (ID) עבור בעל המקצוע");
        return;
      }

      console.log("שולח בקשה עבור ID:", proId);

      // הקריאה לשרת
      // מביא את העבודות שחיים כבר אישר (סטטוס "בטיפול")
      const response = await api.get(`/Requests/my-jobs/${proId}`);
      setJobs(response.data);
    } catch (err) {
      console.error("שגיאה בטעינת עבודות:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchJobs();
}, []);

  if (loading) return (
    <div className="bg-gray-50 flex flex-col items-center justify-center p-6" dir="rtl" style={{ minHeight: '100vh' }}>
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold text-gray-700">טוען עבודות...</h2>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6" dir="rtl" style={{ minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">העבודות שלי</h1>
          <p className="text-gray-500 font-medium">כל העבודות שאישרת ונמצאות בטיפול</p>
        </header>

        <AnimatePresence mode="popLayout">
          {jobs.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-16 rounded-[3rem] shadow-sm text-center border border-gray-200">
              <AlertCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">אין לך עבודות פעילות</h2>
              <p className="text-gray-500 mb-8">עדיין לא אישרת אף עבודה</p>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job: any, index: number) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Header with status */}
                    <div className="relative h-32 overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
                      <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-medium">
                          {job.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-xl mb-2">{job.subject}</h3>
                      <p className="text-gray-600 mb-4">לקוח: {job.clientName}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>תאריך ביקור: {new Date(job.scheduledDate).toLocaleDateString('he-IL')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>כתובת: {job.address}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                          <span className="text-sm font-medium text-gray-700">
                            {job.status === 'בטיפול' ? 'עבודה פעילה' : 'הושלמה'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <button className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors">
                            צ'אט לקוח →
                          </button>
                          <button className="text-gray-600 hover:text-gray-700 font-medium text-sm transition-colors">
                            פרטים →
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}