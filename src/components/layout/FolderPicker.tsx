import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";
import { useNotes } from "../../context/NotesContext";
import { useTheme } from "../../context/ThemeContext";
import { Button } from "../ui";

interface CloudFolder {
  name: string;
  path: string;
  icon: string;
}

// SVG icons for each cloud provider
function CloudIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  const s = size;
  switch (icon) {
    case "google-drive":
      return (
        <svg width={s} height={s} viewBox="0 0 87.3 78" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.6 66.85l3.85 6.65c.8 1.4 1.95 2.5 3.3 3.3l13.75-23.8H0c0 1.55.4 3.1 1.2 4.5L6.6 66.85z" fill="#0066DA"/>
          <path d="M43.65 25L29.9 1.2C28.55 2 27.4 3.1 26.6 4.5L1.2 47.5C.4 48.9 0 50.45 0 52h27.5l16.15-27z" fill="#00AC47"/>
          <path d="M73.55 76.8c1.35-.8 2.5-1.9 3.3-3.3l1.6-2.75 7.65-13.25c.8-1.4 1.2-2.95 1.2-4.5H60l5.85 11.2 7.7 12.6z" fill="#EA4335"/>
          <path d="M43.65 25L57.4 1.2C56.05.4 54.5 0 52.9 0H34.4c-1.6 0-3.15.45-4.5 1.2L43.65 25z" fill="#00832D"/>
          <path d="M60.1 52H27.5L13.75 75.8c1.35.8 2.9 1.2 4.5 1.2h50.8c1.6 0 3.15-.45 4.5-1.2L60.1 52z" fill="#2684FC"/>
          <path d="M73.4 26.5l-12.6-21.8c-.8-1.4-1.95-2.5-3.3-3.3L43.65 25l16.45 27H87.3c0-1.55-.4-3.1-1.2-4.5L73.4 26.5z" fill="#FFBA00"/>
        </svg>
      );
    case "dropbox":
      return (
        <svg width={s} height={s} viewBox="0 0 40 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 0L0 6.5l10 6.5 10-6.5L10 0zM30 0L20 6.5l10 6.5 10-6.5L30 0zM0 19.5L10 26l10-6.5L10 13l-10 6.5zM20 19.5L30 26l10-6.5L30 13l-10 6.5zM10 27.5L20 34l10-6.5-10-6.5-10 6.5z" fill="#0061FF"/>
        </svg>
      );
    case "onedrive":
      return (
        <svg width={s} height={s * 0.65} viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 10.2a9.5 9.5 0 0118.5 2.8 7 7 0 01-1 14H9a9 9 0 116.5-16.8z" fill="#0078D4"/>
          <path d="M24 12.9a7.5 7.5 0 0114.2 1.6 5.5 5.5 0 01-.8 11H17.5a7 7 0 016.5-12.6z" fill="#1490DF"/>
        </svg>
      );
    case "icloud":
      return (
        <svg width={s} height={s * 0.7} viewBox="0 0 40 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M32.5 11.5a9.5 9.5 0 00-18.3-2.6A8 8 0 008 24h24a8 8 0 00.5-12.5z" fill="#3B99FC"/>
        </svg>
      );
    case "box":
      return (
        <svg width={s} height={s} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="40" height="40" rx="8" fill="#0061D5"/>
          <text x="50%" y="58%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">B</text>
        </svg>
      );
    case "nextcloud":
      return (
        <svg width={s} height={s} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="20" fill="#0082C9"/>
          <circle cx="13" cy="20" r="5" fill="white"/>
          <circle cx="27" cy="20" r="5" fill="white"/>
          <circle cx="20" cy="20" r="5" fill="white"/>
        </svg>
      );
    default:
      return (
        <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"/>
        </svg>
      );
  }
}

export function FolderPicker() {
  const { setNotesFolder } = useNotes();
  const { reloadSettings } = useTheme();
  const [cloudFolders, setCloudFolders] = useState<CloudFolder[]>([]);

  useEffect(() => {
    invoke<CloudFolder[]>("get_cloud_folders")
      .then(setCloudFolders)
      .catch(() => setCloudFolders([]));
  }, []);

  const handleSelectFolder = async (startPath?: string) => {
    try {
      // On Android, directory picker dialogs are not supported and cause the app to freeze.
      // Instead, automatically use the app's data directory as the notes folder.
      const isAndroid = /Android/i.test(navigator.userAgent);
      if (isAndroid) {
        const { appDataDir } = await import("@tauri-apps/api/path");
        const dataDir = await appDataDir();
        await setNotesFolder(dataDir);
        await reloadSettings();
        return;
      }

      const selected = await open({
        directory: true,
        multiple: false,
        title: "Choose Notes Folder",
        defaultPath: startPath,
      });

      if (selected && typeof selected === "string") {
        await setNotesFolder(selected);
        await reloadSettings();
      }
    } catch (err) {
      console.error("Failed to select folder:", err);
    }
  };

  const handleCloudShortcut = async (folder: CloudFolder) => {
    await handleSelectFolder(folder.path);
  };

  return (
    <div className="h-full flex flex-col bg-bg-secondary">
      {/* Draggable title bar area */}
      <div className="h-10 shrink-0" data-tauri-drag-region />

      <div className="flex-1 flex items-center justify-center overflow-y-auto">
        <div className="text-center p-8 max-w-lg w-full select-none">
          <div
            role="img"
            aria-label="Folders"
            className="w-48 aspect-square mx-auto mb-2 opacity-40 animate-fade-in-up"
            style={{
              animationDelay: "0ms",
              backgroundColor: "var(--color-text)",
              WebkitMaskImage: "url(/folders-dark.png)",
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskImage: "url(/folders-dark.png)",
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
            }}
          />

          <h1
            className="text-3xl text-text font-serif mb-2 tracking-[-0.01em] animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Welcome to Blank
          </h1>
          <p
            className="text-text-muted mb-6 animate-fade-in-up"
            style={{ animationDelay: "100ms" }}
          >
            Blank is an offline-first notes app. Your notes are simply stored
            on your computer as markdown files.
          </p>
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <Button id="choose-folder-btn" onClick={() => handleSelectFolder()} size="xl">
              Choose your notes folder
            </Button>
          </div>

          {/* Cloud shortcuts */}
          {cloudFolders.length > 0 && (
            <div
              className="mt-6 animate-fade-in-up"
              style={{ animationDelay: "280ms" }}
            >
              <p className="text-xs text-text-muted/60 mb-3">
                Or open directly in a cloud folder
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {cloudFolders.map((folder) => (
                  <button
                    key={folder.icon}
                    id={`cloud-folder-${folder.icon}`}
                    onClick={() => handleCloudShortcut(folder)}
                    title={folder.path}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-bg hover:bg-bg-muted transition-all duration-150 text-text-muted hover:text-text text-sm cursor-pointer"
                    style={{ minWidth: 0 }}
                  >
                    <span className="shrink-0 flex items-center">
                      <CloudIcon icon={folder.icon} size={18} />
                    </span>
                    <span className="font-medium truncate">{folder.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p
            className="mt-4 text-xs text-text-muted/60 animate-fade-in-up"
            style={{ animationDelay: "350ms" }}
          >
            You can change this later
          </p>
        </div>
      </div>
    </div>
  );
}
