# Blank — Tauri shell (desktop + phone)

**Blank Desktop** and **Blank Phone** share this package. Electron / Capacitor apps in this monorepo are legacy and not used by `npm run dev`.

## Quick start (from repo root)

```bash
yarn          # or: npm install (scripts still call yarn)
npm run dev   # Blank Desktop — Tauri window + web UI on :8080
npm run phone # Blank Phone  — Tauri Android (needs ANDROID_HOME + SDK/NDK)
```

PowerShell for Android SDK:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
npm run phone
```

## Scripts

| Script                        | What                           |
| ----------------------------- | ------------------------------ |
| `npm run dev` / `dev:desktop` | Tauri desktop                  |
| `npm run phone` / `dev:phone` | Tauri Android                  |
| `npm run build`               | Desktop installer              |
| `npm run build:phone`         | Android APK/AAB                |
| `npm run dev:web`             | Browser only (no Tauri window) |

Interactive: `yarn blank dev` → choose **Blank Desktop** or **Blank Phone**.

Supabase URL/anon key come from root `.env` via rspack (never service_role).
