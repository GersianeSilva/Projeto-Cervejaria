import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYuc7cHDCkK21BQF_vfufs6ux2337ERy0",
  authDomain: "banco-projeto-programacao-web.firebaseapp.com",
  projectId: "banco-projeto-programacao-web",
  storageBucket: "banco-projeto-programacao-web.firebasestorage.app",
  messagingSenderId: "1013767601359",
  appId: "1:1013767601359:web:a8beab944db24db6e80bba",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);