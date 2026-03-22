import { format, isValid } from "date-fns";

interface MessageBubbleProps {
  message: any;
  isOwn: boolean;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  // 1. בודקים איזה שדה מגיע מהשרת (בדרך כלל באותיות קטנות ב-JSON)
  // נסי createdAt או createdDate בהתאם למה שמופיע ב-Network tab
  const dateValue = new Date(message.createdAt || message.created_date || Date.now());

  // 2. מוודאים שהתאריך תקין לפני העיצוב
  const formattedTime = isValid(dateValue) ? format(dateValue, "HH:mm") : "--:--";

  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[70%] p-3 rounded-2xl ${isOwn ? "bg-blue-600 text-white" : "bg-white text-zinc-800 shadow-sm"}`}>
        
        {/* שימי לב שגם כאן השם בשרת הוא כנראה imageUrl (בלי קו תחתון) */}
        {(message.imageUrl || message.image_url) && (
          <img 
            src={message.imageUrl || message.image_url} 
            alt="Attachment" 
            className="rounded-lg mb-2 max-h-60 w-full object-cover cursor-pointer hover:opacity-90 transition"
            onClick={() => window.open(message.imageUrl || message.image_url, '_blank')}
          />
        )}
        
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        <span className={`text-[10px] block mt-1 ${isOwn ? "text-blue-100" : "text-zinc-400"}`}>
          {formattedTime}
        </span>
      </div>
    </div>
  );
}