import React from 'react';
import { Question } from '../types';
import Timer from './Timer';

interface CrosswordPanelProps {
  gameData: Question[];
  revealedWords: boolean[];
  gameTime: number;
  highlightSecretOnly: boolean;
}

const CrosswordPanel: React.FC<CrosswordPanelProps> = ({ gameData, revealedWords, gameTime, highlightSecretOnly }) => {
  const maxLength = Math.max(...gameData.map(q => q.horizontalWords.length));

  return (
    <div 
      className="bg-blue-900/40 backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/20 flex flex-col h-full"
      style={{ padding: '2cqw', borderRadius: '2cqw', gap: '2cqw' }}
    >
      <div className="flex justify-end">
        <Timer seconds={gameTime} />
      </div>
      <div className="grid flex-grow" style={{ gridTemplateRows: `repeat(${gameData.length}, minmax(0, 1fr))`, gap: '1cqw' }}>
        {gameData.map((data, rowIndex) => (
          <div key={rowIndex} className="grid" style={{ gridTemplateColumns: `repeat(${maxLength}, minmax(0, 1fr))`, gap: '1cqw' }}>
            {Array.from({ length: maxLength }).map((_, colIndex) => {
              const word = data.horizontalWords[colIndex] || '';
              const isSecretKeyCell = colIndex === data.secretWordIndex;
              const isRevealed = revealedWords[rowIndex];
              
              const cellClasses = `
                w-full h-full flex items-center justify-center text-center font-bold uppercase
                transition-all duration-500`;

              const textVisibilityClass = highlightSecretOnly
                ? (isSecretKeyCell ? 'text-white' : 'text-transparent') // Nếu đã giải đố, chỉ hiện từ khóa
                : (isRevealed ? 'text-white' : 'text-transparent'); // Nếu đang chơi, hiện cả hàng

              const backgroundClass = isSecretKeyCell 
                  ? 'bg-orange-500' 
                  : word ? 'bg-blue-900' : 'bg-transparent';

              return (
                <div key={colIndex} className={`${cellClasses} ${textVisibilityClass} ${backgroundClass}`} style={{ fontSize: '1.2cqw', borderRadius: '1cqw' }}>
                    {word}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrosswordPanel;