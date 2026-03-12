import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CheckCircle, Clock, Calendar as CalendarIcon, Power, Settings } from 'lucide-react';
import Calendar from 'react-calendar'; // ייבוא לוח השנה
import 'react-calendar/dist/Calendar.css'; // עיצוב בסיסי

export default function ProDashboard() {
  const [availableRequests, setAvailableRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(true); // מצב זמינות רגעית
  const [selectedDate, setSelectedDate] = useState(new Date());

  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const profId = user.id;

  // --- לוגיקה קיימת של שליפת בקשות ---
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`https://localhost:7230/api/Requests/available/${profId}`);
        setAvailableRequests(response.data);
      } catch (error) {
        console.error("שגיאה בטעינת בקשות", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [profId]);

  // --- פונקציה לעדכון סטטוס זמינות (Online/Offline) ---
  const toggleAvailability = () => {
    setIsOnline(!isOnline);
    // כאן כדאי להוסיף Axios.put לשרת כדי לעדכן את הסטטוס ב-DB
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans" dir="rtl">
      
      {/* Header עם כפתור זמינות מהירה */}
      <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <div>
          <h2 className="text-2xl font-bold text-stone-800">שלום, {user.full_name || "בעל מקצוע"}</h2>
          <p className="text-stone-500 text-sm">ניהול זמינות ובקשות עבודה</p>
        </div>
        
        <button 
          onClick={toggleAvailability}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            isOnline ? 'bg-green-100 text-green-700 border-2 border-green-200' : 'bg-red-100 text-red-700 border-2 border-red-200'
          }`}
        >
          <Power size={20} />
          {isOnline ? "אני זמין לעבודה" : "אני בהפסקה"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* צד ימין: לוח שנה והגדרות שעות */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="font-bold mb-4 flex items-center gap-2"><CalendarIcon size={18}/> יומן נוכחות</h3>
            <div className="calendar-container">
               <Calendar 
                    // אנחנו בודקים שהערך שהגיע הוא אכן תאריך בודד ולא null או מערך
                    onChange={(value) => {
                      if (value instanceof Date) {
                        setSelectedDate(value);
                      }
                    }} 
                    value={selectedDate}
                    className="rounded-lg border-none w-full"
               />
            </div>
            <div className="mt-4 p-3 bg-stone-50 rounded-lg text-xs text-stone-500">
              נבחר תאריך: {selectedDate.toLocaleDateString('he-IL')}
              <button className="block mt-2 text-blue-600 font-bold">סמן כיום חופש</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Settings size={18}/> שעות פעילות רגילות</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span>א' - ה'</span>
                <span className="font-medium">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span>יום ו'</span>
                <span className="font-medium">08:00 - 13:00</span>
              </div>
              <button className="w-full mt-4 py-2 border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50">ערוך שעות</button>
            </div>
          </div>
        </div>

        {/* צד שמאל: רשימת בקשות (הקוד המקורי שלך) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-xl font-bold text-stone-700 mb-2">בקשות פתוחות באזורך</h3>
          {availableRequests.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl text-center border-2 border-dashed border-stone-200">
              <p className="text-stone-400">אין כרגע בקשות חדשות בתחום שלך.</p>
            </div>
          ) : (
            availableRequests.map((req: any) => (
              <div key={req.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex justify-between items-center hover:border-emerald-200 transition-all">
                {/* תוכן הבקשה... (כמו בקוד שלך) */}
                <div>
                  <h3 className="font-bold text-lg text-emerald-700">{req.subject}</h3>
                  <p className="text-stone-600 mt-1">{req.description}</p>
                  <div className="flex gap-4 mt-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1"><Clock size={14}/> {new Date(req.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {/* handleAccept */}}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 flex items-center gap-2"
                >
                  אישור עבודה
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
