
// CONFIGURA FIREBASE AQUI

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAnK8G0yyrmkbbhX0c_HqgptaMRueQmQ0o",
  authDomain: "pink-inventory-18409.firebaseapp.com",
  projectId: "pink-inventory-18409",
  storageBucket: "pink-inventory-18409.firebasestorage.app",
  messagingSenderId: "1062803207476",
  appId: "1:1062803207476:web:b61ab7d7587bbe327d2161",
  measurementId: "G-PV5CBF0D59"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
