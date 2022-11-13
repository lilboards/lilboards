import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

import type { Props } from './Protected';

const Protected = lazy(() => import('./Protected'));

export default function ProtectedLoader(props: Props) {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Protected {...props} />
    </Suspense>
  );
}
