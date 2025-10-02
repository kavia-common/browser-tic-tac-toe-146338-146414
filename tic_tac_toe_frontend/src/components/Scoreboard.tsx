import React from "react";
import { Theme, cardSurface } from "../theme";

export interface ScoreboardProps {
  xWins: number;
  oWins: number;
  draws: number;
}

const badgeStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 14px",
  borderRadius: 999,
  fontWeight: 600,
  fontSize: 14,
  background: "rgba(255,255,255,0.8)",
  border: `1px solid ${Theme.border}`,
  boxShadow: Theme.shadow,
};

const dot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 999,
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  color: Theme.muted,
  marginBottom: 10,
  fontWeight: 600,
};

const rowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  flexWrap: "wrap",
};

export const Scoreboard: React.FC<ScoreboardProps> = ({ xWins, oWins, draws }) => {
  return (
    <div style={{ ...cardSurface, padding: 16 }}>
      <div style={titleStyle}>Scoreboard</div>
      <div style={rowStyle}>
        <div style={{ ...badgeStyle, color: Theme.text }}>
          <span style={{ ...dot, background: Theme.primary }} />
          <span aria-hidden="true" style={{ color: Theme.primary, fontWeight: 800 }}>♞</span>&nbsp;Wins:
          <span style={{ color: Theme.primary, marginLeft: 6 }}>{xWins}</span>
        </div>
        <div style={{ ...badgeStyle, color: Theme.text }}>
          <span style={{ ...dot, background: Theme.secondary }} />
          <span aria-hidden="true" style={{ color: Theme.secondary, fontWeight: 800 }}>♛</span>&nbsp;Wins:
          <span style={{ color: Theme.secondary, marginLeft: 6 }}>{oWins}</span>
        </div>
        <div style={{ ...badgeStyle, color: Theme.text }}>
          <span style={{ ...dot, background: Theme.muted }} />
          Draws: <span style={{ color: Theme.muted }}>{draws}</span>
        </div>
      </div>
    </div>
  );
};
