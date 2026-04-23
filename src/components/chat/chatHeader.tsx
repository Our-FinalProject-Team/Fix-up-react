import React from "react";
import { MessageCircle, Users } from "lucide-react";

interface ChatHeaderProps {
  onlineCount: number;
}

export default function ChatHeader({ onlineCount }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <MessageCircle className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-zinc-900 tracking-tight">Group Chat</h1>
          <p className="text-xs text-zinc-400 font-medium">
            {onlineCount} {onlineCount === 1 ? "member" : "members"} active
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-50 border border-zinc-100">
        <Users className="h-3.5 w-3.5 text-zinc-400" />
        <span className="text-xs font-medium text-zinc-500">{onlineCount}</span>
      </div>
    </div>
  );
}
