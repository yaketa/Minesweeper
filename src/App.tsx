import { useGame } from './hooks/useGame';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { pixelArtPresets } from './utils/pixelArt';
import './App.css';

function App() {
  const {
    gameState,
    handleCellClick,
    handleCellRightClick,
    resetGame,
    changePixelArt,
  } = useGame();

  const handleReset = () => {
    resetGame(gameState.pixelArt);
  };

  return (
    <div className="app">
      <h1>Minesweeper Pixel Art</h1>
      <p className="subtitle">クリアするとドット絵が完成！</p>

      <div className="art-selector">
        {pixelArtPresets.map((art) => (
          <button
            key={art.name}
            className={`art-button ${
              gameState.pixelArt.name === art.name ? 'active' : ''
            }`}
            onClick={() => changePixelArt(art)}
          >
            {art.name}
          </button>
        ))}
      </div>

      <GameStatus
        status={gameState.status}
        revealedCount={gameState.revealedCount}
        totalSafeCells={gameState.totalSafeCells}
        onReset={handleReset}
      />

      <Board
        board={gameState.board}
        onCellClick={handleCellClick}
        onCellRightClick={handleCellRightClick}
        gameWon={gameState.status === 'won'}
      />

      <div className="instructions">
        <p>左クリック: セルを開く</p>
        <p>右クリック: フラグを立てる</p>
      </div>
    </div>
  );
}

export default App;
