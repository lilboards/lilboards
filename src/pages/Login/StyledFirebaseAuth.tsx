import 'firebaseui/dist/firebaseui.css';

import * as firebaseui from 'firebaseui';
import { useEffect, useRef, useState } from 'react';
import { firebaseAuth, onAuthStateChanged } from 'src/firebase/auth';

import uiConfig from './uiConfig';

/**
 * @see https://github.com/firebase/firebaseui-web-react/pull/173#issuecomment-1151532176
 */
export default function StyledFirebaseAuth() {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // get or create a FirebaseUI instance
    const authUI =
      // v8 ignore next
      firebaseui.auth.AuthUI.getInstance() ??
      new firebaseui.auth.AuthUI(firebaseAuth);

    // v8 ignore next
    if (uiConfig.signInFlow === 'popup') {
      authUI.reset();
    }

    // track the auth state to reset FirebaseUI if the user signs out
    const unregisterAuthObserver = onAuthStateChanged((user) => {
      if (!user && userSignedIn) {
        authUI.reset();
      }
      setUserSignedIn(Boolean(user));
    });

    // render the FirebaseUI widget
    authUI.start(ref.current as HTMLElement, uiConfig);

    return () => {
      unregisterAuthObserver();
      authUI.reset();
    };
  }, [userSignedIn]);

  return <div ref={ref} />;
}
