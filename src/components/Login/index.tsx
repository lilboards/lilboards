import CircularProgress from '@mui/material/CircularProgress';
import { lazy, Suspense } from 'react';

const Login = lazy(() => import('./Login'));

export default function LoginLoader() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Login />
    </Suspense>
  );
}
