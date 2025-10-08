import React from 'react';
import { Question } from '../types';
import QuestionPanel from './QuestionPanel';
import Score from './Score';
import Timer from './Timer'; // Import Timer component
import CrosswordPanel from './CrosswordPanel';

interface GameScreenProps {
  currentQuestion?: Question;
  crosswordData: Question[];
  revealedWords: boolean[];
  questionNumber?: number;
  isFinished: boolean;
  onAnswer: (choiceIndex: number) => void;
  onSolveClick: () => void;
  gameTime: number;
  score: number;
  isAnswering: boolean;
  feedback: Record<number, 'correct' | 'incorrect' | null>;
  highlightSecretOnly: boolean; // Prop mới
}

const GameScreen: React.FC<GameScreenProps> = ({
  currentQuestion,
  crosswordData,
  revealedWords,
  questionNumber,
  isFinished,
  onAnswer,
  onSolveClick,
  gameTime,
  score,
  isAnswering,
  feedback,
  highlightSecretOnly,
}) => {
  return (
    <div className="flex flex-col w-full h-full gap-4">
      {/* 
        CHỈNH SỬA TẠI ĐÂY:
        - Thay đổi `max-w-*` để điều chỉnh kích thước banner (ví dụ: max-w-5xl).
        - Thay đổi `-mb-*` (margin-bottom âm) để điều chỉnh khoảng cách, đẩy banner lên cao hơn (ví dụ: -mb-4).
      */}
      <div className="flex justify-center -mb-4">
        <img src="/banner.png" alt="Ô Chữ Bí Mật Banner" className="max-w-5xl h-auto rounded-lg shadow-lg" />
      </div>

      {/* Container cho Điểm và Thời gian, đặt ở góc trên bên trái */}
      <div className="flex justify-start gap-4">
        <Score score={score} />
        <Timer seconds={gameTime} />
      </div>

      {/* Bố cục 2 cột cho các khung game */}
      <main className="grid grid-cols-2 w-full" style={{ gap: '5cqw' }}>
        <QuestionPanel
          questionData={currentQuestion}
          onAnswer={onAnswer}
          isFinished={isFinished}
          questionNumber={questionNumber}
          feedback={feedback}
        isAnswering={isAnswering}
          onSolveClick={onSolveClick}
        />
        <CrosswordPanel
          gameData={crosswordData}
          revealedWords={revealedWords}
          highlightSecretOnly={highlightSecretOnly}
        />
      </main>
    </div>
  );
};

export default GameScreen;