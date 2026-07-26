# Blank — Tauri shell (Option A)

Single-window Tauri 2 host that loads the same `@affine/web` build (Blank UI + Supabase sync). Targets **desktop** and **Android**.

## Prerequisites

- Rust + `yarn` (monorepo root)
- **Android only:** JDK 17+, Android SDK + NDK, and:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:ANDROID_SDK_ROOT = $env:ANDROID_HOME
```

Rust Android targets are installed by `tauri android init` (`aarch64-linux-android`, etc.).

## Dev (desktop)

```bash
# from repo root
yarn
yarn workspace @affine/tauri tauri icon src-tauri/icons/icon.png   # once, generates icon set
yarn workspace @affine/tauri dev
```

Starts `@affine/web` on `:8080` and opens the Tauri window.

## Dev (Android)

```bash
# ANDROID_HOME set (see above); emulator or device attached
yarn workspace @affine/tauri android:dev
```

## Release

```bash
# Windows desktop (NSIS/MSI)
yarn workspace @affine/tauri build

# Android APK / AAB
yarn workspace @affine/tauri android:build
```

Desktop artifacts: `src-tauri/target/release/bundle/`  
Android project: `src-tauri/gen/android/` (Gradle)

Supabase URL/anon key are injected into the web bundle via root `.env` + rspack (never service_role).

## Notes

- Package id: `app.blank.desktop` (same for Android applicationId for now)
- Capacitor `packages/frontend/apps/android` stays in tree until Tauri Android is proven end-to-end
- Native SQLite / secure session storage are later phases — Phase 6 is shell scaffold only
