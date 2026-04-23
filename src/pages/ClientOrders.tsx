import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from "./api";
import { Clock, CheckCircle2, AlertCircle, Calendar, MapPin, User, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/badge';

export default function ClientOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const userData = localStorage.getItem('user');
      if (!userData) return;
      
      const user = JSON.parse(userData);
      const clientId = user.id || user.Id; 

      if (!clientId) {
        console.error("לא נמצא ID ללקוח");
        return;
      }

      // שים לב שכאן הנתיב הוא client ולא professional
     const response = await api.get(`/Requests/client/${clientId}`);
     
      setOrders(response.data);
    } catch (err) {
      console.error("שגיאה בטעינת הזמנות:", err);
    } finally {
      setLoading(false);
    }
  };
  
    fetchOrders();
  }, []);

  if (loading) return (
    <div className="bg-gray-50 p-6" dir="rtl" style={{ minHeight: '100vh' }}>
      <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-bold text-gray-700">טוען הזמנות...</h2>
    </div>
  );

  return (
    <div className="bg-gray-50 p-6" dir="rtl" style={{ minHeight: '100vh' }}>
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">ההזמנות שלי</h1>
          <p className="text-gray-500 font-medium">כל ההזמנות שלך במקום אחד</p>
        </header>

        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-16 rounded-[3rem] shadow-sm text-center border border-gray-200">
              <AlertCircle className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">אין לך הזמנות עדיין</h2>
              <p className="text-gray-500 mb-8">בוא נמצא לך את בעל המקצוע המושלם</p>
              <Link to="/Services" className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-amber-600 transition-colors inline-block">
                חפש שירותים
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-6">
              {orders.map((order: any, index: number) => (
                <motion.div
                  key={order.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 hover:border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">
                    {/* Header with status */}
                    <div className="relative h-32 overflow-hidden flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br flex items-center justify-center shadow-xl ${
                        order.status === 'מאושר' 
                          ? 'from-emerald-400 to-emerald-500' 
                          : 'from-amber-400 to-orange-500'
                      }`}>
                        {order.status === 'מאושר' ? (
                          <CheckCircle2 className="w-8 h-8 text-white" />
                        ) : (
                          <Clock className="w-8 h-8 text-white" />
                        )}
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-white/90 text-gray-900 backdrop-blur-sm font-medium">
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 text-xl mb-4">{order.subject}</h3>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>תאריך ביקור: {new Date(order.scheduledDate).toLocaleDateString('he-IL')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span>כתובת: {order.address}</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            order.status === 'מאושר' ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}></div>
                          <span className="text-sm font-medium text-gray-700">
                            {order.status === 'מאושר' ? 'אושר וממתין לביצוע' : 'ממתין לאישור'}
                          </span>
                        </div>
                        <Link 
                          to={`/BookService?id=${order.professionalId}&name=${order.professionalName || 'בעל מקצוע'}&category=${order.subject}`}
                          className="text-amber-600 hover:text-amber-700 font-medium text-sm transition-colors"
                        >
                          צפייה בפרטים →
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}