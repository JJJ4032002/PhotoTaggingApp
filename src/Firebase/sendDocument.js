import { db } from "./InitializeFirebase";
import { collection, addDoc } from "firebase/firestore";

async function sendDocument(name, timestamp) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Level1"), {
    playerName: name,
    timeStamp: timestamp,
  });
}
export default sendDocument;
