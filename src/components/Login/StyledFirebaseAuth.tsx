/* istanbul ignore file */
import 'firebaseui/dist/firebaseui.css';

import * as firebaseui from 'firebaseui';
import { useEffect, useRef, useState } from 'react';

import { firebaseAuth, onAuthStateChanged } from '../../firebase/auth';
import uiConfig from './uiConfig';

/**
 * @see https://github.com/firebase/firebaseui-web-react/pull/173#issuecomment-1151532176
 */
export default function StyledFirebaseAuth() {
  const [userSignedIn, setUserSignedIn] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // get or create a FirebaseUI instance
    const firebaseUiWidget =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebaseAuth);

    if (uiConfig.signInFlow === 'popup') {
      firebaseUiWidget.reset();
    }

    // track the auth state to reset FirebaseUI if the user signs out
    const unregisterAuthObserver = onAuthStateChanged((user) => {
      if (!user && userSignedIn) {
        firebaseUiWidget.reset();
      }
      setUserSignedIn(Boolean(user));
    });

    // Render the firebaseUi Widget.
    firebaseUiWidget.start(ref.current!, uiConfig);

    return () => {
      unregisterAuthObserver();
      firebaseUiWidget.reset();
    };
  }, [userSignedIn]);

  return <div ref={ref} />;
}
