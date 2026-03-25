import React, { useState, useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import axios from "axios";
import api from "./api"
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



interface Role{
  role:"Client" | "Technician"
}

interface User {
  email: string;
  fullName: string;
  role: Role;
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
  const [userRole, setUserRole] = useState<Role | null>(() => {
  const savedRole = localStorage.getItem("userRole");
  
  if (!savedRole) return null;

  try {
    // מנסים לעשות Parse למקרה שזה אובייקט JSON
    return JSON.parse(savedRole) as Role;
  } catch (e) {
    // אם ה-Parse נכשל, כנראה שזו מחרוזת פשוטה (כמו "Client")
    // במקרה כזה, נחזיר אובייקט במבנה שהגדרת
    return { role: savedRole as "Client" | "Technician" };
  }
});

 useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("userToken");

    // אם אין טוקן, נגדיר ישר כאורח ונצא
    if (!token) {
      setCurrentUser({
        email: "guest@example.com",
        fullName: "אורח",
        role: { role: "Client" },
        isGuest: true
      });
      return;
    }

    try {
      // בחירת הנתיב לפי התפקיד שנמצא ב-State או ב-LocalStorage
      const endpoint = userRole?.role === "Client" ? "Clients/me" : "Professionals/me";
      
      const response = await api.get(endpoint);
      console.log(response.data);
      
      if (response.data) {
        setCurrentUser({ ...response.data, isGuest: false });
      }
    } catch (error) {
      console.error("שגיאה בטעינת נתוני משתמש:", error);
      // במקרה של שגיאה (למשל טוקן פג תוקף), נחזיר למצב אורח
      setCurrentUser({
        email: "guest@example.com",
        fullName: "אורח",
        role: { role: "Client" },
        isGuest: true
      });
    }
  };

  fetchUser();
}, []); 

useEffect(() => {
  if (!currentUser) return;

  const newConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7230/chatHub", {
      // אם יש לך Authentication, כדאי להוסיף את הטוקן כאן
      accessTokenFactory: () => localStorage.getItem("userToken") || ""
    })
    .withAutomaticReconnect()
    .build();

  const startConnection = async () => {
    try {
      await newConnection.start();
      console.log("Connected to SignalR!");
      setConnection(newConnection);

      // טעינת היסטוריה
      const history = await api.get("Message/history");
      setMessages(Array.isArray(history.data) ? history.data : []);

      newConnection.on("ReceiveMessage", (message: Message) => {
        setMessages(prev => [...prev, message]);
      });
    } catch (err) {
      console.error("Connection or History failed: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  startConnection();

  // פונקציית Cleanup - חשוב מאוד!
  return () => {
    if (newConnection) {
      newConnection.stop(); // סוגר את החיבור כשיוצאים מהדף
      newConnection.off("ReceiveMessage");
    }
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
    
    // 1. העלאת הקובץ לשרת וקבלת הנתיב שלו
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      
      const uploadRes = await api.post("Message/upload", formData); 
      // חשוב: לוודא שהשרת מחזיר אובייקט עם שדה בשם url
      uploadedUrl = uploadRes.data.url; 
    }

    // 2. בניית ה-DTO עם ה-URL המעודכן (כך הוא יישמר ב-DB)
    const messageDto = {
      id: 0,
      content: content,
      createdAt: new Date().toISOString(),
      senderId: (currentUser as any).id || 0,
      senderName: currentUser.fullName,
      senderRole: currentUser.role?.role || "Client", 
      imageUrl: uploadedUrl, // כאן נכנס ה-URL שקיבלנו מהשלב הקודם
      categoryId: Number(currentUser.categoryId) || 0 
    };

    // 3. שליחת ההודעה השלמה לשרת לשמירה ב-Database
    const response = await api.post("Message/send", messageDto);

    // 4. עדכון ה-UI המקומי כדי לראות את ההודעה מיד
    // כדאי להשתמש בנתונים שחזרו מהשרת (כמו ה-ID האמיתי)
    const savedMessage = response.data || messageDto;
    setMessages(prev => [...prev, savedMessage]);

    // 5. שידור לשאר המשתמשים דרך SignalR
    if (connection && connection.state === "Connected") {
      await connection.invoke("SendMessage", savedMessage);
    }

  } catch (error) {
    console.error("שגיאה בתהליך השליחה והעלאת התמונה:", error);
  }
}, [currentUser, connection]);

  const displayMessages = messages.filter(msg => {
    if (!currentUser) return false;
    if (userRole?.role === "Client") return true;
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
            const isOwn = msg.senderName === (currentUser.fullName || currentUser.fullName);            return (
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
                <div className={`w-6 h-6 rounded-full ${getAvatarColor2(currentUser.fullName)} text-white flex items-center justify-center text-[10px] font-bold`}>
                   {getInitials(currentUser.fullName)}
                </div>
                <span className="text-xs text-gray-500 font-bold">כותבת כעת: {currentUser.fullName}</span>
              </div>
              <ChatInput onSend={handleSend} disabled={!connection} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
