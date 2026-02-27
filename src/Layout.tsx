import React, { useState, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { 
  Home, 
  Search, 
  MapPin, 
  User, 
  Menu,
  X,
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

  const navItems = [
    { name: 'chat', icon: User, page: 'FullScreenChat' }, 
    { name: 'עמוד הבית', icon: Home, page: 'Home' },
    { name: 'שירותים', icon: Search, page: 'Services' },
    { name: 'מסלול', icon: MapPin, page: 'TrackService' },
    { name: 'פרופיל', icon: User, page: 'Profile' },   
    { name: 'הרשמה', icon: User, page: 'Registration' },
  ];

  const isFullScreenPage = ['TrackService'].includes(currentPageName);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Header */}
      {!isFullScreenPage && (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/20">
                  <Wrench className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">FIXUP</span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.page}
                    to={createPageUrl(item.page)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      currentPageName === item.page
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to={createPageUrl('HowItWorks')}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    currentPageName === 'HowItWorks'
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  איך זה עובד 
                </Link>
              </nav>

              {/* CTA Button */}
              <div className="hidden md:flex items-center gap-3">
                <Link to={createPageUrl('Services')}>
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">
                    הזמן עכשיו
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-gray-900" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-900" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
              >
                <div className="px-4 py-4 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        currentPageName === item.page
                          ? 'bg-amber-50 text-amber-700'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                  <Link
                    to={createPageUrl('HowItWorks')}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                      currentPageName === 'HowItWorks'
                        ? 'bg-amber-50 text-amber-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    איך זה עובד
                  </Link>
                  <div className="pt-2">
                    <Link to={createPageUrl('Services')} onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl py-6">
                        הזמן שירות
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      {/* Main Content */}
      <main>{children}</main>

      {/* Mobile Bottom Nav */}
      {!isFullScreenPage && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-50 safe-area-pb">
          <div className="flex items-center justify-around py-2">
            {navItems.map((item) => (
              <Link
                key={item.page}
                to={createPageUrl(item.page)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                  currentPageName === item.page
                    ? 'text-amber-600'
                    : 'text-gray-400'
                }`}
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      )}

      {/* Bottom padding for mobile nav */}
      {!isFullScreenPage && <div className="md:hidden h-20" />}

      {/* Footer - Desktop Only */}
      {!isFullScreenPage && (
        <footer className="hidden md:block bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">FIXUP</span>
                </div>
                <p className="text-gray-400 text-sm">
                .שירותי תחזוקת בית מקצועיים בהישג יד
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">שירותים</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">אינסטלציה</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">חשמל</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">מערכות למיזוג אויר</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">צביעה</a></li>
                </ul>
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