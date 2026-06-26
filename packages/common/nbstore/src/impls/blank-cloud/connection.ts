import { DummyConnection } from '../../connection';
import type { DocRecord } from '../../storage';
import {
  blankRestFetch,
  type BlankSupabaseHttpOptions,
  decodeBytea,
} from './http';

const POLL_MS = 5000;

type DocUpdateRow = {
  doc_id: string;
  update_data: string;
  created_at: string;
};

export class BlankDocConnection extends DummyConnection {
  private pollTimer: ReturnType<typeof setInterval> | null = null;
  private lastPollAt = new Date(0);
  private readonly knownTimestamps = new Map<string, number>();

  constructor(
    private readonly getHttp: () => BlankSupabaseHttpOptions,
    private readonly getWorkspaceId: () => string,
    private readonly onRemoteUpdate: (record: DocRecord) => void
  ) {
    super();
  }

  override connect(): void {
    super.connect();
    this.startPolling();
  }

  override disconnect(): void {
    this.stopPolling();
    super.disconnect();
  }

  private startPolling() {
    if (this.pollTimer) {
      return;
    }
    void this.poll();
    this.pollTimer = setInterval(() => void this.poll(), POLL_MS);
  }

  private stopPolling() {
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = null;
    }
  }

  private async poll() {
    try {
      const http = this.getHttp();
      const workspaceId = this.getWorkspaceId();
      const after = this.lastPollAt;
      const res = await blankRestFetch(
        http,
        `/blank_doc_updates?workspace_id=eq.${workspaceId}&select=doc_id,update_data,created_at&created_at=gt.${encodeURIComponent(after.toISOString())}&order=created_at.asc`
      );
      const rows = (await res.json()) as DocUpdateRow[];
      for (const row of rows) {
        const ts = new Date(row.created_at).getTime();
        const prev = this.knownTimestamps.get(row.doc_id) ?? 0;
        if (ts <= prev) {
          continue;
        }
        this.knownTimestamps.set(row.doc_id, ts);
        this.onRemoteUpdate({
          docId: row.doc_id,
          bin: decodeBytea(row.update_data),
          timestamp: new Date(row.created_at),
        });
        this.lastPollAt = new Date(row.created_at);
      }
    } catch (err) {
      console.warn('[BlankDocStorage] poll failed', err);
    }
  }
}
