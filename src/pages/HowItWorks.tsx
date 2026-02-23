import React, { JSX } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { 
  Search, 
  Calendar, 
  UserCheck, 
  ThumbsUp,
  ArrowRight,
  Shield,
  Clock,
  Star,
  CreditCard,
  MessageCircle,
  MapPin
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

// Step and Feature interfaces
interface Step {
  number: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  color: string;
  bg: string;
}

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    number: '01',
    icon: Search,
    title: 'Browse Services',
    description: 'Explore our wide range of home maintenance services. Find exactly what you need from plumbing to electrical work.',
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50'
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Book Instantly',
    description: 'Choose your preferred date and time. Our flexible scheduling works around your busy lifestyle.',
    color: 'from-teal-400 to-emerald-500',
    bg: 'bg-teal-50'
  },
  {
    number: '03',
    icon: UserCheck,
    title: 'Get Matched',
    description: 'We assign the best-rated professional in your area. Track their arrival in real-time.',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50'
  },
  {
    number: '04',
    icon: ThumbsUp,
    title: 'Relax & Rate',
    description: 'Sit back while we handle everything. Pay securely and rate your experience after service.',
    color: 'from-purple-400 to-pink-500',
    bg: 'bg-purple-50'
  },
];

const features: Feature[] = [
  { icon: Shield, title: 'Verified Professionals', desc: 'All pros are background-checked and certified' },
  { icon: Clock, title: 'Same-Day Service', desc: 'Get help when you need it, even today' },
  { icon: Star, title: 'Quality Guarantee', desc: "Not satisfied? We'll make it right" },
  { icon: CreditCard, title: 'Transparent Pricing', desc: 'Know the cost upfront, no hidden fees' },
  { icon: MessageCircle, title: 'Direct Chat', desc: 'Communicate directly with your professional' },
  { icon: MapPin, title: 'Live Tracking', desc: 'Track your pro in real-time on the map' },
];

export default function HowItWorks(): JSX.Element {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-50 to-white pt-16 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              Simple & Hassle-Free
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              How FIXUP Works
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Getting professional help for your home has never been easier. 
              Here's how we make it happen in four simple steps.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-8 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {/* Connection Line (desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100" />
                )}
                
                <div className="relative z-10 text-center">
                  <div className={`w-32 h-32 mx-auto rounded-3xl ${step.bg} flex items-center justify-center mb-6 relative`}>
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}>
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FIXUP?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've thought of everything to make your home maintenance experience seamless.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="p-6 rounded-3xl border-0 shadow-sm hover:shadow-lg transition-shadow h-full">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview and CTA sections remain unchanged */}
    </div>
  );
}