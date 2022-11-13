import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Boards = lazy(() => import('./Boards'));

export default function BoardsLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Boards />
    </Suspense>
  );
}
