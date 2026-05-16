import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Zap, LayoutDashboard, TrendingUp, 
  Sun, Moon, Palette, Check, LucideIcon,Home, 
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/pages/Contexts/AuthContext';

import AvailabilityCalendar from '@/components/prodashboard/Calander';
import InboxPanel from '@/components/prodashboard/InboxPanel';
import ActiveMission from '@/components/prodashboard/ActiveMisson';
import { HubConnectionBuilder } from '@microsoft/signalr';
import HowItWorkPanel from '@/pages/howitWorksPro.tsx';
import HomePanel from '@/pages/Home.tsx';
import api from './api';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/userSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../pages/store'; 
import { se } from 'date-fns/locale';
// --- Interfaces & Types ---

interface Tab {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface Theme {
  id: string;
  label: string;
  bg: string;
  header: string;
  border: string;
  card: string;
  text: string;
  subtext: string;
  tabHover: string;
}


const TABS: Tab[] = [
  { id: 'overview', label: 'סקירה כללית', icon: LayoutDashboard },
  { id: 'HowitWorksPro', label: 'איך זה עובד', icon: Search },

];

const THEMES: Theme[] = [
  { id: 'dark', label: 'כהה', bg: 'bg-gray-950', header: 'bg-gray-900/95', border: 'border-gray-800', card: 'bg-gray-800', text: 'text-white', subtext: 'text-gray-400', tabHover: 'hover:bg-gray-800' },
  { id: 'light', label: 'בהיר', bg: 'bg-gray-50', header: 'bg-white/95', border: 'border-gray-200', card: 'bg-gray-100', text: 'text-gray-900', subtext: 'text-gray-500', tabHover: 'hover:bg-gray-100' },
  { id: 'midnight', label: 'חצות', bg: 'bg-slate-950', header: 'bg-slate-900/95', border: 'border-slate-700', card: 'bg-slate-800', text: 'text-white', subtext: 'text-slate-400', tabHover: 'hover:bg-slate-800' },
  { id: 'forest', label: 'יער', bg: 'bg-emerald-950', header: 'bg-emerald-900/95', border: 'border-emerald-800', card: 'bg-emerald-800', text: 'text-white', subtext: 'text-emerald-300', tabHover: 'hover:bg-emerald-800' },
];

// --- Main Component ---

export default function TechnicianDashboard() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [notifCount] = useState<number>(3);
  const [themeId, setThemeId] = useState<string>('dark');
  const [showThemePicker, setShowThemePicker] = useState<boolean>(false);
  const [newJobs, setNewJobs] = useState<any[]>([]);
  const [professionalCategory, setProfessionalCategory] = useState<number>(0);
  
  // Integration with AuthContext
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  
  // Get user from Redux
  const user = useSelector((state: RootState) => state.user.currentUser);
  const isLoading = !user && isLoggedIn;
  
