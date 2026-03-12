import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "./api"; // הנחה שזה באותה תיקייה, אם לא שנה ל: ../pages/api
import { 
  User, Mail, Lock, Phone, Briefcase, MapPin,
  DollarSign, Eye, EyeOff, LucideIcon 
} from "lucide-react";

interface RegistrationForm {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  basehourprice: string;
  address: string;
}

interface InputFieldProps {
  icon: LucideIcon;
  label: string;
  name: string;
  value: string | number;
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
    <label className="block text-sm font-medium text-stone-600">{label}</label>
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
        className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-right"
      />
      {showToggle && (
        <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-emerald-600">
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

export default function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<RegistrationForm>({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    specialty: "",
    basehourprice: "",
    address: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestData = {
        professionalInfo: {
          fullName: form.fullname,
          email: form.email,
          phoneNumber: form.phone,
          specialty: form.specialty,
          baseHourlyRate: Number(form.basehourprice),
          address: form.address,
        },
        password: form.password
      };

      await api.post('/Professionals/register', requestData);
      alert("נרשמת בהצלחה! מעביר אותך להתחברות...");
      navigate("/login");
    } catch (error: any) {
      alert("שגיאה: " + (error.response?.data || "בדקי חיבור לשרת"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-right" dir="rtl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-stone-100">
        <h2 className="text-3xl font-bold text-stone-800 mb-8 text-center">רישום בעל מקצוע</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={User} label="שם מלא" name="fullname" value={form.fullname} onChange={handleChange} />
          <InputField icon={Mail} label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} />
          <InputField 
            icon={Lock} label="סיסמה" name="password" 
            type={showPassword ? "text" : "password"} 
            value={form.password} onChange={handleChange}
            showToggle onToggle={() => setShowPassword(!showPassword)} isVisible={showPassword}
          />
          <InputField icon={MapPin} label="כתובת" name="address" value={form.address} onChange={handleChange} />
          <InputField icon={Phone} label="טלפון" name="phone" value={form.phone} onChange={handleChange} />
          <InputField icon={Briefcase} label="התמחות" name="specialty" value={form.specialty} onChange={handleChange} />
          <InputField icon={DollarSign} label="מחיר לשעה" name="basehourprice" type="number" value={form.basehourprice} onChange={handleChange} />
          
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 mt-6">
            {isSubmitting ? "רושם אותך..." : "סיום הרשמה"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}