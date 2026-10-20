import React from 'react';
import { useApp } from '../context/AppContext';
import { Icon } from './Icons';

export const Toast: React.FC = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-8 inset-x-4 max-w-md mx-auto z-50 pointer-events-none animate-bounce-in">
      <div className="bg-[#0f4a36] text-white px-5 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 text-sm font-semibold text-right">
        <span className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 grid place-items-center shrink-0">
          <Icon name="check" className="w-3.5 h-3.5" />
        </span>
        <span className="flex-1">{toastMessage}</span>
      </div>
    </div>
  );
};
