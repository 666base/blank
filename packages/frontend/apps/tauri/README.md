# Blank — Tauri desktop shell (Option A)

Single-window Tauri 2 host that loads the same `@affine/web` build (Blank UI + Supabase sync).

## Dev

```bash
# from repo root
yarn
yarn workspace @affine/tauri tauri icon src-tauri/icons/icon.png   # once, generates icon set
yarn workspace @affine/tauri dev
```

This starts `@affine/web` on `:8080` and opens the Tauri window.

## Release (Windows)

```bash
yarn workspace @affine/tauri build
```

Produces NSIS/MSI under `src-tauri/target/release/bundle/`.

Supabase URL/anon key are injected into the web bundle via root `.env` + rspack (never service_role).
