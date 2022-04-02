// import firebase from 'firebase'
// import axios from 'axios'
// // import { collection, query, getDocs } from "firebase/firestore";
// console.log(firebase)
// const msg = firebase.messaging();
// msg.requestPermission().then(() => {
//   return msg.getToken()
// })
// .then(token => {
//   console.log(token)
// })
// // const q = query(collection(db, "FCM"));

// // const querySnapshot = await getDocs(q);
// // querySnapshot.forEach((doc) => {
// //   console.log(doc.id, " => ", doc.data());
// // });

// const sendPushMessage = (message) => {
//   console.log(message);
//   const headers = {
//     "Content-Type": "application/json",
//     Authorization:
//     "Bearer ya29.A0ARrdaM88Gn_ArVMh__k8a-M4ngWyHksuMS5kOfu9XYWHwvf9-kp-YHMgcrCoBrClDy6SWKNgMH_cx-H5_vzky5g8kRFtHFv56242NsQqxHG0ubOJTSy8y6tno7oV61QxbYD52i0kjawCK14kyNZO2wPiqiBL",
//   };
  
//   const body = {
//     to: "/topics/news",
//     data: {
//       story_id: "story_12345",
//     },
//   };
  
//   axios.post("https://fcm.googleapis.com/fcm/send", body, { headers });
// };

// // export default sendPushMessage;

// export default firebase