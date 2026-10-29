import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  User as UserIcon, 
  ArrowRight, 
  Key, 
  AlertCircle, 
  Shield
} from 'lucide-react';
import { User } from '../types';
import { DEMO_USERS } from '../data/mockData';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';

interface Props {
  onLogin: (user: User) => void;
}

export const LoginPage: React.FC<Props> = ({ onLogin }) => {
  const [username, setUsername] = useState('researcher');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DEMO_USERS.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
    if (found && password.trim() === 'Demo@123') {
      onLogin(found);
    } else if (found) {
      setError('Invalid credentials. For the prototype demonstration, use password: Demo@123');
    } else {
      setError('User not recognized. Choose researcher, admin, reviewer, or viewer.');
    }
  };

  const handleQuickLogin = (user: User) => {
    setUsername(user.username);
    setPassword('Demo@123');
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF7] flex flex-col justify-center items-center p-4 relative overflow-hidden text-[#172B1D]">
      {/* Subtle scientific grid / particle pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#16A34A_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Logo and Branding Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#DCFCE7] border border-[#86EFAC] text-[#16A34A] shadow-xs mb-2">
            <ShieldCheck className="w-8 h-8" />
          </div>

          <h1 className="text-2xl font-extrabold tracking-wider text-[#172B1D]">
            CYGEN<span className="text-[#16A34A]">VAULT</span>
          </h1>

          <p className="text-xs text-[#166534] font-semibold tracking-wide">
            &ldquo;Secure Biological Intelligence. Traceable Scientific Evidence.&rdquo;
          </p>

          <p className="text-[11px] text-[#64748B] font-mono">
            Drug Intelligence + Biological Evidence + AI/ML + Cybersecurity
          </p>
        </div>

        {/* Login Box */}
        <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <span className="text-xs font-mono font-bold uppercase text-[#172B1D] tracking-wider">
              Researcher Authentication
            </span>
            <DemoNoticeBadge className="bg-[#DCFCE7] text-[#166534] border-[#86EFAC]" />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 font-mono">
                Username / Identifier
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                <input
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                  placeholder="researcher"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] placeholder-slate-400 focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] font-mono text-xs transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1.5 font-mono">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#64748B] absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="Demo@123"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] placeholder-slate-400 focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A] font-mono text-xs transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <span>ACCESS RESEARCH VAULT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#64748B] uppercase font-semibold">
              <span>Prototype 1-Click Access</span>
              <span className="text-[#166534]">Password: Demo@123</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {DEMO_USERS.map(u => (
                <button
                  key={u.id}
                  onClick={() => handleQuickLogin(u)}
                  className="p-2.5 rounded-lg bg-[#F7FAF7] hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#86EFAC] text-left transition-all cursor-pointer group"
                >
                  <div className="font-semibold text-xs text-[#172B1D] group-hover:text-[#16A34A] transition-colors">{u.username}</div>
                  <div className="text-[10px] font-mono text-[#64748B] mt-0.5">{u.role}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Disclaimer */}
        <div className="text-center text-[11px] text-[#64748B] space-y-1">
          <p className="font-mono">
            CYGEN VAULT Prototype v1.0 • FIPS SHA-256 Sealed Records
          </p>
          <p className="text-[10px] text-[#64748B]/80">
            Computational decision-support platform. Not for direct clinical diagnosis or therapeutic certification.
          </p>
        </div>
      </div>
    </div>
  );
};
