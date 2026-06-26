/**
 * Supabase PostgREST client for nbstore worker (no GraphQL).
 */

export const BLANK_ACCESS_TOKEN_KEY = 'blank:access-token';

export interface BlankSupabaseHttpOptions {
  supabaseUrl: string;
  supabaseAnonKey: string;
  accessToken: string;
}

function restBase(url: string) {
  return `${url.replace(/\/+$/, '')}/rest/v1`;
}

function readAccessToken(fallback: string) {
  try {
    return (
      globalThis.localStorage?.getItem(BLANK_ACCESS_TOKEN_KEY)?.trim() ||
      fallback
    );
  } catch {
    return fallback;
  }
}

function authHeaders(opts: BlankSupabaseHttpOptions) {
  const token = readAccessToken(opts.accessToken);
  return {
    apikey: opts.supabaseAnonKey,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
}

export function bytesToPostgresHex(bin: Uint8Array) {
  const hex = Array.from(bin)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return `\\x${hex}`;
}

/** Decode PostgREST bytea: \\x hex, base64, or JSON array of bytes. */
export function decodeBytea(value: unknown): Uint8Array {
  if (value instanceof Uint8Array) {
    return value;
  }
  if (Array.isArray(value)) {
    return new Uint8Array(value);
  }
  if (typeof value !== 'string' || !value.length) {
    return new Uint8Array();
  }

  if (value.startsWith('\\x') || value.startsWith('0x')) {
    const normalized = value.startsWith('\\x') ? value.slice(2) : value.slice(2);
    const out = new Uint8Array(normalized.length / 2);
    for (let i = 0; i < out.length; i++) {
      out[i] = parseInt(normalized.slice(i * 2, i * 2 + 2), 16);
    }
    return out;
  }

  try {
    const binary = atob(value);
    const out = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      out[i] = binary.charCodeAt(i);
    }
    return out;
  } catch {
    return new Uint8Array();
  }
}

export async function blankRestFetch(
  opts: BlankSupabaseHttpOptions,
  path: string,
  init?: RequestInit
) {
  const res = await fetch(`${restBase(opts.supabaseUrl)}${path}`, {
    ...init,
    headers: {
      ...authHeaders(opts),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`Supabase REST ${res.status}: ${body || res.statusText}`);
  }
  return res;
}

export async function blankRpc<T>(
  opts: BlankSupabaseHttpOptions,
  fn: string,
  args: Record<string, unknown>
): Promise<T> {
  const res = await blankRestFetch(opts, `/rpc/${fn}`, {
    method: 'POST',
    body: JSON.stringify(args),
  });
  return (await res.json()) as T;
}
