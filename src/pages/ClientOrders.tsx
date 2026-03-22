import React, { useEffect, useState } from 'react';
import api from "./api";
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  if (loading) return <div className="text-center p-10">טוען הזמנות...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto" dir="rtl">
      <h1 className="text-3xl font-black mb-8">ההזמנות שלי</h1>
      <div className="space-y-4">
        {orders.map((order: any) => (
          <div key={order.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-stone-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-xl">{order.subject}</h3>
              <p className="text-stone-500">תאריך ביקור: {new Date(order.scheduledDate).toLocaleDateString('he-IL')}</p>
              <p className="text-stone-400 text-sm">כתובת: {order.address}</p>
            </div>
            <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${
              order.status === 'מאושר' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
            }`}>
              {order.status === 'מאושר' ? <CheckCircle2 size={18}/> : <Clock size={18}/>}
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}