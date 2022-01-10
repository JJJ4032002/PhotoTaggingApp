import { db } from "./InitializeFirebase";
import { doc, getDoc } from "firebase/firestore";
async function getDocument(device, getDataFunction) {
  const docRef = doc(db, "ClickCoordinates", device);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    getDataFunction(docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

export default getDocument;
