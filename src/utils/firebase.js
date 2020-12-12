import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtZyxuea8SSgAX5ZdjAKs2zje2VvoFsso",
  authDomain: "painfulink-dev.firebaseapp.com",
  projectId: "painfulink-dev",
  storageBucket: "painfulink-dev.appspot.com",
  messagingSenderId: "28634819054",
  appId: "1:28634819054:web:f82de24de7c7fdc94386ff",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
