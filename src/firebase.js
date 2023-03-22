import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDpcZiaJiryrDdYwykRXPlxz_Qt0hcYW1k",
  authDomain: "sipaa-11571.firebaseapp.com",
  projectId: "sipaa-11571",
  storageBucket: "sipaa-11571.appspot.com",
  messagingSenderId: "4682548056",
  appId: "1:4682548056:web:ad4932f6e91ffa58301b2d",
  measurementId: "G-6FG4QVZZS8",
});

export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export default app;
