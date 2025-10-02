import React, { useEffect, useMemo, useState } from "react";
import { oceanBackground, Theme, cardSurface } from "../theme";
import { useTicTacToe } from "../hooks/useTicTacToe";
import { Scoreboard } from "./Scoreboard";
import { StatusBar } from "./StatusBar";
import { Board } from "./Board";
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

interface Tally {
  x: number;
  o: number;
  draw: number;
}

const container: React.CSSProperties = {
  ...oceanBackground,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 24,
};

const shell: React.CSSProperties = {
  width: "min(720px, 90vw)",
  display: "grid",
  gridTemplateRows: "auto auto 1fr auto",
  gap: 16,
};

const boardCard: React.CSSProperties = {
  ...cardSurface,
  padding: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const titleStyle: React.CSSProperties = {
  ...cardSurface,
  padding: 16,
  textAlign: "center",
  fontWeight: 900,
  fontSize: 24,
  color: Theme.text,
  background: `linear-gradient(180deg, rgba(255,255,255,0.9), #fff)`,
};

const accent: React.CSSProperties = {
  display: "inline-block",
  width: 8,
  height: 8,
  borderRadius: 999,
  background: Theme.primary,
  marginRight: 8,
};

// PUBLIC_INTERFACE
export const Game: React.FC = () => {
  /** A complete in-browser Tic Tac Toe UI composed with Remotion-friendly components.
   * Features:
   * - 3x3 grid with turn taking for players X and O
   * - Winner/tie detection and winning line highlight
   * - Scoreboard tracking X wins, O wins, and draws
   * - Restart control to reset the board (score persists during session)
   * - Ocean Professional styling with subtle gradients and transitions
   * Returns a React component suitable for use in Remotion Studio.
   */
  const { state, handleCellClick, reset } = useTicTacToe();
  const [tally, setTally] = useState<Tally>({ x: 0, o: 0, draw: 0 });

  // Update scoreboard when a game ends
  useEffect(() => {
    if (state.winner) {
      setTally((t) =>
        state.winner === "X" ? { ...t, x: t.x + 1 } : { ...t, o: t.o + 1 }
      );
    } else if (state.isTie) {
      setTally((t) => ({ ...t, draw: t.draw + 1 }));
    }
  }, [state.winner, state.isTie]);

  // Animation: subtle scale-in of the game shell on mount
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const appear = spring({ frame, fps, config: { damping: 200, mass: 0.8 } });
  const opacity = interpolate(appear, [0, 1], [0, 1]);
  const scale = interpolate(appear, [0, 1], [0.98, 1]);

  const headline = useMemo(() => {
    if (state.winner) return "Tic Tac Toe — We have a winner!";
    if (state.isTie) return "Tic Tac Toe — It's a draw!";
    return "Tic Tac Toe — Ocean Professional";
  }, [state.winner, state.isTie]);

  return (
    <div style={container}>
      <div style={{ ...shell, transform: `scale(${scale})`, opacity }}>
        <div style={titleStyle}>
          <span style={accent} /> {headline}
        </div>

        <Scoreboard xWins={tally.x} oWins={tally.o} draws={tally.draw} />

        <div style={boardCard}>
          <Sequence from={0}>
            <Board
              board={state.board}
              onCellClick={handleCellClick}
              winningLine={state.winningLine}
              disabled={Boolean(state.winner) || state.isTie}
            />
          </Sequence>
        </div>

        <StatusBar currentPlayer={state.currentPlayer} winner={state.winner} isTie={state.isTie} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }}>
          <Controls onRestart={reset} disabled={false} />
        </div>
      </div>
    </div>
  );
};

// Simple controls locally to avoid circular import issues
const Controls: React.FC<{ onRestart: () => void; disabled?: boolean }> = ({ onRestart, disabled }) => {
  return (
    <div style={{ ...cardSurface, padding: 16, display: "flex", justifyContent: "center" }}>
      <button
        onClick={onRestart}
        disabled={disabled}
        style={{
          padding: "10px 16px",
          borderRadius: 12,
          border: "none",
          fontWeight: 800,
          cursor: "pointer",
          transition: "transform 160ms ease, box-shadow 160ms ease, background 160ms ease",
          boxShadow: "0 8px 18px rgba(245, 158, 11, 0.25)",
          color: "#111827",
          background: `linear-gradient(135deg, ${Theme.secondary}, #D97706)`,
        }}
        aria-label="Restart game"
        title="Restart game"
      >
        Play Again
      </button>
    </div>
  );
};
