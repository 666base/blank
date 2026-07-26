import type { SupabaseClient } from '@supabase/supabase-js';

import { AutoReconnectConnection } from '../../connection';

export type BlankSupabaseConnectionInner = {
  client: SupabaseClient;
  workspaceId: string;
  ownerId: string;
};

export type BlankSupabaseConnectionOptions = {
  /** Factory so auth session refresh can recreate the client. */
  createClient: () => Promise<{
    client: SupabaseClient;
    ownerId: string;
  }>;
  workspaceId: string;
};

/**
 * Shared connection for Blank Supabase doc/blob/awareness storages.
 * Client must be authenticated (RLS keys off auth.uid()).
 */
export class BlankSupabaseConnection extends AutoReconnectConnection<BlankSupabaseConnectionInner> {
  constructor(private readonly options: BlankSupabaseConnectionOptions) {
    super();
  }

  override get shareId() {
    return `blank-supabase:${this.options.workspaceId}`;
  }

  protected override async doConnect(
    _signal?: AbortSignal
  ): Promise<BlankSupabaseConnectionInner> {
    const { client, ownerId } = await this.options.createClient();
    if (!ownerId) {
      throw new Error('Blank Supabase: not authenticated');
    }
    return {
      client,
      ownerId,
      workspaceId: this.options.workspaceId,
    };
  }

  protected override doDisconnect(_conn: BlankSupabaseConnectionInner): void {
    // Caller owns client lifecycle (shared auth session).
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
  for (let i = 0; i < bytes.length; i++) {
    hex += bytes[i].toString(16).padStart(2, '0');
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
