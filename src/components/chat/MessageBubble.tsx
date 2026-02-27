import React from "react";
import { format } from "date-fns";
import AvatarBubble from "./AvatarBubble";

interface Message {
  content: string;
  created_date?: string;
  sender_email?: string;
  sender_name?: string;
}

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  showAvatar: boolean;
}

export default function MessageBubble({ message, isOwn, showAvatar }: MessageBubbleProps) {
  const time = message.created_date ? format(new Date(message.created_date), "HH:mm") : "";

  if (isOwn) {
    return (
      <div className="flex justify-end gap-2 group">
        <div className="flex flex-col items-end max-w-[75%]">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-4 py-2.5 rounded-2xl rounded-br-md shadow-sm shadow-blue-500/10">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
          </div>
          <span className="text-[10px] text-zinc-300 mt-1 mr-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {time}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 group">
      {showAvatar ? (
        <AvatarBubble email={message.sender_email || ''} name={message.sender_name || ''} />
      ) : (
        <div className="w-9 flex-shrink-0" />
      )}
      <div className="flex flex-col max-w-[75%]">
        {showAvatar && (
          <div className="flex items-center gap-2 mb-1 ml-1">
            <span className="text-xs font-semibold text-zinc-700">
              {message.sender_name || message.sender_email}
            </span>
            <span className="text-[10px] text-zinc-300">{message.sender_email}</span>
          </div>
        )}
        <div className="bg-white border border-zinc-100 px-4 py-2.5 rounded-2xl rounded-bl-md shadow-sm">
          <p className="text-sm text-zinc-800 leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
        </div>
        <span className="text-[10px] text-zinc-300 mt-1 ml-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {time}
        </span>
      </div>
    </div>
  );
}
