// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { MessageCircle, User, Calendar, Wrench, ChevronLeft, X, Send } from 'lucide-react';

import api from "@/pages/api";
import { Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
// // --- Interfaces & Types ---



// function ChatModal({ item, onClose }: ChatModalProps) {
//   const [message, setMessage] = useState<string>('');
//   const [messages, setMessages] = useState<Message[]>([
//     { from: 'client', text: item.preview, time: '10:30' },
//     { from: 'me', text: 'שלום! קיבלתי את הבקשה שלך. אבדוק את לוח הזמנים שלי.', time: '10:32' },
//   ]);

//   const send = () => {
//     if (!message.trim()) return;
//     const newMessage: Message = { from: 'me', text: message.trim(), time: 'עכשיו' };
//     setMessages(prev => [...prev, newMessage]);
//     setMessage('');
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
//       onClick={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <motion.div
//         initial={{ y: 80 }}
//         animate={{ y: 0 }}
//         exit={{ y: 80 }}
//         dir="rtl"
//         className="bg-gray-900 border border-gray-700 rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md flex flex-col shadow-2xl"
//         style={{ height: '75vh' }}
//       >
//         <div className="flex items-center gap-3 p-4 border-b border-gray-800">
//           <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm">
//             {item.clientInitials}
//           </div>
//           <div className="flex-1">
//             <p className="font-semibold text-white text-sm">{item.client}</p>
//             <p className="text-xs text-gray-400 truncate">{item.subject}</p>
//           </div>
//           <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-800 transition-colors">
//             <X className="w-4 h-4 text-gray-400" />
//           </button>
//         </div>

//         <div className="flex-1 overflow-y-auto p-4 space-y-3 text-right">
//           {messages.map((msg, i) => (
//             <div key={i} className={`flex ${msg.from === 'me' ? 'justify-start' : 'justify-end'}`}>
//               <div className={`max-w-[78%] px-4 py-2.5 rounded-2xl text-sm ${
//                 msg.from === 'me'
//                   ? 'bg-orange-500 text-white rounded-bl-md'
//                   : 'bg-gray-800 text-gray-200 rounded-br-md'
//               }`}>
//                 <p>{msg.text}</p>
//                 <p className={`text-[10px] mt-1 ${msg.from === 'me' ? 'text-orange-200' : 'text-gray-500'}`}>{msg.time}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="p-4 border-t border-gray-800 flex gap-2">
//           <button
//             onClick={send}
//             disabled={!message.trim()}
//             className="w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
//           >
//             <Send className="w-4 h-4 text-white" />
//           </button>
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === 'Enter' && send()}
//             placeholder="הקלד הודעה..."
//             className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-orange-500/50 text-right"
//           />
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// interface InboxItemProps {
//   item: InboxEntry;
// }

// function InboxItem({ item }: InboxItemProps) {
//   const [chatOpen, setChatOpen] = useState<boolean>(false);

//   return (
//     <>
//       <motion.div
//         layout
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="bg-gray-800/60 border border-gray-700/60 hover:border-gray-600 rounded-2xl p-4 transition-all text-right"
//       >
//         <div className="flex items-start gap-3">
//           <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/30 to-amber-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-sm shrink-0">
//             {item.clientInitials}
//           </div>
//           <div className="flex-1 min-w-0">
//             <div className="flex items-start justify-between gap-2 mb-1">
//                <span className="text-green-400 font-bold text-sm shrink-0">{item.budget}</span>
//                <div className="flex items-center gap-2 flex-wrap justify-end">
//                 {item.status && (
//                   <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor[item.status]}`}>
//                     {item.status}
//                   </span>
//                 )}
//                 <p className="font-semibold text-white text-sm">{item.subject}</p>
//               </div>
//             </div>
//             <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 justify-end">
//               <span className="flex items-center gap-1">{item.date}<Calendar className="w-3 h-3" /></span>
//               <span className="flex items-center gap-1">{item.client}<User className="w-3 h-3" /></span>
//             </div>
//             <p className="text-xs text-gray-500 truncate mb-3">{item.preview}</p>
//             <button
//               onClick={() => setChatOpen(true)}
//               className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-semibold transition-all mr-auto"
//             >
//               <ChevronLeft className="w-3 h-3" />
//               עבור לצ׳אט
//               <MessageCircle className="w-3.5 h-3.5" />
//             </button>
//           </div>
//         </div>
//       </motion.div>
//       <AnimatePresence>
//         {chatOpen && <ChatModal item={item} onClose={() => setChatOpen(false)} />}
//       </AnimatePresence>
//     </>
//   );
// }

// export default function InboxPanel() {
//   const [activeTab, setActiveTab] = useState<TabId>('new');
//   const items = inboxData[activeTab] || [];

//   return (
//     <div className="bg-gray-900 rounded-2xl border border-gray-800 flex flex-col h-full min-h-0" dir="rtl">
//       <div className="p-5 border-b border-gray-800 shrink-0">
//         <div className="flex items-center gap-2 mb-4">
//           <Wrench className="w-5 h-5 text-orange-400" />
//           <h2 className="font-bold text-white text-lg">תיבת דואר נכנס</h2>
//         </div>
//         <div className="flex gap-1 bg-gray-800 rounded-xl p-1">
//           {tabs.map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all ${
//                 activeTab === tab.id ? `${tab.activeBg} text-white shadow-lg` : 'text-gray-500 hover:text-gray-300'
//               }`}
//             >
//               {tab.label}
//               <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-700'}`}>
//                 {inboxData[tab.id].length}
//               </span>
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="flex-1 overflow-y-auto p-4 space-y-3">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={activeTab}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: 10 }}
//             className="space-y-3"
//           >
//             {items.length === 0 ? (
//               <div className="text-center py-12">
//                 <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-3">
//                   <MessageCircle className="w-6 h-6 text-gray-600" />
//                 </div>
//                 <p className="text-gray-500 text-sm">אין בקשות {activeTab === 'new' ? 'חדשות' : activeTab === 'active' ? 'פעילות' : 'סגורות'}</p>
//               </div>
//             ) : (
//               items.map(item => <InboxItem key={item.id} item={item} />)
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }
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