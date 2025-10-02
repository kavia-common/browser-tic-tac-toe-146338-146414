import React from "react";
import { Theme } from "../theme";

export interface CellProps {
  value: "X" | "O" | null;
  onClick: () => void;
  isWinning?: boolean;
  disabled?: boolean;
}

const base: React.CSSProperties = {
  width: 110,
  height: 110,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 16,
  cursor: "pointer",
  userSelect: "none",
  fontSize: 48,
  fontWeight: 800,
  transition: "transform 160ms ease, background 160ms ease, box-shadow 160ms ease",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 16px rgba(0,0,0,0.06)",
  background: "rgba(255,255,255,0.85)",
  border: `1px solid ${Theme.border}`,
  backdropFilter: "blur(2px)",
};

const xStyle: React.CSSProperties = { color: Theme.primary };
const oStyle: React.CSSProperties = { color: Theme.secondary };

const getIcon = (value: "X" | "O" | null) => {
  // Use Unicode chess icons: ♞ (black knight) and ♛ (black queen)
  if (value === "X") return "♞";
  if (value === "O") return "♛";
  return "";
};

export const Cell: React.FC<CellProps> = ({ value, onClick, isWinning, disabled }) => {
  const visual: React.CSSProperties = {
    ...base,
    transform: disabled ? "none" : "translateY(-1px)",
    background: isWinning
      ? `linear-gradient(135deg, rgba(37,99,235,0.08), rgba(245,158,11,0.08))`
      : base.background,
    boxShadow: isWinning
      ? `0 10px 25px rgba(37, 99, 235, 0.15), 0 6px 12px rgba(245, 158, 11, 0.15)`
      : (base.boxShadow as string),
    cursor: disabled ? "default" : "pointer",
  };

  const icon = getIcon(value);

  return (
    <button
      aria-label="cell"
      onClick={disabled ? undefined : onClick}
      style={visual}
    >
      <span
        style={{
          ...(value === "X" ? xStyle : oStyle),
          fontSize: 48,
          lineHeight: 1,
          filter: "drop-shadow(0 1px 0 rgba(255,255,255,0.6))",
        }}
      >
        {icon}
      </span>
    </button>
  );
};
