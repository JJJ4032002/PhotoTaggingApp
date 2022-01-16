import { db } from "./InitializeFirebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { serverTimestamp } from "firebase/firestore";
async function sendDocument(name = "Anonymous", funcUser) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Level1"), {
    playerName: name,

    id: uuidv4(),
    startTimestamp: serverTimestamp(),
  });
  funcUser(docRef.id);
}
export default sendDocument;
