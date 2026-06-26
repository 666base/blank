import { RadioGroup } from '@blank/component';
import { useI18n } from '@blank/i18n';
import { useCallback, useMemo } from 'react';

import { useAppSettingHelper } from '../hooks/blank/use-app-setting-helper';
import { getVisualThemeOptions } from './get-visual-theme-options';

export const VisualThemePicker = ({
  className,
  width = 250,
}: {
  className?: string;
  width?: number | string;
}) => {
  const t = useI18n();
  const { appSettings, updateSettings } = useAppSettingHelper();
  const options = useMemo(() => getVisualThemeOptions(t), [t]);
  const value = appSettings.visualTheme ?? 'codex';

  const onChange = useCallback(
    (next: string) => {
      updateSettings('visualTheme', next as 'default' | 'codex');
    },
    [updateSettings]
  );

  return (
    <RadioGroup
      items={options}
      value={value}
      width={width}
      className={className}
      onChange={onChange}
    />
  );
};
