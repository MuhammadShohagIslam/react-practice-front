import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const app = initializeApp({
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKEY,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDING_ID,
    appId: process.env.REACT_APP_APP_ID,
});

export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider()
export default app;
