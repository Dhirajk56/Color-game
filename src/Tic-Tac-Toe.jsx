import { useEffect, useState } from "react";
import "./Tic-Tac-Toe.css";
const App = () => {
  const [box, setBox] = useState([]);
  const [check, setCheck] = useState(true);
  const [won, setWon] = useState(false);
  const [line, setLine] = useState(null);
  const [count, setCount] = useState(0);
  const initialize = () => {
    setWon(false);
    setLine(null);
    setCount(0);
    const data = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    setBox(data);
  };
  const handleClick = (row, col) => {
    const data = box;
    if (check && data[row][col] == 0 && !won) {
      data[row][col] = 1;
      setCheck(!check);
      setCount(count + 1);
      setBox(data);
    }
    if (!check && data[row][col] == 0 && !won) {
      data[row][col] = 2;
      setCheck(!check);
      setCount(count + 1);
      setBox(data);
    }

    if (
      data[0][0] !== 0 &&
      data[0][0] === data[0][1] &&
      data[0][1] === data[0][2]
    ) {
      setWon(true);
      setLine(1);
    }
    if (
      data[1][0] !== 0 &&
      data[1][0] === data[1][1] &&
      data[1][1] === data[1][2]
    ) {
      setWon(true);
      setLine(2);
    }
    if (
      data[2][0] !== 0 &&
      data[2][0] === data[2][1] &&
      data[2][1] === data[2][2]
    ) {
      setWon(true);
      setLine(3);
    }
    if (
      data[0][0] !== 0 &&
      data[0][0] === data[1][1] &&
      data[1][1] === data[2][2]
    ) {
      setWon(true);
      setLine(4);
    }
    if (
      data[0][2] !== 0 &&
      data[0][2] === data[1][1] &&
      data[1][1] === data[2][0]
    ) {
      setWon(true);
      setLine(5);
    }
    if (
      data[0][0] !== 0 &&
      data[0][0] === data[1][0] &&
      data[1][0] === data[2][0]
    ) {
      setWon(true);
      setLine(6);
    }
    if (
      data[0][1] !== 0 &&
      data[0][1] === data[1][1] &&
      data[1][1] === data[2][1]
    ) {
      setWon(true);
      setLine(7);
    }
    if (
      data[0][2] !== 0 &&
      data[0][2] === data[1][2] &&
      data[1][2] === data[2][2]
    ) {
      setWon(true);
      setLine(8);
    }
  };
  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="main-container">
      <h1>Tic Tac Toe</h1>
      {line && (
        <div
          className="line"
          style={{
            top: `${(line == 1 && "60px") || (line == 3 && "300px")}`,
            left: `${(line == 6 && "-130px") || (line == 8 && "130px")}`,
            transform: `
            ${
              (line == 7 && "rotate(90deg)") ||
              (line == 4 && "rotate(45deg)") ||
              (line == 5 && "rotate(135deg)") ||
              (line == 1 && "rotate(180deg)") ||
              ((line == 6 || line == 8) && "rotate(90deg)")
            }
             `,
          }}
        />
      )}

      <div className="tic-tac-toe-container">
        {box.map((val, row) => {
          return val.map((value, col) => {
            return (
              <div
                className="tic-tac-toe"
                key={col}
                style={{
                  color: `${value === 1 ? "#fc2323" : ""}${
                    value === 2 ? "#fcfc23" : ""
                  }`,
                }}
                onClick={() => handleClick(row, col)}
              >
                {value === 1 ? "O" : ""}
                {value === 2 ? "X" : ""}
              </div>
            );
          });
        })}
      </div>
      <p className="user">
        User{" "}
        <span
          style={{
            color: `${!won && (check ? "#fc2323" : "#fcfc23")}`,
          }}
        >
          {!won && count !== 9 && (check ? "O" : "X")}
          {won && count !== 9 && (!check ? "O" : "X")}
        </span>{" "}
        <span
          style={{ color: `${won ? "green" : count === 9 ? "red" : "black"}` }}
        >
          {won ? "Won!" : count === 9 ? "Draw!" : "turn"}
        </span>
      </p>
      <button className="restart" onClick={initialize}>
        {" "}
        Restart
      </button>
    </div>
  );
};

export default App;
