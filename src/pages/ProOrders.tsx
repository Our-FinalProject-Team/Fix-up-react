import React, { useState, useEffect } from 'react';
import api from './api';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Calendar, MapPin } from 'lucide-react';

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
}, []); // סוגריים מרובעים ריקים אומרים שזה ירוץ פעם אחת בטעינה
  return (
    <div className="p-6 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-black mb-8">העבודות שלי (בטיפול/הושלמו)</h1>
      <div className="space-y-4">
        {jobs.length === 0 ? <p>עדיין לא אישרת אף עבודה.</p> : jobs.map((job: any) => (
          <Card key={job.id} className="p-5 rounded-3xl shadow-md border-0 bg-white">
            <div className="flex justify-between items-start">
              <div>
                <Badge className="bg-emerald-50 text-emerald-700 mb-2">{job.status}</Badge>
                <h3 className="font-bold text-xl">{job.subject}</h3>
                <p className="text-stone-500">לקוח: {job.clientName}</p>
              </div>
              <div className="text-left space-y-2 text-sm text-stone-500">
                <div className="flex items-center gap-2"><Calendar size={16}/> {new Date(job.scheduledDate).toLocaleDateString('he-IL')}</div>
                <div className="flex items-center gap-2"><MapPin size={16}/> {job.address}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}