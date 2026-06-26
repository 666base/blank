import './page-detail-editor.css';

import { useLiveData, useService } from '@toeverything/infra';
import clsx from 'clsx';
import { lazy, Suspense, useEffect, useLayoutEffect } from 'react';

import { preloadBlockSuiteEditor } from '../blocksuite/preload-block-suite-editor';
import type { BlankEditorContainer } from '../blocksuite/block-suite-editor';
import { DocService } from '../modules/doc';
import { EditorService } from '../modules/editor';
import { EditorSettingService } from '../modules/editor-setting';
import { CachedDetailPageLoading } from './cached-detail-page-loading';
import * as styles from './page-detail-editor.css';

const BlockSuiteEditor = lazy(() =>
  preloadBlockSuiteEditor().then(module => ({
    default: module.BlockSuiteEditor,
  }))
);

declare global {
  // oxlint-disable-next-line no-var
  var currentEditor: BlankEditorContainer | undefined;
}

export type OnLoadEditor = (
  editor: BlankEditorContainer
) => (() => void) | void;

export interface PageDetailEditorProps {
  onLoad?: OnLoadEditor;
  readonly?: boolean;
}

type DocMetaWithHeaderImage = {
  headerImage?: string;
};

export const PageDetailEditor = ({
  onLoad,
  readonly,
}: PageDetailEditorProps) => {
  const editor = useService(EditorService).editor;
  const mode = useLiveData(editor.mode$);
  const defaultOpenProperty = useLiveData(editor.defaultOpenProperty$);

  const doc = useService(DocService).doc;
  const docMeta = useLiveData(doc.meta$) as DocMetaWithHeaderImage | null;
  const pageWidth = useLiveData(doc.properties$.selector(p => p.pageWidth));

  const isSharedMode = editor.isSharedMode;
  const editorSetting = useService(EditorSettingService).editorSetting;
  const settings = useLiveData(
    editorSetting.settings$.selector(s => ({
      fontFamily: s.fontFamily,
      customFontFamily: s.customFontFamily,
      fullWidthLayout: s.fullWidthLayout,
    }))
  );
  const fullWidthLayout = pageWidth
    ? pageWidth === 'fullWidth'
    : settings.fullWidthLayout;

  useLayoutEffect(() => {
    editor.doc.blockSuiteDoc.readonly = readonly === true;
  }, [editor, readonly]);

  useEffect(() => {
    preloadBlockSuiteEditor();
  }, []);

  return (
    <>
      {docMeta?.headerImage && (
        <img
          src={docMeta.headerImage}
          alt="Document header"
          style={{
            width: '100%',
            maxHeight: 240,
            objectFit: 'cover',
            borderRadius: 8,
            marginBottom: 12,
          }}
        />
      )}

      <Suspense fallback={<CachedDetailPageLoading pageId={doc.id} />}>
        <BlockSuiteEditor
          className={clsx(styles.editor, {
            'full-screen': !isSharedMode && fullWidthLayout,
            'is-public': isSharedMode,
          })}
          mode={mode}
          defaultOpenProperty={defaultOpenProperty}
          page={editor.doc.blockSuiteDoc}
          shared={isSharedMode}
          readonly={readonly}
          onEditorReady={onLoad}
        />
      </Suspense>
    </>
  );
};
