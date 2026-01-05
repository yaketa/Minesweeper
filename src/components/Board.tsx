import type { Cell as CellType } from '../types';
import { Cell } from './Cell';
import './Board.css';

interface BoardProps {
  board: CellType[][];
  onCellClick: (row: number, col: number) => void;
  onCellRightClick: (row: number, col: number) => void;
  gameWon: boolean;
}

export function Board({ board, onCellClick, onCellRightClick, gameWon }: BoardProps) {
  return (
    <div className={`board ${gameWon ? 'won' : ''}`}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell) => (
            <Cell
              key={`${cell.row}-${cell.col}`}
              cell={cell}
              onClick={() => onCellClick(cell.row, cell.col)}
              onRightClick={() => onCellRightClick(cell.row, cell.col)}
              gameWon={gameWon}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
