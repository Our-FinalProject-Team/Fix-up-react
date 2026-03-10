import React, { useState, useRef } from "react";
import { Send, Paperclip, X } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string, imageFile?: File) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(text, selectedFile || undefined);
    setText("");
    clearFile();
  };

  return (
    <div className="relative">
      {preview && (
        <div className="absolute bottom-full mb-2 p-2 bg-white rounded-lg shadow-lg border flex items-center gap-2">
          <img src={preview} className="h-12 w-12 object-cover rounded" alt="preview" />
          <button onClick={clearFile} className="text-red-500"><X size={16}/></button>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
        <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-zinc-500">
          <Paperclip size={20} />
        </button>
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-zinc-100 rounded-full px-4 py-2 outline-none" 
          placeholder="כתוב הודעה..."
        />
        <button type="submit" className="p-2 bg-blue-600 text-white rounded-full">
          <Send size={18} />
        </button>
      </form>
    </div>
  );
}
