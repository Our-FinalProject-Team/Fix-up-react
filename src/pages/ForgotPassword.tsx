import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Mail, Lock, ArrowRight, User, Briefcase } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPro, setIsPro] = useState(true);
  const [loading, setLoading] = useState(false);
const handleReset = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const controller = isPro ? "Professionals" : "Clients";
  const url = `https://localhost:7230/api/${controller}/reset-password`;

  try {
    // שליחת null כגוף ההודעה ופרמטרים ב-Config
    await axios.put(url, null, { 
      params: { 
        email: email, 
        newPassword: newPassword 
      } 
    });

    alert("הסיסמה עודכנה בהצלחה!");
    window.location.hash = "#/LogIn";
    window.location.reload();
  } catch (error: any) {
    // אם יש שגיאה ב-C#, לפחות נראה אותה ב-Alert ולא הכפתור סתם "לא יילחץ"
    alert("שגיאה מהשרת: " + (error.response?.data || "השרת לא זמין, בדקי את ה-Visual Studio"));
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-stone-100">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-6">איפוס סיסמה</h2>
        
        {/* בחירה: של מי הסיסמה? */}
        <div className="flex bg-stone-100 p-1 rounded-2xl mb-8">
          <button onClick={() => setIsPro(true)} className={`flex-1 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${isPro ? 'bg-white shadow text-emerald-600' : 'text-stone-500'}`}>
            <Briefcase size={16} /> בעל מקצוע
          </button>
          <button onClick={() => setIsPro(false)} className={`flex-1 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${!isPro ? 'bg-white shadow text-amber-600' : 'text-stone-500'}`}>
            <User size={16} /> לקוח
          </button>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">אימייל של החשבון</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-stone-400" size={18} />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-emerald-500" placeholder="your@email.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">סיסמה חדשה</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-stone-400" size={18} />
              <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-emerald-500" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
            {loading ? "מעדכן..." : "עדכן סיסמה"} <ArrowRight size={18} />
          </button>
          
          <div className="text-center">
            <span onClick={() => window.location.hash = "#/LogIn"} className="text-sm text-stone-400 cursor-pointer hover:underline">חזרה להתחברות</span>
          </div>
        </form>
      </div>
    </div>
  );
}