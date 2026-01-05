import type { GameStatus as GameStatusType } from '../types';
import './GameStatus.css';

interface GameStatusProps {
  status: GameStatusType;
  revealedCount: number;
  totalSafeCells: number;
  onReset: () => void;
}

export function GameStatus({
  status,
  revealedCount,
  totalSafeCells,
  onReset,
}: GameStatusProps) {
  const getStatusEmoji = () => {
    switch (status) {
      case 'won':
        return '🎉';
      case 'lost':
        return '💀';
      default:
        return '🙂';
    }
  };

  const getMessage = () => {
    switch (status) {
      case 'won':
        return 'ドット絵完成！';
      case 'lost':
        return 'ゲームオーバー...';
      default:
        return `${revealedCount} / ${totalSafeCells}`;
    }
  };

  return (
    <div className="game-status">
      <button className="reset-button" onClick={onReset}>
        {getStatusEmoji()}
      </button>
      <div className="status-message">{getMessage()}</div>
    </div>
  );
}
