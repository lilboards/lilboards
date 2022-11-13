import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Board = lazy(() => import('./Board'));

export default function BoardLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Board />
    </Suspense>
  );
}
