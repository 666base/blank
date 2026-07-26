# Blank

Private knowledge base — **desktop** and **phone** only.

## Run

```bash
yarn          # install once
npm run dev   # Blank Desktop (Tauri)
npm run phone # Blank Phone (Android) — set ANDROID_HOME first
```

| Command           | Target                         |
| ----------------- | ------------------------------ |
| `npm run dev`     | Blank Desktop                  |
| `npm run phone`   | Blank Phone (Android)          |
| `npm run dev:web` | Browser only (no native shell) |
| `yarn blank dev`  | Interactive: Desktop / Phone   |

Do **not** pick Electron, Capacitor Android/iOS, admin, or mobile — those are legacy AFFiNE shells left in the tree but not part of Blank.

## Sync

Settings → **Blank Sync** → sign in (Supabase). Documents sync under workspace `blank-default`.

## Prefer yarn

This repo is Yarn 4 (`packageManager` in package.json). `npm run …` works because scripts call yarn, but use `yarn` for installs to avoid npmrc warnings.
