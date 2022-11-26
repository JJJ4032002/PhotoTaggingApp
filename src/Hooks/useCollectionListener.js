import React, { useEffect } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase/InitializeFirebase";
function useCollectionListener(setProcessedData) {
  useEffect(() => {
    const q = query(collection(db, "Level1"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      async function ResolveCollection() {
        let UnResolvedData = querySnapshot.docs.map(async (doc) => {
          let endTime = await doc.data().endTimestamp?.seconds;
          let startTime = await doc.data().startTimestamp?.seconds;
          if (doc.data().playerName === "Anonymous") {
            return {
              timestamp: endTime - startTime,
              ...doc.data(),
              AnonId: doc.id,
            };
          } else {
            return { timestamp: endTime - startTime, ...doc.data() };
          }

          // doc.data() is never undefined for query doc snapshots
        });
        let resolvedData = await Promise.all(UnResolvedData);
        setProcessedData(resolvedData);
      }
      ResolveCollection();
    });
    return () => {
      unsubscribe();
    };
  }, [setProcessedData]);
}

export default useCollectionListener;
