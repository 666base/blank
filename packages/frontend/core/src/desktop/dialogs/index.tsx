import {
  type DialogComponentProps,
  type GLOBAL_DIALOG_SCHEMA,
  GlobalDialogService,
  WorkspaceDialogService,
} from '@blank/core/modules/dialogs';
import type { WORKSPACE_DIALOG_SCHEMA } from '@blank/core/modules/dialogs/constant';
import { Loading } from '@blank/component';
import { useLiveData, useService } from '@toeverything/infra';
import {
  lazy,
  Suspense,
  type ComponentType,
  type FC,
} from 'react';

function lazyDialog<P extends object>(
  load: () => Promise<{ default: ComponentType<P> }>,
  fallback: FC | null = null
): FC<P> {
  const LazyDialog = lazy(load);
  const Fallback = fallback;
  const Dialog = (props: P) => (
    <Suspense
      fallback={
        Fallback ? (
          <Fallback />
        ) : null
      }
    >
      <LazyDialog {...props} />
    </Suspense>
  );
  return Dialog;
}

const DialogLoading = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 48,
    }}
  >
    <Loading size={24} />
  </div>
);

const GLOBAL_DIALOGS = {
  'create-workspace': lazyDialog(() =>
    import('./create-workspace').then(m => ({ default: m.CreateWorkspaceDialog }))
  ),
  'import-workspace': lazyDialog(() =>
    import('./import-workspace').then(m => ({
      default: m.ImportWorkspaceDialog,
    }))
  ),
  'import-template': lazyDialog(() =>
    import('./import-template').then(m => ({
      default: m.ImportTemplateDialog,
    }))
  ),
  'sign-in': lazyDialog(() =>
    import('./sign-in').then(m => ({ default: m.SignInDialog }))
  ),
  'change-password': lazyDialog(() =>
    import('./change-password').then(m => ({
      default: m.ChangePasswordDialog,
    }))
  ),
  'verify-email': lazyDialog(() =>
    import('./verify-email').then(m => ({ default: m.VerifyEmailDialog }))
  ),
  'enable-cloud': lazyDialog(() =>
    import('./enable-cloud').then(m => ({ default: m.EnableCloudDialog }))
  ),
  'deleted-account': lazyDialog(() =>
    import('./deleted-account').then(m => ({
      default: m.DeletedAccountDialog,
    }))
  ),
} satisfies {
  [key in keyof GLOBAL_DIALOG_SCHEMA]?: FC<
    DialogComponentProps<GLOBAL_DIALOG_SCHEMA[key]>
  >;
};

const WORKSPACE_DIALOGS = {
  'doc-info': lazyDialog(() =>
    import('./doc-info').then(m => ({ default: m.DocInfoDialog }))
  ),
  'collection-editor': lazyDialog(() =>
    import('./collection-editor').then(m => ({
      default: m.CollectionEditorDialog,
    }))
  ),
  'tag-selector': lazyDialog(() =>
    import('./selectors/tag').then(m => ({ default: m.TagSelectorDialog }))
  ),
  'doc-selector': lazyDialog(() =>
    import('./selectors/doc').then(m => ({ default: m.DocSelectorDialog }))
  ),
  'collection-selector': lazyDialog(() =>
    import('./selectors/collection').then(m => ({
      default: m.CollectionSelectorDialog,
    }))
  ),
  'date-selector': lazyDialog(() =>
    import('./selectors/date').then(m => ({ default: m.DateSelectorDialog }))
  ),
  setting: lazyDialog(
    () => import('./setting').then(m => ({ default: m.SettingDialog })),
    DialogLoading
  ),
  import: lazyDialog(() =>
    import('./import').then(m => ({ default: m.ImportDialog }))
  ),
} satisfies {
  [key in keyof WORKSPACE_DIALOG_SCHEMA]?: FC<
    DialogComponentProps<WORKSPACE_DIALOG_SCHEMA[key]>
  >;
};

export const GlobalDialogs = () => {
  const globalDialogService = useService(GlobalDialogService);
  const dialogs = useLiveData(globalDialogService.dialogs$);
  return (
    <>
      {dialogs.map(dialog => {
        const DialogComponent =
          GLOBAL_DIALOGS[dialog.type as keyof typeof GLOBAL_DIALOGS];
        if (!DialogComponent) {
          return null;
        }
        return (
          <DialogComponent
            key={dialog.id}
            {...(dialog.props as any)}
            close={(result?: unknown) => {
              globalDialogService.close(dialog.id, result);
            }}
          />
        );
      })}
    </>
  );
};

export const WorkspaceDialogs = () => {
  const workspaceDialogService = useService(WorkspaceDialogService);
  const dialogs = useLiveData(workspaceDialogService.dialogs$);
  return (
    <>
      {dialogs.map(dialog => {
        const DialogComponent =
          WORKSPACE_DIALOGS[dialog.type as keyof typeof WORKSPACE_DIALOGS];
        if (!DialogComponent) {
          return null;
        }
        return (
          <DialogComponent
            key={dialog.id}
            {...(dialog.props as any)}
            close={(result?: unknown) => {
              workspaceDialogService.close(dialog.id, result);
            }}
          />
        );
      })}
    </>
  );
};
