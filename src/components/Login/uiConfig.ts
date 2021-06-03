import firebase from 'firebase';

/**
 * Configure FirebaseUI.
 *
 * @see {@link https://github.com/firebase/firebaseui-web-react}
 */
const uiConfig = {
  // Popup sign-in flow rather than redirect flow.
  signInFlow: 'popup',
  // Display auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export default uiConfig;
