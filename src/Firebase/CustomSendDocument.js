import { db } from "./InitializeFirebase";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
async function CustomSendDocument(name = "Anonymous", document) {
  // Add a new document with a generated id.
  const docRef = await addDoc(collection(db, "Level1"), {
    ...document,
    playerName: name,
    id: uuidv4(),
  });
  return docRef;
}
export default CustomSendDocument;
