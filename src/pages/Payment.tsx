import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Mail, Phone, User, Shield, CheckCircle } from 'lucide-react';

// הגדרת טיפוסים לפונקציות העזר
function formatCardNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  return digits;
}

function getCardType(number: string): string | null {
  const n = number.replace(/\s/g, '');
  if (n.startsWith('4')) return 'VISA';
  if (/^5[1-5]/.test(n)) return 'MC';
  if (/^3[47]/.test(n)) return 'AMEX';
  return null;
}

// הגדרת ממשק (Interface) למבנה הסטייט של הטופס
interface FormState {
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
  email: string;
  emailCode: string;
  phone: string;
  nationalId: string;
}

export default function Payment() {
  const [form, setForm] = useState<FormState>({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    email: '',
    emailCode: '',
    phone: '',
    nationalId: '',
  });
  
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean>(false);

  // שימוש ב-keyof כדי להבטיח שמעדכנים רק שדות קיימים
  const set = (key: keyof FormState, val: string) => setForm(f => ({ ...f, [key]: val }));

  const cardType = getCardType(form.cardNumber);

  if (paid) {

    return (
        
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 via-amber-50 to-yellow-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center p-10"
        >
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500">Your booking has been confirmed. A receipt was sent to {form.email}.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-yellow-50 py-12 px-4">
      <div className="max-w-md mx-auto">

        {/* Title */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Secure Payment</h1>
          <p className="text-gray-500 mt-1 text-sm">Complete your booking with FIXUP</p>
        </motion.div>

        {/* Card Visual */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ transformStyle: 'preserve-3d', position: 'relative', height: 200 }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-3xl p-6 flex flex-col justify-between"
              style={{
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 40%, #fbbf24 100%)',
                boxShadow: '0 20px 60px rgba(14,165,233,0.3)',
              }}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full bg-yellow-300/60 backdrop-blur-sm flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                {cardType && (
                  <span className="text-white font-black text-xl tracking-wider opacity-90">{cardType}</span>
                )}
              </div>
              <div>
                <p className="text-white/70 text-xs mb-1 tracking-widest">CARD NUMBER</p>
                <p className="text-white text-xl font-mono tracking-widest">
                  {form.cardNumber || '•••• •••• •••• ••••'}
                </p>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/60 text-xs tracking-widest">CARD HOLDER</p>
                  <p className="text-white font-semibold">{form.cardName || 'FULL NAME'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-xs tracking-widest">EXPIRES</p>
                  <p className="text-white font-semibold">{form.expiry || 'MM/YY'}</p>
                </div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 60%, #f59e0b 100%)',
                boxShadow: '0 20px 60px rgba(14,165,233,0.3)',
              }}
            >
              <div className="w-full h-12 bg-black/40 mt-10" />
              <div className="mx-6 mt-4">
                <p className="text-white/60 text-xs mb-1 tracking-widest">CVV</p>
                <div className="bg-white/90 rounded-lg px-4 py-2 text-right">
                  <span className="text-gray-800 font-mono tracking-widest">
                    {form.cvv ? '•'.repeat(form.cvv.length) : '•••'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-sky-100 p-6 space-y-5"
        >
          {/* Card Details Section */}
          <div>
            <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5" /> Card Details
            </p>

            {/* Card Number */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">Card Number</label>
              <input
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50/40"
                placeholder="1234 5678 9012 3456"
                value={form.cardNumber}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('cardNumber', formatCardNumber(e.target.value))}
                maxLength={19}
              />
            </div>

            {/* Card Name */}
            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 block">Cardholder Name</label>
              <input
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50/40"
                placeholder="John Doe"
                value={form.cardName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('cardName', e.target.value.toUpperCase())}
              />
            </div>

            {/* Expiry + CVV */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">Expiry Date</label>
                <input
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50/40"
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('expiry', formatExpiry(e.target.value))}
                  maxLength={5}
                />
              </div>
              <div className="flex-1">
                <label className="text-xs text-gray-500 mb-1 block">CVV</label>
                <input
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50/40"
                  placeholder="•••"
                  type="password"
                  value={form.cvv}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  onFocus={() => setFlipped(true)}
                  onBlur={() => setFlipped(false)}
                  maxLength={4}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-100" />

          {/* Email + Code */}
          <div>
            <p className="text-xs font-bold text-amber-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> Email Verification
            </p>
            <div className="flex gap-2 mb-3">
              <input
                className="flex-1 border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50/30"
                placeholder="your@email.com"
                type="email"
                value={form.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('email', e.target.value)}
              />
              <button
                onClick={() => setCodeSent(true)}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold rounded-2xl transition-colors whitespace-nowrap"
              >
                {codeSent ? 'Resend' : 'Send Code'}
              </button>
            </div>
            {codeSent && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                <label className="text-xs text-gray-500 mb-1 block">Verification Code</label>
                <input
                  className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-amber-300 bg-amber-50/30"
                  placeholder="6-digit code"
                  value={form.emailCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => set('emailCode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                />
              </motion.div>
            )}
          </div>

          <div className="border-t border-dashed border-gray-100" />

          {/* Phone + ID */}
          <div>
            <p className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <User className="w-3.5 h-3.5" /> Identity Verification
            </p>
            <div className="mb-4">
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone Number
              </label>
              <input
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50/40"
                placeholder="+1 (555) 000-0000"
                type="tel"
                value={form.phone}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('phone', e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 flex items-center gap-1">
                <Shield className="w-3 h-3" /> National ID / Passport
              </label>
              <input
                className="w-full border border-gray-200 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 bg-sky-50/40"
                placeholder="ID number"
                value={form.nationalId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => set('nationalId', e.target.value)}
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-sky-50 to-amber-50 rounded-2xl p-4 flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-2xl font-black text-gray-800">$149<span className="text-sm font-normal text-gray-400">.00</span></p>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Lock className="w-3 h-3" />
              256-bit SSL
            </div>
          </div>

          {/* Pay Button */}
          <button
            onClick={() => setPaid(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 to-amber-400 hover:from-sky-500 hover:to-amber-500 text-white font-bold text-base shadow-lg shadow-sky-200 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            Pay Securely
          </button>

          <p className="text-center text-xs text-gray-400">
            Your payment is encrypted and secure. We never store your card details.
          </p>
        </motion.div>
      </div>
    </div>
  );
}