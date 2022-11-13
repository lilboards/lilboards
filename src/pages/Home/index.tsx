import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./Home'));

export default function HomeLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Home />
    </Suspense>
  );
}
