import { useAuth } from '../../hooks';

import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  signInAnonymously?: boolean;
}

export default function Auth(props: Props) {
  const isLoaded = useAuth(props.signInAnonymously);

  return <>{isLoaded && props.children}</>;
}
