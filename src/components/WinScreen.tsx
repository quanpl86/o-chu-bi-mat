
import React, { useState, useEffect } from 'react';
import Fireworks from './Fireworks';

interface WinScreenProps {
  time: number;
  score: number;
  onPlayAgain: () => void;
}

const WinScreen: React.FC<WinScreenProps> = ({ time, score, onPlayAgain }) => {
  const [showFireworks, setShowFireworks] = useState(true);

  useEffect(() => {
    // Đặt hẹn giờ để tắt hiệu ứng pháo hoa sau 5 giây
    const timer = setTimeout(() => {
      setShowFireworks(false);
    }, 5000);

    return () => clearTimeout(timer); // Dọn dẹp hẹn giờ khi component bị hủy
  }, []);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes} phút ${seconds} giây`;
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
      {/* 
        CHỈNH SỬA TẠI ĐÂY:
        - Các lớp `flex items-center justify-center` ở thẻ div cha giúp căn giữa hộp thoại.
        - Thay đổi giá trị `max-w-*` (ví dụ: max-w-3xl) để điều chỉnh độ rộng của hộp thoại.
      */}
      <div className="relative flex flex-col items-center justify-center text-center p-8 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-white w-full max-w-[90vw] lg:max-w-7xl">
        {showFireworks && <Fireworks />} {/* Chỉ hiển thị pháo hoa trong 5 giây đầu */}
        {/* Bọc nội dung trong một div riêng với z-index cao hơn để nó nổi lên trên pháo hoa */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">CHÚC MỪNG!</h1>
          <p className="text-xl text-gray-300 mb-2">Bạn đã giải được ô chữ bí mật!</p>
          <p className="text-2xl font-semibold text-white mb-6">
            Tổng điểm: <span className="text-yellow-400">{score}</span>
          </p>
          <p className="text-2xl font-semibold text-white mb-6">
            Thời gian hoàn thành: <span className="text-green-400">{formatTime(time)}</span>
          </p>
          <button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-xl transition-all duration-300 transform hover:scale-105"
          >
            Chơi lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinScreen;
