
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, setDoc, doc, deleteDoc, updateDoc, query, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB53HtHrhnVKfbKw5EXCHCM2T02iThHg7s",
  authDomain: "salon-ec477.firebaseapp.com",
  projectId: "salon-ec477",
  storageBucket: "salon-ec477.firebasestorage.app",
  messagingSenderId: "892920150494",
  appId: "1:892920150494:web:ae54b7ac0b624c8841454f",
  measurementId: "G-HXLN17PT54"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export const fetchData = async (collectionName: string) => {
  try {
    const q = query(collection(db, collectionName));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error: any) {
    if (error.code === 'permission-denied') {
      console.error(`🔥 FIREBASE PERMISSION ERROR: Please go to Firebase Console > Firestore > Rules and set them to "allow read, write: if true;" for testing.`);
    } else {
      console.error(`Error fetching ${collectionName}:`, error);
    }
    return [];
  }
};

export const subscribeToCollection = (collectionName: string, callback: (data: any[]) => void) => {
  const q = query(collection(db, collectionName));
  return onSnapshot(q, (querySnapshot) => {
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(data);
  }, (error) => {
    console.error(`Error subscribing to ${collectionName}:`, error);
  });
};

export const saveData = async (collectionName: string, id: string, data: any) => {
  try {
    await setDoc(doc(db, collectionName, id), data);
    return true;
  } catch (error: any) {
    console.error(`Error saving to ${collectionName}:`, error.message);
    return false;
  }
};

export const updateFields = async (collectionName: string, id: string, fields: any) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, fields);
    return true;
  } catch (error: any) {
    console.error(`Error updating ${collectionName}:`, error.message);
    return false;
  }
};

export const deleteData = async (collectionName: string, id: string) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return true;
  } catch (error: any) {
    console.error(`Error deleting from ${collectionName}:`, error.message);
    return false;
  }
};
