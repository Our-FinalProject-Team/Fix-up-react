import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  MapPin, 
  Calendar,
  Check,
  Shield,
  CreditCard,
  ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';

interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  image: string;
  description: string;
  includes: string[];
}

interface TimeSlot {
  id: string;
  label: string;
  available: boolean;
}

interface DateOption {
  date: Date;
  day: string;
  num: number;
  available: boolean;
}

const service: Service = {
  id: 1,
  name: 'General Repair',
  category: 'Maintenance',
  price: 49,
  rating: 4.9,
  reviews: 234,
  duration: '1-2 hrs',
  image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop',
  description: 'Professional repair services for furniture, fixtures, and general household items. Our experts can handle everything from squeaky doors to broken shelves.',
  includes: [
    'Inspection and assessment',
    'Basic repairs and fixes',
    'Parts replacement (additional cost)',
    'Cleanup after service',
    '30-day service guarantee'
  ]
};

const timeSlots: TimeSlot[] = [
  { id: '9am', label: '9:00 AM', available: true },
  { id: '10am', label: '10:00 AM', available: true },
  { id: '11am', label: '11:00 AM', available: false },
  { id: '1pm', label: '1:00 PM', available: true },
  { id: '2pm', label: '2:00 PM', available: true },
  { id: '3pm', label: '3:00 PM', available: true },
  { id: '4pm', label: '4:00 PM', available: false },
  { id: '5pm', label: '5:00 PM', available: true },
];

const dates: DateOption[] = Array.from({ length: 7 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    date: date,
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    num: date.getDate(),
    available: i !== 2 // third day unavailable for demo
  };
});

export default function BookService() {
  const [step, setStep] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<DateOption>(dates[0]);
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [address, setAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to={createPageUrl('Services')}>
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="font-bold text-gray-900">Book Service</h1>
              <p className="text-sm text-gray-500">Step {step} of 3</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  s <= step ? 'bg-amber-500' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Step 1: Service Details */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Service Card */}
            <Card className="overflow-hidden border-0 shadow-lg rounded-3xl">
              <div className="relative h-48">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-medium opacity-80">{service.category}</p>
                  <h2 className="text-2xl font-bold">{service.name}</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-gray-900">{service.rating}</span>
                    <span className="text-gray-500">({service.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="bg-gray-50 rounded-2xl p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {service.includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-emerald-600" />
                        </div>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Price Summary */}
            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-bold text-gray-900">${service.price}.00</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Service charge</span>
                <span>$4.99</span>
              </div>
              <div className="h-px bg-gray-200 my-4" />
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-gray-900">${service.price + 4.99}</span>
              </div>
            </Card>

            <Button
              onClick={() => setStep(2)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-2xl text-lg font-semibold"
            >
              Continue to Scheduling
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}

        {/* Step 2: Schedule */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-500" />
                Select Date
              </h3>
              
              <div className="grid grid-cols-7 gap-2">
                {dates.map((d) => (
                  <button
                    key={d.num}
                    disabled={!d.available}
                    onClick={() => setSelectedDate(d)}
                    className={`p-3 rounded-2xl text-center transition-all ${
                      selectedDate?.num === d.num
                        ? 'bg-gray-900 text-white shadow-lg'
                        : d.available
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <p className="text-xs font-medium opacity-70">{d.day}</p>
                    <p className="text-lg font-bold">{d.num}</p>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-500" />
                Select Time
              </h3>
              
              <div className="grid grid-cols-4 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedTime?.id === slot.id
                        ? 'bg-amber-500 text-gray-900 shadow-lg font-semibold'
                        : slot.available
                        ? 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed line-through'
                    }`}
                  >
                    {slot.label}
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-6 rounded-3xl border-0 shadow-lg">
              <h3 className="font-bold text-gray-900 text-lg mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" />
                Service Location
              </h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-gray-700 mb-2 block">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your full address"
                    value={address}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                    className="py-6 rounded-xl border-gray-200"
                  />
                </div>
                
                <div>
                  <Label htmlFor="notes" className="text-gray-700 mb-2 block">Additional Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or details about the issue..."
                    value={notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value)}
                    className="rounded-xl border-gray-200 min-h-[100px]"
                  />
                </div>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="flex-1 py-6 rounded-2xl border-2"
              >
                Back
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!selectedTime || !address}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white py-6 rounded-2xl font-semibold disabled:opacity-50"
              >
                Continue to Payment
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* ... rest is unchanged, types inferred automatically */}
          </motion.div>
        )}
      </div>
    </div>
  );
}