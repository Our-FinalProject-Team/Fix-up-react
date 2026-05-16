/// <reference types="vite/client" />
import  { useState, useEffect, useRef, useCallback } from "react";
import * as signalR from "@microsoft/signalr";
import api from "./api"
import { Loader2 } from "lucide-react";
import ChatHeader from "../components/chat/chatHeader";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";
//import { GoogleGenerativeAI } from "@google/generative-ai";
import { getAvatarColor2, getInitials, formatDateTime } from "../utils/chatUtils";
import {useChatSound} from '../hooks/useChatSound';
import { useSearchParams,useNavigate } from "react-router-dom";

export type UserRole = "Client" | "Professional";

interface User {
  email: string;
  fullName: string;
  role: UserRole;
  categoryId?: number;
  isGuest?: boolean;
  id?: number;
}

interface Message {
  id?: string;
  content: string;
  createdAt?: string;
  conversationId?: string;
  senderId: string,
  senderName: string;
  senderRole: string;
  categoryId: number;
  imageUrl?: string;
}


export default  function Chat() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-0",
      conversationId: "",
      content: "👏 Fix-Up ברוכים הבאים לאפליקציית\n" + 
             "כדי שנוכל לתת לכם מענה מהיר ומדויק, נשמח אם תתארו בקצרה את מהות התקלה\n" +
             "טיפ: צרוף תמונה 📸 יעזור לנו לתת לכם חווית שירות טובה יותר",
      senderId: "10000",
      senderName: "מערכת אוטומטית",
      senderRole: "System",
      createdAt: new Date().toISOString(),
      categoryId: 0
    }
  ]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [hasUnlockedAudio, setHasUnlockedAudio] = useState(false);
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
  const savedRole = localStorage.getItem("userRole");
  
  if (!savedRole) return null;

  try {
    return JSON.parse(savedRole) as UserRole;
  } catch (e) {
    // אם ה-Parse נכשל, כנראה שזו מחרוזת פשוטה (כמו "Client")
    // במקרה כזה, נחזיר אובייקט במבנה שהגדרת
    return savedRole as UserRole;
  }
});
const conversationId = searchParams.get("id");
const playNotification = useChatSound();

useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.senderName !== currentUser?.fullName) {
        playNotification();
      }
    }
  }, [messages, currentUser?.fullName, playNotification]);

 useEffect(() => {
  const fetchUser = async () => {
    const token = localStorage.getItem("userToken");

    // אם אין טוקן, נגדיר ישר כאורח ונצא
    if (!token) {
      setCurrentUser({
        email: "guest@example.com",
        fullName: "אורח",
        role:  "Client" as UserRole,
        isGuest: true,
        id:0
      });
      return;
    }

    try {
      const endpoint = userRole  === "Client" ? "Clients/me" : "Professionals/me";
      
      const response = await api.get(endpoint);
      
      if (response.data) {
        setCurrentUser({ ...response.data, isGuest: false });
      }
    } catch (error) {
      console.error("שגיאה בטעינת נתוני משתמש:", error);
      setCurrentUser({
        email: "guest@example.com",
        fullName: "אורח",
        role:  "Client" as UserRole,
        isGuest: true,
        id:0
      });
    }
  };

  fetchUser();
}, []); 


