import React, { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { Star, Send, CheckCircle, Wrench, ThumbsUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';

// Define the shape of the professional object
interface Professional {
  name: string;
  role: string;
  service: string;
  date: string;
}

const quickTags: string[] = [
  'On time', 'Professional', 'Clean work', 'Friendly',
  'Good value', 'Highly skilled', 'Communicative', 'Thorough'
];

const professional: Professional = {
  name: 'Mike Johnson',
  role: 'Expert Technician',
  service: 'General Repair',
  date: 'Feb 24, 2026',
};

export default function ReviewForm() {
  // Properly typed State Hooks
  const [rating, setRating] = useState<number>(0);
  const [hovered, setHovered] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const toggleTag = (tag: string): void => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (rating === 0) return;
    setSubmitted(true);
  };

  const ratingLabels: string[] = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-sm"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Submitted!</h2>
          <p className="text-gray-500 mb-8">Thank you for your feedback. It helps others find great professionals.</p>
          <Link to={createPageUrl('Home')}>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-2xl px-8 py-5">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-gray-50 flex items-center justify-center p-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30 mx-auto mb-4">
            <Wrench className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Rate Your Service</h1>
          <p className="text-gray-500 mt-1">Share your experience with the community</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/80 p-8 border border-gray-100">
          {/* Professional Info */}
          <div className="flex items-center gap-4 mb-8 p-4 bg-gray-50 rounded-2xl">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">MJ</span>
            </div>
            <div>
              <p className="font-bold text-gray-900">{professional.name}</p>
              <p className="text-sm text-gray-500">{professional.role}</p>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-amber-100 text-amber-700 border-0 text-xs">{professional.service}</Badge>
                <span className="text-xs text-gray-400">{professional.date}</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Star Rating */}
            <div className="text-center">
              <p className="font-semibold text-gray-900 mb-4 text-lg">How would you rate this service?</p>
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
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hovered || rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-200 fill-gray-200'
                      }`}
                    />
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

            {/* Quick Tags */}
            <div>
              <p className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-amber-500" />
                What did you like?
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

            {/* Written Feedback */}
            <div className="space-y-2">
              <label className="font-semibold text-gray-900 block">Written Feedback</label>
              <Textarea
                placeholder="Tell us more about your experience... What went well? Any suggestions for improvement?"
                value={comment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComment(e.target.value)}
                className="rounded-2xl border-gray-200 min-h-[120px] resize-none focus:ring-amber-500"
              />
              <p className="text-xs text-gray-400 text-right">{comment.length}/500 characters</p>
            </div>

            <Button
              type="submit"
              disabled={rating === 0}
              className="w-full py-6 rounded-2xl bg-gray-900 hover:bg-gray-800 disabled:opacity-40 text-white text-base font-semibold"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}