import { collection, addDoc, doc } from "firebase/firestore";
import { database } from "./firebaseSetup"; // Import the Firestore instance
import { doc, deleteDoc } from "firebase/firestore"; 
import { getDocs } from "firebase/firestore"; 

export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
        return docRef;
    } catch (err) {
        console.error("Error adding documenxt: ", err);
    }
}

export async function deleteFromDB(id, collectionName) {
    try { 
      await deleteDoc(doc(database, collectionName, deleteId));
    }
    catch (err) {
      console.log(err)
    }
  }


  export async function deleteAllFromDB(collectionName) {
    try { 
     const querySnapshot = await getDocs(collection(database, collectionName));
     querySnapshot.forEach((doc) => {
        deleteFromDB(doc.id, collectionName)
     });
  
    }
    catch (err) {
      console.log(err)
    }
  }