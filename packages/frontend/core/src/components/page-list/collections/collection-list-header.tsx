import { Button } from '@blank/component';
import { useI18n } from '@blank/i18n';

import * as styles from './collection-list-header.css';

export const CollectionListHeader = ({
  onCreate,
}: {
  onCreate: () => void;
}) => {
  const t = useI18n();

  return (
    <div className={styles.collectionListHeader}>
      <div className={styles.collectionListHeaderTitle}>
        {t['com.blank.collections.header']()}
      </div>
      <Button
        className={styles.newCollectionButton}
        onClick={onCreate}
        data-testid="all-collection-new-button"
      >
        {t['com.blank.collections.empty.new-collection-button']()}
      </Button>
    </div>
  );
};
