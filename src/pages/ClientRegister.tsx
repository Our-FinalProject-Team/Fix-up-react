import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import api from "./api"; // ודאי שהנתיב נכון
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff, LucideIcon } from "lucide-react";

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

const InputField: React.FC<InputFieldProps> = ({ icon: Icon, label, type = "text", placeholder, value, onChange, name, showToggle, onToggle, isVisible }) => (
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
        className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none transition-all text-right"
      />
      {showToggle && (
        <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-600">
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

export default function ClientRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const registrationData = {
        clientInfo: {
          fullName: form.fullname,
          email: form.email,
          phoneNumber: form.phone,
          address: form.address,
        },
        password: form.password
      };

      await api.post("/Clients/register", registrationData);
      alert("לקוח נרשם בהצלחה!");
      navigate("/login");
    } catch (error: any) {
      alert("שגיאה ברישום: " + (error.response?.data || "בדקי חיבור לשרת"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-6 text-right" dir="rtl">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl border border-stone-100">
        <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">רישום לקוח חדש</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={User} label="שם מלא" name="fullname" value={form.fullname} onChange={handleChange} placeholder="ישראל ישראלי" />
          <InputField icon={Mail} label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} placeholder="example@mail.com" />
          <InputField icon={Phone} label="טלפון" name="phone" value={form.phone} onChange={handleChange} placeholder="050-0000000" />
          <InputField icon={MapPin} label="כתובת" name="address" value={form.address} onChange={handleChange} placeholder="עיר, רחוב" />
          <InputField 
            icon={Lock} label="סיסמה" name="password" 
            type={showPassword ? "text" : "password"} 
            value={form.password} onChange={handleChange} 
            showToggle onToggle={() => setShowPassword(!showPassword)} isVisible={showPassword} 
          />
          
          <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-amber-600 text-white rounded-2xl font-bold hover:bg-amber-700 transition-all disabled:opacity-50 mt-6">
            {isSubmitting ? "רושם אותך..." : "הרשמה כלקוח"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}