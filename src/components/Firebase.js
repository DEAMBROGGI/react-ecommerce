import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_API_DATA",
    authDomain: "YOUR_API_DATA",
    databaseURL: "YOUR_API_DATA",
    projectId: "YOUR_API_DATA",
    storageBucket: "YOUR_API_DATA",
    messagingSenderId: "YOUR_API_DATA",
    appId: "YOUR_API_DATA",
    measurementId: "YOUR_API_DATA"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth();
export {auth}

