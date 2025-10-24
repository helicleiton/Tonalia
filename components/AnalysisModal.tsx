import React from 'react';

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AnalysisModal: React.FC<AnalysisModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800/80 backdrop-blur-xl rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex justify-between items-center p-4 border-b border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-sky-300">{title}</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors text-3xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700"
            aria-label="Fechar modal"
          >
            &times;
          </button>
        </header>
        <main className="p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};