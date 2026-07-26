import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import { AutoReconnectConnection } from '../../connection';

export type BlankSupabaseConnectionInner = {
  client: SupabaseClient;
  workspaceId: string;
  ownerId: string;
};

/** Serializable opts for worker StoreInitOptions (no functions). */
export type BlankSupabaseStorageOpts = {
  /** Workspace / space id (also DocStorageOptions.id). */
  id: string;
  supabaseUrl: string;
  supabaseAnonKey: string;
  accessToken: string;
  refreshToken?: string;
  clientId?: string;
};

/**
 * Shared connection for Blank Supabase doc/blob/awareness storages.
 * Auth session is passed via accessToken (RLS keys off auth.uid()).
 */
export class BlankSupabaseConnection extends AutoReconnectConnection<BlankSupabaseConnectionInner> {
  constructor(private readonly options: BlankSupabaseStorageOpts) {
    super();
  }

  override get shareId() {
    return `blank-supabase:${this.options.id}`;
  }

  protected override async doConnect(
    _signal?: AbortSignal
  ): Promise<BlankSupabaseConnectionInner> {
    const client = createClient(
      this.options.supabaseUrl,
      this.options.supabaseAnonKey,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${this.options.accessToken}`,
          },
        },
      }
    );

    if (this.options.refreshToken) {
      const { error } = await client.auth.setSession({
        access_token: this.options.accessToken,
        refresh_token: this.options.refreshToken,
      });
      if (error) {
        throw new Error(`Blank Supabase session: ${error.message}`);
      }
    }

    const { data, error } = await client.auth.getUser(this.options.accessToken);
    if (error || !data.user) {
      throw new Error(
        `Blank Supabase: not authenticated (${error?.message ?? 'no user'})`
      );
    }

    return {
      client,
      ownerId: data.user.id,
      workspaceId: this.options.id,
    };
  }

  protected override doDisconnect(_conn: BlankSupabaseConnectionInner): void {
    // Session owned by main-thread Blank auth; do not sign out here.
  }
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/** Encode bytea for PostgREST: \\x hex */
export function bytesToByteaHex(bytes: Uint8Array): string {
  let hex = '';
  for (const b of bytes) {
    hex += b.toString(16).padStart(2, '0');
  }
  return `\\x${hex}`;
}

export function byteaHexToBytes(value: string | Uint8Array): Uint8Array {
  if (value instanceof Uint8Array) {
    return value;
  }
  const hex = value.startsWith('\\x') ? value.slice(2) : value;
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}
