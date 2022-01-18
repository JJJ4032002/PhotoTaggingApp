import { collection, getDocs } from "firebase/firestore";
import { db } from "./InitializeFirebase";

async function getCollection(DataFunction, Reminder) {
  const querySnapshot = await getDocs(collection(db, "Level1"));
  querySnapshot.forEach((doc) => {
    if (doc.data().playerName === "Anonymous") {
      console.log("deleted");

      DataFunction({ ...doc.data(), AnonId: doc.id });
    } else {
      console.log("else");
      DataFunction({ ...doc.data() });
    }

    // doc.data() is never undefined for query doc snapshots
  });
  console.log("bruh");
  Reminder();
}

export default getCollection;
