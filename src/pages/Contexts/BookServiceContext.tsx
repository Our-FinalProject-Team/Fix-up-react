import React, { createContext, useState, useContext,ReactNode } from 'react';
interface Professional
{
    imageUrl: string;
    id:number;
    name:string;
    category: string;
    price?: number;
}

interface BookingContextType 
{
    selectedPro: Professional | null;
    setSelectedPro: (pro: Professional | null) => void;
    clearBooking: () => void;
}
const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  
const clearBooking = () => setSelectedPro(null);
  
    return (
      <BookingContext.Provider value={{ selectedPro, setSelectedPro, clearBooking }}>
        {children}
      </BookingContext.Provider>
    );
  };
  
  // Hook מותאם אישית לשימוש קל
  export const useBooking = () => {
    const context = useContext(BookingContext);
    if (!context) {
      throw new Error('useBooking must be used within a BookingProvider');
    }
    return context;
  };

