import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";
import { IconButton } from "../ui";
import { useNotes } from "../../context/NotesContext";

export function CalendarSidebar() {
  const { notes, selectNote, createNote } = useNotes();
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dateString = date.toLocaleDateString();
    const existing = notes.find((n) => n.title.includes(dateString));
    if (existing) {
      selectNote(existing.id);
    } else {
      createNote();
    }
  };

  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  // Create calendar grid
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday =
      new Date().getDate() === i &&
      new Date().getMonth() === currentDate.getMonth() &&
      new Date().getFullYear() === currentDate.getFullYear();

    days.push(
      <button
        key={i}
        onClick={() => handleDateSelect(i)}
        className={`h-8 w-8 flex items-center justify-center rounded-full text-sm hover:bg-bg-emphasis ${
          isToday ? "bg-accent text-text-inverse hover:bg-accent/90" : "text-text"
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="relative w-64 h-full bg-bg-secondary border-l border-border flex flex-col select-none">
      <div className="h-11 shrink-0" data-tauri-drag-region></div>
      <div className="flex items-center justify-between pl-4 pr-3 pb-2 border-b border-border shrink-0">
        <div className="font-medium text-base">Calendar</div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <IconButton onClick={prevMonth} variant="ghost">
            <ArrowLeftIcon className="w-4 h-4 stroke-[1.5]" />
          </IconButton>
          <div className="font-medium">
            {monthName} {year}
          </div>
          <IconButton onClick={nextMonth} variant="ghost">
            <ArrowRightIcon className="w-4 h-4 stroke-[1.5]" />
          </IconButton>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-xs text-text-muted font-medium">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 place-items-center">
          {days}
        </div>
      </div>
    </div>
  );
}
