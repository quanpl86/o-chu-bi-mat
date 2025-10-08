import React from 'react';
import { Question } from '../types';

interface CrosswordPanelProps {
  gameData: Question[];
  revealedWords: boolean[];
  highlightSecretOnly: boolean;
}

const CrosswordPanel: React.FC<CrosswordPanelProps> = ({ gameData, revealedWords, highlightSecretOnly }) => {
  const maxLength = Math.max(...gameData.map(q => q.horizontalWords.length));

  return (
    <div 
      className="relative backdrop-blur-sm shadow-lg shadow-cyan-500/20 flex flex-col overflow-hidden aspect-[15/10]"
      style={{ 
        padding: '4cqw', 
        borderRadius: '2cqw', 
        gap: '2cqw',
      }}
    >
      {/* Div này chỉ dùng để hiển thị ảnh nền đã được lật */}
      <div 
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url('/Frame1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scaleX(-1)' // Lật ảnh nền theo chiều ngang
        }}
      ></div>
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
                <div key={colIndex} className={`${cellClasses} ${textVisibilityClass} ${backgroundClass}`} style={{ fontSize: '0.8cqw', borderRadius: '1cqw' }}>
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