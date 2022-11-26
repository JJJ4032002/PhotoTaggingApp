import { collection, getDocs } from "firebase/firestore";
import { db } from "./InitializeFirebase";

async function getCollection() {
  const querySnapshot = await getDocs(collection(db, "Level1"));
  let data = querySnapshot.docs.map((doc) => {
    if (doc.data().playerName === "Anonymous") {
      return { ...doc.data(), AnonId: doc.id };
    } else {
      return { ...doc.data() };
    }

    // doc.data() is never undefined for query doc snapshots
  });
  return data;
}

export default getCollection;
