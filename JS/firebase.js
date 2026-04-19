import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyC2FJlozUrYppeez1yv0VGvhwz2t1aEqO0",
  authDomain: "dra-training-app.firebaseapp.com",
  projectId: "dra-training-app",
  storageBucket: "dra-training-app.firebasestorage.app",
  messagingSenderId: "218811795010",
  appId: "1:218811795010:web:88af664ae71cf84fd20fdb"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
