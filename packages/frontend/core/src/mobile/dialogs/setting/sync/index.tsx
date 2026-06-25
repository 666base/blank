import { Button, Input } from '@affine/component';
import { useI18n } from '@affine/i18n';
import { useCallback, useState } from 'react';

import {
  getBlankSyncServerUrl,
  isBlankSyncEnabled,
  isBlankSyncServerLocked,
  setBlankSyncServerUrl,
} from '../../../../utils/sync-config';
import { SettingGroup } from '../group';
import { RowLayout } from '../row.layout';

export const SyncGroup = () => {
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

  return (
    <SettingGroup title={t['com.blank.sync.title']()}>
      <RowLayout label={t['com.blank.sync.server.url']()}>
        <Input
          value={draft}
          onChange={setDraft}
          placeholder="https://sync.example.com"
          disabled={locked}
        />
      </RowLayout>
      {error ? <RowLayout label={error}>{null}</RowLayout> : null}
      <RowLayout label={t['com.blank.sync.status']()}>
        {isBlankSyncEnabled()
          ? t['com.blank.sync.status.on']()
          : t['com.blank.sync.status.off']()}
      </RowLayout>
      {!locked ? (
        <RowLayout label="">
          <Button onClick={onSave}>{t['com.blank.sync.save']()}</Button>
        </RowLayout>
      ) : null}
    </SettingGroup>
  );
};
