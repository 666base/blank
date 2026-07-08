import { CalendarIcon, NoteIcon, PlusIcon } from "../icons";

interface MobileNavProps {
  activeTab: "notes" | "calendar" | "editor";
  onTabChange: (tab: "notes" | "calendar" | "editor") => void;
  onNewNote: () => void;
  onCalendarSelect: () => void;
}

export function MobileNav({ activeTab, onTabChange, onNewNote, onCalendarSelect }: MobileNavProps) {
  return (
    <div className="md:hidden flex items-center justify-around bg-bg-secondary border-t border-border shrink-0 h-14 pb-[env(safe-area-inset-bottom)]">
      <button
        onClick={() => onTabChange("notes")}
        className={`flex items-center justify-center w-full h-full ${
          activeTab === "notes" ? "text-text" : "text-text-muted hover:text-text"
        }`}
      >
        <NoteIcon className="w-6 h-6 stroke-[1.5]" />
      </button>

      <button
        onClick={() => {
          onCalendarSelect();
          onTabChange("editor");
        }}
        className={`flex items-center justify-center w-full h-full ${
          activeTab === "calendar" ? "text-text" : "text-text-muted hover:text-text"
        }`}
      >
        <CalendarIcon className="w-6 h-6 stroke-[1.5]" />
      </button>

      <button
        onClick={() => {
          onNewNote();
          onTabChange("editor");
        }}
        className={`flex items-center justify-center w-full h-full ${
          activeTab === "editor" ? "text-text" : "text-text-muted hover:text-text"
        }`}
      >
        <PlusIcon className="w-6 h-6 stroke-[1.5]" />
      </button>
    </div>
  );
}
