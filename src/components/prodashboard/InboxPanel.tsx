
import api from "@/pages/api";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Clock, MessageSquare, Wrench,History as HistoryIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

type TabId = 'new' |  'last';

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
 
  last: [
  ]
};

const tabs: TabConfig[] = [
  { id: 'new', label: 'חדש', activeBg: 'bg-orange-500' },
  { id: 'last', label: 'אחרון', activeBg: 'bg-green-500' },
];
interface InboxPanelProps {
  incomingJobs?: any[]; // המשימות שמגיעות מה-Dashboard
  professionalCategory: number; // הוסיפי את השורה הזו
}

// 2. עדכון הפונקציה לקבלת ה-Props
export default function InboxPanel({ incomingJobs = [], professionalCategory }: InboxPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('new');
  // שומרים את ההיסטוריה מה-API כמערך פשוט
  const [historyJobs, setHistoryJobs] = useState<any[]>([]);

  // טעינת היסטוריה מהשרת
  useEffect(() => {
    const loadHistory = async () => {
      if (!professionalCategory) return;
      try {
        const response = await api.get(`/Message/category/${professionalCategory}`);
        // מוודאים ששומרים מערך
        setHistoryJobs(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };
    loadHistory();
  }, [professionalCategory]);

  // חישוב הרשימות הממוינות מכל המקורות
  const sortedJobs = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // איחוד: מה שהגיע בזמן אמת + מה שהגיע מההיסטוריה
    const allJobs = [...incomingJobs, ...historyJobs];

    // הסרת כפילויות לפי מזהה הודעה
    const uniqueJobs = Array.from(
      new Map(allJobs.map(job => [job.messageId || job.id, job])).values()
    );

    const categories = {
      new: [] as any[],
      last: [] as any[]
    };

    uniqueJobs.forEach(job => {
      const dateVal = job.createdDate || job.createdAt || job.timestamp;
      const jobDate = new Date(dateVal);
      
      // אם התאריך הוא מהיום (או לא תקין/עתידי), נכנס ל"חדש"
      if (isNaN(jobDate.getTime()) || jobDate >= today) {
        categories.new.push(job);
      } else {
        categories.last.push(job);
      }
    });

    // פונקציית עזר למיון לפי תאריך (הכי חדש ראשון)
    const sortByDate = (a: any, b: any) => {
      const dateA = new Date(a.createdDate || a.createdAt || a.timestamp).getTime();
      const dateB = new Date(b.createdDate || b.createdAt || b.timestamp).getTime();
      return dateB - dateA;
    };

    categories.new.sort(sortByDate);
    categories.last.sort(sortByDate);

    return categories;
  }, [incomingJobs, historyJobs]); // מתעדכן כשמגיע ג'וב חדש או כשההיסטוריה נטענת

  const currentList = activeTab === 'new' ? sortedJobs.new : sortedJobs.last;

 
 return (
    <div className="flex flex-col h-full bg-gray-900/50 rounded-3xl border border-gray-800 overflow-hidden">
      {/* Header & Tabs */}
      <div className="p-6 border-b border-gray-800 bg-gray-900/80">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-orange-500" />
            תיבת הודעות
          </h2>
          <span className="text-[10px] bg-orange-500/10 text-orange-500 px-2 py-1 rounded-full font-bold uppercase">
            Category ID: {professionalCategory}
          </span>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex p-1 bg-gray-950 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'new'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            הודעות חדשות
            {sortedJobs.new.length > 0 && (
              <span className="bg-orange-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {sortedJobs.new.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('last')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'last'
                ? 'bg-gray-800 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <HistoryIcon className="w-3.5 h-3.5" />
            היסטוריה (ישנות)
          </button>
        </div>
      </div>

      {/* Messages List Area */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <AnimatePresence mode="wait">
          {currentList.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-4"
            >
              {currentList.map((job, idx) => (
                <div 
                  key={job.id || idx}
                  className="bg-gray-800/40 border border-gray-700/50 p-5 rounded-2xl hover:border-orange-500/30 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-sm font-bold shadow-lg shadow-orange-500/20">
                        {job.senderName?.substring(0, 2) || 'לק'}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{job.senderName || 'לקוח חדש'}</h4>
                        <p className="text-[10px] text-gray-500">
                              {new Date(job.createdDate || job.createdAt || job.timestamp).toLocaleString('he-IL')}
                            </p>    
                    </div>
                    </div>
                    <span className="text-[10px] font-bold text-orange-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                      מחכה להצעה
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                    {job.content || job.message}
                  </p>

                  <Link 
                  to={`/FullScreenChat?id=${job.conversationId || job.id}`} 
                  className="w-full py-2.5 bg-gray-700/50 hover:bg-orange-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 group"
                >
                  מעבר לצ'אט
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </Link>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-gray-600 gap-4"
            >
              <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center">
                <MessageSquare className="w-8 h-8 opacity-20" />
              </div>
              <p className="text-sm font-medium">אין הודעות להצגה בלשונית זו</p>
            </motion.div>
          )}
        </  AnimatePresence>
      </div>
    </div>
  );
}