import { describe, expect, test } from 'vitest';

import {
  bytesToPostgresHex,
  decodeBytea,
} from '../impls/blank-cloud/http';

describe('blank-cloud http helpers', () => {
  test('bytesToPostgresHex roundtrip', () => {
    const input = new Uint8Array([0, 1, 255, 42]);
    const hex = bytesToPostgresHex(input);
    expect(hex).toBe('\\x0001ff2a');
    expect(decodeBytea(hex)).toEqual(input);
  });

  test('decodeBytea handles byte array JSON', () => {
    expect(decodeBytea([1, 2, 3])).toEqual(new Uint8Array([1, 2, 3]));
  });

  test('decodeBytea handles base64', () => {
    expect(decodeBytea('AQID')).toEqual(new Uint8Array([1, 2, 3]));
  });

  test('decodeBytea handles 0x prefix', () => {
    expect(decodeBytea('0x0102')).toEqual(new Uint8Array([1, 2]));
  });
});
