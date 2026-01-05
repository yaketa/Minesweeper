// ピクセルの色情報（null = 地雷/背景）
export type PixelColor = string | null;

// ドット絵データ
export interface PixelArt {
  name: string;
  width: number;
  height: number;
  pixels: PixelColor[][]; // [row][col] = color or null
}

// セルの状態
export interface Cell {
  row: number;
  col: number;
  isMine: boolean;           // 地雷かどうか
  isRevealed: boolean;       // 開いているか
  isFlagged: boolean;        // フラグが立っているか
  adjacentMines: number;     // 周囲の地雷数
  pixelColor: PixelColor;    // このセルのピクセル色
}

// ゲームの状態
export type GameStatus = 'playing' | 'won' | 'lost';

// ゲーム全体の状態
export interface GameState {
  board: Cell[][];
  status: GameStatus;
  pixelArt: PixelArt;
  revealedCount: number;
  totalSafeCells: number;
}
