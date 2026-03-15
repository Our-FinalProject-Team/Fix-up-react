import  { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api";  
import { Mail, Lock, Eye, EyeOff, LucideIcon } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { toast } from "@/components/ui/use-toast";


export default function LogIn() {
  const navigate = useNavigate();
  const [isPro, setIsPro] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const endpoint = isPro ? "/Professionals/login" : "/Clients/login";
      
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

    } catch (error: any) {
      console.error(error);
      const errorMessage = error.response?.data?.title || "אירעה שגיאה בחיבור";
      toast({
      title: "שגיאה בכניסה",
      description: errorMessage,
      variant: "destructive",
      duration: 3000, // ההודעה תיעלם אוטומטית אחרי 3 שניות
    });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-right" dir="rtl">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl">
        <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">התחברות</h2>
        
        <div className="flex bg-stone-100 p-1 rounded-2xl mb-8">
          <button onClick={() => setIsPro(true)} className={`flex-1 py-3 rounded-xl font-bold transition-all ${isPro ? 'bg-white shadow text-emerald-600' : 'text-stone-500'}`}>
            בעל מקצוע
          </button>
          <button onClick={() => setIsPro(false)} className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isPro ? 'bg-white shadow text-amber-600' : 'text-stone-500'}`}>
            לקוח
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField icon={Mail} label="אימייל" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
          <InputField 
            icon={Lock} label="סיסמה" name="password" 
            type={showPassword ? "text" : "password"} 
            value={form.password} onChange={handleChange}
            showToggle onToggle={() => setShowPassword(!showPassword)} isVisible={showPassword}
          />
          
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-stone-800 text-white rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-50">
            {isSubmitting ? "מתחבר..." : "כניסה למערכת"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}