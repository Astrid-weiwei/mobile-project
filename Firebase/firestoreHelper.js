import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
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
  } catch (err) {
    console.log("delete all", err);
  }
}
// import {
//   addDoc,
//   collection,
//   deleteDoc,
//   doc,
//   getDocs,
//   setDoc,
// } from "firebase/firestore";
// import { database } from "./firebaseSetup";

// // Function to write user data to a specific goal's subcollection "users"
// export async function writeUsersToSubcollection(goalId, userData) {
//   try {
//     const goalRef = doc(database, "goals", goalId);  // Reference to the specific goal
//     const usersCollectionRef = collection(goalRef, "users");  // Reference to the "users" subcollection
    
//     for (const user of userData) {
//       await addDoc(usersCollectionRef, user);  // Add each user to the subcollection
//     }
//     console.log("Users added to subcollection");
//   } catch (err) {
//     console.log("Error adding users to subcollection: ", err);
//   }
// }

// // Function to get all users from a specific goal's subcollection "users"
// export async function getUsersFromSubcollection(goalId) {
//   try {
//     const goalRef = doc(database, "goals", goalId);
//     const usersCollectionRef = collection(goalRef, "users");
    
//     const querySnapshot = await getDocs(usersCollectionRef);
//     let usersArray = [];
    
//     querySnapshot.forEach((docSnapshot) => {
//       usersArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
//     });
    
//     return usersArray;
//   } catch (err) {
//     console.log("Error fetching users from subcollection: ", err);
//     return [];
//   }
// }
