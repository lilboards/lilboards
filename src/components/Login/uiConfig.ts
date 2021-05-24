import firebase from 'firebase';

const { auth } = firebase;

/**
 * @see https://github.com/firebase/firebaseui-web-react
 */
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    auth.GoogleAuthProvider.PROVIDER_ID,
    auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

export default uiConfig;
