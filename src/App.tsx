import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GameState, Question } from './types'; // This path is correct now
import { QUESTIONS_BANK } from './constants'; // This path is correct now
import GameScreen from './components/GameScreen'; // This path is correct now
import WinScreen from './components/WinScreen'; // This path is correct now
import StartScreen from './components/StartScreen'; // This path is correct now
import SolveModal from './components/SolveModal'; // This path is correct now

// Utility function to shuffle an array
const shuffleArray = (array: Question[]): Question[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [revealedWords, setRevealedWords] = useState<boolean[]>(Array(QUESTIONS_BANK.length).fill(false));
  const [gameTime, setGameTime] = useState(0);
  const [score, setScore] = useState(0);
  const [isSolveModalOpen, setIsSolveModalOpen] = useState(false);
  const [feedback, setFeedback] = useState<Record<number, 'correct' | 'incorrect' | null>>({});
  const [isJustSolved, setIsJustSolved] = useState(false); // Trạng thái mới để xử lý hiệu ứng khi giải đố đúng
  const [isAnswering, setIsAnswering] = useState(false); // Trạng thái mới để chặn click khi đang có hiệu ứng

  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  const [secretKeyword, setSecretKeyword] = useState('');

  // Tạo đối tượng âm thanh
  const correctSound = useMemo(() => new Audio('/correct.mp3'), []);
  const incorrectSound = useMemo(() => new Audio('/incorrect.mp3'), []);

  const startGame = useCallback(() => {
    setGameState(GameState.PLAYING);
  }, []);

  const resetGame = useCallback(() => {
    // Add originalIndex to each question and then shuffle
    const questionsToShuffle = QUESTIONS_BANK.map((q, index) => ({ ...q, originalIndex: index }));
    setShuffledQuestions(shuffleArray(questionsToShuffle));

    // Derive the secret keyword from the original, ordered data source
    const keyword = QUESTIONS_BANK.map(
      item => item.horizontalWords[item.secretWordIndex]
    ).join(' ').trim();
    setSecretKeyword(keyword);

    setGameState(GameState.START);
    setCurrentQuestionIndex(0);
    setRevealedWords(Array(QUESTIONS_BANK.length).fill(false));
    setGameTime(0);
    setScore(0);
    setIsSolveModalOpen(false);
    setIsAnswering(false);
    setFeedback({});
    setIsJustSolved(false);
  }, []);

  // Initialize game on first load
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      const timer = setInterval(() => {
        setGameTime(prevTime => prevTime + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameState]);

  const handleAnswer = (choiceIndex: number) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    // Chặn click nếu đang trong quá trình xử lý câu trả lời trước đó
    if (isAnswering || currentQuestion?.originalIndex === undefined) return;

    setIsAnswering(true); // Bắt đầu chặn click
    if (choiceIndex === currentQuestion.correctChoiceIndex) {
      correctSound.play();
      setScore(prevScore => prevScore + 20);
      setFeedback(prev => ({ ...prev, [choiceIndex]: 'correct' }));
      setTimeout(() => {
        const newRevealedWords = [...revealedWords];
        // Use originalIndex to reveal the correct row in the crossword grid
        newRevealedWords[currentQuestion.originalIndex!] = true;
        setRevealedWords(newRevealedWords);
        
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setCurrentQuestionIndex(shuffledQuestions.length);
        }
        setFeedback({});
        setIsAnswering(false); // Kết thúc chặn click
      }, 1500); // CHỈNH SỬA TẠI ĐÂY: Tăng thời gian chờ để hiệu ứng hiển thị lâu hơn
    } else {
      incorrectSound.play();
      setFeedback(prev => ({ ...prev, [choiceIndex]: 'incorrect' }));
      // CHỈNH SỬA TẠI ĐÂY: Chuyển sang câu hỏi tiếp theo sau khi trả lời sai
      setTimeout(() => {
        if (currentQuestionIndex < shuffledQuestions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          setCurrentQuestionIndex(shuffledQuestions.length);
        }
        setFeedback({});
        setIsAnswering(false); // Kết thúc chặn click
      }, 1500); // Giữ thời gian chờ để người chơi thấy phản hồi
    }
  };

  const handleSolveAttempt = (attempt: string) => {
    if (attempt.trim().toUpperCase() === secretKeyword.toUpperCase()) {
      setScore(prevScore => prevScore + 100); // Cộng 100 điểm khi giải đúng từ khóa
      setIsJustSolved(true); // Kích hoạt hiệu ứng chỉ hiển thị từ khóa bí mật
      // Chuyển sang màn hình chiến thắng sau một khoảng trễ
      setTimeout(() => {
        setGameState(GameState.WON);
      }, 3000); // 3 giây để người chơi xem từ khóa
    } else {
      alert("Sai rồi! Hãy thử lại.");
    }
    setIsSolveModalOpen(false);
  };
  
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const allQuestionsAnswered = currentQuestionIndex >= shuffledQuestions.length;

  return (
    <div 
      // CHỈNH SỬA TẠI ĐÂY:
      // 'justify-end' sẽ đẩy nội dung xuống dưới cùng của màn hình.
      className="text-white min-h-screen flex flex-col items-center justify-end p-4"
      style={{
        backgroundImage: `url('/background.png')`,
        backgroundSize: 'cover',
        backgroundColor: '#003466',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // CHỈNH SỬA TẠI ĐÂY:
        // Thay đổi giá trị paddingBottom để điều chỉnh khoảng cách từ đáy màn hình.
        paddingBottom: '20px',
      }}
    >
      {/* Container này sẽ duy trì tỷ lệ và co giãn tương ứng */}
      <div
        // Ràng buộc cả chiều rộng và chiều cao tối đa.
        // Trình duyệt sẽ tự động co giãn để vừa với màn hình mà vẫn giữ tỷ lệ.
        // CHỈNH SỬA TẠI ĐÂY: Giảm giá trị 'max-h-*' (ví dụ: max-h-[85vh]) để giảm chiều cao của khung game.
        className="w-full h-full max-w-[95vw] max-h-[85vh] @container relative">
        {gameState === GameState.PLAYING && (
          <GameScreen
            currentQuestion={currentQuestion}
            crosswordData={QUESTIONS_BANK as Question[]}
            revealedWords={revealedWords}
            questionNumber={currentQuestionIndex + 1}
            isFinished={allQuestionsAnswered}
            onAnswer={handleAnswer}
            onSolveClick={() => setIsSolveModalOpen(true)}
            gameTime={gameTime}
            score={score}
            isAnswering={isAnswering}
            feedback={feedback}
          highlightSecretOnly={isJustSolved} // Truyền prop mới xuống
          />
        )}
        {gameState === GameState.START && (
          <>
            {/* Render empty frames */}
            <GameScreen
              crosswordData={QUESTIONS_BANK as Question[]}
              revealedWords={revealedWords}
              isFinished={false}
              onAnswer={() => {}}
              onSolveClick={() => {}}
              gameTime={0}
              score={0}
              isAnswering={false}
              feedback={{}}
              highlightSecretOnly={false}
            />
            <StartScreen onStart={startGame} />
          </>
        )}
      </div>
      {gameState === GameState.WON && <WinScreen time={gameTime} score={score} onPlayAgain={resetGame} />}
      <SolveModal 
        isOpen={isSolveModalOpen}
        onClose={() => setIsSolveModalOpen(false)}
        onSubmit={handleSolveAttempt}
      />
    </div>
  );
};

export default App;