import { Button } from '@blank/component';
import { useNavigateHelper } from '@blank/core/components/hooks/use-navigate-helper';
import { useI18n } from '@blank/i18n';

export const ImportTemplateButton = ({
  name,
  snapshotUrl,
}: {
  name: string;
  snapshotUrl: string;
}) => {
  const t = useI18n();
  const { jumpToImportTemplate } = useNavigateHelper();
  return (
    <Button
      variant="primary"
      onClick={() => jumpToImportTemplate(name, snapshotUrl)}
    >
      {t['com.blank.share-page.header.import-template']()}
    </Button>
  );
};
