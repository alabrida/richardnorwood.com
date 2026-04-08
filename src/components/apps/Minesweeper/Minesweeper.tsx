'use client';

import { useState, useCallback, useMemo } from 'react';
import type { AppProps, AppConfig } from '@/lib/wms/types';
import MenuBar from '@/components/apps/shared/MenuBar';
import type { MenuGroup } from '@/components/apps/shared/MenuBar';
import styles from './Minesweeper.module.css';

const ROWS = 9;
const COLS = 9;
const MINES = 10;

interface Cell {
  mine: boolean;
  revealed: boolean;
  flagged: boolean;
  adjacent: number;
}

function createBoard(): Cell[][] {
  const board: Cell[][] = Array.from({ length: ROWS }, () =>
    Array.from({ length: COLS }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
    }))
  );

  // Place mines
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    if (!board[r][c].mine) {
      board[r][c].mine = true;
      placed++;
    }
  }

  // Calculate adjacents
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (board[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && board[nr][nc].mine) {
            count++;
          }
        }
      }
      board[r][c].adjacent = count;
    }
  }

  return board;
}

export default function Minesweeper(_props: AppProps) {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard());
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [timer, setTimer] = useState(0);

  const flagCount = useMemo(
    () => board.flat().filter((c) => c.flagged).length,
    [board]
  );

  const newGame = useCallback(() => {
    setBoard(createBoard());
    setGameOver(false);
    setWon(false);
    setTimer(0);
  }, []);

  const reveal = useCallback(
    (r: number, c: number) => {
      if (gameOver || won) return;
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      const cell = newBoard[r][c];
      if (cell.revealed || cell.flagged) return;

      cell.revealed = true;

      if (cell.mine) {
        // Game over — reveal all mines
        newBoard.forEach((row) =>
          row.forEach((c) => {
            if (c.mine) c.revealed = true;
          })
        );
        setBoard(newBoard);
        setGameOver(true);
        return;
      }

      // Flood fill for 0-adjacent cells
      if (cell.adjacent === 0) {
        const queue: [number, number][] = [[r, c]];
        while (queue.length > 0) {
          const [cr, cc] = queue.pop()!;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              const nr = cr + dr;
              const nc = cc + dc;
              if (
                nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS &&
                !newBoard[nr][nc].revealed && !newBoard[nr][nc].mine
              ) {
                newBoard[nr][nc].revealed = true;
                if (newBoard[nr][nc].adjacent === 0) {
                  queue.push([nr, nc]);
                }
              }
            }
          }
        }
      }

      // Check win
      const unrevealed = newBoard.flat().filter((c) => !c.revealed && !c.mine).length;
      if (unrevealed === 0) {
        setWon(true);
      }

      setBoard(newBoard);
    },
    [board, gameOver, won]
  );

  const toggleFlag = useCallback(
    (r: number, c: number, e: React.MouseEvent) => {
      e.preventDefault();
      if (gameOver || won) return;
      const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
      const cell = newBoard[r][c];
      if (cell.revealed) return;
      cell.flagged = !cell.flagged;
      setBoard(newBoard);
    },
    [board, gameOver, won]
  );

  const menus: MenuGroup[] = [
    {
      label: '&Game',
      items: [
        { label: '&New', shortcut: 'F2', onClick: newGame },
        { label: '', separator: true },
        { label: '&Beginner', checked: true },
        { label: '&Intermediate', disabled: true },
        { label: '&Expert', disabled: true },
      ],
    },
    {
      label: '&Help',
      items: [{ label: '&About Minesweeper', disabled: true }],
    },
  ];

  const smiley = gameOver ? '😵' : won ? '😎' : '🙂';

  return (
    <div className={styles.minesweeper}>
      <MenuBar menus={menus} />
      <div className={styles.gameContainer}>
        <div className={styles.header}>
          <div className={styles.counter}>
            {String(Math.max(0, MINES - flagCount)).padStart(3, '0')}
          </div>
          <button className={styles.smiley} onClick={newGame}>
            {smiley}
          </button>
          <div className={styles.counter}>{String(timer).padStart(3, '0')}</div>
        </div>
        <div
          className={styles.grid}
          style={{ gridTemplateColumns: `repeat(${COLS}, 20px)` }}
        >
          {board.map((row, r) =>
            row.map((cell, c) => {
              let content = '';
              let cellClass = styles.cell;

              if (cell.flagged && !cell.revealed) {
                content = '🚩';
                cellClass += ` ${styles.flagged}`;
              } else if (cell.revealed) {
                cellClass += ` ${styles.revealed}`;
                if (cell.mine) {
                  content = '💣';
                  cellClass += ` ${styles.mine}`;
                } else if (cell.adjacent > 0) {
                  content = String(cell.adjacent);
                  cellClass += ` ${styles[`n${cell.adjacent}`]}`;
                }
              }

              return (
                <button
                  key={`${r}-${c}`}
                  className={cellClass}
                  onClick={() => reveal(r, c)}
                  onContextMenu={(e) => toggleFlag(r, c, e)}
                >
                  {content}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export const minesweeperConfig: AppConfig = {
  id: 'minesweeper',
  title: 'Risk & Compliance',
  icon: '/icons/icons/waste_basket.png',
  defaultSize: { width: 230, height: 340 },
  minSize: { width: 220, height: 320 },
  component: Minesweeper,
};
