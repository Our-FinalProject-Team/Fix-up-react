import React, { useState, useEffect, JSX } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  MessageCircle, 
  Star, 
  MapPin, 
  Clock,
  Check,
  Navigation,
  Shield,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

// Interfaces
interface Professional {
  name: string;
  role: string;
  rating: number;
  reviews: number;
  completedJobs: number;
  image: string;
  vehicle: string;
  plate: string;
  distance: number;
  eta: number;
}

interface StatusStep {
  id: string;
  label: string;
  time: string | null;
  completed: boolean;
}

// Mock data
const professional: Professional = {
  name: 'Mike Johnson',
  role: 'Expert Technician',
  rating: 4.9,
  reviews: 234,
  completedJobs: 1250,
  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
  vehicle: 'White Toyota Hilux',
  plate: 'ABC 1234',
  distance: 0.8,
  eta: 8
};

const statusSteps: StatusStep[] = [
  { id: 'confirmed', label: 'Booking Confirmed', time: '9:30 AM', completed: true },
  { id: 'assigned', label: 'Professional Assigned', time: '9:32 AM', completed: true },
  { id: 'onway', label: 'On The Way', time: '9:45 AM', completed: true },
  { id: 'arrived', label: 'Arrived', time: null, completed: false },
  { id: 'completed', label: 'Service Completed', time: null, completed: false },
];

export default function TrackService(): JSX.Element {
  const [showChat, setShowChat] = useState<boolean>(false);
  const [eta, setEta] = useState<number>(professional.eta);

  // Simulate countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setEta(prev => Math.max(1, prev - 1));
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 relative">
      {/* Map Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-200 to-gray-300">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Animated route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <motion.path
            d="M 20 80 Q 40 50 60 45 T 80 30"
            stroke="#F2C94C"
            strokeWidth={0.5}
            fill="none"
            strokeDasharray="2 1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>

        {/* Professional marker */}
        <motion.div
          className="absolute"
          style={{ top: '35%', left: '55%' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/50">
              <Navigation className="w-7 h-7 text-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-amber-500 rounded-full animate-ping" />
          </div>
        </motion.div>

        {/* Your location marker */}
        <div className="absolute" style={{ top: '65%', left: '25%' }}>
          <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center shadow-lg">
            <MapPin className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Top Bar */}
        <div className="p-4">
          <Link to={createPageUrl('Home')}>
            <Button variant="secondary" size="icon" className="rounded-full shadow-lg bg-white">
              <X className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <div className="flex-1" />

        {/* Bottom Cards */}
        <div className="p-4 space-y-4">
          {/* ETA Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-4 rounded-3xl border-0 shadow-xl bg-gradient-to-r from-amber-400 to-amber-500">
              <div className="flex items-center justify-between">
                <div className="text-gray-900">
                  <p className="text-sm font-medium opacity-80">Estimated Arrival</p>
                  <p className="text-3xl font-bold">{eta} min</p>
                </div>
                <div className="text-right text-gray-900">
                  <p className="text-sm font-medium opacity-80">Distance</p>
                  <p className="text-xl font-bold">{professional.distance} mi</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Professional Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="p-5 rounded-3xl border-0 shadow-xl">
              {/* Content similar to JS version */}
            </Card>
          </motion.div>

          {/* Status Timeline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-5 rounded-3xl border-0 shadow-xl">
              <h3 className="font-bold text-gray-900 mb-4">Service Status</h3>
              <div className="space-y-1">
                {statusSteps.map((step, index) => (
                  <div key={step.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.completed ? 'bg-emerald-500' : 'bg-gray-200'}`}>
                        {step.completed && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {index < statusSteps.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.completed ? 'bg-emerald-500' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className={`pb-4 ${!step.completed ? 'opacity-50' : ''}`}>
                      <p className="font-medium text-gray-900">{step.label}</p>
                      {step.time && <p className="text-sm text-gray-500">{step.time}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
              className="w-full max-w-lg bg-white rounded-t-3xl"
            >
              {/* Chat content similar to JS version */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}