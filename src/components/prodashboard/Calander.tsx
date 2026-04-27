import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, X, Check, Clock, ArrowRight } from 'lucide-react';

// --- Interfaces & Types ---

type SlotStatus = 'available' | 'busy' | null;

interface SlotData {
  status: SlotStatus;
  note: string;
}

// מבנה הנתונים: מפתח תאריך (string) שמכיל אובייקט של שעות (number)
interface SlotsState {
  [dateKey: string]: {
    [hour: number]: SlotData;
  };
}

interface EditingSlot extends SlotData {
  dateKey: string;
  hour: number;
}

// --- Constants & Helpers ---

const DAYS: string[] = ['א׳', 'ב׳', 'ג׳', 'ד׳', 'ה׳', 'ו׳', 'ש׳'];
const MONTHS: string[] = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];
const HOURS: number[] = Array.from({ length: 13 }, (_, i) => i + 8); // 08:00 עד 20:00

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const formatHour = (h: number): string => {
  return `${String(h).padStart(2, '0')}:00`;
};

// --- Main Component ---

export default function AvailabilityCalendar() {
  const today = new Date();
  const [viewYear, setViewYear] = useState<number>(today.getFullYear());
  const [viewMonth, setViewMonth] = useState<number>(today.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [slots, setSlots] = useState<SlotsState>({});
  const [editingSlot, setEditingSlot] = useState<EditingSlot | null>(null);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = (): void => {
    setSelectedDay(null);
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(y => y - 1);
    } else {
      setViewMonth(m => m - 1);
    }
  };

  const nextMonth = (): void => {
    setSelectedDay(null);
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(y => y + 1);
    } else {
      setViewMonth(m => m + 1);
    }
  };

  const getDateKey = (day: number): string =>
    `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const getHourSlot = (dateKey: string, hour: number): SlotData => 
    slots[dateKey]?.[hour] || { status: null, note: '' };

  const toggleHourStatus = (dateKey: string, hour: number): void => {
    const current = slots[dateKey]?.[hour]?.status;
    const next: SlotStatus = current === 'available' ? 'busy' : current === 'busy' ? null : 'available';
    
    setSlots(prev => {
      const daySlots = { ...(prev[dateKey] || {}) };
      if (next === null) {
        delete daySlots[hour];
      } else {
        daySlots[hour] = { ...daySlots[hour], status: next, note: daySlots[hour]?.note || '' };
      }
      return { ...prev, [dateKey]: daySlots };
    });
  };

  const openNoteEdit = (dateKey: string, hour: number): void => {
    const slot = getHourSlot(dateKey, hour);
    setEditingSlot({ 
      dateKey, 
      hour, 
      status: slot.status || 'available', 
      note: slot.note || '' 
    });
  };

  const saveNote = (): void => {
    if (!editingSlot) return;
    const { dateKey, hour, status, note } = editingSlot;
    setSlots(prev => ({
      ...prev,
      [dateKey]: { 
        ...(prev[dateKey] || {}), 
        [hour]: { status, note } 
      }
    }));
    setEditingSlot(null);
  };

  const clearHourSlot = (): void => {
    if (!editingSlot) return;
    const { dateKey, hour } = editingSlot;
    setSlots(prev => {
      const daySlots = { ...(prev[dateKey] || {}) };
      delete daySlots[hour];
      return { ...prev, [dateKey]: daySlots };
    });
    setEditingSlot(null);
  };

  // יצירת תאי לוח השנה
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const getDayStatus = (day: number): 'mixed' | 'busy' | 'available' | null => {
    const dk = getDateKey(day);
    const vals = Object.values(slots[dk] || {});
    if (!vals.length) return null;
    const hasBusy = vals.some(s => s.status === 'busy');
    const hasAvail = vals.some(s => s.status === 'available');
    if (hasBusy && hasAvail) return 'mixed';
    if (hasBusy) return 'busy';
    return 'available';
  };

  const selectedDateKey = selectedDay ? getDateKey(selectedDay) : null;

  return (
    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-4 space-y-4 shadow-xl" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {selectedDay && (
            <button onClick={() => setSelectedDay(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors">
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          )}
          <h2 className="font-bold text-white text-base">
            {selectedDay ? `${MONTHS[viewMonth]} ${selectedDay}` : 'לוח זמינות'}
          </h2>
        </div>
        {!selectedDay && (
          <div className="flex items-center gap-1">
            <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors">
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            <span className="text-sm font-semibold text-white w-28 text-center">{MONTHS[viewMonth]} {viewYear}</span>
            <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-800 transition-colors">
              <ChevronLeft className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {/* Monthly View */}
        {!selectedDay ? (
          <motion.div key="month" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} className="space-y-3">
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-gray-500 py-1">{d}</div>
              ))}
              {cells.map((day, i) => {
                if (day === null) return <div key={`empty-${i}`} />;
                const isToday = day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();
                const status = getDayStatus(day);
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`relative aspect-square rounded-lg text-xs font-medium transition-all flex flex-col items-center justify-center gap-0.5
                      ${status === 'busy' ? 'bg-red-500/20 border border-red-500/40 text-red-300' :
                        status === 'available' ? 'bg-green-500/20 border border-green-500/40 text-green-300' :
                        status === 'mixed' ? 'bg-yellow-500/20 border border-yellow-500/40 text-yellow-300' :
                        isToday ? 'bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/30' :
                        'hover:bg-gray-800 text-gray-400 border border-transparent'}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 text-[10px] text-gray-500 justify-center border-t border-gray-800 pt-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-500/40 border border-green-500/60" />פנוי</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500/40 border border-red-500/60" />עסוק</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-yellow-500/40 border border-yellow-500/60" />מעורב</span>
            </div>
          </motion.div>
        ) : (
          /* Hourly View */
          <motion.div key="day" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} className="space-y-2">
            <p className="text-[11px] text-gray-500 mb-2">לחץ על שעה לשינוי סטטוס, או על השעון להערה.</p>
            <div className="space-y-1.5 max-h-80 overflow-y-auto pl-1 custom-scrollbar">
              {HOURS.map(hour => {
                const slot = getHourSlot(selectedDateKey!, hour);
                return (
                  <div
                    key={hour}
                    onClick={() => toggleHourStatus(selectedDateKey!, hour)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border transition-all cursor-pointer
                      ${slot.status === 'available' ? 'bg-green-500/10 border-green-500/30' :
                        slot.status === 'busy' ? 'bg-red-500/10 border-red-500/30' :
                        'bg-gray-800/60 border-gray-700/50 hover:border-gray-600'}`}
                  >
                    <span className="text-xs font-mono text-gray-400 w-12 shrink-0 text-left" dir="ltr">{formatHour(hour)}</span>
                    <div className="flex-1 text-right">
                      {slot.status ? (
                        <span className={`text-xs font-semibold ${slot.status === 'available' ? 'text-green-400' : 'text-red-400'}`}>
                          {slot.status === 'available' ? '✓ פנוי' : '✕ עסוק'}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-600 italic">לחץ לקביעה</span>
                      )}
                      {slot.note && <p className="text-[10px] text-yellow-400 truncate mt-0.5">{slot.note}</p>}
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); openNoteEdit(selectedDateKey!, hour); }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-700 transition-colors shrink-0"
                    >
                      <Clock className={`w-4 h-4 ${slot.note ? 'text-yellow-400' : 'text-gray-600'}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal עריכה */}
      <AnimatePresence>
        {editingSlot && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={e => e.target === e.currentTarget && setEditingSlot(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-5 w-full max-w-xs space-y-4 shadow-2xl text-right"
              dir="rtl"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm" dir="ltr">{formatHour(editingSlot.hour)} — סטטוס והערה</h3>
                <button onClick={() => setEditingSlot(null)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-800">
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingSlot(e => e ? ({ ...e, status: 'available' }) : null)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${editingSlot.status === 'available' ? 'bg-green-500/20 border-green-500/60 text-green-300' : 'border-gray-700 text-gray-500 hover:border-gray-600'}`}
                >
                  ✓ פנוי
                </button>
                <button
                  onClick={() => setEditingSlot(e => e ? ({ ...e, status: 'busy' }) : null)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${editingSlot.status === 'busy' ? 'bg-red-500/20 border-red-500/60 text-red-300' : 'border-gray-700 text-gray-500 hover:border-gray-600'}`}
                >
                  ✕ עסוק
                </button>
              </div>
              <div>
                <label className="text-[11px] text-gray-400 mb-1.5 block font-medium">הערה אישית</label>
                <textarea
                  value={editingSlot.note}
                  onChange={e => setEditingSlot(s => s ? ({ ...s, note: e.target.value }) : null)}
                  rows={3}
                  placeholder="לדוגמה: פגישה אישית, לא זמין..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-600 resize-none outline-none focus:border-orange-500/50 text-right"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={clearHourSlot} className="flex-1 py-2 rounded-xl text-xs text-gray-400 border border-gray-700 hover:border-gray-600 transition-colors font-medium">
                  נקה
                </button>
                <button onClick={saveNote} className="flex-1 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-400 text-white transition-colors flex items-center justify-center gap-1 shadow-lg shadow-orange-500/20">
                  <Check className="w-3.5 h-3.5" /> שמור
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}