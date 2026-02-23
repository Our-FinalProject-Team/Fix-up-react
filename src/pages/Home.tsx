import React, { JSX } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Clock, Star, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import ServiceGrid from '../components/home/ServiceGrid';
import FeatureCards from '../components/home/FeatureCards';
import AppShowcase from '../components/home/AppShowcase';

interface TrustBadge {
  icon: React.ElementType;
  text: string;
  sub: string;
}

export default function Home(): JSX.Element {
  const trustBadges: TrustBadge[] = [
    { icon: Shield, text: 'Verified Pros', sub: 'Background checked' },
    { icon: Clock, text: 'Same Day', sub: 'Service available' },
    { icon: Star, text: 'Satisfaction', sub: 'Guaranteed' },
    { icon: CheckCircle, text: 'Fixed Pricing', sub: 'No surprises' },
  ];

  const avatarLetters: string[] = ['A', 'B', 'C', 'D'];
  const avatarColors: string[] = ['bg-amber-500', 'bg-teal-500', 'bg-blue-500', 'bg-purple-500'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-teal-50" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm font-medium text-gray-700">Available 24/7 in your area</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Home repairs,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-600">
                  simplified.
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                Connect with verified professionals for all your home maintenance needs. 
                Fast, reliable, and transparent pricing.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to={createPageUrl('Services')}>
                  <Button size="lg" className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg rounded-2xl shadow-lg shadow-gray-900/20">
                    Book a Service
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to={createPageUrl('HowItWorks')}>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg rounded-2xl border-2">
                    How it works
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-3">
                  {avatarLetters.map((letter, i) => (
                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-xs ${avatarColors[i]}`}>
                      {letter}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">4.9/5 from 2,000+ reviews</p>
                </div>
              </div>
            </motion.div>
            
            <AppShowcase />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustBadges.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.text}</p>
                  <p className="text-sm text-gray-500">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What do you need help with?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse our services and book instantly. Our professionals are ready to help.
            </p>
          </motion.div>
          
          <ServiceGrid />
        </div>
      </section>

      {/* Features */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureCards />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOGMtOS45NDEgMC0xOC04LjA1OS0xOC0xOHM4LjA1OS0xOCAxOC0xOHoiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-40" />
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to get started?
            </h2>
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of homeowners who trust FIXUP for their home maintenance needs.
            </p>
            <Link to={createPageUrl('Services')}>
              <Button size="lg" className="bg-amber-500 hover:bg-amber-400 text-gray-900 font-semibold px-10 py-6 text-lg rounded-2xl shadow-lg shadow-amber-500/30">
                Book Your First Service
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}