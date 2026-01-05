import type { Cell, GameState, PixelArt } from '../types';

// ドット絵からゲームボードを生成
export function createBoard(pixelArt: PixelArt): Cell[][] {
  const board: Cell[][] = [];

  for (let row = 0; row < pixelArt.height; row++) {
    const rowCells: Cell[] = [];
    for (let col = 0; col < pixelArt.width; col++) {
      const pixelColor = pixelArt.pixels[row][col];
      rowCells.push({
        row,
        col,
        isMine: pixelColor === null, // nullの場所が地雷
        isRevealed: false,
        isFlagged: false,
        adjacentMines: 0,
        pixelColor,
      });
    }
    board.push(rowCells);
  }

  // 隣接地雷数を計算
  calculateAdjacentMines(board);

  return board;
}

// 隣接地雷数を計算
function calculateAdjacentMines(board: Cell[][]): void {
  const rows = board.length;
  const cols = board[0].length;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col].isMine) continue;

      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (board[nr][nc].isMine) count++;
          }
        }
      }
      board[row][col].adjacentMines = count;
    }
  }
}

// 安全なセルの総数を計算
export function countSafeCells(board: Cell[][]): number {
  let count = 0;
  for (const row of board) {
    for (const cell of row) {
      if (!cell.isMine) count++;
    }
  }
  return count;
}

// 開いているセルの数を計算
export function countRevealedCells(board: Cell[][]): number {
  let count = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell.isRevealed && !cell.isMine) count++;
    }
  }
  return count;
}

// セルを開く（再帰的に空白セルを展開）
export function revealCell(
  board: Cell[][],
  row: number,
  col: number
): { newBoard: Cell[][]; hitMine: boolean } {
  const rows = board.length;
  const cols = board[0].length;

  // ボード外、既に開いている、フラグがある場合は何もしない
  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    board[row][col].isRevealed ||
    board[row][col].isFlagged
  ) {
    return { newBoard: board, hitMine: false };
  }

  // ボードをコピー
  const newBoard = board.map((r) => r.map((c) => ({ ...c })));
  const cell = newBoard[row][col];

  // 地雷を踏んだ
  if (cell.isMine) {
    cell.isRevealed = true;
    return { newBoard, hitMine: true };
  }

  // セルを開く
  revealCellRecursive(newBoard, row, col);

  return { newBoard, hitMine: false };
}

// 再帰的にセルを開く
function revealCellRecursive(board: Cell[][], row: number, col: number): void {
  const rows = board.length;
  const cols = board[0].length;

  if (
    row < 0 ||
    row >= rows ||
    col < 0 ||
    col >= cols ||
    board[row][col].isRevealed ||
    board[row][col].isMine ||
    board[row][col].isFlagged
  ) {
    return;
  }

  board[row][col].isRevealed = true;

  // 隣接地雷が0なら周囲も開く
  if (board[row][col].adjacentMines === 0) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        revealCellRecursive(board, row + dr, col + dc);
      }
    }
  }
}

// フラグをトグル
export function toggleFlag(board: Cell[][], row: number, col: number): Cell[][] {
  if (board[row][col].isRevealed) return board;

  const newBoard = board.map((r) => r.map((c) => ({ ...c })));
  newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
  return newBoard;
}

// 全ての地雷を表示（ゲームオーバー時）
export function revealAllMines(board: Cell[][]): Cell[][] {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      isRevealed: cell.isMine ? true : cell.isRevealed,
    }))
  );
}

// 全てのセルを表示（勝利時）
export function revealAllCells(board: Cell[][]): Cell[][] {
  return board.map((row) =>
    row.map((cell) => ({
      ...cell,
      isRevealed: true,
    }))
  );
}

// ゲーム状態を初期化
export function initGameState(pixelArt: PixelArt): GameState {
  const board = createBoard(pixelArt);
  return {
    board,
    status: 'playing',
    pixelArt,
    revealedCount: 0,
    totalSafeCells: countSafeCells(board),
  };
}
