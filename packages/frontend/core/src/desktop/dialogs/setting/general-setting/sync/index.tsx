import { Button, Input } from '@blank/component';
import {
  SettingHeader,
  SettingRow,
  SettingWrapper,
} from '@blank/component/setting-components';
import { useI18n } from '@blank/i18n';
import { useCallback, useState } from 'react';

import {
  getBlankSyncServerUrl,
  isBlankSyncEnabled,
  isBlankSyncServerLocked,
  setBlankSyncServerUrl,
} from '../../../../../utils/sync-config';

export const BlankSyncSettings = () => {
  const t = useI18n();
  const locked = isBlankSyncServerLocked();
  const activeUrl = getBlankSyncServerUrl() ?? '';
  const [draft, setDraft] = useState(activeUrl);
  const [error, setError] = useState<string | null>(null);

  const onSave = useCallback(() => {
    setError(null);
    const trimmed = draft.trim();
    if (trimmed && !/^https?:\/\//i.test(trimmed)) {
      setError(t['com.blank.sync.url.invalid']());
      return;
    }

    try {
      setBlankSyncServerUrl(trimmed || null);
      globalThis.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }, [draft, t]);

  const onClear = useCallback(() => {
    if (locked) {
      return;
    }
    setBlankSyncServerUrl(null);
    globalThis.location.reload();
  }, [locked]);

  return (
    <>
      <SettingHeader
        title={t['com.blank.sync.title']()}
        subtitle={t['com.blank.sync.subtitle']()}
      />
      <SettingWrapper title={t['com.blank.sync.server.title']()}>
        <SettingRow
          name={t['com.blank.sync.server.url']()}
          desc={
            locked
              ? t['com.blank.sync.server.locked']()
              : t['com.blank.sync.server.url.desc']()
          }
        >
          <Input
            value={draft}
            onChange={setDraft}
            placeholder="https://sync.example.com"
            disabled={locked}
            style={{ minWidth: 240 }}
          />
        </SettingRow>
        {error ? (
          <SettingRow name={error} desc="">
            <span />
          </SettingRow>
        ) : null}
        <SettingRow
          name={t['com.blank.sync.status']()}
          desc={
            isBlankSyncEnabled()
              ? t['com.blank.sync.status.on']()
              : t['com.blank.sync.status.off']()
          }
        />
        {!locked ? (
          <SettingRow name="" desc="">
            <Button onClick={onSave}>{t['com.blank.sync.save']()}</Button>
            {isBlankSyncEnabled() ? (
              <Button variant="error" onClick={onClear}>
                {t['com.blank.sync.clear']()}
              </Button>
            ) : null}
          </SettingRow>
        ) : null}
      </SettingWrapper>
    </>
  );
};
