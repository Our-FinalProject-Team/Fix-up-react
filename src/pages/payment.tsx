
import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Mail, Phone, User, Shield, CheckCircle } from 'lucide-react';

// פונקציות עזר - ללא שינוי
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
    cardNumber: '', cardName: '', expiry: '', cvv: '',
    email: '', emailCode: '', phone: '', nationalId: '',
  });
  
  const [codeSent, setCodeSent] = useState<boolean>(false);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [paid, setPaid] = useState<boolean>(false);

  const set = (key: keyof FormState, val: string) => setForm(f => ({ ...f, [key]: val }));
  const cardType = getCardType(form.cardNumber);

  if (paid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc]">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center p-10 bg-white rounded-[2rem] shadow-sm border border-gray-100">
          <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500">Your booking has been confirmed.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfcfc] py-12 px-4 font-sans">
      <div className="max-w-md mx-auto">

        {/* Logo/FX Style Header */}
        <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-50 font-bold text-emerald-500 text-xl">
                FX
            </div>
        </div>

        {/* Title */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">איך תרצה לשלם?</h1>
          <p className="text-gray-400 mt-2 text-sm">השלם את ההזמנה שלך בצורה בטוחה</p>
        </motion.div>

        {/* Card Visual - Updated to Emerald/Amber matching the image icons */}
        <motion.div
          className="mb-10"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            style={{ transformStyle: 'preserve-3d', position: 'relative', height: 210 }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 rounded-[2rem] p-7 flex flex-col justify-between shadow-lg shadow-emerald-100/50"
              style={{
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}
            >
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <span className="text-white/80 font-bold tracking-tighter">{cardType || 'Secure Card'}</span>
              </div>
              <p className="text-white text-xl font-mono tracking-[0.2em]">{form.cardNumber || '•••• •••• •••• ••••'}</p>
              <div className="flex justify-between text-white">
                <div className="text-[10px] uppercase opacity-60 tracking-widest">Card Holder <p className="text-sm opacity-100 font-medium tracking-normal">{form.cardName || 'FULL NAME'}</p></div>
                <div className="text-[10px] uppercase opacity-60 tracking-widest">Expires <p className="text-sm opacity-100 font-medium tracking-normal">{form.expiry || 'MM/YY'}</p></div>
              </div>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-lg"
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#064e3b' }}
            >
              <div className="w-full h-12 bg-black/20 mt-8" />
              <div className="p-8 text-right text-white">
                <span className="text-[10px] opacity-60 uppercase block mb-1">CVV</span>
                <div className="bg-white/10 rounded-lg p-2 font-mono">{form.cvv ? '***' : '•••'}</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 border border-gray-50 space-y-6"
        >
          {/* Inputs Section */}
          <div className="space-y-4">
            <div className="group">
              <label className="text-[11px] font-bold text-gray-400 uppercase mr-1 mb-2 block tracking-wider italic">Card Number</label>
              <input
                className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                value={form.cardNumber}
                onChange={(e) => set('cardNumber', formatCardNumber(e.target.value))}
                maxLength={19}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase mr-1 mb-2 block tracking-wider italic">Expiry</label>
                    <input
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        value={form.expiry}
                        onChange={(e) => set('expiry', formatExpiry(e.target.value))}
                        maxLength={5}
                    />
                </div>
                <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase mr-1 mb-2 block tracking-wider italic">CVV</label>
                    <input
                        className="w-full bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                        type="password"
                        value={form.cvv}
                        onChange={(e) => set('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                        onFocus={() => setFlipped(true)}
                        onBlur={() => setFlipped(false)}
                    />
                </div>
            </div>
          </div>

          <div className="h-px bg-gray-50" />

          {/* Verification Section */}
          <div>
            <div className="flex gap-2 mb-2">
              <input
                className="flex-1 bg-gray-50/50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
              />
              <button
                onClick={() => setCodeSent(true)}
                className="px-5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all"
              >
                {codeSent ? 'Resend' : 'Send'}
              </button>
            </div>
            {codeSent && (
               <motion.input 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="w-full bg-emerald-50/30 border border-emerald-100 rounded-xl px-4 py-3 text-sm mt-2 outline-none"
                  placeholder="Verification Code"
                  value={form.emailCode}
                  onChange={(e) => set('emailCode', e.target.value.slice(0, 6))}
               />
            )}
          </div>

          {/* Price Summary - Minimalist style */}
          <div className="flex justify-between items-center py-4 px-1">
            <span className="text-gray-400 font-medium">סה"כ לתשלום</span>
            <span className="text-2xl font-bold text-gray-900">₪549.00</span>
          </div>

          {/* Pay Button - Updated to match Emerald action button in your image */}
          <button
            onClick={() => setPaid(true)}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg shadow-lg shadow-emerald-100 transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            בוא נתחיל
          </button>

          <p className="text-center text-[11px] text-gray-300">
             Your data is encrypted by 256-bit SSL security
          </p>
        </motion.div>
      </div>
    </div>
  );
}