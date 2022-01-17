import { collection, getDocs } from "firebase/firestore";
import { db } from "./InitializeFirebase";
async function calculateTime(data, func, id) {
  let time = await data.endTimestamp.seconds;
  let time2 = await data.startTimestamp.seconds;
  if (data.playerName === "Anonymous") {
    console.log("deleted");

    func({ timestamp: time - time2, ...data, AnonId: id });
  } else {
    console.log("else");
    func({ timestamp: time - time2, ...data });
  }
}

async function getCollection(DataFunction, Reminder) {
  const querySnapshot = await getDocs(collection(db, "Level1"));
  querySnapshot.forEach((doc) => {
    calculateTime(doc.data(), DataFunction, doc.id);
    // doc.data() is never undefined for query doc snapshots
  });
  console.log("bruh");
  Reminder();
}

export default getCollection;
