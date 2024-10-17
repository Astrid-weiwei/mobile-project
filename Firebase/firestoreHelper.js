import { collection, addDoc, doc } from "firebase/firestore";
import { database } from "./firebaseSetup"; // Import the Firestore instance


export async function writeToDB(data, collectionName) {
    try {
        const docRef = await addDoc(collection(database, collectionName), data);
        return docRef;
    } catch (err) {
        console.error("Error adding documenxt: ", err);
    }
}