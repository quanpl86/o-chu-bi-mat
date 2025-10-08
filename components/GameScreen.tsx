import React from 'react';
import { Question } from '../types';
import QuestionPanel from './QuestionPanel';
import CrosswordPanel from './CrosswordPanel';

interface GameScreenProps {
  currentQuestion?: Question;
  crosswordData: Question[];
  revealedWords: boolean[];
  questionNumber: number;
  isFinished: boolean;
  onAnswer: (choiceIndex: number) => void;
  onSolveClick: () => void;
  gameTime: number;
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
  feedback,
  highlightSecretOnly,
}) => {
  return (
    // Bố cục này giờ luôn là 2 cột, chiếm toàn bộ không gian của container cha.
    // Khoảng cách (gap) được đặt bằng đơn vị container-relative (cqw) để co giãn.
    <main className="grid grid-cols-2 w-full h-full" style={{ gap: '5cqw' }}>
      <QuestionPanel
        questionData={currentQuestion}
        onAnswer={onAnswer}
        isFinished={isFinished}
        questionNumber={questionNumber}
        feedback={feedback}
        onSolveClick={onSolveClick}
      />
      <CrosswordPanel
        gameData={crosswordData}
        revealedWords={revealedWords}
        gameTime={gameTime}
        highlightSecretOnly={highlightSecretOnly}
      />
    </main>
  );
};

export default GameScreen;