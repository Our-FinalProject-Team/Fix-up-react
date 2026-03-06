import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import ChatHeader from "../components/chat/chatHeader";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";
import DateDivider from "../components/chat/DateDivider";

// --- Interfaces המעודכנים ---
interface User {
  email: string;
  full_name: string;
}

interface Message {
  id: string;
  content: string;
  sender_email: string;
  created_date: string;
  image_url?: string; // הוספנו תמיכה בקישור לתמונה מהענן
}

export default function Chat() {
  const [currentUser, setCurrentUser] = useState<User | null>({
    email: 'user@example.com',
    full_name: 'User Name',
  });
  const [sending, setSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  // הודעות דוגמה הכוללות תמונה (כדי שתראי איך זה נראה)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'היי, יש לי תקלה בברז במטבח',
      sender_email: 'user@example.com',
      created_date: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    },
    {
      id: '2',
      content: 'תוכל לשלוח לי צילום של הנזילה?',
      sender_email: 'otheruser@example.com',
      created_date: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    },
    {
      id: '3',
      content: 'הנה התמונה:',
      sender_email: 'user@example.com',
      created_date: new Date().toISOString(),
      image_url: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg' // דוגמה לתמונה מהענן
    },
  ]);

  // גלילה אוטומטית למטה
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- לוגיקת השליחה המעודכנת ---
  const handleSend = useCallback(
    async (content: string, imageFile?: File) => {
      if (!currentUser || sending) return;
      if (!content.trim() && !imageFile) return;

      setSending(true);

      try {
        // הכנת הנתונים למשלוח לשרת ה-#C
        const formData = new FormData();
        formData.append("content", content);
        formData.append("sender_email", currentUser.email);
        
        if (imageFile) {
          formData.append("image", imageFile); // השרת יקבל את זה ויעלה ל-Cloudinary
        }

        // שליחה ל-API שלך (תחליפי לכתובת ה-Render/Localhost שלך)
        const response = await fetch("https://your-api.com/api/chat/send", {
          method: "POST",
          body: formData, // שליחת FormData במקום JSON
        });

        if (!response.ok) throw new Error("Failed to send");

        const newMessage = await response.json();
        
        // עדכון ה-UI עם ההודעה החדשה שחזרה מהשרת (כולל ה-URL של התמונה)
        setMessages(prev => [...prev, newMessage]);

      } catch (error) {
        console.error("Error sending message:", error);
        alert("שגיאה בשליחת ההודעה");
      } finally {
        setSending(false);
      }
    },
    [currentUser, sending]
  );

  // חישובים לתצוגה
  const uniqueSenders = new Set(messages.map((m) => m.sender_email)).size;

  const shouldShowAvatar = (msg: Message, idx: number) => {
    if (idx === 0) return true;
    const prev = messages[idx - 1];
    if (prev.sender_email !== msg.sender_email) return true;
    const prevDate = new Date(prev.created_date);
    const currDate = new Date(msg.created_date);
    return currDate.getTime() - prevDate.getTime() > 5 * 60 * 1000;
  };

  const shouldShowDate = (msg: Message, idx: number) => {
    if (idx === 0) return true;
    const prev = messages[idx - 1];
    const prevDay = format(new Date(prev.created_date), "yyyy-MM-dd");
    const currDay = format(new Date(msg.created_date), "yyyy-MM-dd");
    return prevDay !== currDay;
  };

  if (!currentUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="h-6 w-6 animate-spin text-zinc-300" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ChatHeader onlineCount={Math.max(uniqueSenders, 1)} />

      <div 
        className="flex-1 overflow-y-auto px-4 py-4 relative"
        style={{
          backgroundColor: "#f0f2f5",
          backgroundImage: `url('https://www.transparenttextures.com/patterns/subtle-dots.png')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-3xl mx-auto space-y-1 relative z-10">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h2 className="text-lg font-semibold text-zinc-700 mb-1">אין הודעות עדיין</h2>
              <p className="text-sm text-zinc-400">תהיו הראשונים לכתוב משהו!</p>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isOwn = msg.sender_email === currentUser.email;
              const showDate = shouldShowDate(msg, idx);
              const showAvatar = shouldShowAvatar(msg, idx);
              return (
                <React.Fragment key={msg.id}>
                  {showDate && <DateDivider date={msg.created_date} />}
                  <div className={showAvatar && idx > 0 ? "pt-3" : "pt-0.5"}>
                    <MessageBubble
                      message={msg}
                      isOwn={isOwn}
                      showAvatar={showAvatar}
                    />
                  </div>
                </React.Fragment>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-zinc-200 p-2">
        <div className="max-w-3xl mx-auto">
          {/* וודאי ש-ChatInput שלך מקבל imageFile בפונקציית ה-onSend */}
          <ChatInput onSend={handleSend} disabled={sending} />
        </div>
      </div>
    </div>
  );
}
