
import { useState, ChangeEvent, FormEvent } from "react";
import api from "../api";  
import { Mail, Lock, ArrowRight, User, Briefcase } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { toast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function LogIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPro, setIsPro] = useState(true);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 // חפשי את פונקציית handleSubmit ותחליפי את החלק של ה-success בזה:
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  const controller = isPro ? "Professionals" : "Clients";
  const endpoint = `/${controller}/login`;
 try {
  const response = await api.post(endpoint, {
    email: form.email,
    password: form.password
  });

  console.log("Full Data:", response.data);

  // התיקון: אנחנו מחלצים את המשתמש מכל מקום אפשרי ב-Response
  const userData = response.data.user || response.data;
  
  // בדיקה קריטית: האם יש ID? אם לא, אולי הוא נקרא 'professionalId' או 'clientId'?
  const finalId = userData.id || userData.Id || userData.professionalId || userData.clientId;
  
  // אנחנו שומרים אובייקט נקי עם ה-ID שמצאנו
  const userToSave = {
    ...userData,
    id: finalId // מוודאים שיש שדה בשם id באותיות קטנות
  };

//   localStorage.setItem('user', JSON.stringify(userToSave));
//   localStorage.setItem('userRole', isPro ? 'professional' : 'client');

//   toast({ title: "התחברת בהצלחה!" });
//   navigate("/Profile");

// }// ... אחרי ששמרת ב-localStorage
  localStorage.setItem('user', JSON.stringify(userToSave));
  localStorage.setItem('userRole', isPro ? 'professional' : 'client');

  toast({ title: "התחברת בהצלחה!" });

  // פתרון: שימוש ב-window.location.href במקום navigate 
  // זה גורם ל"רענון" אוטומטי קטן בזמן המעבר ופותר את בעיית ה-ID
  window.location.href = '/Profile'; 
 }
catch (error) {
    toast({ variant: "destructive", title: "שגיאה בהתחברות", description: "בדוק את הפרטים" });
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-stone-100">
        <h2 className="text-3xl font-bold text-stone-800 text-center mb-8">התחברות</h2>

        <div className="flex bg-stone-100 p-1 rounded-2xl mb-8">
          <button type="button" onClick={() => setIsPro(true)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${isPro ? 'bg-white shadow-md text-emerald-600' : 'text-stone-500'}`}>
            <Briefcase size={16} /> בעל מקצוע
          </button>
          <button type="button" onClick={() => setIsPro(false)} className={`flex-1 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 ${!isPro ? 'bg-white shadow-md text-amber-600' : 'text-stone-500'}`}>
            <User size={16} /> לקוח
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField 
            icon={Mail} 
            label="אימייל" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            placeholder="name@example.com" 
          />
          <InputField 
            icon={Lock} 
            label="סיסמה" 
            name="password" 
            type={showPassword ? "text" : "password"} 
            value={form.password} 
            onChange={handleChange} 
            showToggle 
            onToggle={() => setShowPassword(!showPassword)} 
            isVisible={showPassword} 
          />

          <div className="text-left">
            <button 
              type="button"
              onClick={() => navigate("/ForgotPassword")}
              className="text-sm text-emerald-600 hover:underline cursor-pointer font-medium bg-transparent border-none p-0"
            >
              שכחת סיסמה?
            </button>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 flex items-center justify-center gap-2 transition-all">
            {isSubmitting ? "...מתחבר" : "כניסה למערכת"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}