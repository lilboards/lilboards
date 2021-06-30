import { useEffect } from 'react';

import actions from '../actions';
import { firebaseAuth } from '../firebase';
import { useDispatch } from '.';

export function useAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unregisterAuthObserver = firebaseAuth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          actions.setUser({
            email: user.email,
            id: user.uid,
          })
        );
      }
    });

    return unregisterAuthObserver;
  }, [dispatch]);
}
