import { db } from "./InitializeFirebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

async function sendDocument(name, timestamp) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Level1"), {
    playerName: name,
    timeStamp: timestamp,
    id: uuidv4(),
  });
}
export default sendDocument;
