import { useI18n } from '@blank/i18n';

import { Button } from '../../ui/button';
import { AuthPageContainer } from '../auth-components';

export const ExpiredPage = ({ onOpenBlank }: { onOpenBlank: () => void }) => {
  const t = useI18n();
  return (
    <AuthPageContainer
      title={t['com.blank.expired.page.title']()}
      subtitle={t['com.blank.expired.page.new-subtitle']()}
    >
      <Button variant="primary" size="large" onClick={onOpenBlank}>
        {t['com.blank.auth.open.blank']()}
      </Button>
    </AuthPageContainer>
  );
};
