import React, { useEffect, useState } from "react";

const App = () => {
  const [gridSize, setGridSize] = useState(4);
  const [cards, setCards] = useState([]);

  const [flipped, setflipped] = useState([]);
  const [solved, setsolved] = useState([]);
  const [disabled, setdisabled] = useState(false);

  const [won, setwon] = useState(false);

  const handleGridSizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (size >= 2 && size <= 10) setGridSize(size);
  };
  const initializeGame = () => {
    const totalCards = gridSize * gridSize; //16
    const pairCount = Math.floor(totalCards / 2); //8
    const numbers = [...Array(pairCount).keys()].map((n) => n + 1);
    const shuffledCards = [...numbers, ...numbers]
      .sort(() => Math.random() - 0.5)
      .slice(0, totalCards)
      .map((number, index) => {
        return { id: index, number };
      });
    setCards(shuffledCards);
    setflipped([]);
    setsolved([]);
    setwon(false);
  };
  useEffect(() => {
    initializeGame();
  }, [gridSize]);

  const checkMatch = (SecondId) => {
    const [firstId] = flipped;
    if (cards[firstId].number === cards[SecondId].number) {
      setsolved([...solved, firstId, SecondId]);
      setflipped([]);
      setdisabled(false);
    } else {
      setTimeout(() => {
        setflipped([]);
        setdisabled(false);
      }, 500);
    }
  };

  const handleClick = (id) => {
    if (disabled || won) return;
    if (flipped.length === 0) {
      setflipped([id]);
      return;
    }
    if (flipped.length === 1) {
      setdisabled(true);
      if (id !== flipped[0]) {
        setflipped([...flipped, id]);
        checkMatch(id);
        //check match logic
      } else {
        setflipped([]);
        setdisabled(false);
      }
    }
  };
  const isflipped = (id) => {
    return flipped.includes(id) || solved.includes(id);
  };
  const isSolved = (id) => solved.includes(id);

  useEffect(() => {
    if (solved.length === cards.length && cards.length > 0) {
      setwon(true);
    }
  }, [solved, cards]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-grey-100 p-4">
      <h1 className="text-3xl font-bold mb-6"> Memory game</h1>
      {/* // input  */}
      <div className="mb-4">
        <label htmlFor="gridSize" className="mr-2">
          grid Size: (max 10)
        </label>
        <input
          type="number"
          id="gridSize"
          min="2"
          max="10"
          value={gridSize}
          onChange={handleGridSizeChange}
          className="border-2 border-gray-300 rounded px-2 py-1"
        />
      </div>
      {/* // game board */}
      <div
        className="grid gap-2 mb-4"
        style={{
          gridTemplateColumns: `repeat(${gridSize},minmax(0,1fr))`,
          width: `min(100% , ${gridSize * 5.5}rem)`,
        }}
      >
        {cards.map((card) => {
          return (
            <div
              key={card.id}
              onClick={() => handleClick(card.id)}
              className={`aspect-square flex items-center justify-center text-1 font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                isflipped(card.id)
                  ? isSolved(card.id)
                    ? "bg-green-500"
                    : "bg-blue-500 text-white"
                  : " bg-gray-300 text-gray-400 "
              } `}
            >
              {isflipped(card.id) ? card.number : "?"}
            </div>
          );
        })}
      </div>
      {/* // result */}
      {won && (
        <div className="mt-4 text-4xl font-bold text-green-600 animate-bounce">
          You Won!
        </div>
      )}
      {/* // play again */}
      <button
        onClick={initializeGame}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
      >
        {won ? "play Again" : "Reset"}
      </button>
    </div>
  );
};

export default App;
