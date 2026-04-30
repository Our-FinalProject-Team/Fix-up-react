

import api from "@/pages/api";
import { Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

// 1. הוספת ממשק ל-Props
interface InboxEntry {
  id: number;
  subject: string;
  client: string;
  clientInitials: string;
  conversationId: string;
  date: string;
  preview: string;
  budget: string;
  status?: 'בביצוע' | 'מתוכנן' | 'הושלם' | 'סגור';
}

interface Message {
  from: 'client' | 'me';
  text: string;
  time: string;
}

type TabId = 'new' | 'active' | 'closed';

interface TabConfig {
  id: TabId;
  label: string;
  activeBg: string;
}

// // --- Data ---

const statusColor: Record<string, string> = {
  'בביצוע': 'bg-green-500/20 text-green-400 border border-green-500/30',
  'מתוכנן': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  'הושלם': 'bg-gray-700 text-gray-400',
  'סגור': 'bg-gray-800 text-gray-500',
};

// --- Components ---

interface ChatModalProps {
  item: InboxEntry;
  onClose: () => void;
}

const inboxData: Record<TabId, InboxEntry[]> = {
  new: [
  ],
  active: [
   
  ],
  closed: [
  ]
};

const tabs: TabConfig[] = [
  { id: 'new', label: 'חדש', activeBg: 'bg-orange-500' },
  { id: 'active', label: 'פעיל', activeBg: 'bg-green-500' },
  { id: 'closed', label: 'סגור', activeBg: 'bg-gray-600' },
];
interface InboxPanelProps {
  incomingJobs?: any[]; // המשימות שמגיעות מה-Dashboard
  professionalCategory: number; // הוסיפי את השורה הזו
}

// 2. עדכון הפונקציה לקבלת ה-Props
export default function InboxPanel({ incomingJobs = [], professionalCategory }: InboxPanelProps) {
    const [activeTab, setActiveTab] = useState<TabId>('new');
  
  // 3. הפיכת הנתונים ל-State כדי שנוכל להוסיף להם הודעות בזמן אמת
  const [localInboxData, setLocalInboxData] = useState<Record<TabId, InboxEntry[]>>({
    new: [],
    active: [
      // אפשר להשאיר כאן נתוני דוגמה אם רוצים
    ],
    closed: []
  });

useEffect(() => {
  const loadHistory = async () => {
    try {
      const response = await api.get(`/Message/category/${professionalCategory}`);
      const historyData = await response.data;
      
      // מיפוי הנתונים מהשרת למבנה של ה-UI
      const formattedHistory = historyData.map((job: any) => ({
        id: job.messageId || job.id,
        subject: "פנייה מהמערכת",
        client: job.senderName || job.customerName || "לקוח",
        clientInitials: (job.senderName || "ל").substring(0, 2),
        date: job.createdAt || "הודעה ישנה",
        preview: job.content || job.text,
        budget: "₪ מחכה להצעה",
        status: 'בביצוע',
        conversationId: job.conversationId
      }));

      setLocalInboxData(prev => ({
        ...prev,
        new: formattedHistory
      }));
    } catch (err) {
      console.error("Failed to load history:", err);
    }
  };

  if (professionalCategory) {
    loadHistory();
  }
}, [professionalCategory]);
  // 4. האזנה לשינויים ב-incomingJobs מה-Dashboard
useEffect(() => {
  if (incomingJobs.length > 0) {
    // לוקחים את המשימה האחרונה שהגיעה
    const lastJob = incomingJobs[incomingJobs.length - 1];

    setLocalInboxData(prev => {
      // בדיקה אם המשימה כבר קיימת כדי למנוע כפילויות
      const exists = prev.new.some(item => item.id === lastJob.messageId);
      if (exists) return prev;

      const newEntry: InboxEntry = {
        id: lastJob.messageId || Date.now(),
        subject: "פנייה חדשה מהמערכת",
        client: lastJob.senderName || "לקוח חדש",
        clientInitials: (lastJob.senderName || "ל").substring(0, 2),
        date: "היום",
        preview: lastJob.content || lastJob.text,
        budget: "₪ מחכה להצעה",
        status: 'בביצוע',
        conversationId: lastJob.conversationId
      };
      console.log(newEntry);
      console.log("the incoming messages are",incomingJobs);
      

      return {
        ...prev,
        new: [newEntry, ...prev.new]
      };
    });
  }
}, [incomingJobs]);


      
      // עדכון ה-State המקומי של התיבה
      
  // שימוש בנתונים המקומיים במקום ב-Constants
  const items = localInboxData[activeTab] || [];

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 flex flex-col h-full min-h-0" dir="rtl">
      <div className="p-5 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-2 mb-4">
          <Wrench className="w-5 h-5 text-orange-400" />
          <h2 className="font-bold text-white text-lg">תיבת דואר נכנס</h2>
        </div>
       <div className="flex-1 overflow-y-auto p-4 space-y-3">
  {/* בדיקה אם יש פריטים להציג */}
  {items.length === 0 ? (
    <div className="text-center py-10 text-gray-500 text-sm">אין הודעות חדשות</div>
  ) : (
    /* מעבר על כל הפריטים במערך והצגתם */
    items.map((item) => (
      <div 
        key={item.id} 
        className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 transition-all hover:border-orange-500/50"
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
              {item.clientInitials}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{item.client}</h3>
              <p className="text-gray-500 text-[10px]">{item.date}</p>
            </div>
          </div>
          <span className="text-orange-400 text-xs font-bold">{item.budget}</span>
        </div>
        
        <p className="text-gray-300 text-xs line-clamp-2 mb-3">
          {item.preview}
        </p>

        <button 
         onClick={() => window.location.href = `/FullScreenChat?id=${item.conversationId}`}
          className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors"
        >
          עבור לצ'אט
        </button>
      </div>
    ))
  )}
</div>
      </div>
      
      {/* שאר הקוד של ה-Render נשאר אותו דבר... */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
         {/* ... (items.map וכו') */}
      </div>
    </div>
  );
}