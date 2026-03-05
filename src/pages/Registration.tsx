import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import { 
  User, Mail, Lock, Phone, Briefcase, MapPin,
  DollarSign, Eye, EyeOff, ArrowRight, LucideIcon 
} from "lucide-react";

// 1. הגדרת המבנה של הנתונים
interface RegistrationForm {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  basehourprice: string;
  address: string;
}

// 2. הגדרת הטיפוסים של רכיב הקלט (זה מה שפתר את השגיאות למטה)
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

// רכיב העזר לעיצוב השדות (חייב להופיע בקובץ!)
const InputField: React.FC<InputFieldProps> = ({ 
  icon: Icon, label, type = "text", placeholder, value, onChange, name, showToggle, onToggle, isVisible 
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-stone-600">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400">
        <Icon className="w-5 h-5" />
      </div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
      />
      {showToggle && (
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
        >
          {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  </div>
);

export default function Registration() {
  const [form, setForm] = useState<RegistrationForm>({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    specialty: "",
    basehourprice: "",
    address:"",
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
   const professionalData = {
  // השמות כאן חייבים להיות בדיוק כמו ב-Swagger (שימי לב לאותיות גדולות/קטנות)
  fullName: form.fullname,
  email: form.email,
  phoneNumber: form.phone, // שיניתי ל-phoneNumber כי זה מה שכתבת שמופיע בסווגר
  specialty: form.specialty,
  baseHourlyRate: Number(form.basehourprice),
  callOutFee: 150, 
  address: form.address,
  averageRating: 0, // שדות ברירת מחדל כדי שהשרת לא יתלונן
  totalReviews: 0

};

      const response = await axios.post(
       `https://localhost:7230/api/Professionals/register?password=${form.password}`,
        professionalData
      );

      alert("נרשמת בהצלחה!");
    } catch (error: any) {
      alert("שגיאה ברישום: " + (error.response?.data || "בדקי שהשרת דלוק"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="max-w-md w-full bg-white rounded-[32px] p-8 shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-8">Professional Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={User} label="Full Name" name="fullname" value={form.fullname} onChange={handleChange} />
          <InputField icon={Mail} label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
          <InputField 
            icon={Lock} label="Password" name="password" 
            type={showPassword ? "text" : "password"} 
            value={form.password} onChange={handleChange}
            showToggle onToggle={() => setShowPassword(!showPassword)} isVisible={showPassword}
          />
          <InputField
  icon={MapPin} // ודאי ש-MapPin מיובא מ-lucide-react למעלה
  label="Address"
  name="address"
  placeholder="Street, City"
  value={form.address}
  onChange={handleChange}
/>
          <InputField icon={Phone} label="Phone" name="phone" value={form.phone} onChange={handleChange} />
          <InputField icon={Briefcase} label="Specialty" name="specialty" value={form.specialty} onChange={handleChange} />
          <InputField icon={DollarSign} label="Price per Hour" name="basehourprice" type="number" value={form.basehourprice} onChange={handleChange} />
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Create Account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}