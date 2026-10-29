import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  RotateCcw, 
  Menu, 
  X, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';
import { User, UserRole } from '../../types';

interface Props {
  currentUser: User;
  onLogout: () => void;
  onRoleChange: (newRole: UserRole) => void;
  onResetDemo: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onRefreshDashboard?: () => void;
  isRefreshing?: boolean;
  canUndo?: boolean;
  canRedo?: boolean;
  onUndo?: () => void;
  onRedo?: () => void;
  undoDescription?: string | null;
  redoDescription?: string | null;
}

export const Header: React.FC<Props> = ({
  currentUser,
  onLogout,
  onRoleChange,
  onResetDemo,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const roles: UserRole[] = ['Researcher', 'Administrator', 'Reviewer', 'Viewer'];

  const roleBadgeStyles: Record<UserRole, string> = {
    Administrator: 'text-purple-700 border-purple-200 bg-purple-50',
    Researcher: 'text-[#166534] border-[#86EFAC] bg-[#DCFCE7]',
    Reviewer: 'text-blue-700 border-blue-200 bg-blue-50',
    Viewer: 'text-slate-600 border-slate-200 bg-slate-100'
  };

  const notifications = [
    { id: 1, title: 'Integrity Check Passed', desc: 'Passport EVP-2026-0001 SHA-256 signature verified.', time: '5m ago' },
    { id: 2, title: 'AS GARDIAN Sample Ready', desc: 'Sample AG-S001 DNA + RNA quality metrics indexed.', time: '1h ago' },
    { id: 3, title: 'Model Ensemble Update', desc: 'Ensemble ML-2026.10 loaded with 4 active classifiers.', time: '2h ago' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E2E8F0] text-[#172B1D] shadow-xs">
      <div className="px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Left: Mobile hamburger & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#64748B] hover:text-[#172B1D] hover:bg-[#F0FDF4] border border-transparent hover:border-[#E2E8F0] rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            title="Toggle sidebar menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#16A34A]" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#16A34A] shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold tracking-wider text-sm sm:text-base text-[#166534]">
                  CYGEN<span className="text-[#16A34A]">VAULT</span>
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-bold tracking-tight">
                  DEMO ENVIRONMENT
                </span>
              </div>
              <div className="hidden sm:block text-[11px] text-[#64748B] font-medium tracking-tight">
                Secure Computational Evidence Platform
              </div>
            </div>
          </div>
        </div>

        {/* Center: Security status badge (desktop only) */}
        <div className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 bg-[#F0FDF4] border border-[#86EFAC] rounded-lg text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
          <span className="text-[#64748B]">INTEGRITY:</span>
          <span className="text-[#166534] font-bold">SHA-256 SEALED</span>
          <span className="text-[#CBD5E1]">|</span>
          <span className="text-[#172B1D]">RBAC ACTIVE</span>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Reset Demo Database */}
          <button
            onClick={onResetDemo}
            title="Reset to default synthetic demo state"
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#64748B] hover:text-[#172B1D] bg-white hover:bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg transition-all cursor-pointer font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
            <span>Reset Demo</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 text-[#64748B] hover:text-[#172B1D] hover:bg-[#F0FDF4] border border-transparent hover:border-[#E2E8F0] rounded-lg transition-colors relative cursor-pointer"
              aria-label="Notifications"
              title="System notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#16A34A]"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E2E8F0] rounded-xl shadow-xl text-[#172B1D] py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-3.5 py-2.5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                  <span className="text-xs font-bold text-[#166534] uppercase tracking-wider font-mono">
                    System Notifications
                  </span>
                  <span className="text-[10px] text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-2 py-0.5 rounded font-mono font-bold">
                    3 New
                  </span>
                </div>
                <div className="divide-y divide-[#E2E8F0] max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className="p-3.5 hover:bg-[#F0FDF4] transition-colors">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#172B1D]">
                        <span>{n.title}</span>
                        <span className="text-[10px] text-[#64748B] font-mono">{n.time}</span>
                      </div>
                      <p className="text-xs text-[#64748B] mt-1 leading-relaxed font-normal">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#86EFAC] transition-all text-left cursor-pointer shadow-xs"
            >
              <div className="w-7 h-7 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#166534] text-xs font-bold font-mono">
                {currentUser.name.charAt(0)}
              </div>
              <div className="hidden sm:block text-xs">
                <div className="font-bold text-[#172B1D] leading-tight flex items-center gap-1.5">
                  {currentUser.name}
                  <ChevronDown className="w-3 h-3 text-[#64748B]" />
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className={`text-[10px] px-1.5 py-0.2 rounded border font-mono font-semibold ${roleBadgeStyles[currentUser.role]}`}>
                    {currentUser.role}
                  </span>
                </div>
              </div>
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-[#E2E8F0] rounded-xl shadow-xl text-[#172B1D] py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-3 border-b border-[#E2E8F0] bg-[#F8FAFC]">
                  <div className="text-xs font-bold text-[#172B1D]">{currentUser.name}</div>
                  <div className="text-[11px] text-[#16A34A] font-mono mt-0.5">{currentUser.email}</div>
                  <div className="text-[11px] text-[#64748B] mt-0.5">{currentUser.department}</div>
                </div>

                <div className="p-2">
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-2 py-1 font-mono">
                    Simulate Role (RBAC Testing)
                  </div>
                  {roles.map(r => (
                    <button
                      key={r}
                      onClick={() => {
                        onRoleChange(r);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        currentUser.role === r
                          ? 'bg-[#DCFCE7] text-[#166534] font-bold border border-[#86EFAC]'
                          : 'text-[#64748B] hover:bg-[#F0FDF4] hover:text-[#172B1D]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-2 h-2 rounded-full ${
                          r === 'Administrator' ? 'bg-purple-600' :
                          r === 'Researcher' ? 'bg-[#16A34A]' :
                          r === 'Reviewer' ? 'bg-blue-600' : 'bg-slate-400'
                        }`}></span>
                        <span>{r}</span>
                      </div>
                      {currentUser.role === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-[#E2E8F0] px-2">
                  <button
                    onClick={() => {
                      setShowRoleMenu(false);
                      onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
