import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const NotFound = lazy(() => import('./NotFound'));

export default function NotFoundLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <NotFound />
    </Suspense>
  );
}
