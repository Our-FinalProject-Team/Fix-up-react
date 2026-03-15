import  { useState, ChangeEvent, FormEvent,useRef } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { User, Mail, Lock, Phone, MapPin,   } from "lucide-react";
import { InputField } from "@/components/ui/InputField";
import { validateEmail, validatePassword, validatePhone } from "@/lib/Validation";
import { toast } from "@/components/ui/use-toast";
import api from "../api";

interface RegistrationForm {
  fullname: string;
  email: string;
  password: string;
  phone: string;
  address: string;
}

export default function ClientRegister() {
  const [form, setForm] = useState<RegistrationForm>({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
          !form.fullname ||
          !form.email ||
          !form.password ||
          !form.address ||
          !form.phone 
        ) {
          toast({
            title: "שגיאה ברישום",
            description: "כל השדות הם שדות חובה",
            variant: "destructive",
          });
          return;
        }

    setIsSubmitting(true);

    try {

       const registrationData = {     
          fullName: form.fullname,
          email: form.email,
          phoneNumber: form.phone,
          address: form.address,
          myRequests:[],
          password: form.password
      };
      


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

  await api.post("/Clients/register", registrationData);


    setError(""); 


     toast({
           title: "הרשמה הצליחה",
           description: "הרשמתך נקלטה בהצלחה!",
           variant: "default", 
            duration: 3000, // ההודעה תיעלם אוטומטית אחרי 3 שניות

         });

          setTimeout(() => {
      window.location.href = "/login"; 
      }, 8000);

    } catch (err: any) {
      console.error("Registration Error:", err.response?.data);

      // חילוץ הודעת השגיאה מהשרת בצורה חכמה
      let message = "אירעה שגיאה ברישום. בדקי שהשרת דלוק.";
      
      if (err.response?.data) {
        // אם השרת החזיר אובייקט שגיאות של ASP.NET
        if (typeof err.response.data === 'object') {
           message = err.response.data.title || JSON.stringify(err.response.data.errors) || "נתונים לא תקינים";
        } else {
           message = err.response.data; // אם זה רק מחרוזת טקסט
        }
      }

      setError(message); // שומרים רק מחרוזת (String) ב-State

      toast({
        title: "שגיאה ברישום",
        description: message,
        variant: "destructive",
      });     
    } finally {
      setIsSubmitting(false);
    }
  };

 return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg border border-stone-100">
        <h2 className="text-2xl font-bold text-stone-800 mb-6 text-center">רישום לקוח חדש</h2>
        
        {/* תצוגת הודעת השגיאה - מופיעה רק אם יש שגיאה */}
         {error && (
          <div className="text-red-500 text-sm bg-red-50 p-2 rounded border border-red-200 mt-2">
          <pre className="whitespace-pre-wrap break-all">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField icon={User} label="שם מלא" name="fullname" value={form.fullname} onChange={handleChange} placeholder="ישראל ישראלי" />
          
          {/* הוספנו את emailRef */}
          <InputField ref={emailRef} icon={Mail} label="אימייל" name="email" type="email" value={form.email} onChange={handleChange} placeholder="israel@gmail.com" />
          
          {/* הוספנו את phoneRef */}
          <InputField ref={phoneRef} icon={Phone} label="טלפון" name="phone" value={form.phone} onChange={handleChange} placeholder="050-0000000" />
          
          <InputField icon={MapPin} label="כתובת" name="address" value={form.address} onChange={handleChange} placeholder="עיר, רחוב" />
          
          {/* הוספנו את PasswordRef */}
          <InputField ref={PasswordRef} icon={Lock} label="סיסמה" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={handleChange} showToggle onToggle={() => setShowPassword(!showPassword)} isVisible={showPassword} />
          
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