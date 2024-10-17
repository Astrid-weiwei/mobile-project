import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function writeToDB(data, collectionName) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    console.log(docRef);
  } catch (err) {
    console.log("Write to DB ", err);
  }
}

export async function deleteFromDB(deleteId, collectionName) {
  try {
    await deleteDoc(doc(database, collectionName, deleteId));
  } catch (err) {
    console.log("delete from db ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteFromDB(docSnapshot.id, collectionName);
    });
  } catch (err) {
    console.log("delete all", err);
  }
}

// Function to update warning field
export async function updateGoalWarning(id, collectionName) {
  try {
    const goalRef = doc(database, collectionName, id);
    await updateDoc(goalRef, { warning: true });
  } catch (err) {
    console.log(err);
  }
}