import { useState } from "react";

export default function BoardGame() {
  const initialBoard = [
    [null, "red", null, "red"],
    [null, null, null, null],
    [null, null, null, null],
    ["black", null, "black", null],
  ];

  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  console.log("SelectedPiece", selectedPiece);

  function createPiece(square, indexRow, indexCol) {
    return (
      <div
        className={`piece ${
          square !== null && (square === "red" ? "red-piece" : "black-piece")
        }`}
        onClick={() => {
          setSelectedPiece({ indexRow, indexCol, color: square });
        }}
      ></div>
    );
  }

  function handleMove(position) {
    console.log("inside handleMove Position", position);
    console.log("inside handleMove SelectedPiece", selectedPiece);
    const { indexRow: currentRow, indexCol: currentCol } = selectedPiece;
    const { indexRow: targetRow, indexCol: targetCol } = position;

    const updatedBoard = board.map((row, rowIndex) => {
      return row.map((square, colIndex) => {
        if (currentRow === rowIndex && currentCol === colIndex) {
          return null;
        }

        if (targetRow === rowIndex && targetCol === colIndex) {
          return selectedPiece.color;
        }

        return square;
      });
    });

    console.log("UpdatedBoard", updatedBoard);
    setBoard(updatedBoard);
    setSelectedPiece(null);
  }

  function generateValidMoves(board, selectedPiece, color) {}

  return (
    <div className="centering">
      <div className="board">
        {board.map((row, indexRow) => {
          //   console.log("Row", row);
          return (
            <div key={indexRow} className="row">
              {row.map((square, indexCol) => {
                const position = { indexRow, indexCol, pieceId: square };
                // console.log("square", square);
                return (
                  <div
                    key={indexCol}
                    className={`square ${
                      (indexCol + indexRow) % 2 === 0
                        ? "square-white"
                        : "square-black"
                    }`}
                    onClick={() => {
                      !square && selectedPiece && handleMove(position);
                    }}
                  >
                    {square && createPiece(square, indexRow, indexCol)}
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
