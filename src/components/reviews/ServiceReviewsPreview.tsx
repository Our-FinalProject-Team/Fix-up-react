import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Star, ChevronRight, MessageSquare } from 'lucide-react';
// @ts-ignore - אם אין קובץ הגדרות ל-base44
import ReviewCard from './ReviewCard';

// 1. הגדרת המבנה של חוות דעת בודדת
interface Review {
  id: string | number;
  rating: number;
  professional_name: string;
  reviewer_name?: string;
  comment?: string;
  created_date?: string | Date;
  tags?: string[];
}

// 2. הגדרת ה-Props של הקומפוננטה
interface ServiceReviewsPreviewProps {
  professionalName: string;
  serviceName: string;
}

export default function ServiceReviewsPreview({ 
  professionalName, 
  serviceName 
}: ServiceReviewsPreviewProps) {
  
  // הגדרת ה-State עם הטיפוסים המתאימים
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // הנחה ש-base44 מחזיר מערך של Review
        
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [professionalName]);

  // חישוב ממוצע עם טיפוס מספר
  const avg: string | null = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  // פונקציית עזר לחילוץ ראשי תיבות ל-Link למטה
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <div className="space-y-4" dir="rtl"> {/* הוספתי תמיכה בעברית/RTL */}
      {/* Section header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-500" />
          <h3 className="font-bold text-gray-900 text-lg">ביקורות לקוחות</h3>
          {avg && (
            <div className="flex items-center gap-1 mr-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-800">{avg}</span>
              <span className="text-gray-400 text-sm">({reviews.length})</span>
            </div>
          )}
        </div>
        <Link
          to={`${createPageUrl('ReviewHistory')}?pro=${encodeURIComponent(professionalName)}`}
          className="text-sm text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-1"
        >
          לצפייה בהכל <ChevronRight className="w-4 h-4 rotate-180" />
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map(i => (
            <div key={i} className="bg-gray-100 rounded-2xl h-24 animate-pulse" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <p className="text-gray-400 text-sm">אין עדיין ביקורות. היו הראשונים לדרג!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>
      )}

      {/* Write a Review CTA */}
      <Link
        to={`${createPageUrl('ReviewForm')}?pro=${encodeURIComponent(professionalName)}&service=${encodeURIComponent(serviceName)}&initials=${encodeURIComponent(getInitials(professionalName))}`}
        className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-dashed border-amber-300 text-amber-600 font-semibold hover:bg-amber-50 transition-colors text-sm"
      >
        <Star className="w-4 h-4" />
        כתיבת ביקורת
      </Link>
    </div>
  );
}