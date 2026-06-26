import { SafeArea } from '@blank/component';

import * as styles from './boot-placeholder.css';

/** Mobile home skeleton — matches inline boot shell for a seamless handoff. */
export const MobileBootPlaceholder = () => (
  <SafeArea top bottom className={styles.root} aria-hidden>
    <div className={styles.topRow}>
      <div className={styles.icon} />
      <div className={styles.icon} />
      <div className={styles.icon} />
      <div className={styles.icon} />
    </div>
    <div className={styles.tabsRow}>
      <div className={`${styles.tab} ${styles.tabActive}`} />
      <div className={styles.tab} />
      <div className={styles.tab} />
    </div>
    <div className={styles.content}>
      <div className={`${styles.line} ${styles.lineLg}`} />
      <div className={styles.card} />
      <div className={styles.card} />
      <div className={styles.line} />
      <div className={`${styles.line} ${styles.lineSm}`} />
      <div className={styles.line} />
    </div>
    <div className={styles.navbar}>
      <div className={`${styles.navIcon} ${styles.navIconActive}`} />
      <div className={styles.navIcon} />
      <div className={styles.navIcon} />
    </div>
  </SafeArea>
);
