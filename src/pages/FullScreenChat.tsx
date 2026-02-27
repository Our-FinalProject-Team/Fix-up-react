import React, { useState, useEffect, useRef, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import ChatHeader from "../components/chat/chatHeader";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";
import DateDivider from "../components/chat/DateDivider";

interface User {
  email: string;
  full_name: string;
}

interface Message {
  id: string;
  content: string;
  sender_email: string;
  created_date: string;
}

export default function Chat() {
  const [currentUser, setCurrentUser] = useState<User | null>({
    email: 'user@example.com',
    full_name: 'User Name',
  });
  const [sending, setSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const mockMessages: Message[] = [
    {
      id: '1',
      content: 'Hello!',
      sender_email: 'user@example.com',
      created_date: new Date().toISOString(),
    },
    {
      id: '2',
      content: 'How are you?',
      sender_email: 'otheruser@example.com',
      created_date: new Date(Date.now() - 1000 * 60).toISOString(), // 1 minute ago
    },
  ];

  const messages = mockMessages;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(
    async (content: string) => {
      if (!currentUser || sending) return;
      setSending(true);
      // כאן תוכל להוסיף לוגיקה לשליחת ההודעה
      setSending(false);
    },
    [currentUser, sending]
  );

  const uniqueSenders = new Set(messages.map((m) => m.sender_email)).size;

  const shouldShowAvatar = (msg: Message, idx: number) => {
    if (idx === 0) return true;
    const prev = messages[idx - 1];
    if (prev.sender_email !== msg.sender_email) return true;
    const prevDate = new Date(prev.created_date);
    const currDate = new Date(msg.created_date);
    return currDate.getTime() - prevDate.getTime() > 5 * 60 * 1000; // 5 min gap
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
    <div className="h-screen flex flex-col bg-zinc-50">
      <ChatHeader onlineCount={Math.max(uniqueSenders, 1)} />

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="max-w-3xl mx-auto space-y-1">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 mb-6">
                <span className="text-2xl">💬</span>
              </div>
              <h2 className="text-lg font-semibold text-zinc-700 mb-1">No messages yet</h2>
              <p className="text-sm text-zinc-400">Be the first to say something!</p>
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

      <ChatInput onSend={handleSend} disabled={sending} />
    </div>
  );
}

