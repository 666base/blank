import { RadioGroup } from '@blank/component';
import { normalizeColorMode } from '@blank/core/utils/color-mode';
import { useI18n } from '@blank/i18n';
import { useTheme } from 'next-themes';
import { useCallback, useMemo } from 'react';

import { getThemeOptions } from './get-theme-options';

export const ThemePicker = ({
  className,
  width = 250,
}: {
  className?: string;
  width?: number | string;
}) => {
  const t = useI18n();
  const { setTheme, theme } = useTheme();
  const options = useMemo(() => getThemeOptions(t), [t]);
  const value = normalizeColorMode(theme);

  const onChange = useCallback(
    (next: string) => {
      setTheme(normalizeColorMode(next));
    },
    [setTheme]
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
