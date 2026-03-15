
import  { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import api from "../api";  
import { Mail, Lock, Eye, EyeOff, ArrowRight, LucideIcon, User, Briefcase } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { toast } from "@/components/ui/use-toast";
import { useLocation, useNavigate } from "react-router-dom"; // ייבוא תקין של הניווט


export default function LogIn() {
  const navigate = useNavigate(); // שימוש ב-Hook של React Router
  const location = useLocation(); // חילוץ המיקום הנוכחי
  const from = location.state?.from || "/Home";
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPro, setIsPro] = useState(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const controller = isPro ? "Professionals" : "Clients";
    const endpoint = `/${controller}/login`;
    try
    {
      
      const response = await api.post(endpoint, {
        email: form.email,
        password: form.password
      });

      const { token, role } = response.data;
      localStorage.setItem("userToken", token);
      localStorage.setItem("userRole", role);

       toast({
                 title: "נכנסת בהצלחה",
                 description: "ברוך הבא",
                 className: "bg-emerald-600 text-white border-none shadow-2xl font-bold p-6",
               });
      
      if (role === "Professional" || isPro) {
        navigate("/ProDashBoard");
      } else {
        
        navigate("/Profile");
      }
    }     
    catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.title || "אירעה שגיאה בחיבור";
      toast({
      title: "שגיאה בכניסה",
      description: errorMessage,
      variant: "destructive",
      duration: 3000, // ההודעה תיעלם אוטומטית אחרי 3 שניות
    });   
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
          <InputField icon={Mail} label="אימייל" name="email" value={form.email} onChange={handleChange} placeholder="name@example.com" />
          <InputField icon={Lock} label="סיסמה" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} showToggle onToggle={() => setShowPassword(!showPassword)} isVisible={showPassword} />

          <div className="text-left">
            <button 
              type="button"
              onClick={() => navigate("/ForgotPassword")} // ניווט בטוח
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
}