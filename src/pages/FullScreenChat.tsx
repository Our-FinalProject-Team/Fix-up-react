import React, { useState, useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { Loader2 } from "lucide-react";
import ChatHeader from "../components/chat/chatHeader";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";

const getAvatarColor2 = (name: any): string => {
  if (!name || typeof name !== 'string') return "bg-gray-400";
  
  const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-orange-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500"];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

const getInitials = (name: any): string => {
  if (!name || typeof name !== 'string') return "U";
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name[0] ? name[0].toUpperCase() : "U";
};

const formatDateTime = (dateString?: string) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleString("he-IL", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "";
  }
};

interface User {
  email: string;
  full_name: string;
  role: "Client" | "Technician";
  categoryId?: number;
  isGuest?: boolean;
}

interface Message {
  id?: string;
  content: string;
  senderName: string;
  senderRole: string;
  imageUrl?: string;
  createdAt?: string;
  categoryId: number;
}

export default function Chat() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // 1. טעינת משתמש
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setCurrentUser({ ...JSON.parse(savedUser), isGuest: false });
    } else {
      setCurrentUser({
        email: "guest@example.com",
        full_name: "אורח",
        role: "Client",
        isGuest: true
      });
    }
  }, []);

  // 2. חיבור וטעינת היסטוריה
  useEffect(() => {
    if (!currentUser) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:7230/chatHub")
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(async () => {
        console.log("Connected to SignalR!");
        setConnection(newConnection);
        
        try {
          const history = await axios.get("https://localhost:7230/api/messages/history");
          // ודא שהנתונים שמגיעים הם מערך
          setMessages(Array.isArray(history.data) ? history.data : []);
        } catch (err) {
          console.error("Failed to load history", err);
        } finally {
          setIsLoading(false);
        }

        newConnection.on("ReceiveMessage", (message: Message) => {
          setMessages(prev => [...prev, message]);
        });
      })
      .catch(e => {
        console.error("Connection failed: ", e);
        setIsLoading(false);
      });

    return () => { 
        if(newConnection) newConnection.off("ReceiveMessage"); 
    };
  }, [currentUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = useCallback(async (content: string, file?: File) => {
      if (!currentUser || currentUser.isGuest) {
        alert("אורחים אינם מורשים לשלוח הודעות");
        return;
      }

      try {
        let uploadedUrl = "";
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const uploadRes = await axios.post("https://localhost:7230/api/messages/upload", formData);
          uploadedUrl = uploadRes.data.url;
        }

        const messageDto = {
          content: content,
          senderName: currentUser.full_name,
          senderRole: currentUser.role,
          imageUrl: uploadedUrl || "",
          categoryId: currentUser.categoryId || 0 
        };

        await axios.post("https://localhost:7230/api/messages/send", messageDto);
      } catch (error) {
        console.error("Error in handleSend:", error);
      }
    }, [currentUser]);

  const displayMessages = messages.filter(msg => {
    if (!currentUser) return false;
    if (currentUser.role === "Client") return true;
    return msg.categoryId === currentUser.categoryId || msg.categoryId === 0;
  });

  if (isLoading || !currentUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50 font-sans">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mr-2 text-zinc-500">טוען צ'אט...</p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden font-sans">
      <ChatHeader onlineCount={1} />

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ backgroundColor: "#f0f2f5" }}>
        <div className="max-w-3xl mx-auto space-y-4">
          {displayMessages.map((msg, idx) => {
            const isOwn = msg.senderName === currentUser.full_name;
            return (
              <div key={idx} className={`flex items-end gap-2 ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getAvatarColor2(msg.senderName)} text-white flex items-center justify-center text-[10px] font-bold shadow-sm`}>
                  {getInitials(msg.senderName)}
                </div>

                <div className="max-w-[80%]">
                   <MessageBubble
                    message={{
                        ...msg,
                        createdAt: formatDateTime(msg.createdAt) 
                    }}
                    isOwn={isOwn}
                    showAvatar={false}
                  />
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t p-4 shadow-lg">
        <div className="max-w-3xl mx-auto">
          {currentUser.isGuest ? (
            <div className="flex items-center justify-between bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold border border-blue-200">?</div>
                <div>
                  <p className="text-sm font-bold text-blue-900">מצב אורח</p>
                  <p className="text-xs text-blue-700">התחברי כדי לכתוב</p>
                </div>
              </div>
              <button onClick={() => window.location.href = '/login'} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold">התחברות</button>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className={`w-6 h-6 rounded-full ${getAvatarColor2(currentUser.full_name)} text-white flex items-center justify-center text-[10px] font-bold`}>
                   {getInitials(currentUser.full_name)}
                </div>
                <span className="text-xs text-gray-500 font-bold">כותבת כעת: {currentUser.full_name}</span>
              </div>
              <ChatInput onSend={handleSend} disabled={!connection} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
