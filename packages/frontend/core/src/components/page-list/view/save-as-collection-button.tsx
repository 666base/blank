import { Button, usePromptModal } from '@blank/component';
import { useI18n } from '@blank/i18n';
import { SaveIcon } from '@blocksuite/icons/rc';
import { useCallback } from 'react';

import * as styles from './save-as-collection-button.css';

interface SaveAsCollectionButtonProps {
  onConfirm: (collectionName: string) => void;
}

export const SaveAsCollectionButton = ({
  onConfirm,
}: SaveAsCollectionButtonProps) => {
  const t = useI18n();
  const { openPromptModal } = usePromptModal();
  const handleClick = useCallback(() => {
    openPromptModal({
      title: t['com.blank.editCollection.saveCollection'](),
      label: t['com.blank.editCollectionName.name'](),
      inputOptions: {
        placeholder: t['com.blank.editCollectionName.name.placeholder'](),
      },
      children: (
        <div className={styles.createTips}>
          {t['com.blank.editCollectionName.createTips']()}
        </div>
      ),
      confirmText: t['com.blank.editCollection.save'](),
      cancelText: t['com.blank.editCollection.button.cancel'](),
      confirmButtonOptions: {
        variant: 'primary',
      },
      onConfirm(name) {
        onConfirm(name);
      },
    });
  }, [openPromptModal, t, onConfirm]);
  return (
    <Button
      onClick={handleClick}
      data-testid="save-as-collection"
      prefix={<SaveIcon />}
      className={styles.button}
    >
      {t['com.blank.editCollection.saveCollection']()}
    </Button>
  );
};