  // Find current theme
  const currentTheme = THEMES.find(t => t.id === themeId) || THEMES[0];
  const isDark = themeId !== 'light';
  useEffect(() => {
  if (professionalCategory === 0) return; // אל תתחבר אם עדיין אין קטגוריה

  const connection = new HubConnectionBuilder()
    .withUrl("https://fixup-fullstack.onrender.com/chatHub")
    .withAutomaticReconnect()
    .build();

  connection.start()
    .then(() => {
      connection.invoke("JoinCategoryGroup", professionalCategory);
    })
    .catch(err => console.error("SignalR Error: ", err));

  connection.on("ReceiveNewJob", (data) => {
    setNewJobs(prev => [data, ...prev]);
  });

  return () => {
    connection.stop();
  };
}, [professionalCategory]);

  
  useEffect(() => {

    if (!user) return;

    if (user && user.role === 'Professional') {
      console.log("the user category ",user.categoryId);
      
      setProfessionalCategory(user.categoryId);
    } else {
      setProfessionalCategory(0);
    }
  }, [user]);

useEffect(() => {
    const fetchHistory = async () => {
      
        if (professionalCategory !== null && professionalCategory > 0) {
            try {
                // קריאה לשרת לקבלת הודעות ישנות של הקטגוריה הזו
                const response = await api.get(`/Messages/category/${professionalCategory}`);
                
                // עדכון ה-State עם מה שחזר מה-DB
                console.log(response.data);
                
                setNewJobs(response.data); 
            } catch (error) {
                console.error("Error fetching history:", error);
            }
        }
    };

    fetchHistory();
}, [professionalCategory]); // ירוץ ברגע שהקטגוריה מתעדכנת
  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-300`} dir="rtl">
      
      {/* Top Bar */}
      <div className={`sticky top-0 z-50 ${currentTheme.header} backdrop-blur border-b ${currentTheme.border}`}>
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          
          {/* Logo & User Info */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">לוח בקרה טכנאי</p>
              {/* User Name Display with Loading State */}
              {isLoading ? (
                <div className={`animate-pulse h-3 w-24 rounded ${currentTheme.card}`} />
              ) : (
                <p className={`text-[10px] ${currentTheme.subtext}`}>
                  {user?.fullName || 'אורח'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status Button - Connected/Disconnected with Auth Integration */}
            <button
              onClick={() => {
                if (isLoggedIn) {
                  // Logout when connected
                  logout();
                  navigate('/LogIn');
                } else {
                  // Navigate to login when not connected
                  navigate('/LogIn');
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold transition-all cursor-pointer ${
                isLoggedIn 
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
                  : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
              }`}
              title={isLoggedIn ? 'מחובר - לחץ להתנתקות' : 'לא מחובר - לחץ להתחברות'}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isLoggedIn ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              {isLoggedIn ? 'מחובר' : 'לא מחובר'}
            </button>

            {/* Dark/Light Toggle */}
            <button
              onClick={() => setThemeId(themeId === 'light' ? 'dark' : 'light')}
              className={`w-9 h-9 flex items-center justify-center rounded-xl ${currentTheme.card} ${currentTheme.tabHover} border ${currentTheme.border} transition-colors`}
            >
              {isDark ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-gray-600" />}
            </button>

            {/* Theme Picker */}
            <div className="relative">
              <button
                onClick={() => setShowThemePicker(!showThemePicker)}
                className={`w-9 h-9 flex items-center justify-center rounded-xl ${currentTheme.card} ${currentTheme.tabHover} border ${currentTheme.border} transition-colors`}
              >
                <Palette className={`w-4 h-4 ${currentTheme.subtext}`} />
              </button>
              
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -5 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -5 }}
                    className={`absolute left-0 top-11 w-44 rounded-2xl ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-2xl p-2 z-50`}
                  >
                    <p className={`text-[10px] font-bold px-2 pb-2 uppercase tracking-wider ${currentTheme.subtext}`}>ערכות נושא</p>
                    {THEMES.map(t => (
                      <button
                        key={t.id}
                        onClick={() => { setThemeId(t.id); setShowThemePicker(false); }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${currentTheme.tabHover}`}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3.5 h-3.5 rounded-full ${t.bg} border border-gray-600`} />
                          {t.label}
                        </div>
                        {themeId === t.id && <Check className="w-3.5 h-3.5 text-orange-500" />}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Notifications */}
            <button className={`relative w-9 h-9 flex items-center justify-center rounded-xl ${currentTheme.card} ${currentTheme.tabHover} border ${currentTheme.border}`}>
              <Bell className={`w-4 h-4 ${currentTheme.subtext}`} />
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full text-[10px] font-black text-white flex items-center justify-center border-2 border-gray-900">
                  {notifCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="max-w-5xl mx-auto px-4 flex gap-1 pb-2">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : `${currentTheme.subtext} ${currentTheme.tabHover}`
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview" 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-start">
                {/* Sidebar - Calendar */}
                <aside className="w-full lg:w-72 shrink-0">
                  <AvailabilityCalendar />
                </aside>
                {/* Center - Inbox/Messages */}
                <section className="flex-1 w-full min-h-[600px]">
                  <InboxPanel incomingJobs={newJobs} professionalCategory={professionalCategory}/>
                </section>
              </div>
            </motion.div>
          )}

        

        
          {activeTab === 'HowitWorksPro' && (
            <motion.div
              key="HowitWorksPro" 
              initial={{ opacity: 0 }
            }
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HowItWorkPanel />
            </motion.div> 
          )}

           {activeTab === 'Home' && (
            <motion.div
              key="Home" 
              initial={{ opacity: 0 }
            }
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HomePanel />
            </motion.div> 
          )}


        </AnimatePresence>
      </main>
    </div>
  );
}