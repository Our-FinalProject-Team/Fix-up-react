import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, ArrowRight } from "lucide-react";

export default function RegisterRole() {
  const navigate = useNavigate();

  const roles = [
    {
      id: "client",
      title: "אני לקוח",
      description: "מחפש איש מקצוע לתיקון או פרויקט בבית",
      icon: User,
      color: "from-amber-500 to-amber-600",
      path: "/ClientRegister", // הנתיב כפי שמופיע ב-App.tsx
    },
    {
      id: "pro",
      title: "אני בעל מקצוע",
      description: "רוצה להציע את השירותים שלי ולמצוא עבודה",
      icon: Briefcase,
      color: "from-emerald-500 to-emerald-600",
      path: "/Registration", // הנתיב כפי שמופיע ב-App.tsx
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-stone-50 to-emerald-50/30 flex items-center justify-center px-4 py-12">
      {/* רקע דקורטיבי עם אפקטים של טשטוש */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white shadow-xl mb-8"
          >
            <span className="text-emerald-600 font-bold text-2xl">FX</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-stone-800 tracking-tight"
          >
           איך תרצה להצטרף
          </motion.h1>
          <p className="text-stone-500 mt-4 text-lg">בחר את סוג החשבון שמתאים לך כדי להתחיל</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => navigate(role.path)} // שימוש ב-navigate של React Router
              className="cursor-pointer group relative bg-white/70 backdrop-blur-xl border border-white rounded-3xl p-8 shadow-xl shadow-stone-200/50 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${role.color} shadow-lg mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                <role.icon size={30} />
              </div>
              
              <h3 className="text-2xl font-bold text-stone-800 mb-3">{role.title}</h3>
              <p className="text-stone-500 leading-relaxed mb-8 h-12">
                {role.description}
              </p>
              
              <div className="flex items-center text-emerald-600 font-bold group-hover:gap-3 transition-all">
                בוא נתחיל <ArrowRight className="mr-2 w-5 h-5" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-stone-500"
        >
          כבר יש לך חשבון?{" "}
          <span 
            onClick={() => navigate("/LogIn")}
            className="text-emerald-600 font-bold cursor-pointer hover:underline"
          >
            היכנס כאן
          </span>
        </motion.p>
      </div>
    </div>
  );
}