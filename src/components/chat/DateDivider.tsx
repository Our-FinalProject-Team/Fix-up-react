import React from "react";
import { format, isToday, isYesterday } from "date-fns";

interface DateDividerProps {
  date: string | Date;
}

export default function DateDivider({ date }: DateDividerProps) {
  const d = new Date(date);
  let label: string;
  
  if (isToday(d)) label = "Today";
  else if (isYesterday(d)) label = "Yesterday";
  else label = format(d, "MMMM d, yyyy");

  return (
    <div className="flex items-center gap-4 my-6">
      <div className="flex-1 h-px bg-zinc-100" />
      <span className="text-[11px] font-medium text-zinc-300 uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-px bg-zinc-100" />
    </div>
  );
}
