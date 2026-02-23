import React from "react";
import { useToast } from "./use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

// Type for a single toast object
interface ToastItem {
  id: string | number;
  title?: string;
  description?: string;
  action?: React.ReactNode;
  [key: string]: any; // For any other props that Toast may accept
}

export const Toaster: React.FC = () => {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {/* השתמשנו ב-any כאן כדי לעקוף את חוסר ההתאמה של הספרייה */}
      {toasts.map(function ({ id, title, description, action, ...props }: any) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
};