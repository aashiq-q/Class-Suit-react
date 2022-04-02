import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
// import { getMessaging } from 'firebase/messaging'

const firebaseConfig = {
	apiKey: "AIzaSyB7oU2Dv9nk9hqZC8r4lk3I9kBDNwVNcGo",
	authDomain: "class-suit-d5fc1.firebaseapp.com",
	projectId: "class-suit-d5fc1",
	storageBucket: "class-suit-d5fc1.appspot.com",
	messagingSenderId: "9795694558",
	appId: "1:9795694558:web:2f065cd0ebd7bcdb5af74f"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const messaging = getMessaging(app);
export const db = getFirestore();
export const storage = getStorage();
export default app;