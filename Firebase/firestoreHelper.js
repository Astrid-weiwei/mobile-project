import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export async function saveUserLocation(uid, location) {
  try {
    await setDoc(
      doc(database, "users", uid),
      { location },
      { merge: true } // Ensures existing fields are not overwritten
    );
    console.log("User location saved successfully!");
  } catch (err) {
    console.log("Error saving user location:", err);
  }
}


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
    //we have also delete all docs in a the users subcollection
    deleteAllFromDB(`goals/${deleteId}/users`);
  } catch (err) {
    console.log("delete from db ", err);
  }
}
export async function updateDB(id, data, collectionName) {
  try {
    await setDoc(doc(database, collectionName, id), data, { merge: true });
  } catch (err) {
    console.log("update DB ", err);
  }
}

export async function deleteAllFromDB(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach((docSnapshot) => {
      deleteFromDB(docSnapshot.id, collectionName);
    });
    //delete all docs in users subcollection
  } catch (err) {
    console.log("delete all", err);
  }
}

export async function readAllDocs(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    let newArray = [];
    querySnapshot.forEach((docSnap) => {
      newArray.push(docSnap.data());
    });
    return newArray;
  } catch (err) {
    console.log("read all docs ", err);
  }
}

export async function getUserLocation(uid) {
  try {
    const userDoc = await getDoc(doc(database, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().location; // Return location info
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (err) {
    console.log("Error fetching user location:", err);
  }
}
