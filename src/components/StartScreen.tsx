import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
      {/* 
        CHỈNH SỬA TẠI ĐÂY:
        - Các lớp `flex items-center justify-center` ở thẻ div cha giúp căn giữa hộp thoại.
        - Thay đổi giá trị `max-w-*` (ví dụ: max-w-3xl) để điều chỉnh độ rộng của hộp thoại.
      */}
      <div className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border-2 border-white text-center w-full max-w-[90vw] lg:max-w-7xl">
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">TRÒ CHƠI Ô CHỮ BÍ MẬT</h1>
        <div className="text-lg text-gray-300 mb-6 text-left leading-relaxed px-4">
          <strong>Luật chơi:</strong>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Trả lời đúng mỗi câu hỏi để nhận <strong className="text-yellow-300">20 điểm</strong> và lật mở một ký tự của từ khóa.</li>
            <li>Trả lời sai sẽ chuyển sang câu hỏi tiếp theo mà không nhận được điểm.</li>
            <li>Giải đúng từ khóa bí mật cuối cùng để nhận <strong className="text-green-400">100 điểm</strong> thưởng!</li>
          </ul>
        </div>
        <button
          onClick={onStart}
          className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg text-xl transition-all duration-300 transform hover:scale-105"
        >
          Bắt đầu chơi
        </button>
      </div>
    </div>
  );
};

export default StartScreen;