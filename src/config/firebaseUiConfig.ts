// src/firebaseUiConfig.ts
import { Auth, GoogleAuthProvider, EmailAuthProvider } from 'firebase/auth';
import * as firebaseui from 'firebaseui';
import { auth as firebaseAuth } from '../config/firebaseConfig';

const auth: Auth = firebaseAuth;

const uiConfig: firebaseui.auth.Config = {
  signInSuccessUrl: '/',
  signInOptions: [
    {
      provider: GoogleAuthProvider.PROVIDER_ID,
      customParameters: { prompt: 'select_account' },
      fullLabel: 'Sign in with Google',
    },
    {
      provider: EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false,
    },
  ],
  tosUrl: '/terms-of-service',
  privacyPolicyUrl: '/privacy-policy',
  signInFlow: 'popup',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

const ui = new firebaseui.auth.AuthUI(auth);

export { ui, uiConfig };