import {
  MenuItem,
  MenuTrigger,
  RadioGroup,
  type RadioItem,
} from '@blank/component';
import { SettingRow } from '@blank/component/setting-components';
import { EditorSettingService } from '@blank/core/modules/editor-setting';
import { useI18n } from '@blank/i18n';
import {
  DefaultTheme,
  FontFamily,
  FontFamilyMap,
  FontStyle,
  FontWeightMap,
  TextAlign,
} from '@blocksuite/blank/model';
import type { Store } from '@blocksuite/blank/store';
import { useFramework, useLiveData } from '@toeverything/infra';
import { isEqual } from 'lodash-es';
import { useCallback, useMemo } from 'react';

import { DropdownMenu } from '../menu';
import { menuTrigger, settingWrapper } from '../style.css';
import { sortedFontWeightEntries, usePalettes } from '../utils';
import { Point } from './point';
import { EdgelessSnapshot } from './snapshot';

export const TextSettings = () => {
  const t = useI18n();
  const framework = useFramework();
  const { editorSetting } = framework.get(EditorSettingService);
  const settings = useLiveData(editorSetting.settings$);
  const { palettes, getCurrentColor } = usePalettes(
    DefaultTheme.StrokeColorShortPalettes,
    DefaultTheme.textColor
  );

  const alignItems = useMemo<RadioItem[]>(
    () => [
      {
        value: TextAlign.Left,
        label:
          t[
            'com.blank.settings.editorSettings.edgeless.text.alignment.left'
          ](),
      },
      {
        value: TextAlign.Center,
        label:
          t[
            'com.blank.settings.editorSettings.edgeless.text.alignment.center'
          ](),
      },
      {
        value: TextAlign.Right,
        label:
          t[
            'com.blank.settings.editorSettings.edgeless.text.alignment.right'
          ](),
      },
    ],
    [t]
  );

  const { textAlign } = settings['blank:edgeless-text'];
  const setTextAlign = useCallback(
    (value: TextAlign) => {
      editorSetting.set('blank:edgeless-text', {
        textAlign: value,
      });
    },
    [editorSetting]
  );

  const colorItems = useMemo(() => {
    const { color } = settings['blank:edgeless-text'];
    return palettes.map(({ key, value, resolvedValue }) => {
      const handler = () => {
        editorSetting.set('blank:edgeless-text', { color: value });
      };
      const isSelected = isEqual(color, value);
      return (
        <MenuItem
          key={key}
          onSelect={handler}
          selected={isSelected}
          prefix={<Point color={resolvedValue} />}
        >
          {key}
        </MenuItem>
      );
    });
  }, [editorSetting, settings, palettes]);

  const fontFamilyItems = useMemo(() => {
    const { fontFamily } = settings['blank:edgeless-text'];
    return Object.entries(FontFamily).map(([name, value]) => {
      const handler = () => {
        editorSetting.set('blank:edgeless-text', { fontFamily: value });
      };
      const isSelected = fontFamily === value;
      return (
        <MenuItem key={name} onSelect={handler} selected={isSelected}>
          {name}
        </MenuItem>
      );
    });
  }, [editorSetting, settings]);

  const fontStyleItems = useMemo(() => {
    const { fontStyle } = settings['blank:edgeless-text'];
    return Object.entries(FontStyle).map(([name, value]) => {
      const handler = () => {
        editorSetting.set('blank:edgeless-text', { fontStyle: value });
      };
      const isSelected = fontStyle === value;
      return (
        <MenuItem key={name} onSelect={handler} selected={isSelected}>
          {name}
        </MenuItem>
      );
    });
  }, [editorSetting, settings]);

  const fontWeightItems = useMemo(() => {
    const { fontWeight } = settings['blank:edgeless-text'];
    return sortedFontWeightEntries.map(([name, value]) => {
      const handler = () => {
        editorSetting.set('blank:edgeless-text', { fontWeight: value });
      };
      const isSelected = fontWeight === value;
      return (
        <MenuItem key={name} onSelect={handler} selected={isSelected}>
          {name}
        </MenuItem>
      );
    });
  }, [editorSetting, settings]);

  const currentColor = useMemo(() => {
    const { color } = settings['blank:edgeless-text'];
    return getCurrentColor(color);
  }, [getCurrentColor, settings]);

  const getElements = useCallback((doc: Store) => {
    return doc.getBlocksByFlavour('blank:edgeless-text') || [];
  }, []);

  return (
    <>
      <EdgelessSnapshot
        title={t['com.blank.settings.editorSettings.edgeless.text']()}
        docName="text"
        keyName="blank:edgeless-text"
        getElements={getElements}
      />
      <SettingRow
        name={t['com.blank.settings.editorSettings.edgeless.text.color']()}
        desc={''}
      >
        {currentColor ? (
          <DropdownMenu
            items={colorItems}
            trigger={
              <MenuTrigger
                className={menuTrigger}
                prefix={<Point color={currentColor.resolvedValue} />}
              >
                {currentColor.key}
              </MenuTrigger>
            }
          />
        ) : null}
      </SettingRow>
      <SettingRow
        name={t[
          'com.blank.settings.editorSettings.edgeless.text.font-family'
        ]()}
        desc={''}
      >
        <DropdownMenu
          items={fontFamilyItems}
          trigger={
            <MenuTrigger className={menuTrigger}>
              {FontFamilyMap[settings['blank:edgeless-text'].fontFamily]}
            </MenuTrigger>
          }
        />
      </SettingRow>
      <SettingRow
        name={t[
          'com.blank.settings.editorSettings.edgeless.text.font-style'
        ]()}
        desc={''}
      >
        <DropdownMenu
          items={fontStyleItems}
          trigger={
            <MenuTrigger className={menuTrigger}>
              {String(settings['blank:edgeless-text'].fontStyle)}
            </MenuTrigger>
          }
        />
      </SettingRow>
      <SettingRow
        name={t[
          'com.blank.settings.editorSettings.edgeless.text.font-weight'
        ]()}
        desc={''}
      >
        <DropdownMenu
          items={fontWeightItems}
          trigger={
            <MenuTrigger className={menuTrigger}>
              {FontWeightMap[settings['blank:edgeless-text'].fontWeight]}
            </MenuTrigger>
          }
        />
      </SettingRow>
      <SettingRow
        name={t['com.blank.settings.editorSettings.edgeless.text.alignment']()}
        desc={''}
      >
        <RadioGroup
          items={alignItems}
          value={textAlign}
          width={250}
          className={settingWrapper}
          onChange={setTextAlign}
        />
      </SettingRow>
    </>
  );
};
