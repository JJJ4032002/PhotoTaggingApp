import { doc, updateDoc } from "firebase/firestore";
import { db } from "./InitializeFirebase";
import { serverTimestamp } from "firebase/firestore";
async function updateDocument(id, key, value) {
  const PlayerDoc = doc(db, "Level1", id);
  let resp = await updateDoc(PlayerDoc, {
    [key]: value || serverTimestamp(),
  });
  return resp;
}
export default updateDocument;
