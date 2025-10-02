import React from "react";
import { Theme, cardSurface } from "../theme";
import { Player } from "../hooks/useTicTacToe";

export interface StatusBarProps {
  currentPlayer: Player;
  winner: Player | null;
  isTie: boolean;
}

const Wrap: React.CSSProperties = { ...cardSurface, padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 };
const left: React.CSSProperties = { display: "flex", alignItems: "center", gap: 12, fontWeight: 700, color: Theme.text };
const tag: React.CSSProperties = { padding: "6px 10px", borderRadius: 8, fontSize: 13, border: `1px solid ${Theme.border}`, background: "rgba(255,255,255,0.9)" };

const iconFor = (p: Player | null) => {
  if (p === "X") return "♞";
  if (p === "O") return "♛";
  return "";
};

export const StatusBar: React.FC<StatusBarProps> = ({ currentPlayer, winner, isTie }) => {
  const getMessage = () => {
    if (winner) return (
      <>
        Winner:&nbsp;
        <span aria-hidden="true" style={{ fontWeight: 900 }}>
          {iconFor(winner)}
        </span>
      </>
    );
    if (isTie) return "It's a draw!";
    return (
      <>
        Turn:&nbsp;
        <span
          aria-hidden="true"
          style={{
            color: currentPlayer === "X" ? Theme.primary : Theme.secondary,
            fontWeight: 900,
          }}
        >
          {iconFor(currentPlayer)}
        </span>
      </>
    );
  };

  const badgeStyle: React.CSSProperties =
    winner
      ? { ...tag, color: Theme.surface, background: Theme.primary, border: "none" }
      : isTie
      ? { ...tag, color: Theme.text, background: "rgba(17,24,39,0.06)" }
      : { ...tag, color: currentPlayer === "X" ? Theme.primary : Theme.secondary };

  return (
    <div style={Wrap} aria-live="polite">
      <div style={left}>
        <span style={badgeStyle}>{getMessage()}</span>
      </div>
    </div>
  );
};
