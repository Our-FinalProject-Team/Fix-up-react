import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, CreditCard, Calendar, MapPin, MessageSquare, Star, Clock, Phone, User } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import api from "./api";
import { toast } from "@/components/ui/use-toast";

export default function BookService() {
  const [searchParams] = useSearchParams();
  // השורה הזו שולפת את שם הקטגוריה מה-URL ומגדירה את המשתנה שחסר לך
  const categoryName = searchParams.get('category') || 'שירות כללי';

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // משיכת פרטים מהכתובת
  const proId = searchParams.get('id');
  const proName = searchParams.get('name') || "בעל מקצוע";
  const categoryId = searchParams.get('categoryId') || "1";

  // State לטופס
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [cardNumber, setCardNumber] = useState('');

 const handleSubmitOrder = async () => {
  setIsSubmitting(true);
  
  // משיכת הנתונים ששמרנו ב-Login
  const storedUser = localStorage.getItem('user');
  
  if (!storedUser) {
    toast({ title: "שגיאה", description: "עליך להתחבר כדי לבצע הזמנה", variant: "destructive" });
    navigate('/login');
    return;
  }

  const user = JSON.parse(storedUser);
  const clientId = user.id || user.Id; // תלוי איך ה-API שלך מחזיר את האותיות

  if (!clientId || clientId === 0) {
    alert("חלה שגיאה בזיהוי המשתמש. אנא נסה להתנתק ולהתחבר מחדש.");
    return;
  }

 // בתוך פונקציית handleSubmitOrder
const orderData = {
  ClientId: clientId,
  ProfessionalId: Number(proId),
  CategoryId: Number(categoryId),
  Address: address,
  ScheduledDate: new Date(`${bookingDate}T${bookingTime}`).toISOString(),
  Description: notes,
  // כאן השנוי: במקום proName, נשלח את הקטגוריה (השירות)
  Subject: categoryName // וודאי שמשתנה categoryName מכיל את המילה "אינסטלציה"
};
  try {
    // שליחה ל-RequestsController
    await api.post('/Requests', orderData);
    setStep(4); // מעבר למסך הצלחה
  } catch (error: any) {
    console.error("שגיאה בשמירה:", error);
    alert("הייתה שגיאה בביצוע ההזמנה: " + (error.response?.data?.message || "שרת לא זמין"));
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="bg-gray-50 pt-32 pb-20 px-6 text-center" dir="rtl" style={{ minHeight: '100vh' }}>
      <div className="max-w-xl mx-auto">
        
        {/* Professional Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg mb-8"
        >
          <div className="relative h-32 overflow-hidden flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-xl">
              <User className="w-8 h-8 text-white" />
            </div>
            <div className="absolute top-3 left-3">
              <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-medium">
                {categoryName}
              </Badge>
            </div>
          </div>
          
          <div className="p-6 text-right">
            <h3 className="font-bold text-gray-900 text-xl mb-2">{proName}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-gray-900">4.8</span>
                <span>(234)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>15 שנים</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* פסי התקדמות במרכז העמוד */}
        {step < 4 && (
          <div className="flex flex-col items-center mb-12">
            <div className="flex gap-3 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-2 w-16 rounded-full transition-all duration-500 ${s <= step ? 'bg-amber-500' : 'bg-gray-200'}`} />
              ))}
            </div>
            <button 
              onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)} 
              className="text-gray-400 hover:text-gray-600 flex items-center gap-2 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 rotate-180" /> חזרה לשלב הקודם
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* שלב 1: בחירת זמן */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-[3rem] p-10 shadow-xl border border-amber-100 text-right">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 rounded-2xl"><Calendar className="text-amber-600" /></div>
                <h2 className="text-3xl font-black">מתי נבוא?</h2>
              </div>
              <div className="space-y-4">
                <label className="block text-sm font-bold text-amber-700 mr-2">תאריך הגעה</label>
                <Input type="date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} className="h-16 rounded-2xl bg-amber-50 border-none text-lg" />
                <label className="block text-sm font-bold text-amber-700 mr-2">שעת הגעה מועדפת</label>
                <Input type="time" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} className="h-16 rounded-2xl bg-amber-50 border-none text-lg" />
                <Button onClick={() => setStep(2)} disabled={!bookingDate || !bookingTime} className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xl font-bold mt-4">המשך לפרטי כתובת</Button>
              </div>
            </motion.div>
          )}

          {/* שלב 2: פרטי הגעה */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-[3rem] p-10 shadow-xl border border-amber-100 text-right">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-amber-100 rounded-2xl"><MapPin className="text-amber-600" /></div>
                <h2 className="text-3xl font-black">לאן להגיע?</h2>
              </div>
              <div className="space-y-4">
                <Input placeholder="כתובת מלאה (עיר, רחוב, בית)" value={address} onChange={(e) => setAddress(e.target.value)} className="h-16 rounded-2xl bg-amber-50 border-none text-lg" />
                <div className="relative">
                   <MessageSquare className="absolute left-4 top-4 text-amber-400 w-5 h-5" />
                   <textarea placeholder="תארי בקצרה את הבעיה..." value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full h-32 p-4 rounded-2xl bg-amber-50 border-none resize-none text-lg outline-none focus:ring-2 ring-amber-200" />
                </div>
                <Button onClick={() => setStep(3)} disabled={!address} className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xl font-bold">המשך לתשלום</Button>
              </div>
            </motion.div>
          )}

          {/* שלב 3: תשלום ואשור */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="bg-white rounded-[3rem] p-10 shadow-xl border border-amber-100 text-right">
              <h2 className="text-3xl font-black mb-8">סיכום ותשלום</h2>
              <div className="bg-emerald-50 p-6 rounded-2xl mb-8 border border-emerald-100">
                <p className="text-emerald-800 font-bold text-lg mb-1">מזמינה את: {proName}</p>
                <p className="text-emerald-600">בתאריך {bookingDate} בשעה {bookingTime}</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <CreditCard className="absolute left-4 top-5 text-amber-500" />
                  <Input placeholder="מספר כרטיס אשראי" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="h-16 rounded-2xl bg-amber-50 border-none pl-12 text-lg" />
                </div>
                <Button onClick={handleSubmitOrder} disabled={isSubmitting || !cardNumber} className="w-full h-20 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-2xl font-black shadow-lg shadow-emerald-200">
                  {isSubmitting ? "שולח הזמנה..." : "אישור וביצוע הזמנה"}
                </Button>
              </div>
            </motion.div>
          )}

       
          {step === 4 && (
            <motion.div key="s4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[3.5rem] p-12 shadow-2xl border border-emerald-50">
              <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 mb-4">הצלחה!</h2>
              <p className="text-gray-500 text-xl mb-8">ההזמנה שלך נשלחה ל{proName} ומחכה לאישורו</p>
              
              <div className="bg-amber-50 rounded-3xl p-6 text-right mb-10 space-y-3">
                <p className="text-amber-700 text-sm">סיכום פרטים:</p>
                <p className="font-bold text-amber-900">📍 כתובת: {address}</p>
                <p className="font-bold text-amber-900">⏰ זמן: {bookingDate}, {bookingTime}</p>
              </div>

              <Button onClick={() => navigate('/')} className="w-full h-16 bg-amber-500 hover:bg-amber-600 text-white rounded-2xl text-xl font-bold">חזרה לדף הבית</Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}