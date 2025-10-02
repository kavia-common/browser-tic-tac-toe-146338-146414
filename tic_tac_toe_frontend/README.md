# Remotion Tic Tac Toe (Ocean Professional)

This project provides a Remotion-based interactive Tic Tac Toe game with a modern "Ocean Professional" style.

## Features
- 3x3 grid with X/O turn taking
- Current player indicator, winner highlight, and tie detection
- Scoreboard tracking X wins, O wins, and draws
- Restart control to reset the board (score persists for the session)
- Modern blue (#2563EB) and amber (#F59E0B) theme, rounded corners, gradients, and smooth transitions

## Run

Install dependencies:
```bash
npm i
```

Start Remotion Studio:
```bash
npm run dev
```

Open the Studio URL in your browser and select the `TicTacToeGame` composition to play the game in the preview pane.

Render (optional):
```bash
npx remotion render src/index.ts TicTacToeGame out/tictactoe.mp4
```

## Code structure
- `src/theme.ts` Shared Ocean Professional theme tokens
- `src/hooks/useTicTacToe.ts` Game logic (board state, turn, winner/tie, reset)
- `src/components/` UI components:
  - `Game.tsx` Main screen composing scoreboard, status bar, board, and controls
  - `Scoreboard.tsx`, `StatusBar.tsx`, `Board.tsx`, `Cell.tsx`
- `src/Root.tsx` Registers `TicTacToeGame` composition

## Notes
This project runs entirely in-browser using Remotion Studio for preview.
