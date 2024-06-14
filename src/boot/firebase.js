import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB3DXnQgYgLyt7uIJVqDF1o_WPh-113DSw",
  authDomain: "ring-426023.firebaseapp.com",
  projectId: "ring-426023",
  storageBucket: "ring-426023.appspot.com",
  messagingSenderId: "1049510915808",
  appId: "1:1049510915808:web:c9643c7b8c0c1a0c4cea85",
};

firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();

export { db };
