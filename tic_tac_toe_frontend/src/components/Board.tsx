import React from "react";
import { Cell } from "./Cell";
import { Board as BoardType } from "../hooks/useTicTacToe";

export interface BoardProps {
  board: BoardType;
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  disabled?: boolean;
}

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: 14,
};

export const Board: React.FC<BoardProps> = ({ board, onCellClick, winningLine, disabled }) => {
  const isWin = (i: number) => Boolean(winningLine?.includes(i));
  return (
    <div style={gridStyle} role="grid" aria-label="tic-tac-toe-grid">
      {board.map((cell, idx) => (
        <Cell
          key={idx}
          value={cell}
          isWinning={isWin(idx)}
          disabled={disabled || Boolean(cell)}
          onClick={() => onCellClick(idx)}
        />
      ))}
    </div>
  );
};
