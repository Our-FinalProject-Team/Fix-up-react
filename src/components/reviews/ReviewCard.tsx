import React from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
// @ts-ignore
import { formatDistanceToNow } from 'date-fns';
import { he } from 'date-fns/locale';

// 1. הגדרת המבנה של הנתונים (Interface)
interface Review {
  reviewer_name?: string;
  created_date?: string | Date;
  rating: number;
  comment?: string;
  tags?: string[];
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // המרת התאריך בצורה בטוחה
  const date = review.created_date ? new Date(review.created_date) : null;

  // פונקציית עזר ליצירת ראשי התיבות (Initials)
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5" dir="rtl">
      <div className="flex items-start gap-4">
        {/* אווטאר */}
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">
            {review.reviewer_name ? getInitials(review.reviewer_name) : 'U'}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <p className="font-semibold text-gray-900">{review.reviewer_name || 'אנונימי'}</p>
            {date && (
            <span className="text-xs text-gray-400">
                {formatDistanceToNow(date, { 
                addSuffix: true, 
                locale: he 
                })}
            </span>
            )}
          </div>

          {/* כוכבי דירוג */}
          <div className="flex gap-0.5 mt-1 mb-2" dir="ltr"> {/* הכוכבים צריכים להישאר משמאל לימין */}
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= review.rating ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>

          {/* תגובה */}
          {review.comment && (
            <p className="text-gray-600 text-sm leading-relaxed mb-3">{review.comment}</p>
          )}

          {/* תגיות */}
          {review.tags && review.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {review.tags.map((tag) => (
                <Badge key={tag} className="bg-amber-50 text-amber-700 border-0 text-xs font-medium px-2 py-0.5">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}