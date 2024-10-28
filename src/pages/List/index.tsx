import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const List = lazy(() => import('./List'));
const Connection = lazy(() => import('src/components/Connection'));

export default function ListLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <List />
      <Connection />
    </Suspense>
  );
}
