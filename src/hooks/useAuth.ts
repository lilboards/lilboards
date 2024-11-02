import { useEffect, useState } from 'react';

import { logEvent, onAuthStateChanged, signInAnonymously } from '../firebase';
import { actions } from '../store';
import { useDispatch } from '.';

/**
 * User authentication.
 *
 * @param shouldSignInAnonymously - Should user sign in anonymously.
 * @returns - If authentication has finished.
 */
export function useAuth(shouldSignInAnonymously = false): boolean {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          actions.setUser({
            email: user.email,
            emailVerified: user.emailVerified,
            id: user.uid,
            photoURL: user.photoURL,
          }),
        );

        setIsLoaded(true);

        logEvent('login', {
          type: 'authenticated',
          email_verified: user.emailVerified,
        });
      } else if (shouldSignInAnonymously) {
        signInAnonymously();

        logEvent('login', {
          type: 'anonymous',
        });
      } else {
        setIsLoaded(true);
      }
    });

    return unregisterAuthObserver;
  }, [dispatch, shouldSignInAnonymously]);

  return isLoaded;
}
