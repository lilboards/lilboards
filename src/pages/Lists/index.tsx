import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Lists = lazy(() => import('./Lists'));
const Connection = lazy(() => import('../../components/Connection'));

export default function ListsLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Lists />
      <Connection />
    </Suspense>
  );
}
