import React, { useState, ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // הוספת useNavigate
import { createPageUrl } from './utils';
import { 
  Home, 
  Search, 
  MapPin, 
  User, 
  Menu,
  X,
  Clock,
  Wrench
} from 'lucide-react';
import { Button } from './components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Define props type
interface LayoutProps {
  children: ReactNode;
  currentPageName: string;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPageName }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // הגדרת הניווט

  // פונקציית ההתנתקות
  const handleLogout = () => {
    localStorage.clear(); 
    navigate('/LogIn');
    window.location.reload();
  };

const rawRole = localStorage.getItem('userRole') || "";
// הופך הכל לאותיות קטנות ומוריד רווחים לביטחון
const userRole = rawRole.toLowerCase().trim();
const navItems = [  
   
    { name: 'שירותים', icon: Search, page: 'Services' },
    // { name: 'ההזמנות שלי', icon: Clock, page: 'ClientOrders' },
...(userRole.includes('professional') 
      ? [
          { name: 'בקשות חדשות', icon: Clock, page: 'ProDashboard' },
          { name: 'העבודות שלי', icon: Wrench, page: 'ProOrders' }
        ]
      : [
          // אם הוא לקוח רגיל
          { name: 'ההזמנות שלי', icon: Clock, page: 'ClientOrders' }
        ]
    ),
// { 
//     name: 'ההזמנות שלי', 
//     icon: Clock, 
//     // אם המילה professional נמצאת בתוך ה-Role, הוא ילך ל-ProOrders
//     page: userRole.includes('professional') ? 'ProOrders' : 'ClientOrders' 
//   },
    { name: 'פרופיל', icon: User, page: 'Profile' },   
    { name: 'הרשמה', icon: User, page: 'RegisterRole' }, 
    { name: 'איך זה עובד', icon: User, page: 'HowItWorks' }, 
    { name: 'עמוד הבית', icon: Home, page: 'Home' },
  ];

  const isFullScreenPage = ['TrackService'].includes(currentPageName);

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 leading-relaxed">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <Wrench className="text-emerald-600" size={28} />
             <span className="text-2xl font-black tracking-tighter text-stone-900 uppercase">FIXUP</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link 
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  currentPageName === item.page ? 'text-emerald-600' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* כפתור התנתקות חדש שנוסף */}
            <Button 
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl px-6 font-bold"
            >
              התנתק
            </Button>

            <Link to={createPageUrl('LogIn')}>
              <Button className="bg-stone-900 hover:bg-stone-800 text-white rounded-xl px-6 font-bold">
                התחברות
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className={`pt-20 ${isFullScreenPage ? '' : 'max-w-7xl mx-auto px-4 py-8'}`}>
        {children}
      </main>

      {/* Footer - הועתק מילה במילה מהמקור הארוך שלך */}
      {!isFullScreenPage && (
        <footer className="bg-stone-900 text-white py-16 mt-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-right" dir="rtl">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 mb-6">
                  <Wrench className="text-emerald-400" size={24} />
                  <span className="text-xl font-black tracking-tighter uppercase">FIXUP</span>
                </div>
                <p className="text-stone-400 max-w-sm mb-8 leading-relaxed">
                  הפלטפורמה המובילה למציאת בעלי מקצוע איכותיים בקליק אחד. פשוט, מהיר ובטוח.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">חברה</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">אודותינו</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">קריירה</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">בלוג</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">עיתונות</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">תמיכה</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">מרכז עזרה</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">בטיחות</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">תנאים</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">פרטיות</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
              <p>© 2024 FIXUP. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;