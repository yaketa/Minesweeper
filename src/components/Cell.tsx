import type { Cell as CellType } from '../types';
import './Cell.css';

interface CellProps {
  cell: CellType;
  onClick: () => void;
  onRightClick: () => void;
  gameWon: boolean;
}

export function Cell({ cell, onClick, onRightClick, gameWon }: CellProps) {
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    onRightClick();
  };

  // セルの表示内容を決定
  const renderContent = () => {
    if (cell.isFlagged && !cell.isRevealed) {
      return '🚩';
    }

    if (!cell.isRevealed) {
      return '';
    }

    if (cell.isMine) {
      return '💥';
    }

    // 勝利時は何も表示しない（ドット絵の色だけ）
    if (gameWon) {
      return '';
    }

    if (cell.adjacentMines > 0) {
      return cell.adjacentMines;
    }

    return '';
  };

  // セルの背景色を決定
  const getBackgroundColor = () => {
    if (cell.isRevealed && cell.pixelColor) {
      return cell.pixelColor;
    }
    if (cell.isRevealed && cell.isMine) {
      return '#333';
    }
    if (cell.isRevealed) {
      return '#ddd';
    }
    return '#999';
  };

  // 数字の色
  const getNumberColor = (num: number): string => {
    const colors: Record<number, string> = {
      1: '#0000ff',
      2: '#008000',
      3: '#ff0000',
      4: '#000080',
      5: '#800000',
      6: '#008080',
      7: '#000000',
      8: '#808080',
    };
    return colors[num] || '#000';
  };

  const className = [
    'cell',
    cell.isRevealed ? 'revealed' : 'hidden',
    cell.isFlagged ? 'flagged' : '',
    gameWon && cell.isRevealed && cell.pixelColor ? 'pixel' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      style={{
        backgroundColor: getBackgroundColor(),
        color:
          cell.isRevealed && cell.adjacentMines > 0
            ? getNumberColor(cell.adjacentMines)
            : undefined,
      }}
    >
      {renderContent()}
    </div>
  );
}
