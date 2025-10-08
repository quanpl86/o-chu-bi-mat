import React from 'react';

interface ScoreProps {
  score: number;
}

const Score: React.FC<ScoreProps> = ({ score }) => {
  return (
    <div className="bg-blue-900/40 backdrop-blur-sm border border-white shadow-lg shadow-cyan-500/20 text-white font-mono px-4 py-2 rounded-lg" style={{ fontSize: '1.2cqw' }}>
      Điểm: {score}
    </div>
  );
};

export default Score;