useEffect(() => {
  if (!currentUser) return;

  // 1. טיפול ב-ID של השיחה קודם כל
  if (!conversationId) {
    const newGuid = crypto.randomUUID();
    setSearchParams({ id: newGuid });
    return; // עוצרים כאן, ה-Effect ירוץ שוב עם ה-ID החדש
  }

  // 2. בניית חיבור SignalR
  const newConnection = new signalR.HubConnectionBuilder()
    .withUrl("https://fixup-fullstack.onrender.com/chatHub", {
      accessTokenFactory: () => localStorage.getItem("userToken") || ""
    })
    .withAutomaticReconnect()
    .build();

  const startConnection = async () => {
    try {
      // טעינת היסטוריה במקביל לחיבור (חוסך זמן)
      const historyPromise = api.get(`Message/history/${conversationId}`);
      const connectionPromise = newConnection.start();

      const [historyResponse] = await Promise.all([historyPromise, connectionPromise]);
      console.log("this is the data",historyResponse.data);
      
      getInitials(historyResponse.data?.[0]?.senderName || "מערכת אוטומטית"); // וודא שיש שם לשימוש בהודעות

      console.log("Connected to SignalR!");
      setConnection(newConnection);
      
      // עדכון הודעות - אם אין היסטוריה, נשארים עם מערך ריק
      setMessages(Array.isArray(historyResponse.data) ? historyResponse.data : []);

      await newConnection.invoke("JoinConversation", conversationId);

      // האזנה להודעות חדשות
      newConnection.on("ReceiveMessage", (message: Message) => {
        // חשוב: לוודא שההודעה שייכת לשיחה הנוכחית
        if (Number(message.senderId) === currentUser.id) {
          return;
        }
        if (message.conversationId === conversationId) {
          console.log("New message arrived:", message)
          setMessages(prev => [...prev, message]);
        }
      });

      newConnection.on("ReceiveNewJob", (job: any) => {
        console.log("הגיעה הצעה לעבודה חדשה!", job);
        
    });

    } catch (err) {
      console.error("Connection or History failed: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  startConnection();

  return () => {
    if (newConnection) {
      newConnection.off("ReceiveMessage");
      newConnection.off("ReceiveNewJob");

      newConnection.stop();
    }
  };
}, [currentUser, conversationId, setSearchParams]); // התלויות הנדרשות

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  
  const handleInteraction = () => {
  if (!hasUnlockedAudio) {
    // מפעילים פעם אחת בלבד כדי "לאשר" לדפדפן, ואז מפסיקים
    playNotification(); 
    setHasUnlockedAudio(true);
  }
};

const handleSend = useCallback(async (content: string, file?: File) => {
  if (!currentUser || currentUser.isGuest) {
    alert("אורחים אינם מורשים לשלוח הודעות");
    return;
  }

  if (!file && (!content || content.trim() === "")) return;

  // 1. יצירת אובייקט הודעה זמני כדי להציג מיד על המסך
  const roleObj = localStorage.getItem("userRole") || 'Client';
  const cleanRole = roleObj;
  console.log("this is the user name",currentUser.fullName);
  
  const tempMessage: Message = {
    id: Date.now().toString(), // מזהה זמני
    content: content,
    senderName: currentUser.fullName,
    senderRole: cleanRole,
    createdAt: new Date().toISOString(),
    categoryId: currentUser.categoryId || 0,
    conversationId: conversationId || "",
    imageUrl: file ? URL.createObjectURL(file) : undefined ,
    senderId: currentUser.id ? String(currentUser.id) : "0"
  };

  // 2. עדכון ה-UI באופן מיידי
 

  try {
    const formData = new FormData();
    if (file) formData.append("image", file);
    
    formData.append("Content", content || "");
    formData.append("CreatedAt", new Date().toISOString());
    formData.append("ConversationId", conversationId || "");
    formData.append("SenderId", String(currentUser.id || 0));
    formData.append("SenderName", currentUser.fullName || "");
    formData.append("SenderRole", cleanRole);
    formData.append("CategoryId", String(currentUser.categoryId || 0));

    // 3. שליחה לשרת ברקע
    const response = await api.post("Message/send", formData);

    if (response.data && response.data.success) {
      // כאן אפשר לעדכן את המזהה הזמני במזהה האמיתי מהשרת אם רוצים
      const serverMessage = response.data.message;
      console.log("Server message:", serverMessage);
      
     setMessages(prev => [
    ...prev.filter(m => m.id !== tempMessage.id),
    serverMessage
  ]);

      
    }
  } catch (error) {
    console.error("שגיאה בשליחה:", error);
    // אופציונלי: למחוק את ההודעה מהמסך אם השליחה נכשלה
    alert("חלה שגיאה בשליחת ההודעה");
  }
}, [currentUser, conversationId]);

  const displayMessages = messages.filter(msg => {
    if (!currentUser) return false;
    if (userRole === "Client") return true;
    return msg.categoryId === currentUser.categoryId || msg.categoryId === 0;
  });

  if (isLoading || !currentUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-zinc-50 font-sans">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mr-2 text-zinc-500">טוען צ'אט</p>
      </div>
    );
  }

 return (
    <div 
      className="h-screen flex flex-col overflow-hidden font-sans"
      onClick={handleInteraction} // קורא לפונקציה החדשה שבודקת אם כבר אישרנו
    >
      <ChatHeader onlineCount={1} />

      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ backgroundColor: "#f0f2f5" }}>
        <div className="max-w-3xl mx-auto space-y-4">
          {displayMessages.map((msg, idx) => {
            // תיקון קטן: בדיקה שהשולח הוא לא אני (לפי ה-fullName)
            const isOwn = String(msg.senderId) === String(currentUser.id);            return (
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
                <span className="text-xs text-gray-500 font-bold">כותב כעת: {currentUser.fullName}</span>
              </div>
              <ChatInput onSend={handleSend} disabled={!connection} />
            </>
          )}
        </div>
      </div>
    </div>
  )};