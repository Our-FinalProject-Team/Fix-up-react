import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "../api"; // ודאי שהנתיב לתיקיית ה-api נכון
import { Mail, Lock, Eye, EyeOff, LucideIcon } from "lucide-react";

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
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-stone-600 text-right">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
        <Icon size={18} />
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        dir="rtl"
        className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-right"
      />
      {showToggle && (
        <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

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

      alert("התחברת בהצלחה!");
      
      if (role === "Professional" || isPro) {
        navigate("/pro-dashboard");
      } else {
        navigate("/client-home");
      }

    } catch (error: any) {
      console.error(error);
      alert("שגיאה בהתחברות: " + (error.response?.data || "בדקי אימייל וסיסמה"));
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