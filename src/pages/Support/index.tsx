import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Support = lazy(() => import('./Support'));

export default function SupportLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Support />
    </Suspense>
  );
}
