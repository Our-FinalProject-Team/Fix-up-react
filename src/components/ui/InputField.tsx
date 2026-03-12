import React, { forwardRef, ChangeEvent } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

// הגדרת ה-Props
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
  showToggle?: boolean;
  onToggle?: () => void;
  isVisible?: boolean;
}

// הרכיב עצמו
export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, icon: Icon, showToggle, onToggle, isVisible, ...props }, ref) => {
    return (
      <div className="space-y-2" dir="rtl">
        <label className="block text-sm font-medium text-stone-600">{label}</label>
        <div className="relative flex items-center">
          {/* אייקון מצד ימין (מתאים לעברית) */}
          <div className="absolute right-4 text-stone-400 pointer-events-none">
            {Icon && <Icon className="w-5 h-5" />}
          </div>
          
          <input
            ref={ref}
            {...props}
            className="w-full pr-12 pl-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all text-stone-700 placeholder:text-stone-400"
          />

          {/* כפתור עין בסיסמה מצד שמאל */}
          {showToggle && (
            <button
              type="button"
              onClick={onToggle}
              className="absolute left-4 text-stone-400 hover:text-emerald-600 transition-colors"
            >
              {isVisible ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>
    );
  }
);

InputField.displayName = "InputField";