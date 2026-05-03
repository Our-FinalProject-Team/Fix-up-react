import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, Wrench, ThumbsUp, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

// הגדרת טיפוסים עבור איש המקצוע
interface Professional {
  name: string;
  initials: string;
  role: string;
  service: string;
  date: string;
}

// הגדרת טיפוס למשתמש שחוזר מה-API (משוער)
interface AuthUser {
  full_name?: string;
  email?: string;
}

const quickTags: string[] = [
  'בזמן', 'מקצועי', 'עבודה נקייה', 'ידידותי',
  'תמורה טובה', 'מיומן מאוד', 'תקשורתי', 'יסודי'
];

const professional: Professional = {
  name: 'מייק ג׳ונסון',
  initials: 'מג',
  role: 'טכנאי מומחה',
  service: 'תיקון כללי',
  date: '24 פבר׳ 2026',
};

const ratingLabels: string[] = ['', 'גרוע', 'סביר', 'טוב', 'טוב מאוד', 'מצוין'];

export default function ReviewForm() {
  const urlParams = new URLSearchParams(window.location.search);
  const proName: string = urlParams.get('pro') || professional.name;
  const proInitials: string = urlParams.get('initials') || professional.initials;
  const serviceName: string = urlParams.get('service') || professional.service;

  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [reviewerName, setReviewerName] = useState<string>('');

  const toggleTag = (tag: string): void => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitting(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-gray-50 flex items-center justify-center p-4" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">הביקורת נשלחה!</h2>
          <p className="text-gray-500 mb-8">תודה על המשוב שלך. זה עוזר לאחרים למצוא אנשי מקצוע מעולים.</p>
          <div className="flex flex-col gap-3">
            <Link to={`${createPageUrl('ReviewHistory')}?pro=${encodeURIComponent(proName)}`}>
              <Button variant="outline" className="w-full rounded-2xl px-8 py-5 border-2">
                <History className="w-4 h-4 ml-2" />
                כל הביקורות של {proName}
              </Button>
            </Link>
            <Link to={createPageUrl('Home')}>
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-8 py-5">
                חזרה לדף הבית
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-gray-50 flex items-center justify-center p-4 py-12" dir="rtl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mx-auto mb-4">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">דרג את השירות</h1>
          <p className="text-gray-500 mt-1">שתף את החוויה שלך עם הקהילה</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 p-8 border border-gray-100">
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">{proInitials}</span>
            </div>
            <div className="flex-1">
              <p className="font-bold text-gray-900">{proName}</p>
              <p className="text-sm text-gray-500">{professional.role}</p>
              <Badge className="bg-amber-100 text-amber-700 border-0 text-xs mt-1">{serviceName}</Badge>
            </div>
            <Link to={`${createPageUrl('ReviewHistory')}?pro=${encodeURIComponent(proName)}`}>
              <Button variant="ghost" size="sm" className="text-xs text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                <History className="w-3.5 h-3.5 ml-1" />
                היסטוריה
              </Button>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-semibold text-gray-900 block mb-2 text-sm">שמך</label>
              <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 text-right"
                placeholder="הכנס את שמך"
                value={reviewerName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setReviewerName(e.target.value)}
              />
            </div>

            <div className="text-center">
              <p className="font-semibold text-gray-900 mb-4 text-lg">איך היה השירות?</p>
              <div className="flex justify-center gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star className={`w-10 h-10 transition-colors ${
                      star <= (hovered || rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'
                    }`} />
                  </button>
                ))}
              </div>
              {(hovered || rating) > 0 && (
                <motion.p
                  key={hovered || rating}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-amber-600 font-semibold"
                >
                  {ratingLabels[hovered || rating]}
                </motion.p>
              )}
            </div>

            <div>
              <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-amber-500" />
                מה אהבת?
              </p>
              <div className="flex flex-wrap gap-2">
                {quickTags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-amber-500 text-gray-900 border-amber-500'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-semibold text-gray-900 block">משוב כתוב</label>
              <Textarea
                placeholder="ספר לנו עוד על החוויה שלך..."
                value={comment}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                className="rounded-2xl border-gray-200 min-h-[120px] resize-none focus:ring-amber-500 text-right"
                maxLength={500}
              />
              <p className="text-xs text-gray-400 text-left">{comment.length}/500 תווים</p>
            </div>

            <Button
              type="submit"
              disabled={rating === 0 || submitting}
              className="w-full py-6 rounded-2xl bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white text-base font-semibold"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  שולח...
                </span>
              ) : (
                <span className="flex items-center justify-center w-full">
                  <Send className="w-4 h-4 ml-2" />
                  שלח ביקורת
                </span>
              )}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}