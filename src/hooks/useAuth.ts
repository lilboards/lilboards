import { useEffect, useState } from 'react';

import actions from '../actions';
import { firebaseAnalytics, firebaseAuth } from '../firebase';
import { useDispatch } from '.';

export function useAuth(signInAnonymously = false) {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          actions.setUser({
            email: user.email,
            id: user.uid,
          })
        );
        setIsLoaded(true);

        firebaseAnalytics.logEvent('login', {
          type: 'authenticated',
        });
      } else if (signInAnonymously) {
        firebaseAuth.signInAnonymously();

        firebaseAnalytics.logEvent('login', {
          type: 'anonymous',
        });
      }
    });

    return unregisterAuthObserver;
  }, [dispatch, signInAnonymously]);

  return isLoaded;
}
