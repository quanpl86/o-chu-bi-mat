import React from 'react';
import { Question } from '../types';

interface QuestionPanelProps {
  questionData?: Question;
  onAnswer: (choiceIndex: number) => void;
  isFinished: boolean;
  questionNumber: number;
  feedback: Record<number, 'correct' | 'incorrect' | null>;
  onSolveClick: () => void;
}

const ChoiceButton: React.FC<{
  label: string;
  prefix: string;
  onClick: () => void;
  disabled: boolean;
  status: 'correct' | 'incorrect' | null;
}> = ({ label, prefix, onClick, disabled, status }) => {
  const baseClasses = "w-full text-left transition-all duration-200 transform focus:outline-none flex items-center text-yellow-300 border";
  const enabledClasses = "bg-sky-600/20 border-sky-400/40 hover:bg-sky-600/40";
  const disabledClasses = "bg-gray-800/20 text-yellow-300/50 border-sky-400/20 cursor-not-allowed";
  
  let statusClasses = "";
  if(status === 'correct') {
    statusClasses = "bg-green-500/80 text-white animate-pulse border-4 border-green-400 shadow-lg shadow-green-400/50";
  } else if (status === 'incorrect') {
    statusClasses = "bg-red-500/80 text-white animate-shake border-red-400";
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled || status !== null} 
      className={`${baseClasses} ${disabled ? disabledClasses : enabledClasses} ${statusClasses}`}
      // CHỈNH SỬA TẠI ĐÂY: Thay đổi giá trị 'fontSize' để điều chỉnh kích thước chữ của các đáp án.
      // Ví dụ: '1.2cqw'
      style={{ padding: '1.2cqw', fontSize: '1.2cqw', borderRadius: '1.2cqw' }}
    >
       <span className="font-bold" style={{ marginRight: '1.5cqw' }}>{prefix}.</span> {label}
    </button>
  );
};

const QuestionPanel: React.FC<QuestionPanelProps> = ({ questionData, onAnswer, isFinished, questionNumber, feedback, onSolveClick }) => {
  return (
    <div 
      className="bg-blue-900/40 backdrop-blur-sm border border-cyan-400/50 shadow-lg shadow-cyan-500/20 flex flex-col h-full"
      style={{ 
        padding: '2.5cqw', 
        borderRadius: '2cqw',
        backgroundImage: `url('/Frame1.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {isFinished ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
          <h2 className="font-bold text-green-400" style={{ fontSize: '2.5cqw', marginBottom: '2cqw' }}>Hoàn thành!</h2>
          <p className="text-yellow-300" style={{ fontSize: '1.8cqw', marginBottom: '4cqw' }}>Bạn đã trả lời tất cả các câu hỏi. Bây giờ hãy tìm ra từ khóa bí mật!</p>
          <button
            onClick={onSolveClick}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105 rainbow-border"
            style={{ padding: '1.5cqw 3cqw', borderRadius: '1.5cqw', fontSize: '1.8cqw' }}
          >
            GIẢI Ô CHỮ BÍ MẬT
          </button>
        </div>
      ) : (
        questionData && (
          <div className="flex flex-col flex-grow justify-between">
            {(() => {
              // Kiểm tra xem đây có phải là câu hỏi bạn muốn tùy chỉnh không
              const isSpecialQuestion = questionData.question.startsWith("Ứng dụng nào dưới đây");
              // CHỈNH SỬA TẠI ĐÂY:
              // Thay đổi các giá trị bên dưới để điều chỉnh kích thước chữ của câu hỏi.
              const fontSize = isSpecialQuestion ? '1.5cqw' : '1.5cqw';

              return (
                // Thuộc tính fontSize được áp dụng tại đây
                <p className="font-medium text-yellow-300" style={{ fontSize: fontSize, marginBottom: '3cqw' }}>
                  {questionData.question}
                </p>
              );
            })()}
            <div className="grid grid-cols-2" style={{ gap: '2cqw' }}>
              {questionData.choices.map((choice, index) => (
                <ChoiceButton
                    key={index}
                    label={choice}
                    prefix={String.fromCharCode(65 + index)}
                    onClick={() => onAnswer(index)}
                    disabled={isFinished}
                    status={feedback[index] ?? null}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default QuestionPanel;