import { useCallback, useMemo, useState } from "react";

export type Player = "X" | "O";
export type Cell = Player | null;
export type Board = Cell[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  isTie: boolean;
  winningLine: number[] | null;
}

const WIN_LINES: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

const getWinner = (board: Board): { winner: Player | null; winningLine: number[] | null } => {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], winningLine: line };
    }
  }
  return { winner: null, winningLine: null };
};

// PUBLIC_INTERFACE
export function useTicTacToe() {
  /**
   * A React hook that manages Tic Tac Toe game state.
   * - Maintains board (9 cells), current player turn, winner/tie detection, and winning line.
   * - Exposes handlers to make moves and to reset the game.
   * Returns:
   *   - state: { board, currentPlayer, winner, isTie, winningLine }
   *   - handleCellClick(index): Make a move at a cell if valid.
   *   - reset(): Restart a fresh game with X as first player.
   */
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const { winner, winningLine } = useMemo(() => getWinner(board), [board]);
  const isBoardFull = useMemo(() => board.every((c) => c !== null), [board]);
  const isTie = !winner && isBoardFull;

  const handleCellClick = useCallback(
    (index: number) => {
      if (board[index] !== null || winner) return; // ignore clicks on filled cells or when game ended
      setBoard((prev) => {
        const next = [...prev];
        next[index] = currentPlayer;
        return next;
      });
      setCurrentPlayer((p) => (p === "X" ? "O" : "X"));
    },
    [board, currentPlayer, winner]
  );

  const reset = useCallback(() => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  }, []);

  const state: GameState = {
    board,
    currentPlayer,
    winner,
    isTie,
    winningLine,
  };

  return { state, handleCellClick, reset };
}
