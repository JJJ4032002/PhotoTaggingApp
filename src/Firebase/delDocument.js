import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./InitializeFirebase";
async function delDocument(id, funcUser) {
  await deleteDoc(doc(db, "Level1", id));
  funcUser("");
}

export default delDocument;
