import { isCapacitorNative } from './local-only';

type NativeHttpResponse = {
  status: number;
  data: unknown;
  headers: Record<string, string>;
};

function headersToRecord(headers?: HeadersInit): Record<string, string> {
  const result: Record<string, string> = {};
  if (!headers) {
    return result;
  }
  new Headers(headers).forEach((value, key) => {
    result[key] = value;
  });
  return result;
}

function decodeNativeBody(data: unknown): BodyInit | null {
  if (data == null) {
    return null;
  }
  if (data instanceof ArrayBuffer) {
    return data;
  }
  if (data instanceof Uint8Array) {
    return data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
  }
  if (typeof data === 'string') {
    try {
      const binary = atob(data);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i += 1) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes.buffer;
    } catch {
      return data;
    }
  }
  return JSON.stringify(data);
}

/**
 * Uses Capacitor native HTTP on APK/WebView so GitHub release downloads are not
 * blocked by browser CORS.
 */
export async function nativeFetch(
  input: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  if (!isCapacitorNative()) {
    return fetch(input, init);
  }

  const { CapacitorHttp } = await import('@capacitor/core');
  const url =
    typeof input === 'string'
      ? input
      : input instanceof URL
        ? input.href
        : input.url;
  const method = (init?.method ?? 'GET').toUpperCase();

  const response = (await CapacitorHttp.request({
    url,
    method,
    headers: headersToRecord(init?.headers),
    responseType: 'arraybuffer',
  })) as NativeHttpResponse;

  const body = decodeNativeBody(response.data);
  return new Response(body, {
    status: response.status,
    headers: response.headers,
  });
}

export async function nativeFetchJson<T>(url: string): Promise<T> {
  const response = await nativeFetch(url, {
    headers: {
      Accept: 'application/vnd.github+json, application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`);
  }
  return response.json() as Promise<T>;
}
