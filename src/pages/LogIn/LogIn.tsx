
import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, ArrowRight, LucideIcon, User, Briefcase } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom"; // ייבוא תקין של הניווט

interface InputFieldProps {
  icon: LucideIcon;
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  showToggle?: boolean;
  onToggle?: () => void;
  isVisible?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({ 
  icon: Icon, label, type = "text", placeholder, value, onChange, name, showToggle, onToggle, isVisible 
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
      <label className="block text-sm font-medium text-stone-600">{label}</label>
      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 ${focused ? "text-emerald-500" : "text-stone-400"}`}>
          <Icon size={18} />
        </div>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-emerald-500 focus:bg-white transition-all"
        />
        {showToggle && (
          <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
            {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

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
    const url = `https://localhost:7230/api/${controller}/login?email=${form.email}&password=${form.password}`;

    try {
      const response = await axios.post(url);
      localStorage.setItem("user", JSON.stringify(response.data));
      localStorage.setItem("userType", isPro ? "pro" : "client");
      
      alert(`שלום, ${response.data.fullName || "משתמש"}!`);
      // הניווט שחיכית לו:
      navigate(from); 

      //navigate("/Home"); 
      
    } catch (error: any) {
      alert("התחברות נכשלה: בדקי את המייל והסיסמה");
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
          <button></button>
        </form>
      </div>
    </div>
  );
}