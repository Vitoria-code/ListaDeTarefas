import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPox9SdHyc_ic8hnb4d8lbeUttJ5gFYw8",
  authDomain: "listadetarefas-f5e22.firebaseapp.com",
  projectId: "listadetarefas-f5e22",
  storageBucket: "listadetarefas-f5e22.appspot.com",
  messagingSenderId: "979642273991",
  appId: "1:979642273991:web:bd4b68118665dea08d2ee2",
  measurementId: "G-LZMSMTGPHV",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
