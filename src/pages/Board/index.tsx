import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Board = lazy(() => import('./Board'));
const Connection = lazy(() => import('src/components/Connection'));

export default function BoardLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Board />
      <Connection />
    </Suspense>
  );
}
