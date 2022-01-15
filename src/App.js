import { HashRouter, Routes, Route } from "react-router-dom";

import MainGame from "./Components/MainGame";
import LeaderBoard from "./Components/LeaderBoard";
import WelcomePage from "./WelcomePage";

function App() {
  // do this on route change

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="maingame" element={<MainGame />} />
        <Route path="leaderboard" element={<LeaderBoard />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
