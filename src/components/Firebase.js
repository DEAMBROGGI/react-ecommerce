import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAzsCL7eQ37r7u_WHIWI9gN12LNt2q0qEY",
  authDomain: "amdev-2e652.firebaseapp.com",
  databaseURL: "https://amdev-2e652-default-rtdb.firebaseio.com",
  projectId: "amdev-2e652",
  storageBucket: "amdev-2e652.appspot.com",
  messagingSenderId: "1004868076348",
  appId: "1:1004868076348:web:e5f9932e44dc038289d439",
  measurementId: "G-1DL648R1YD"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth();
export {auth}

