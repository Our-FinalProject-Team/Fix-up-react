import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * פונקציה לשילוב מחלקות Tailwind בצורה בטוחה
 * מטפלת בכפילויות ובתנאים
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}


export const isIframe: boolean = typeof window !== "undefined" && window.self !== window.top;