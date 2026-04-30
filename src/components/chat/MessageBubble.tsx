
import { format, isValid } from "date-fns";

interface MessageBubbleProps {
  message: any;
  isOwn: boolean;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  // 1. זמן ההודעה
  const displayTime = message.createdAt || "--:--";

  // 2. חילוץ ה-URL של התמונה
  const imgPath = message.imageUrl || message.image_url;

  // פונקציית עזר לבניית ה-URL הנכון
  const getFullImageUrl = (path: string) => {
    if (!path) return "";
    // אם הכתובת היא כבר URL מלא (מתחילה ב-http) או שהיא Blob מקומי (מתחילה ב-blob)
    if (path.startsWith("http") || path.startsWith("blob:")) {
      return path;
    }
    // אחרת, נוסיף את כתובת השרת (וודא שאין סלאש כפול)
    const baseUrl = "https://localhost:7230";
    return path.startsWith("/") ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  };

  const finalImgUrl = imgPath ? getFullImageUrl(imgPath) : null;

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
        
        {/* הצגת תמונה */}
        {finalImgUrl && (
          <div className="mb-2 rounded-lg overflow-hidden border border-black/5 bg-zinc-100">
            <img 
              src={finalImgUrl} 
              alt="קובץ שצורף" 
              className="max-h-64 w-full object-cover cursor-pointer hover:opacity-90 transition"
              // פתיחה בחלון חדש רק עם הכתובת המעובדת והתקינה
              onClick={() => window.open(finalImgUrl, '_blank')}
              onError={(e) => console.error("Image failed to load:", e.currentTarget.src)}
            />
          </div>
        )}
        
        {/* טקסט ההודעה */}
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-right" dir="rtl">
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