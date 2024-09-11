// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

// const firebaseConfig = {
//   apiKey: "AIzaSyDvHdzKSxIRgfcFbr-B2mvqo5eh6mosd7g",
//   authDomain: "thaiseva-85cda.firebaseapp.com",
//   databaseURL:
//     "https://thaiseva-85cda-default-rtdb.asia-southeast1.firebasedatabase.app",
//   projectId: "thaiseva-85cda",
//   storageBucket: "thaiseva-85cda.appspot.com",
//   messagingSenderId: "113396010755",
//   appId: "1:113396010755:web:b8aef1274c34c090572336",
//   measurementId: "G-CEETGB10Q9",
// };

// firebase.initializeApp(firebaseConfig);
// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     "[firebase-messaging-sw.js] Received background message ",
//     payload
//   );
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: payload.notification.image,
//   };

//   self.registration.showNotification(notificationTitle, notificationOptions);
// });

// firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDvHdzKSxIRgfcFbr-B2mvqo5eh6mosd7g",
  authDomain: "thaiseva-85cda.firebaseapp.com",
  databaseURL:
    "https://thaiseva-85cda-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "thaiseva-85cda",
  storageBucket: "thaiseva-85cda.appspot.com",
  messagingSenderId: "113396010755",
  appId: "1:113396010755:web:b8aef1274c34c090572336",
  measurementId: "G-CEETGB10Q9",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image || "/default-icon.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
