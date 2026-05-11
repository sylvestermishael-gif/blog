import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Try standard getFirestore with the databaseId from config
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Test connection on boot
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

async function testConnection() {
  await delay(1000);
  try {
    // Attempting a simple read to verify connectivity
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firestore connection verified.");
  } catch (error) {
    console.warn("Firestore connection check:", error);
  }
}
testConnection();

export { signInWithPopup, signOut };
