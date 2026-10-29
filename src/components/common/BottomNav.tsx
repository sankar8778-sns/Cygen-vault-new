import React from 'react';
import { Home, ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  canGoBack: boolean;
  canGoForward: boolean;
  isRefreshing: boolean;
  onHome: () => void;
  onBack: () => void;
  onForward: () => void;
  onRefresh: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  canGoBack,
  canGoForward,
  isRefreshing,
  onHome,
  onBack,
  onForward,
  onRefresh
}) => {
  const isHomeActive = activeTab === 'dashboard';

  return (
    <nav
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] transition-all"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)'
      }}
    >
      <div className="max-w-xl mx-auto px-4 h-15 flex items-center justify-around">
        {/* 1. Home Button */}
        <button
          onClick={onHome}
          type="button"
          aria-label="Go to Dashboard Home"
          title="Dashboard Home"
          className={`group flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            isHomeActive
              ? 'text-[#166534]'
              : 'text-[#64748B] hover:text-[#16A34A] hover:bg-[#F0FDF4]'
          }`}
        >
          <div
            className={`p-1 rounded-lg transition-transform group-hover:scale-110 ${
              isHomeActive ? 'bg-[#DCFCE7] text-[#16A34A]' : 'text-[#64748B] group-hover:text-[#16A34A]'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span
            className={`text-[10px] tracking-tight mt-0.5 ${
              isHomeActive ? 'font-bold text-[#166534]' : 'font-medium group-hover:text-[#16A34A]'
            }`}
          >
            Home
          </span>
        </button>

        {/* 2. Back Button */}
        <button
          onClick={onBack}
          disabled={!canGoBack && isHomeActive}
          type="button"
          aria-label="Go back to previous page"
          title={canGoBack ? 'Previous in-app page' : isHomeActive ? 'At Home' : 'Back to Dashboard'}
          className={`group flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            !canGoBack && isHomeActive
              ? 'opacity-40 cursor-not-allowed pointer-events-none text-[#94A3B8]'
              : 'text-[#64748B] hover:text-[#16A34A] hover:bg-[#F0FDF4]'
          }`}
        >
          <div className="p-1 rounded-lg transition-transform group-hover:-translate-x-0.5 text-[#16A34A]">
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] tracking-tight font-medium mt-0.5 text-[#64748B] group-hover:text-[#16A34A]">
            Back
          </span>
        </button>

        {/* 3. Forward Button */}
        <button
          onClick={onForward}
          disabled={!canGoForward}
          type="button"
          aria-label="Go forward in page history"
          title={canGoForward ? 'Forward in-app page' : 'No forward history'}
          className={`group flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer ${
            !canGoForward
              ? 'opacity-40 cursor-not-allowed pointer-events-none text-[#94A3B8]'
              : 'text-[#64748B] hover:text-[#16A34A] hover:bg-[#F0FDF4]'
          }`}
        >
          <div className="p-1 rounded-lg transition-transform group-hover:translate-x-0.5 text-[#16A34A]">
            <ArrowRight className="w-5 h-5 stroke-[2.2]" />
          </div>
          <span className="text-[10px] tracking-tight font-medium mt-0.5 text-[#64748B] group-hover:text-[#16A34A]">
            Forward
          </span>
        </button>

        {/* 4. Refresh Button */}
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          type="button"
          aria-label="Refresh application data"
          title={isRefreshing ? 'Refreshing live records...' : 'Refresh data without reloading'}
          className="group flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all cursor-pointer text-[#64748B] hover:text-[#16A34A] hover:bg-[#F0FDF4] disabled:opacity-50"
        >
          <div className="p-1 rounded-lg transition-colors text-[#16A34A]">
            <RotateCw className={`w-5 h-5 stroke-[2.2] ${isRefreshing ? 'animate-spin text-[#166534]' : 'group-hover:rotate-45 transition-transform'}`} />
          </div>
          <span className="text-[10px] tracking-tight font-medium mt-0.5 text-[#64748B] group-hover:text-[#16A34A]">
            {isRefreshing ? 'Updating...' : 'Refresh'}
          </span>
        </button>
      </div>
    </nav>
  );
};
