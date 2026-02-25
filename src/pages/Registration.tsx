import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { 
  User, Mail, Lock, Phone, MapPin, Briefcase, 
  DollarSign, Eye, EyeOff, ArrowRight, LucideIcon 
} from "lucide-react";

// הגדרת טיפוסים עבור ה-Props של InputField
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
}) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <label className="block text-sm font-medium text-stone-600 tracking-wide">
        {label}
      </label>
      <div className="relative">
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-300 ${
          focused ? "text-emerald-600" : "text-stone-400"
        }`}>
          <Icon className="w-[18px] h-[18px]" />
        </div>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full pl-12 ${showToggle ? 'pr-12' : 'pr-4'} py-4 bg-stone-50/60 border-2 rounded-2xl text-stone-800 placeholder:text-stone-400 text-[15px] outline-none transition-all duration-300 ${
            focused
              ? "border-emerald-500 bg-white shadow-[0_0_0_4px_rgba(16,185,129,0.08)]"
              : "border-stone-200 hover:border-stone-300"
          }`}
        />
        {showToggle && onToggle && (
          <button
            type="button"
            onClick={onToggle}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
          >
            {isVisible ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

// הגדרת מבנה הנתונים של הטופס
interface RegistrationForm {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  specialty: string;
  basehourprice: string;
}

export default function Registration() {
  const [form, setForm] = useState<RegistrationForm>({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    specialty: "",
    basehourprice: "",
  });
  
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // טיפול בשינויים בטופס עם Type Safety
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-amber-50/40 to-emerald-50/30 flex items-center justify-center px-4 py-12">
      {/* Decorative blurs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg relative"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25 mb-6"
          >
            <span className="text-white font-bold text-xl tracking-tight">FX</span>
          </motion.div>
          <h1 className="text-3xl font-bold text-stone-800 tracking-tight">Join FIXUP</h1>
          <p className="mt-2 text-stone-500 text-[15px]">Create your professional account</p>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-stone-200/60 rounded-3xl p-8 md:p-10 shadow-xl shadow-stone-900/[0.03]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              icon={User}
              label="Full Name"
              name="fullname"
              placeholder="John Doe"
              value={form.fullname}
              onChange={handleChange}
            />

            <InputField
              icon={Mail}
              label="Email Address"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={form.email}
              onChange={handleChange}
            />

            <InputField
              icon={Lock}
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password"
              value={form.password}
              onChange={handleChange}
              showToggle
              onToggle={() => setShowPassword(!showPassword)}
              isVisible={showPassword}
            />

            <InputField
              icon={Phone}
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={handleChange}
            />

            <InputField
              icon={MapPin}
              label="Address"
              name="address"
              placeholder="123 Main St, City"
              value={form.address}
              onChange={handleChange}
            />

            <InputField
              icon={Briefcase}
              label="Specialty"
              name="specialty"
              placeholder="e.g. Plumbing, Electrical, HVAC"
              value={form.specialty}
              onChange={handleChange}
            />

            <InputField
              icon={DollarSign}
              label="Base Hour Price"
              name="basehourprice"
              type="number"
              placeholder="75.00"
              value={form.basehourprice}
              onChange={handleChange}
            />

            <div className="pt-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-4 px-6 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-[15px] rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/25 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}