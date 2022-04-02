import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB7oU2Dv9nk9hqZC8r4lk3I9kBDNwVNcGo",
  authDomain: "class-suit-d5fc1.firebaseapp.com",
  projectId: "class-suit-d5fc1",
  storageBucket: "class-suit-d5fc1.appspot.com",
  messagingSenderId: "9795694558",
  appId: "1:9795694558:web:2f065cd0ebd7bcdb5af74f",
};

initializeApp(firebaseConfig);
const messaging = getMessaging()

onBackgroundMessage(messaging, (payload) => {
	console.log('[firebase-messaging-sw.js] Received background message ', payload);
	// Customize notification here
	const notificationTitle = 'Background Message Title';
	const notificationOptions = {
	  body: 'Background Message body.',
	  icon: '/firebase-logo.png'
	};
  
	self.registration.showNotification(notificationTitle,
	  notificationOptions);
  });
  