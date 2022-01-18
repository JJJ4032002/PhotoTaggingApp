import { HashRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useLayoutEffect, useState } from "react";
import MainGame from "./Components/MainGame";
import LeaderBoard from "./Components/LeaderBoard";
import WelcomePage from "./WelcomePage";
import delDocument from "./Firebase/delDocument";
import getCollection from "./Firebase/getCollection";

function App() {
  // do this on route change
  //Getting the data from the collection.
  const [data, setData] = useState([]);
  //Data processed once it gets reminded from complete.
  const [processedData, setProcessedData] = useState([]);
  //Reminds once all the data from colection is added in data state.
  const [complete, setComplete] = useState(0);
  //Deletes the user if user abruptly leaves the game
  const [del, setDel] = useState(0);
  //Call to get the collection again once the data updates.
  const [Caller, setCaller] = useState(0);
  //Reminds to invoke the filter function to filter anonymous users

  //Once the processing of data is complete we gwt a reminder too.
  const [ProcessComp, setProcessComp] = useState(0);
  //Getting the current user id.
  const [user, setUser] = useState("");
  //Setting the user
  function getUser(doc) {
    setUser(doc);
  }
  //Setting the processed data
  function ProcessingData(data) {
    setProcessedData((prev) => {
      return [...prev, { ...data }];
    });
  }
  //Reminder to
  function ProcessCompleteReminder() {
    console.log("Reminding that the data is processed and updated");
    setProcessComp((prev) => {
      return prev + 1;
    });
  }
  //Setting up the new user.
  async function calculateTime(data, func) {
    let time = await data.endTimestamp?.seconds;
    let time2 = await data.startTimestamp?.seconds;
    console.log("awaitcall");
    func({ timestamp: time - time2, ...data });
    console.log("coplete");
    ProcessCompleteReminder();
  }

  //INitially gets the data and runs on caller reminder.
  useLayoutEffect(() => {
    console.log("Data received");
    getCollection(DataAdded, Reminder);
    return () => {};
  }, [Caller]);
  //Once the data is filtered it is once again processed to get time.
  useEffect(() => {
    if (complete) {
      console.log("Processing the data to get time");
      data.forEach((ele) => {
        calculateTime(ele, ProcessingData);
      });
    }
    return () => {};
  }, [complete]);
  //Reminder function to delete the user
  function UserDelete() {
    console.log("Reminded to delete the user.");
    setDel((prev) => {
      return prev + 1;
    });
  }
  //Useeffect to delete the user.
  useEffect(() => {
    if (user) {
      console.log("deleting");
      delDocument(user, getUser);
    }
  }, [del]);
  //Reminder to update the data.
  function UpdateData() {
    setCaller((prev) => {
      return prev + 1;
    });
    setData([]);
  }

  function DataAdded(data) {
    setData((prev) => {
      return [...prev, { ...data }];
    });
  }
  //Reminder to filter the data.
  function Reminder() {
    setComplete((complete) => {
      return complete + 1;
    });
    setProcessedData([]);
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route
          path="maingame"
          element={
            <MainGame
              user={user}
              UserDelete={UserDelete}
              getUser={getUser}
              UpdateData={UpdateData}
            />
          }
        />
        <Route
          path="leaderboard"
          element={
            <LeaderBoard data={[...processedData]} complete={ProcessComp} />
          }
        ></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
