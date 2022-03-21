import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyAHCKLN5mgLhXx3fdkjlplYn1yVr35SBuw",
	authDomain: "class-suit.firebaseapp.com",
	projectId: "class-suit",
	storageBucket: "class-suit.appspot.com",
	messagingSenderId: "724202617030",
	appId: "1:724202617030:web:c53f61fe9e533ae640bfc7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export default app;