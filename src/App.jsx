import React, { useEffect, useState } from "react";
import "./App.css";
const App = () => {
  const rang = ["red", "green", "aqua", "yellow"];

  const [color, setcolor] = useState();
  const [glass, setglass] = useState([]);
  const [slectedColor, setslectedColor] = useState(false);

  const [selected1Tube, setselected1Tube] = useState(null);
  const [selected2Tube, setselected2Tube] = useState(null);

  const initializeColor = () => {
    const randomColor = [1, 2, 3, 4];
    const tube = [
      [...randomColor].sort(() => Math.random() - 0.5),
      [...randomColor].sort(() => Math.random() - 0.5),
      [...randomColor].sort(() => Math.random() - 0.5),
      [...randomColor].sort(() => Math.random() - 0.5),
      [],
      [],
    ].map((value, index) => {
      return { id: index, value };
    });
    setglass(tube);
  };
  const handleTransfer = (id) => {
    let tube;
    let topvalue;

    if (slectedColor) {
      // Set the second selected tube
      setselected2Tube(id);

      console.log("id2:", id);
      const id1 = selected1Tube; // Get the first tube's id from state
      const id2 = id;

      tube = glass[id].value;
      topvalue = tube[tube.length - 1];
      console.log(tube);

      setslectedColor(false);
      setselected1Tube(null); // Reset selected1Tube after transfer
      console.log(id1, id2);

      if (
        id1 !== null &&
        id1 !== id2 &&
        glass[id1].value.length > 0 &&
        glass[id2].value.length < 4 &&
        (glass[id1].value.at(-1) === glass[id2].value.at(-1) ||
          glass[id2].value.length == 0)
      ) {
        let first = glass[id1].value;
        glass[id2].value.push(first.pop());
        while (
          glass[id1].value.at(-1) === glass[id2].value.at(-1) &&
          glass[id2].value.length < 4
        ) {
          glass[id2].value.push(first.pop());
        }
        // Here you could add the logic to transfer colors between tubes
      }
    } else {
      // Set the first selected tube
      setslectedColor(true);
      setselected1Tube(id);

      console.log("id1:", id);
      tube = glass[id].value;
      topvalue = tube[tube.length - 1];
      console.log(tube);
    }
  };

  useEffect(() => {
    initializeColor();
  }, []);

  return (
    <div className="main">
      <div className="container">
        {glass.map((tube) => {
          return (
            <div
              style={{
                scale: selected1Tube == tube.id ? "1.05 " : "",
                border: selected1Tube == tube.id ? "2px solid black " : "",
              }}
              className="glass"
              key={tube.id}
              onClick={() => handleTransfer(tube.id)}
            >
              {tube.value
                .map((color, index) => {
                  return (
                    <div
                      className="color"
                      key={index}
                      style={{
                        color: "#000",
                        backgroundColor: rang[color - 1],
                        borderRadius: `${index === 0 ? "0 0 30px 30px " : ""}`,
                      }}
                    ></div>
                  );
                })
                .reverse()}
            </div>
          );
        })}
      </div>
      <button onClick={initializeColor}>change</button>
    </div>
  );
};

export default App;
