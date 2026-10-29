import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message?: string;
}

interface Props {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<Props> = ({ toasts, onDismiss }) => {
  if (!toasts.length) return null;

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />,
    info: <Info className="w-4 h-4 text-[#166534] shrink-0" />
  };

  const borderStyles = {
    success: 'border-[#86EFAC] bg-white text-[#172B1D]',
    warning: 'border-amber-200 bg-white text-[#172B1D]',
    error: 'border-rose-200 bg-white text-[#172B1D]',
    info: 'border-[#E2E8F0] bg-white text-[#172B1D]'
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-xl border shadow-xl flex items-start gap-3 transition-all ${borderStyles[toast.type]}`}
        >
          {icons[toast.type]}
          <div className="flex-1 text-xs">
            <div className="font-bold text-[#172B1D] tracking-tight">{toast.title}</div>
            {toast.message && (
              <div className="text-[#64748B] mt-1 leading-relaxed font-normal">{toast.message}</div>
            )}
          </div>
          <button
            onClick={() => onDismiss(toast.id)}
            className="text-[#64748B] hover:text-[#172B1D] p-1 rounded hover:bg-[#F0FDF4] transition-colors cursor-pointer"
            aria-label="Dismiss toast"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
