import { useRef } from "react";
export const useChatSound = (soundPath = '/message-ping.mp3') => {
  // שמירת אובייקט האודיו בתוך Ref כדי שלא ייווצר מחדש בכל רינדור
  const audioRef = useRef(new Audio(soundPath));

  const playSound = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = 0; // מחזיר להתחלה למקרה שהודעות מגיעות מהר
      audio.play().catch((err) => {
        // דפדפנים חוסמים סאונד אם המשתמש לא לחץ על כלום באתר עדיין
        console.warn("Sound play blocked until user interaction", err);
      });
    }
  };

  return playSound;
};

