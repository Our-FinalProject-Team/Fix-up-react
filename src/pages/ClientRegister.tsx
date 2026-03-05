import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff, ArrowRight, LucideIcon } from "lucide-react";

// רכיב שדה קלט (כמו בטופס הקודם שלך)
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
        className="w-full pl-12 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:border-emerald-500 outline-none transition-all"
      />
      {showToggle && (
        <button type="button" onClick={onToggle} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400">
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  </div>
);

export default function ClientRegister() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // שליחה ל-ClientsController לפי ה-Swagger שלך
      const response = await axios.post(
        `https://localhost:7230/api/Clients/register?password=${form.password}`,
        {
          fullName: form.fullname,
          email: form.email,
          phoneNumber: form.phone,
          address: form.address,
          myRequests: [] // השרת מצפה לרשימה, אנחנו שולחים ריק ברישום
        }
      );

      alert("נרשמת בהצלחה כלקוח!");
      window.location.href = "/login"; // העברה ללוגין
    } catch (error: any) {
      console.error(error);
      alert("שגיאה ברישום: " + (error.response?.data || "נסה שוב"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg border border-stone-100">
        <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">רישום לקוח חדש</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={User} label="שם מלא" name="fullname" value={form.fullname} onChange={handleChange} placeholder="ישראל ישראלי" />
          <InputField icon={Mail} label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} placeholder="israel@gmail.com" />
          <InputField icon={Phone} label="טלפון" name="phone" value={form.phone} onChange={handleChange} placeholder="050-0000000" />
          <InputField icon={MapPin} label="כתובת" name="address" value={form.address} onChange={handleChange} placeholder="עיר, רחוב" />
          <InputField icon={Lock} label="סיסמה" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} showToggle onToggle={() => setShowPassword(!showPassword)} isVisible={showPassword} />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "רושם אותך..." : "צור חשבון לקוח"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}