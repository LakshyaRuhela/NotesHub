import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authnoteshub.firebaseapp.com",
  projectId: "authnoteshub",
  storageBucket: "authnoteshub.firebasestorage.app",
  messagingSenderId: "1032186323763",
  appId: "1:1032186323763:web:72794fcf12ecd4bb5b1446",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// authenticate app using firebase
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export { auth, provider };
