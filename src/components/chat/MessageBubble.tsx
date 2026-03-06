import { format } from "date-fns";

interface MessageBubbleProps {
  message: any;
  isOwn: boolean;
  showAvatar?: boolean;
}

export default function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-2`}>
      <div className={`max-w-[70%] p-3 rounded-2xl ${isOwn ? "bg-blue-600 text-white" : "bg-white text-zinc-800 shadow-sm"}`}>
        
        {/* אם יש תמונה בהודעה - נציג אותה */}
        {message.image_url && (
          <img 
            src={message.image_url} 
            alt="Fault preview" 
            className="rounded-lg mb-2 max-h-60 w-full object-cover cursor-pointer hover:opacity-90 transition"
            onClick={() => window.open(message.image_url, '_blank')}
          />
        )}
        
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        
        <span className={`text-[10px] block mt-1 ${isOwn ? "text-blue-100" : "text-zinc-400"}`}>
          {format(new Date(message.created_date), "HH:mm")}
        </span>
      </div>
    </div>
  );
}
