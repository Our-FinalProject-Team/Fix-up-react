import { useState, ChangeEvent, FormEvent,useRef } from "react";
import axios from 'axios';
import { motion } from "framer-motion";
import { 
  User, Mail, Lock, Phone, Briefcase, MapPin,
  DollarSign, 
  
} from "lucide-react";
import { validateEmail, validatePassword, validatePhone } from "@/lib/Validation";
import { toast } from "@/components/ui/use-toast";
import { InputField } from "@/components/ui/InputField";
import api from "../api";

const SPECIALTY_OPTIONS = [
  "אינסטלטור",
  "חשמלאי",
  "טכנאי מזגנים",
  "שיפוצניק/קבלן בניה",
  "צבעי",
  "מנעולן",
  "ניקיון",
  "איש תחזוקה/הידמן",
  "רצף/מתקין חיפויים",
  "גנן",
  "טכנאי מוצרי חשמל",
  "מתקין מערכות אבטחה"
];

interface RegistrationForm {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  specialty: string;
  basehourprice: string;
  address: string;
}

export interface Professional {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    specialty: string;      // תחום התמחות (חשמל, אינסטלציה וכו')
    averageRating: number;
    totalReviews: number;
    baseHourlyRate: number; // מחיר לשעה
    callOutFee: number;     // מחיר הגעה
    password: string;       // שים לב: בדרך כלל ב-Client Side נשתמש בשדה זה רק בזמן הרשמה
}

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
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // בדיקה שכל השדות מלאים
    if (
      !form.fullname ||
      !form.email ||
      !form.password ||
      !form.address ||
      !form.phone ||
      !form.specialty ||
      !form.basehourprice
    ) {
      toast({
        title: "שגיאה ברישום",
        description: "כל השדות הם שדות חובה",
        variant: "destructive",
      });
      return;
    }


    if (!validateEmail(form.email)) {
    setError("המייל לא תקין");
    emailRef.current?.focus();
    return;
  }

   if (!validatePhone(form.phone)) {
    setError("מספר הטלפון לא תקין");
    phoneRef.current?.focus();
    return;
  }

  if (!validatePassword(form.password)) {
    setError("סיסמה חלשה מדי");
    PasswordRef.current?.focus();
    return;
  }

    setIsSubmitting(true);
     
    try {
      const requestData = {
      id: 0, 
      fullName: form.fullname,
      email: form.email,
      PhoneNumber: form.phone.replace(/\D/g, ""), 
      address: form.address,
      specialty: form.specialty,
      baseHourlyRate: Number(form.basehourprice),
      averageRating: 0,
      totalReviews: 0,
      callOutFee: 500,
      password: form.password 
    };
       
     await api.post('/Professionals/register', requestData);


    setError(""); // מאפס שגיאה אם הכל בסדר

        // toast הצלחה
    toast({
      title: "הרשמה הצליחה",
      description: "הרשמתך נקלטה בהצלחה!",
      variant: "default", // ירוק/ברירת מחדל
    });

    
    setTimeout(() => {
        window.location.href = "/logIn"; // הפניה לדף הבית
      }, 5000);

  
    } 
    catch (error: any) {
        console.log(error.response.data);

     toast({
      title: "שגיאה ברישום",
      description: error.response?.data,
      variant: "destructive",
     duration: 3000, // ההודעה תיעלם אוטומטית אחרי 3 שניות

    });
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
      <h2 className="text-2xl font-bold text-center mb-8 text-stone-800">
        רישום בעל מקצוע
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <InputField
          icon={User}
          label="שם מלא"
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          placeholder="ישראל ישראלי"
        />

        <InputField
          ref={emailRef}
          icon={Mail}
          label="אימייל"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="israel@example.com"
        />

        <InputField
          ref={PasswordRef}
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

        <InputField
          icon={MapPin}
          label="כתובת"
          name="address"
          placeholder="עיר, רחוב"
          value={form.address}
          onChange={handleChange}
        />

        <InputField
          ref={phoneRef}
          icon={Phone}
          label="טלפון"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="050-0000000"
        />

         <div className="space-y-2 text-right" dir="rtl">
            <label className="block text-sm font-medium text-stone-600">
            תחום התמחות
          </label>

          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 text-right">
              <Briefcase className="w-5 h-5" />
            </div>

            <select
              name="specialty"
              value={form.specialty}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:border-emerald-500 outline-none transition-all appearance-none text-stone-700"
            >
              <option value="" >בחר תחום...</option>
              {SPECIALTY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <InputField
          icon={DollarSign}
          label="מחיר לשעה"
          name="basehourprice"
          type="number"
          value={form.basehourprice}
          onChange={handleChange}
        />

        {error && (
        <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200 mt-2">
          <pre className="whitespace-pre-wrap break-all">
           {typeof error === 'string' ? error : JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 mt-4"
        >
          {isSubmitting ? "שומר נתונים..." : "צור חשבון בעל מקצוע"}
        </button>

      </form>
    </motion.div>
  </div>
);
}
