import { format, isValid } from "date-fns";

interface MessageBubbleProps {
  message: any;
  isOwn: boolean;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  // 1. הזמן מגיע כבר מוכן כטקסט מהקומפוננטה האבא (Chat.tsx)
  const displayTime = message.createdAt || "--:--";

  // 2. חילוץ ה-URL של התמונה (תומך בשני הפורמטים: imageUrl או image_url)
  const imgPath = message.imageUrl || message.image_url;

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2 w-full px-2`}>
      <div className={`
        relative p-3 rounded-2xl shadow-sm
        min-w-[120px] 
        max-w-[85%] 
        ${isOwn 
          ? "bg-blue-600 text-white rounded-tr-none ml-auto" 
          : "bg-white text-zinc-800 shadow-sm rounded-tl-none mr-auto"}
      `}>
        
        {/* הצגת תמונה - הוספת localhost:7230 חובה כאן */}
        {imgPath && (
          <div className="mb-2 rounded-lg overflow-hidden border border-black/5 bg-zinc-100">
            <img 
              src={`https://localhost:7230${imgPath}`} 
              alt="קובץ שצורף" 
              className="max-h-64 w-full object-cover cursor-pointer hover:opacity-90 transition"
              // מוודא שהתמונה תיפתח בחלון חדש עם הכתובת המלאה בלחיצה
              onClick={() => window.open(`https://localhost:7230${imgPath}`, '_blank')}
              // אם יש שגיאה בטעינת התמונה, נדפיס אותה כדי שנדע מה הכתובת הבעייתית
              onError={(e) => console.error("Image failed to load:", e.currentTarget.src)}
            />
          </div>
        )}
        
        {/* טקסט ההודעה */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-right">
          {message.content}
        </p>
        
        {/* זמן ההודעה */}
        <div className={`text-[10px] mt-1 flex ${isOwn ? "justify-start" : "justify-end"} opacity-70`}>
          <span>{displayTime}</span>
        </div>
      </div>
    </div>
  );
}