import { useEffect, useState } from "react";
import "./styles.css";

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [status, setStatus] = useState("");

  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
  ];

  const checkWinner = (squares) => {
    for (const [a, b, c] of winningCombinations) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleSquareClick = (index) => {
    if (board[index] || checkWinner(board)) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
  };

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      setStatus(`Winner is ${winner}. Please restart the game`);
    } else if (board.every(cell => cell !== "")) {
      setStatus("This is a draw! Please restart the game");
    } else {
      setStatus(`Next player is ${isXTurn ? "X" : "O"}`);
    }
  }, [board, isXTurn]);

  const renderSquare = (index) => (
    <Square value={board[index]} onClick={() => handleSquareClick(index)} />
  );

  return (
    <div className="tic-tac-toe-container">
      {[0, 3, 6].map(rowStart => (
        <div className="row" key={rowStart}>
          {renderSquare(rowStart)}
          {renderSquare(rowStart + 1)}
          {renderSquare(rowStart + 2)}
        </div>
      ))}
      <h1>{status}</h1>
      <button onClick={resetGame}>Restart</button>
    </div>
  );
}
