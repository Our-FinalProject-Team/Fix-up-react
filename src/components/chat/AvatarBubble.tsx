import React from "react";

const COLORS = [
  "from-blue-400 to-blue-600",
  "from-violet-400 to-violet-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-orange-500",
  "from-rose-400 to-rose-600",
  "from-cyan-400 to-cyan-600",
  "from-fuchsia-400 to-fuchsia-600",
  "from-teal-400 to-teal-600",
];

function getColorFromEmail(email: string): string {
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = email.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string | undefined, email: string): string {
  if (name && name.trim()) {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return parts[0][0].toUpperCase();
  }
  return email[0].toUpperCase();
}

interface AvatarBubbleProps {
  email: string;
  name: string;
  size?: "sm" | "md";
}

export default function AvatarBubble({ email, name, size = "md" }: AvatarBubbleProps) {
  const gradient = getColorFromEmail(email || "");
  const initials = getInitials(name, email || "?");
  const sizeClasses = size === "sm" ? "h-7 w-7 text-[10px]" : "h-9 w-9 text-xs";

  return (
    <div
      className={`${sizeClasses} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-semibold shadow-sm flex-shrink-0`}
      title={email}
    >
      {initials}
    </div>
  );
}
