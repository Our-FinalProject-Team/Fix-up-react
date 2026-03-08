import React, { useState, useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios"; // השתמשי ב-axios לשליחת קבצים ו-POST
import { Loader2 } from "lucide-react";
import ChatHeader from "../components/chat/chatHeader";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";

interface User {
  email: string;
  full_name: string;
  role: "Client" | "Technician";
  categoryId?: number;
}

interface Message {
  id?: string;
  content: string;
  senderName: string;
  senderRole: string;
  imageUrl?: string; // נוסף שדה לתמונה
  createdAt?: string; // השרת מחזיר CreatedAt
  categoryId: number;
}

export default function Chat() {
  const [currentUser] = useState<User>({
    email: 'user@example.com',
    full_name: 'ישראל ישראלי',
    role: "Client"
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 1. הקמת החיבור ל-SignalR
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7230/chatHub")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  // 2. הפעלת החיבור והאזנה להודעות
  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log("Connected to SignalR!");
          setIsLoading(false);

          // האזנה לאירוע ReceiveMessage
          connection.on("ReceiveMessage", (message: Message) => {
            setMessages(prev => [...prev, message]);
          });
        })
        .catch(e => console.error("Connection failed: ", e));

      return () => {
        connection.off("ReceiveMessage");
      };
    }
  }, [connection]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 3. לוגיקת שליחה משולבת: העלאת תמונה ושליחת הודעה
  const handleSend = useCallback(
    async (content: string, file?: File) => {
      let uploadedUrl = "";

      try {
        // שלב א': אם יש קובץ, מעלים אותו קודם לשרת
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          
          const uploadRes = await axios.post("https://localhost:7230/api/messages/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" }
          });
          uploadedUrl = uploadRes.data.url;
        }

        // שלב ב': שליחת ההודעה (עם ה-URL של התמונה אם קיים) ל-Controller
        const messageDto: Message = {
          content: content,
          senderName: currentUser.full_name,
          senderRole: currentUser.role,
          imageUrl: uploadedUrl,
          categoryId: 0 
        };

        // אנחנו שולחים ל-API (POST) ולא ל-Hub ישירות, כדי שה-Controller יטפל בשמירה ובבוט
        await axios.post("https://localhost:7230/api/messages/send", messageDto);

      } catch (error) {
        console.error("Error in handleSend:", error);
      }
    },
    [currentUser]
  );

  // סינון הודעות
  const displayMessages = messages.filter(msg => {
    if (currentUser.role === "Client") return true;
    return msg.categoryId === currentUser.categoryId || msg.categoryId === 0;
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mr-2 text-zinc-500">מתחבר לצ'אט חי...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <ChatHeader onlineCount={1} />

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ backgroundColor: "#f0f2f5" }}>
        <div className="max-w-3xl mx-auto space-y-1">
          {displayMessages.map((msg, idx) => (
            <MessageBubble
              key={idx}
              message={msg}
              isOwn={msg.senderName === currentUser.full_name}
              showAvatar={true}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-2">
        <div className="max-w-3xl mx-auto">
          {/* ודאי ש-ChatInput תומך בהעברת קובץ כפרמטר שני ב-onSend */}
          <ChatInput onSend={handleSend} disabled={!connection} />
        </div>
      </div>
    </div>
  );
}
