import { useState } from "react";

export default function BoardGame() {
  const initialBoard = [
    [null, "red", null, "red"],
    [null, null, null, null],
    [null, null, null, null],
    ["black", null, "black", null],
  ];

  const [board, setBoard] = useState(initialBoard);

  function createPiece(square, y, x) {
    return (
      <div
        className={`piece ${
          square !== null && (square === "red" ? "red-piece" : "black-piece")
        }`}
      ></div>
    );
  }
  return (
    <div className="centering">
      <div className="board">
        {initialBoard.map((row, y) => {
          console.log("Row", row);
          return (
            <div key={y} className="row">
              {row.map((square, x) => {
                console.log("Square", square);
                return (
                  <div
                    key={x}
                    className={`square ${
                      (x + y) % 2 === 0 ? "square-white" : "square-black"
                    }`}
                  >
                    {square && createPiece(square, y, x)}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
