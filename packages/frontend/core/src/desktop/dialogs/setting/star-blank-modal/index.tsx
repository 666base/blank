import { OverlayModal } from '@blank/component';
import { useI18n } from '@blank/i18n';

export const StarBlankModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const t = useI18n();

  return (
    <OverlayModal
      open={open}
      topImage={
        <video
          width={400}
          height={300}
          style={{ objectFit: 'cover' }}
          src={'/static/githubStar.mp4'}
          autoPlay
          loop
        />
      }
      title={t['com.blank.star-blank.title']()}
      onOpenChange={setOpen}
      description={t['com.blank.star-blank.description']()}
      cancelText={t['com.blank.star-blank.cancel']()}
      to={BUILD_CONFIG.githubUrl}
      confirmButtonOptions={{
        variant: 'primary',
      }}
      confirmText={t['com.blank.star-blank.confirm']()}
      external
    />
  );
};
