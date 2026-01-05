import { useState, useCallback } from 'react';
import type { GameState, PixelArt } from '../types';
import {
  initGameState,
  revealCell,
  toggleFlag,
  countRevealedCells,
  revealAllMines,
  revealAllCells,
} from '../utils/minesweeper';
import { getDefaultPixelArt } from '../utils/pixelArt';

export function useGame(initialPixelArt?: PixelArt) {
  const [gameState, setGameState] = useState<GameState>(() =>
    initGameState(initialPixelArt || getDefaultPixelArt())
  );

  // セルをクリック
  const handleCellClick = useCallback((row: number, col: number) => {
    setGameState((prev) => {
      if (prev.status !== 'playing') return prev;

      const { newBoard, hitMine } = revealCell(prev.board, row, col);

      if (hitMine) {
        // 地雷を踏んだ → ゲームオーバー
        return {
          ...prev,
          board: revealAllMines(newBoard),
          status: 'lost',
        };
      }

      const revealedCount = countRevealedCells(newBoard);

      // 全ての安全セルを開いた → 勝利
      if (revealedCount === prev.totalSafeCells) {
        return {
          ...prev,
          board: revealAllCells(newBoard),
          status: 'won',
          revealedCount,
        };
      }

      return {
        ...prev,
        board: newBoard,
        revealedCount,
      };
    });
  }, []);

  // 右クリックでフラグ
  const handleCellRightClick = useCallback((row: number, col: number) => {
    setGameState((prev) => {
      if (prev.status !== 'playing') return prev;

      return {
        ...prev,
        board: toggleFlag(prev.board, row, col),
      };
    });
  }, []);

  // ゲームをリセット
  const resetGame = useCallback((pixelArt?: PixelArt) => {
    setGameState(initGameState(pixelArt || getDefaultPixelArt()));
  }, []);

  // 別のドット絵でプレイ
  const changePixelArt = useCallback((pixelArt: PixelArt) => {
    setGameState(initGameState(pixelArt));
  }, []);

  return {
    gameState,
    handleCellClick,
    handleCellRightClick,
    resetGame,
    changePixelArt,
  };
}
