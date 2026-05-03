import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, MessageSquare, CheckCircle, ChevronLeft, Zap } from 'lucide-react';
import { HubConnectionBuilder } from '@microsoft/signalr';

// הגדרת טיפוס עבור שלב
interface Step {
  id: number;
  label: string;
  sub: string;
}

// הגדרת טיפוס עבור נתוני המשימה
interface MissionData {
  title: string;
  pay: string;
  client: string;
  clientInitials: string;
  address: string;
  description: string;
}

const steps: Step[] = [
  { id: 0, label: 'בדרך', sub: 'בדרך למיקום הלקוח' },
  { id: 1, label: 'הגעתי', sub: 'אשר הגעה עם הלקוח' },
  { id: 2, label: 'עבודה בתהליך', sub: 'השירות בביצוע' },
  { id: 3, label: 'הושלם', sub: 'המשימה הסתיימה בהצלחה' },
];

const MOCK_MISSION: MissionData = {
  title: 'תיקון לוח חשמל',
  pay: '₪650',
  client: 'אחמד כ.',
  clientInitials: 'אכ',
  address: 'רחוב האלון 14, מרכז העיר',
  description: 'ללקוח יש בעיה בלוח החשמל הראשי — כמה מפסקים לא עובדים.',
};
// בתוך הקומפוננטה של ה-Inbox/Dashboard

export default function ActiveMission(): React.JSX.Element {

  const [accepted, setAccepted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);

  //const professionalCategory = 8;
  
  const advanceStep = (): void => {
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
    }
  };

  

  // תצוגת "קבלת משימה" (לפני שהתחיל לעבוד)
  if (!accepted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-900 rounded-2xl border border-orange-500/40 p-6 space-y-5"
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
            <Zap className="w-5 h-5 text-orange-400" />
          </div>
          <div>
            <p className="text-xs font-bold text-orange-400 tracking-wider">משימה חדשה הוקצתה</p>
            <h2 className="text-xl font-bold text-white">{MOCK_MISSION.title}</h2>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white shrink-0">
              {MOCK_MISSION.clientInitials}
            </div>
            <div>
              <p className="font-semibold text-white">{MOCK_MISSION.client}</p>
              <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                <MapPin className="w-3 h-3" />
                <span>{MOCK_MISSION.address}</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-400 border-t border-gray-700 pt-3">{MOCK_MISSION.description}</p>
          <div className="flex items-center justify-between pt-1">
            <span className="text-gray-500 text-sm">תשלום משוער</span>
            <span className="text-green-400 font-bold text-lg">{MOCK_MISSION.pay}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <button className="flex-1 py-3 rounded-xl border border-gray-700 text-gray-400 font-semibold hover:border-gray-600 hover:text-gray-300 transition-colors text-sm">
            דחה
          </button>
          <button
            onClick={() => setAccepted(true)}
            className="flex-1 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold transition-colors shadow-lg shadow-orange-500/30 text-sm flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" /> קבל משימה
          </button>
        </div>
      </motion.div>
    );
  }

  // תצוגת משימה פעילה (לאחר קבלה)
  return (
    <div className="space-y-5">
      <div className="bg-gray-900 rounded-2xl border border-orange-500/30 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold text-orange-400 tracking-wider">משימה פעילה</span>
            <h2 className="text-xl font-bold text-white mt-0.5">{MOCK_MISSION.title}</h2>
          </div>
          <div className="text-left">
            <p className="text-green-400 font-bold text-lg">{MOCK_MISSION.pay}</p>
            <p className="text-gray-500 text-xs">תשלום משוער</p>
          </div>
        </div>

        {/* פרטי לקוח */}
        <div className="bg-gray-800 rounded-xl p-4 flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white shrink-0">
            {MOCK_MISSION.clientInitials}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white">{MOCK_MISSION.client}</p>
            <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
              <MapPin className="w-3 h-3" />
              <span>{MOCK_MISSION.address}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-9 h-9 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
              <Phone className="w-4 h-4 text-gray-300" />
            </button>
            <button className="w-9 h-9 rounded-xl bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors">
              <MessageSquare className="w-4 h-4 text-gray-300" />
            </button>
          </div>
        </div>

        {/* התקדמות שלבים */}
        <div className="space-y-3 mb-5">
          {steps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            return (
              <div key={step.id} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                  done ? 'bg-orange-500' : active ? 'bg-orange-500/20 border-2 border-orange-500' : 'bg-gray-800 border border-gray-700'
                }`}>
                  {done
                    ? <CheckCircle className="w-4 h-4 text-white" />
                    : <span className={`text-xs font-bold ${active ? 'text-orange-400' : 'text-gray-600'}`}>{i + 1}</span>
                  }
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold ${done ? 'text-gray-400 line-through' : active ? 'text-white' : 'text-gray-600'}`}>
                    {step.label}
                  </p>
                  {active && <p className="text-xs text-orange-400 mt-0.5">{step.sub}</p>}
                </div>
                {active && (
                  <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                    נוכחי
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* כפתור לקידום שלב */}
        <AnimatePresence mode="wait">
          {currentStep < 3 ? (
            <motion.button
              key="advance"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              onClick={advanceStep}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-orange-500/30"
            >
              {currentStep === 2
                ? <><CheckCircle className="w-4 h-4" /> סמן כהושלם</>
                : <>{steps[currentStep + 1]?.label} <ChevronLeft className="w-4 h-4" /></>
              }
            </motion.button>
          ) : (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 py-3 bg-green-500/10 border border-green-500/30 rounded-xl"
            >
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">המשימה הושלמה!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}