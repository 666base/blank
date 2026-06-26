import { isLocalOnlyMode } from '@blank/core/utils/local-only';
import { Navigate } from 'react-router-dom';

export const Component = () => {
  if (isLocalOnlyMode()) {
    return <Navigate to="/" replace />;
  }

  return <Navigate to="/sign-in" replace />;
};
