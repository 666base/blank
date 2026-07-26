# Blank (AFFiNE fork) → Supabase + Tauri migration notes

**Status:** Phases 1–8 ready for review. User-facing brand is **Blank**. Nest out of client path; Tauri Option A desktop + Android scaffolded; sync verification fixes applied. Open PR — do **not** replace `main` until explicit OK.  
**Date:** 2026-07-27  
**Product name:** **Blank** (not AFFiNE / not AFFiNE Cloud)  
**Local tree:** AFFiNE-derived monorepo → Blank  
**GitHub:** branch [`supabase-tauri-migration`](https://github.com/666base/blank/tree/supabase-tauri-migration) (orphan Blank tree). `main` still has the old notes app.  
**Supabase:** project **`blank`** (`jzkswvswfvmsfoqfvszo`) — `.env` already pointed here. MCP shop project is unrelated.

### Decisions (locked)

| Item     | Choice                                        |
| -------- | --------------------------------------------- |
| Product  | **Blank**                                     |
| Cloud    | Remove AFFiNE Cloud; sync = Supabase          |
| Git      | **2a** — branch only; do not force `main`     |
| Supabase | Dedicated **blank** project (not the shop DB) |
| Tauri    | Option A (one window)                         |
| AI       | Remove / hide                                 |

### Phase 1 — applied

Migration: `supabase/migrations/20260727000100_blank_crdt_sync.sql`

| Object                                       | Status                                |
| -------------------------------------------- | ------------------------------------- |
| `doc_snapshots`, `doc_updates`, `workspaces` | Created + RLS `owner_id = auth.uid()` |
| Storage bucket `blobs` (private, 50MB)       | Created + path RLS `{uid}/...`        |
| Realtime publication                         | `doc_updates`, `doc_snapshots`        |
| `compact_doc_updates()`                      | Compaction prune RPC                  |

### Phase 2 — scaffolded (not fully wired into app yet)

| Piece                             | Path                                                       |
| --------------------------------- | ---------------------------------------------------------- |
| `SupabaseDocStorage`              | `packages/common/nbstore/src/impls/supabase/doc.ts`        |
| `SupabaseBlobStorage`             | `.../blob.ts`                                              |
| `SupabaseAwarenessStorage`        | `.../awareness.ts`                                         |
| Export `@affine/nbstore/supabase` | `package.json` exports                                     |
| Converge script                   | `packages/common/nbstore/scripts/supabase-yjs-converge.ts` |

**Still needed for “works end-to-end”:** `yarn` install (`@supabase/supabase-js`), register `supabaseStorages` in app workers, swap `getEngineWorkerInitOptions` remotes, hide Cloud/AI UI, Supabase Auth sign-in once per device (Tauri secure storage later).

### Phase 6 — Tauri Android (scaffolded)

| Piece                     | Path / notes                                                     |
| ------------------------- | ---------------------------------------------------------------- |
| `tauri android init --ci` | Generated `src-tauri/gen/android/` (Gradle, `app.blank.desktop`) |
| Rust Android targets      | `aarch64-linux-android` (+ armv7, i686, x86_64) via rustup       |
| Scripts                   | `yarn workspace @affine/tauri android:dev` / `android:build`     |
| Smoke                     | `cargo check --target aarch64-linux-android` OK                  |

**Still later:** emulator/device APK run, secure session storage, SQLite native parity vs Capacitor nbstore. Capacitor android app remains in tree.

### Phase 7 — Verification fixes

| Gate                               | Result                                                                                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Stable remote workspace            | Remotes always use `BLANK_SYNC_WORKSPACE_ID` (`blank-default`) so PC ↔ phone share one CRDT namespace   |
| Nest auth spam                     | Stub `127.0.0.1:9` → `AuthStore.fetchSession` returns null (no `/api/auth/session` loop)                |
| Enable AFFiNE Cloud UI             | Hidden via `BLANK_PRODUCT.disableAffineCloud` (settings panel, share menu → Blank Sync, sidebar avatar) |
| Members / Embedding / billing tabs | Hidden when Cloud disabled                                                                              |
| Schema / RLS (linked `blank`)      | Own-row policies; grants to `authenticated` only (no `anon`); `blobs` bucket; realtime on doc tables    |
| Yjs converge script                | Needs `SUPABASE_EMAIL` + `SUPABASE_PASSWORD` in env — run manually when set                             |

**Manual smoke (you):**

1. `yarn affine @affine/web dev` (or `yarn workspace @affine/tauri dev`)
2. Settings → **Blank Sync** → create account / sign in → reload
3. Edit a doc; confirm rows under `workspace_id = blank-default` in Supabase
4. Second browser/profile or phone: same account → same docs after sync
5. DevTools Network: Supabase host only — no Nest / `app.affine.pro`

### Checkpoint

Remote `main` **not** merged yet. PR open: https://github.com/666base/blank/pull/1 (`blank-cutover` → `main`).

Say **merge main** only if you explicitly want to replace the old notes app on `main`.

---

## Critical discrepancies vs. this spec (read before Phase 1)

| Spec assumption                                          | Actual repo state                                                                      | Proposed adjustment                                      |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Work on branch `supabase-tauri-migration` on AFFiNE code | Branch exists; working tree is Blank/AFFiNE-derived; remote `main` is still notes app. | Confirm **2a/2b** before commit/push.                    |
| Confirm `.env` is in `.gitignore`                        | **Fixed locally:** `.env` is ignored.                                                  | Keep; never commit `.env` or Tauri signing private keys. |
| Root markdown notes are fine                             | `.gitignore` has `/*.md`.                                                              | Move notes under `docs/migration/` when committing.      |
| Sync in core / infra                                     | Live sync is **`@affine/nbstore`**.                                                    | Supabase implements nbstore storage interfaces.          |
| Electron → Tauri                                         | Multi-tab Electron is hard.                                                            | **Option A** confirmed.                                  |
| Product still called AFFiNE / uses AFFiNE Cloud          | Owner: product is **Blank**; Cloud removed; Supabase sync.                             | Phases 1–3 + branding policy above.                      |
| Empty Supabase for sync                                  | Linked project is e-commerce.                                                          | Confirm **4a** or **4b**.                                |

---

## 1. What `packages/backend/server` provides

NestJS + Apollo GraphQL + Socket.IO (`@affine/server`). Flavored via `SERVER_FLAVOR` (`allinone` | `graphql` | `sync` | …). Local default: all-in-one.

### 1.1 Auth / session

| Item                 | Path / notes                                                                                          |
| -------------------- | ----------------------------------------------------------------------------------------------------- |
| Module               | `packages/backend/server/src/core/auth/`                                                              |
| HTTP                 | `/api/auth/*` (`controller.ts`) — preflight, sign-in/out, magic-link, session exchange/refresh/revoke |
| Guard                | Global `AuthGuard` — Bearer JWT **or** cookie session                                                 |
| Cookies              | `affine_session`, `affine_user_id`, `affine_csrf_token`                                               |
| Native/Electron      | `AuthSession` + refresh tokens (JWT rotation) for desktop/mobile                                      |
| OAuth plugin         | `packages/backend/server/src/plugins/oauth/` (Google, GitHub, Apple, OIDC)                            |
| Selfhost first admin | `POST /api/setup/create-admin-user`                                                                   |

**Single-user verdict:** Identity is required for cloud sync today. Will be **replaced by Supabase Auth** (email/password or magic link), not reused as Nest sessions.

### 1.2 GraphQL API surface (`/graphql`)

| Area                                      | Location                                 | Single-user need?                                |
| ----------------------------------------- | ---------------------------------------- | ------------------------------------------------ |
| Workspaces CRUD / quotas                  | `core/workspaces/resolvers/workspace.ts` | Replace with local + Supabase metadata (or drop) |
| Docs meta / publish / grants              | `resolvers/doc.ts`                       | Mostly optional if sync is CRDT-only             |
| Blobs (upload/multipart)                  | `resolvers/blob.ts`                      | Replace with Supabase Storage                    |
| Members / invites                         | `resolvers/member.ts`                    | **Dead weight** — hide UI                        |
| Users / currentUser                       | `core/user`, `core/auth/resolver`        | Replace with Supabase user                       |
| Payment / Stripe                          | `plugins/payment`                        | **Dead weight** — bypass/hide                    |
| Copilot AI                                | `plugins/copilot`                        | **Optional** — hide panel if no server           |
| Calendar, captcha, license, GCloud, admin | plugins / admin resolvers                | **Dead weight** for this product                 |

### 1.3 Sync / socket transport

| Gateway      | Path                                            | Events                                                                                                                                     |
| ------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Doc CRDT     | `src/core/sync/gateway.ts` (`SpaceSyncGateway`) | `space:join/leave`, `space:load-doc`, `space:push-doc-update`, `space:delete-doc`, `space:load-doc-timestamps`, awareness join/update/load |
| Realtime bus | `src/core/realtime/gateway.ts`                  | comments / copilot / workspace topics                                                                                                      |

**CRDT flow today:**

1. Client `CloudDocStorage` (`packages/common/nbstore/src/impls/cloud/doc.ts`) connects via Socket.IO.
2. Push: `space:push-doc-update` (base64 Yjs update) → permission check → Postgres adapters.
3. Persist: table `updates` (+ merge into `snapshots` via jobs / native merge).
4. Broadcast: `space:broadcast-doc-updates` (protocol ≥0.26).
5. Load: `space:load-doc` returns snapshot/diff.

**Single-user verdict:** This entire Socket.IO path is what Supabase Realtime + Postgres tables replace. **Required conceptually; Nest implementation becomes unused.**

### 1.4 Blob storage (S3-compatible)

| Item          | Path / notes                                                      |
| ------------- | ----------------------------------------------------------------- |
| Config        | `core/storage/config.ts` — `storages.avatar` / `storages.blob`    |
| Providers     | `fs` \| `aws-s3` \| `cloudflare-r2` \| `assetpack`                |
| Default local | `~/.affine/storage`                                               |
| Upload        | GraphQL `setBlob` / `createBlobUpload`; `PUT /api/storage/upload` |
| Download      | `GET /api/workspaces/:id/blobs/:name`                             |
| Metadata      | Prisma `Blob` model                                               |

Client: `CloudBlobStorage` in nbstore. **Replace with Supabase Storage bucket.**

### 1.5 AI Copilot backend

| Item     | Notes                                                  |
| -------- | ------------------------------------------------------ |
| Module   | `plugins/copilot/`                                     |
| HTTP SSE | `/api/copilot/chat/:sessionId/stream`, actions, images |
| GraphQL  | sessions, context, BYOK, transcript, MCP               |
| Default  | `copilot.enabled` often **false** unless configured    |

**Single-user verdict:** Optional. Spec says hide server-dependent Copilot UI; do not rebuild against Nest.

### 1.6 Existing DB shapes (mirror for Phase 1)

Already in `packages/backend/server/schema.prisma`:

- **`snapshots`** — `(workspace_id, guid)` PK, `blob` ByteA, optional `state`, `updated_at`
- **`updates`** — `(workspace_id, guid, created_at)` PK, `blob` ByteA
- **`blobs`** — metadata; bytes in object store

Phase 1 Supabase schema can intentionally mirror this snapshot+updates compaction model (with `owner_id = auth.uid()` RLS).

### 1.7 Runtime deps of the Nest server

Postgres (`DATABASE_URL`), Redis, optional S3/R2, mailer, indexer. **Phase 4 goal:** desktop/Android builds must not need any of this running.

---

## 2. Sync engine & storage providers (injection points)

### 2.1 Architecture (production path)

```
App bootstrap
  → configureBrowserWorkspaceFlavours(framework)
  → framework.impl(NbstoreProvider, { openStore, realtime })
  → WorkspaceFlavourProvider.getEngineWorkerInitOptions(id)
       { local: {...}, remotes: { "cloud:<flavour>": {...}, v1: {...} } }
  → NbstoreService.openStore() → SharedWorker/Worker StoreManagerConsumer
  → SpaceStorage(local) + remotes + new Sync(storages)
  → WorkspaceEngine → doc / blob / awareness frontends → Yjs
```

### 2.2 Interfaces a Supabase provider must implement

Canonical package: **`packages/common/nbstore`**.

#### Doc — `DocStorage` (`src/storage/doc.ts`)

```typescript
interface DocStorage extends Storage {
  readonly storageType: 'doc';
  readonly isReadonly: boolean;
  readonly spaceId: string;
  getDoc(docId: string): Promise<DocRecord | null>;
  getDocDiff(docId: string, state?: Uint8Array): Promise<DocDiff | null>;
  pushDocUpdate(update: DocUpdate, origin?: string): Promise<DocClock>;
  getDocTimestamp(docId: string): Promise<DocClock | null>;
  getDocTimestamps(after?: Date): Promise<DocClocks>;
  deleteDoc(docId: string): Promise<void>;
  subscribeDocUpdate(callback: (update: DocRecord, origin?: string) => void): () => void;
}
```

Prefer extending `DocStorageBase` (snapshot/update merge helpers). Every storage needs a working `Connection` (`src/connection/connection.ts`).

#### Blob — `BlobStorage` (`src/storage/blob.ts`)

```typescript
interface BlobStorage extends Storage {
  get(key: string, signal?: AbortSignal): Promise<BlobRecord | null>;
  set(blob: BlobRecord, signal?: AbortSignal): Promise<void>;
  delete(key: string, permanently: boolean, signal?: AbortSignal): Promise<void>;
  release(signal?: AbortSignal): Promise<void>;
  list(signal?: AbortSignal): Promise<ListedBlobRecord[]>;
}
```

#### Awareness — `AwarenessStorage` (`src/storage/awareness.ts`)

```typescript
interface AwarenessStorage extends Storage {
  update(record: AwarenessRecord, origin?: string): Promise<void>;
  subscribeUpdate(id: string, onUpdate: (update: AwarenessRecord, origin?: string) => void, onCollect: () => Promise<AwarenessRecord | null>): () => void;
}
```

Optional later: `IndexerStorage` / `CloudIndexerStorage` parity.

**Do not implement BlockSuite `DocSource` / `BlobSource` / `AwarenessSource` for this migration** — production path is nbstore. BlockSuite sync remains untouched (frozen).

### 2.3 Existing Cloud remotes to replace

Under `packages/common/nbstore/src/impls/cloud/`, exported as `cloudStorages`:

| Class                   | Identifier                | Transport           |
| ----------------------- | ------------------------- | ------------------- |
| `CloudDocStorage`       | `'CloudDocStorage'`       | Socket.IO           |
| `StaticCloudDocStorage` | `'StaticCloudDocStorage'` | HTTP readonly       |
| `CloudBlobStorage`      | `'CloudBlobStorage'`      | HTTP + GraphQL      |
| `CloudAwarenessStorage` | `'CloudAwarenessStorage'` | Socket.IO awareness |
| `CloudIndexerStorage`   | `'CloudIndexerStorage'`   | Cloud indexer       |

### 2.4 Exact registration / injection points

| Step                             | Path                                                                                                                                                                                                                    |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flavour remotes (primary swap)   | `packages/frontend/core/src/modules/workspace-engine/impls/cloud.ts` → `getEngineWorkerInitOptions()` — remotes key `` `cloud:${this.flavour}` `` uses `CloudDocStorage` / `CloudBlobStorage` / `CloudAwarenessStorage` |
| Local flavour (no cloud remotes) | `.../impls/local.ts`                                                                                                                                                                                                    |
| Flavour DI registration          | `packages/frontend/core/src/modules/workspace-engine/index.ts` → `configureBrowserWorkspaceFlavours()`                                                                                                                  |
| Nbstore provider DI              | `packages/frontend/core/src/modules/storage/providers/nbstore.ts` + app `framework.impl(NbstoreProvider, …)`                                                                                                            |
| Worker constructor registry      | e.g. `packages/frontend/apps/web/src/nbstore.worker.ts` — `new StoreManagerConsumer([...idbStorages, ...cloudStorages])`                                                                                                |
| Electron worker                  | `packages/frontend/apps/electron-renderer/src/background-worker/index.ts` — sqlite + cloud                                                                                                                              |
| Android worker                   | `packages/frontend/apps/android/src/nbstore.worker.ts` — sqlite + idb indexer + cloud                                                                                                                                   |
| Official server id               | `packages/frontend/core/src/modules/cloud/constant.ts` — `affine-cloud` / `BUILD_IN_SERVERS`                                                                                                                            |

### 2.5 Local storage (keep offline-first)

| Backend                                                             | When                   |
| ------------------------------------------------------------------- | ---------------------- |
| IndexedDB (`IndexedDBDocStorage`, …)                                | Browser / web          |
| SQLite (`SqliteDocStorage`, …) via `@affine/native` / mobile-native | Electron, Android, iOS |
| BroadcastChannel awareness                                          | Local multi-tab        |
| v1 IndexedDB/SQLite                                                 | Migration remotes only |

**Supabase remotes must sit beside these locals** — Sync engine already reconciles local ↔ remotes. Do not remove local storages.

### 2.6 `@toeverything/infra` role

DI framework only (`Framework`, `Service`, `Entity`, identifiers). **No sync/storage provider interfaces to implement there.**

---

## 3. UI entry points that assume AFFiNE Cloud

**Rule for Phase 3:** hide/disable via flags or conditional render; do **not** delete; do **not** touch `packages/frontend/component` styles/design tokens or `blocksuite/*`.

Official server constant: `affine-cloud` in `packages/frontend/core/src/modules/cloud/constant.ts`.

### 3.1 Sign-in / sign-up

- `packages/frontend/core/src/desktop/router.tsx` — `/sign-In`, `/signIn`, `/auth/:authType`, `/magic-link`, `/oauth/*`, `/try-cloud`
- `packages/frontend/core/src/mobile/router.tsx` — mobile auth routes
- `packages/frontend/core/src/desktop/pages/auth/*` — `sign-in.tsx`, `auth.tsx`, `magic-link.tsx`, `oauth-login.tsx`, `oauth-callback.tsx`
- `packages/frontend/core/src/mobile/pages/sign-in.tsx`
- `packages/frontend/core/src/desktop/dialogs/sign-in/index.tsx`
- `packages/frontend/core/src/mobile/dialogs/sign-in/index.tsx`
- `packages/frontend/core/src/components/sign-in/*`
- `packages/frontend/core/src/components/affine/auth/oauth.tsx`
- `packages/frontend/core/src/components/affine/auth/ai-login-required.tsx`
- Sidebar/settings sign-in CTAs: `components/root-app-sidebar/user-info/index.tsx`, settings sidebar `SignInButton`
- Electron auth: `packages/frontend/apps/electron/src/main/auth/handlers.ts`
- Android open-app auth: `packages/frontend/apps/android/src/app.tsx`
- Auth UI primitives (list only — frozen package): `packages/frontend/component/src/components/auth-components/*`

### 3.2 Workspace switcher / cloud workspace path

- `packages/frontend/core/src/components/workspace-selector/**` (incl. Enable Cloud CTA, `affine-cloud` grouping)
- `packages/frontend/core/src/desktop/dialogs/create-workspace/*` — default `serverId = affine-cloud`
- `packages/frontend/core/src/components/root-app-sidebar/index.tsx`
- `packages/frontend/core/src/modules/app-sidebar/views/index.tsx`
- `packages/frontend/core/src/mobile/components/workspace-selector/menu.tsx`
- `packages/frontend/core/src/desktop/pages/index/index.tsx` — bootstrap / showcase on cloud

### 3.3 Billing / subscription

- Routes: `desktop/pages/subscribe`, `upgrade-to-team`, `upgrade-success/*`, `ai-upgrade-success`, `expired`
- Settings: `desktop/dialogs/setting/general-setting/plans/**`, `.../billing/**`
- Workspace team billing: `desktop/dialogs/setting/workspace-setting/billing/**`
- Usage → plans: account `storage-progress`, `ai-usage-panel`, sidebar `cloud-usage` / `ai-usage`
- Mobile: `mobile/dialogs/setting/subscription`, `user-usage`
- Plan badge: `components/affine/auth/user-plan-button.tsx`
- Gating signal: **`ServerFeature.Payment` + `SubscriptionPlan`** (not mainly `AFFINE_FLAGS`)

### 3.4 Member invite / team sharing

- `desktop/pages/invite/index.tsx` — `/invite/:inviteId`
- `desktop/dialogs/setting/workspace-setting/members/**`
- `components/root-app-sidebar/invite-members-button.tsx`
- `modules/share-menu/view/**` (Enable Cloud / Pro tags / invite editor)
- Mobile share: `mobile/pages/workspace/detail/page-header-share-button.tsx`
- Component primitives (list only): `packages/frontend/component/src/components/member-components/*`

### 3.5 AI Copilot (server-calling)

- Chat routes/tabs: `desktop/pages/workspace/chat`, `detail-page/tabs/chat.tsx`
- Client: `blocksuite/ai/runtime/request/copilot-client.ts` (GraphQL/SSE)
- Panels/widgets: `blocksuite/ai/ai-panel.ts`, `widgets/ai-panel/**`, `widgets/edgeless-copilot*/**`, `components/ask-ai-*`, chat panel, peek views
- Login/error UX: `ai-login-required`, AI panel error “login to AFFiNE Cloud”
- Onboarding: `components/affine/ai-onboarding/**`
- Enablement: `use-enable-ai.ts`, workspace preference `ai.tsx`
- Android native AI shell (optional product): `packages/frontend/apps/android` AIActivity / GraphQL / SSE

### 3.6 Plan / Pro gates (bypass or hide in Phase 3)

- `modules/quota/views/quota-check.tsx`, `components/over-capacity`
- Page history Free→Pro: `components/affine/page-history-modal/history-modal.tsx`
- File size limits → plans: `blocksuite/view-extensions/editor-view/file-size-limit.ts`, database file property
- Analytics Pro gate: `desktop/pages/workspace/detail-page/tabs/analytics.tsx`
- AI Pro models: `modules/ai-button/services/models.ts`
- Share menu Free→plans / Pro tags

### 3.7 “Enable Cloud” / migrate prompts

- Dialog: `desktop/dialogs/enable-cloud/index.tsx`
- Hook: `components/hooks/affine/use-enable-cloud.tsx`
- Settings: workspace preference / storage / members / license Enable Cloud panels
- Banner: `components/top-tip.tsx` + component `affine-banner/local-demo-tips.tsx`
- Header history tips: `blocksuite/block-suite-header/menu/history-tips-modal`
- Route `/try-cloud` → sign-in with `initCloud=true`
- Dialog schema: `modules/dialogs/constant.ts` (`enable-cloud`, `sign-in`)

---

## 4. Electron native API checklist → Tauri desktop

Package: `packages/frontend/apps/electron` (+ `electron-api`, `electron-renderer`).  
Native work splits: **main** / **UtilityProcess helper** (SQLite) / **preload** bridge.

### 4.1 Required for a basic local desktop app

| Capability                                                   | Key paths                                                  | Tauri note                                                             |
| ------------------------------------------------------------ | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| App data FS layout (`sessionData` workspaces, config JSON)   | `main/index.ts`, `shared-storage`, `helper/workspace`      | `app_data_dir` / path plugin                                           |
| SQLite doc/blob/FTS via `@affine/native` `DocStoragePool`    | `helper/nbstore/handlers.ts`, `packages/frontend/native`   | **Hard** — Rust plugin or sidecar; Android already has UniFFI analogue |
| Custom window chrome (min/max/close, maximize events, theme) | `windows-manager/main-window.ts`, `ui/handlers.ts`         | Tauri window API                                                       |
| Asset serving (`assets://` → web-static SPA)                 | `main/protocol.ts`                                         | Tauri asset protocol / custom scheme                                   |
| Open/save dialogs, reveal in folder                          | `helper/dialog`, `shell.showItemInFolder`                  | dialog + opener plugins                                                |
| Shared JSON global state/cache IPC                           | `shared-storage`                                           | store plugin / custom commands                                         |
| Single-instance lock                                         | `main/index.ts`                                            | Tauri single-instance plugin                                           |
| IPC bridge matching `@affine/electron-api`                   | `preload`, `electron-api`                                  | invoke + events layer                                                  |
| Background worker MessagePorts                               | `main/worker/pool.ts`, electron-renderer background-worker | Web Workers may suffice; verify nbstore worker                         |

### 4.2 Required for cloud/auth parity (Supabase era)

| Capability                                     | Key paths                   | Tauri note                                                            |
| ---------------------------------------------- | --------------------------- | --------------------------------------------------------------------- |
| Deep links (`affine://…` auth)                 | `main/deep-link.ts`         | deep-link plugin                                                      |
| Secure session storage (`safeStorage`)         | `main/auth/auth-session.ts` | **OS keychain** (spec requirement) — e.g. stronghold / keyring plugin |
| Open external + navigation lockdown            | `security-restrictions.ts`  | opener + navigation allowlist                                         |
| (Old) HTTP `/api`+`/graphql` proxy with Bearer | `protocol.ts`               | **Likely drop** if client talks to Supabase directly                  |

### 4.3 Nice-to-have / defer

Tray, electron-updater, meeting/recording capture, BYOK `safeStorage`, find-in-page, spellcheck, vibrancy, Mermaid/Typst native preview, Sentry, clipboard PNG capture, powerMonitor.

### 4.4 Tauri in plain English (Phase 5 decision)

Today’s **Electron** desktop app is not just “a browser window with AFFiNE inside.” It also builds a **Chrome-like tab strip in the native window**: each open doc can be its own embedded web page (`WebContentsView`). That is custom Electron plumbing.

**Tauri** (what we will switch to) is great at “one app window → one web page.” Rebuilding Electron’s native multi-doc tab host is a separate, large project.

So the only real choice is:

| Option                                 | What you get                                                                                                                                                    | Cost                                           |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **A — Simple (recommended)**           | One desktop window. Opening docs works like the **web app** (in-app navigation / in-app tabs if the web UI already has them). Sync, editor, offline still work. | Normal Phase 5 effort                          |
| **B — Native multi-tab like Electron** | Same “real OS tabs” feel as current desktop                                                                                                                     | Much longer; easy to stall the whole migration |

**Default for this project: Option A.** Does not affect Android, Supabase sync, or removing AI. We only need a different answer if you specifically want Electron-style native tabs on day one.

**Owner confirmation (2026-07-27): Option A.**

---

## 5. Android / Capacitor native API checklist → Tauri Android

Package: `packages/frontend/apps/android` (+ `mobile-shared`). Capacitor 8 WebView shell loading `dist` (`webDir: 'dist'`).

### 5.1 Required for single-user local + editor

| Capability                                     | Paths / notes                                                                           |
| ---------------------------------------------- | --------------------------------------------------------------------------------------- |
| Packaged web build + workers                   | `capacitor.config.ts`, `src/index.tsx`, `src/nbstore.worker.ts`                         |
| **NbStore SQLite** custom plugin → Rust UniFFI | `src/plugins/nbstore/*`, `App/.../NbStorePlugin.kt`, `packages/frontend/mobile-native/` |
| Large blob file cache + `convertFileSrc`       | `mobile-native` blobs + `mobile-shared/src/nbstore/payload.ts`                          |
| Keyboard insets                                | `@capacitor/keyboard` + `AffineTheme` nav height                                        |
| Status bar theme + splash + edge-to-edge       | `@capacitor/status-bar`, `MainActivity` splash                                          |
| Predictive / system back                       | `MobileBack` plugin → `MobileBackCoordinator`                                           |
| `localStorage` + IndexedDB                     | WebView defaults                                                                        |

### 5.2 Optional for local-only; needed if using account sync UX

| Capability                                     | Notes                                                            |
| ---------------------------------------------- | ---------------------------------------------------------------- |
| Auth plugin + AndroidKeyStore-encrypted tokens | `AuthPlugin.kt` — map to Tauri secure storage + Supabase session |
| Deep link `affine://authentication`            | Manifest + `@capacitor/app` `appUrlOpen`                         |
| Capgo InAppBrowser                             | OAuth / external URLs                                            |
| HashCash mint                                  | Captcha for password sign-in (may drop with Supabase Auth)       |
| `cloudStorages` in worker                      | Replaced by Supabase storages in Phase 2–3                       |

### 5.3 Not present / skip

Push/FCM, biometrics, Capacitor Camera/Filesystem, HTTPS App Links, working native camera in AI chat (stubs only). Native Compose AI FAB/`AIActivity` is optional product surface — hide with Copilot for Phase 3.

### 5.4 Cloud assumptions in mobile shell today

- Registers both local + cloud workspace flavours.
- Worker includes `cloudStorages` + socket JWT auth channel.
- Native OkHttp GraphQL/SSE for AI.

---

## 6. Secrets / env discipline (checkpoint)

- Root `.env` **exists** — contents were **not** printed in this audit.
- `.gitignore` currently **does not** ignore `.env` — **must fix before first commit**.
- Client may ship **Supabase URL + anon key only**; **never** `service_role` in Tauri EXE/APK.
- RLS on every table (`owner_id = auth.uid()`) is the real security boundary.

---

## 7. Proposed Phase 1+ injection strategy (preview only — not started)

1. Add `supabase/migrations` mirroring `updates` + `snapshots` (+ `owner_id`), Storage bucket for blobs, RLS, Realtime.
2. New nbstore impls e.g. `SupabaseDocStorage` / `SupabaseBlobStorage` / `SupabaseAwarenessStorage` under `packages/common/nbstore/src/impls/supabase/`.
3. Register in each app’s `StoreManagerConsumer`.
4. Point `getEngineWorkerInitOptions` remotes at new identifiers (or new flavour that skips Nest GraphQL/Socket.IO).
5. Hide Cloud auth/billing/invite/Copilot UI listed in §3; open straight into local/synced workspace.
6. Defer Nest server from desktop/Android run path (leave code in tree).
7. Scaffold Tauri as **Option A** (simple one-window shell) unless owner overrides §4.4.
8. AI/Copilot: fully hide/remove from product UI (Phase 3); no replacement AI backend in scope.

---

## Checkpoint — STOP

**Recorded:** product = **Blank**; remove AFFiNE Cloud; Supabase sync; Option A Tauri; remove AI; remote home = `666base/blank`.

**Reply with e.g. `2a + 4b`** (recommended: branch-only push + new Supabase project), then Phase 1 SQL drafts for review.
