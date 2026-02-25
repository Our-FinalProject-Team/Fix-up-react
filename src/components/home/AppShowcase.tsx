import React, { JSX } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { MapPin, Star, Clock, Phone, MessageCircle } from 'lucide-react';

// אם בעתיד תרצי לקבל props, אפשר להוסיף interface Props
export default function AppShowcase(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative hidden lg:block"
    >
      {/* Main Phone Mockup */}
      <div className="relative mx-auto w-[300px]">
        {/* Phone Frame */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-gray-900/30">
          {/* Screen */}
          <div className="bg-white rounded-[2.5rem] overflow-hidden">
            {/* Status Bar */}
            <div className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center text-xs">
              <span>9:41</span>
              <div className="w-20 h-5 bg-gray-800 rounded-full" />
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3/4 h-full bg-white rounded-sm" />
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="h-[520px] bg-gradient-to-b from-gray-50 to-white">
              {/* Header */}
              <div className="bg-white p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Good morning!</p>
                    <p className="font-semibold text-gray-900">John's Home</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold text-sm">
                    J
                  </div>
                </div>

                {/* Search Bar */}
                <div className="bg-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-gray-300" />
                  <span className="text-sm text-gray-400">Search services...</span>
                </div>
              </div>

              {/* Active Service Card */}
              <div className="p-4">
                <div className="bg-gradient-to-br from-amber-400 to-amber-500 rounded-3xl p-4 text-gray-900 shadow-lg shadow-amber-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium bg-white/30 px-3 py-1 rounded-full">
                      In Progress
                    </span>
                    <span className="text-xs font-bold">ETA: 10 min</span>
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <span className="text-white font-bold text-sm">MJ</span>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold">Mike Johnson</p>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-white" />
                        <span className="text-xs font-medium">4.9 • Plumber</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-white/20 hover:bg-white/30 rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                      <Phone className="w-4 h-4" />
                      Call
                    </button>
                    <button className="flex-1 bg-white/20 hover:bg-white/30 rounded-xl py-2 flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Services */}
              <div className="px-4">
                <p className="font-semibold text-gray-900 mb-3">Quick Services</p>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { color: 'from-amber-400 to-orange-500', icon: '🔧' },
                    { color: 'from-yellow-400 to-amber-500', icon: '⚡' },
                    { color: 'from-blue-400 to-cyan-500', icon: '💧' },
                    { color: 'from-purple-400 to-pink-500', icon: '🎨' },
                  ].map((item, i) => (
                    <div key={i} className="aspect-square rounded-2xl bg-gray-50 flex items-center justify-center">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-lg shadow-md`}>
                        {item.icon}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="p-4">
                <p className="font-semibold text-gray-900 mb-3">Recent</p>
                <div className="space-y-2">
                  {[
                    { name: 'AC Maintenance', date: 'Yesterday', price: '$89' },
                    { name: 'Pipe Repair', date: 'Mar 15', price: '$120' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center">
                          <Clock className="w-5 h-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500">{item.date}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-gray-900">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -left-24 top-32 bg-white rounded-2xl p-3 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Location</p>
              <p className="text-sm font-semibold text-gray-900">0.5 mi away</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute -right-20 bottom-40 bg-white rounded-2xl p-3 shadow-xl shadow-gray-200/50 border border-gray-100"
        >
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1,2,3,4,5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gray-900">5.0</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">שירות מצוין!</p>
        </motion.div>
      </div>
    </motion.div>
  );
}