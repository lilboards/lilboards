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
    'google.com', // require('firebase/auth').GoogleAuthProvider.PROVIDER_ID
    'github.com', // require('firebase/auth').GithubAuthProvider.PROVIDER_ID
    'twitter.com', // require('firebase/auth').TwitterAuthProvider.PROVIDER_ID
    'password', // require('firebase/auth').EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
};

export default uiConfig;
