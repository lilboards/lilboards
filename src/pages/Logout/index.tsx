import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Logout = lazy(() => import('./Logout'));

export default function LogoutLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Logout />
    </Suspense>
  );
}
