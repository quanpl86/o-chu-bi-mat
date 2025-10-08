import React from 'react';
import { Question } from '../types';

interface QuestionPanelProps {
  questionData?: Question;
  onAnswer: (choiceIndex: number) => void;
  isFinished: boolean;
  questionNumber: number;
  feedback: Record<number, 'correct' | 'incorrect' | null>;
  isAnswering: boolean;
  onSolveClick: () => void;
}

const ChoiceButton: React.FC<{
  label: string;
  prefix: string;
  onClick: () => void;
  disabled: boolean;
  status: 'correct' | 'incorrect' | null;
}> = ({ label, prefix, onClick, disabled, status }) => {
  // Khôi phục lại các lớp CSS ban đầu
  const baseClasses = "w-full text-left transition-all duration-200 transform focus:outline-none flex items-center text-yellow-300 border-2";
  const enabledClasses = "bg-sky-600/20 border-white hover:bg-sky-600/40";
  const disabledClasses = "bg-gray-800/20 text-yellow-300/50 border-white/20 cursor-not-allowed";
  
  let statusClasses = "";
  if(status === 'correct') {
    statusClasses = "bg-green-500/80 text-white animate-pulse border-4 border-green-400 shadow-lg shadow-green-400/50";
  } else if (status === 'incorrect') {
    statusClasses = "bg-red-500/80 text-white animate-shake border-red-400";
  }

  // Khôi phục lại cấu trúc button đơn giản
  return (
    <button 
      onClick={onClick} 
      disabled={disabled || status !== null} 
      className={`${baseClasses} ${status ? statusClasses : (disabled ? disabledClasses : enabledClasses)}`}
      style={{ padding: '1.1cqw', fontSize: '1.1cqw', borderRadius: '1.2cqw' }}
    >
      <span className="font-bold" style={{ marginRight: '1.5cqw' }}>{prefix}.</span> {label}
    </button>
  );
};

const QuestionPanel: React.FC<QuestionPanelProps> = ({ questionData, onAnswer, isFinished, questionNumber, feedback, isAnswering, onSolveClick }) => {
  return (
    <div 
      className="relative backdrop-blur-sm shadow-lg shadow-cyan-500/20 flex flex-col overflow-hidden aspect-[15/10]"
      style={{ padding: '3cqw', borderRadius: '2cqw' }}
    >
      {/* Div này chỉ dùng để hiển thị ảnh nền đã được lật */}
      <div 
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: `url('/Frame1.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>
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
          <div className="flex flex-col flex-grow h-full">
            <div className="flex-shrink-0 mb-4">
              <p className="font-bold" style={{ fontSize: '1.8cqw' }}>
                Câu {questionNumber}:
              </p>
            </div>
            {/* Khung chứa câu hỏi, có thể cuộn nếu nội dung dài */}
            <div className="flex-grow overflow-y-auto pr-2">
              <p className="font-medium text-yellow-300" style={{ fontSize: '1.4cqw' }}>
                {questionData.question}
              </p>
            </div>
            {/* Khung chứa các đáp án, luôn cố định ở dưới */}
            <div className="flex-shrink-0 pt-4 mt-auto grid grid-cols-2" style={{ gap: '2cqw' }}>
              {questionData.choices.map((choice, index) => (
                <ChoiceButton
                    key={index}
                    label={choice}
                    prefix={String.fromCharCode(65 + index)}
                    onClick={() => onAnswer(index)}
                    disabled={isFinished || isAnswering}
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