import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Boards = lazy(() => import('./Boards'));
const Connection = lazy(() => import('src/components/Connection'));

export default function BoardsLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Boards />
      <Connection />
    </Suspense>
  );
}
