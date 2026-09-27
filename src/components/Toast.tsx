import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-[#141b2b] text-white rounded-xl shadow-xl border border-white/10 animate-in slide-in-from-bottom-5 duration-200">
      <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
      <span className="text-xs sm:text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-white/60 hover:text-white transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[16px]">close</span>
      </button>
    </div>
  );
};
