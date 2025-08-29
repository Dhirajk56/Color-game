import Color from "./Color";
import Home from "./Home";
import Memory from "./Memory";
import TicTacToe from "./Tic-Tac-Toe";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/color" element={<Color />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
      </Routes>
    </div>
  );
};

export default App;
