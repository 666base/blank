// oxlint-disable-next-line no-restricted-imports
import { isLocalOnlyMode } from '@affine/core/utils/local-only';
import { Navigate, useNavigate } from 'react-router-dom';

import { MobileSignInPanel } from '../components/sign-in';

export const Component = () => {
  const navigate = useNavigate();

  if (isLocalOnlyMode()) {
    return <Navigate to="/" replace />;
  }

  return <MobileSignInPanel onClose={() => navigate('/')} />;
};
