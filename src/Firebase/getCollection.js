import { collection, getDocs } from "firebase/firestore";
import { db } from "./InitializeFirebase";
async function getCollection(DataFunction) {
  const querySnapshot = await getDocs(collection(db, "Level1"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    DataFunction(doc.data());
  });
}

export default getCollection;
