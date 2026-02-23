import React, { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  CreditCard, 
  Bell, 
  Shield, 
  HelpCircle,
  ChevronRight,
  Star,
  Clock,
  Settings,
  LogOut,
  Home,
  Plus,
  Edit2,
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface UserType {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  memberSince: string;
  totalBookings: number;
  favoriteCategory: string;
}

interface AddressType {
  id: number;
  label: string;
  address: string;
  primary: boolean;
}

interface BookingType {
  id: number;
  service: string;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
  price: number;
  rating: number;
}

interface MenuItem {
  icon: React.ElementType;
  label: string;
  badge?: string;
}

const user: UserType = {
  name: 'John Smith',
  email: 'john.smith@email.com',
  phone: '+1 (555) 123-4567',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  memberSince: 'Jan 2024',
  totalBookings: 12,
  favoriteCategory: 'Plumbing'
};

const savedAddresses: AddressType[] = [
  { id: 1, label: 'Home', address: '123 Main Street, Apt 4B, New York, NY 10001', primary: true },
  { id: 2, label: 'Office', address: '456 Business Ave, Floor 12, New York, NY 10002', primary: false },
];

const recentBookings: BookingType[] = [
  { id: 1, service: 'AC Maintenance', date: 'Feb 20, 2024', status: 'completed', price: 89, rating: 5 },
  { id: 2, service: 'Pipe Repair', date: 'Feb 15, 2024', status: 'completed', price: 120, rating: 4 },
  { id: 3, service: 'General Repair', date: 'Feb 10, 2024', status: 'completed', price: 49, rating: 5 },
];

const menuItems: MenuItem[] = [
  { icon: Bell, label: 'Notifications', badge: '3 new' },
  { icon: CreditCard, label: 'Payment Methods' },
  { icon: Shield, label: 'Privacy & Security' },
  { icon: HelpCircle, label: 'Help & Support' },
  { icon: Settings, label: 'App Settings' },
];

export default function Profile(): JSX.Element {
  const [notifications, setNotifications] = useState<boolean>(true);

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 pt-8 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGMtOS45NDEgMC0xOC04LjA1OS0xOC0xOHM4LjA1OS0xOCAxOC0xOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="max-w-lg mx-auto relative">
          <h1 className="text-white text-2xl font-bold mb-6">Profile</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center border-4 border-white/20">
                <User className="w-10 h-10 text-white" />
              </div>
              <button className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                <Edit2 className="w-4 h-4 text-gray-900" />
              </button>
            </div>
            <div className="text-white">
              <h2 className="text-xl font-bold">{user.name}</h2>
              <p className="text-gray-300 text-sm">{user.email}</p>
              <p className="text-gray-400 text-sm mt-1">Member since {user.memberSince}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Overlap */}
      <div className="max-w-lg mx-auto px-4 -mt-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-4 rounded-3xl border-0 shadow-xl">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">{user.totalBookings}</p>
                <p className="text-xs text-gray-500">Bookings</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">4.8</p>
                <p className="text-xs text-gray-500">Avg Rating</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-100 flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-gray-900">VIP</p>
                <p className="text-xs text-gray-500">Status</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="max-w-lg mx-auto px-4 mt-6 space-y-6">
        {/* Saved Addresses */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                Saved Addresses
              </h3>
              <Button variant="ghost" size="sm" className="text-amber-600">
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="divide-y divide-gray-100">
              {savedAddresses.map((addr) => (
                <div key={addr.id} className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Home className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">{addr.label}</p>
                      {addr.primary && (
                        <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">Primary</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 truncate">{addr.address}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Recent Bookings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Recent Bookings
              </h3>
              <Link to={createPageUrl('Services')}>
                <Button variant="ghost" size="sm" className="text-amber-600">
                  View All
                </Button>
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Settings className="w-5 h-5 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900">{booking.service}</p>
                    <p className="text-sm text-gray-500">{booking.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">${booking.price}</p>
                    <div className="flex items-center gap-1 justify-end">
                      {Array.from({ length: booking.rating }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Settings Menu */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="rounded-3xl border-0 shadow-lg overflow-hidden">
            <div className="divide-y divide-gray-100">
              {menuItems.map((item, index) => (
                <button key={index} className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <span className="flex-1 text-left font-medium text-gray-900">{item.label}</span>
                  {item.badge && <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">{item.badge}</Badge>}
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Logout Button */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button variant="outline" className="w-full py-6 rounded-2xl border-2 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700">
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </div>
    </div>
  );
}