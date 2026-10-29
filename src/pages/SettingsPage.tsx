import React, { useState } from 'react';
import { 
  Settings, 
  User as UserIcon, 
  Shield, 
  Cpu, 
  Database, 
  RotateCcw, 
  CheckCircle2
} from 'lucide-react';
import { User, UserRole } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  currentUser: User;
  onRoleChange: (newRole: UserRole) => void;
  onResetDemo: () => void;
}

export const SettingsPage: React.FC<Props> = ({
  currentUser,
  onRoleChange,
  onResetDemo
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);
  const [saveToast, setSaveToast] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    onRoleChange(role);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2000);
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Settings className="w-5 h-5" />
              </div>
              Platform Settings &amp; System Information
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Role-based permissions, cryptographic parameters, model configuration, and environment status.
          </p>
        </div>

        {saveToast && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] rounded-lg text-xs font-mono font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span>Settings Updated</span>
          </div>
        )}
      </div>

      <ScientificDisclaimer compact />

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* User Profile & Role Settings */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2.5 border-b border-[#E2E8F0]">
            <UserIcon className="w-4 h-4 text-[#16A34A]" />
            <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono">
              Active User Session &amp; Role (RBAC)
            </h2>
          </div>

          <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">Name:</span>
              <strong className="text-[#172B1D]">{currentUser.name}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">Username:</span>
              <span className="font-mono text-[#172B1D]">{currentUser.username}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">Email:</span>
              <span className="font-mono text-[#16A34A] font-semibold">{currentUser.email}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#64748B]">Department:</span>
              <span className="text-[#172B1D]">{currentUser.department}</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
              Simulate Role-Based Access Control (RBAC)
            </span>

            <div className="grid grid-cols-2 gap-2.5">
              {(['Administrator', 'Researcher', 'Reviewer', 'Viewer'] as UserRole[]).map(r => (
                <button
                  key={r}
                  onClick={() => handleRoleSelect(r)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    currentUser.role === r
                      ? 'bg-[#F0FDF4] border-[#16A34A] text-[#166534] font-bold shadow-xs ring-1 ring-[#16A34A]/30'
                      : 'bg-[#F7FAF7] border-[#E2E8F0] text-[#172B1D] hover:bg-[#F0FDF4]'
                  }`}
                >
                  <div className="text-xs">{r}</div>
                  <div className="text-[10px] text-[#64748B] mt-1 font-mono">
                    {r === 'Administrator' ? 'Full Access' :
                     r === 'Researcher' ? 'Create & Analyze' :
                     r === 'Reviewer' ? 'Inspect & Review' : 'Read-Only'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Security & Hashing Architecture */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2.5 border-b border-[#E2E8F0]">
            <Shield className="w-4 h-4 text-[#16A34A]" />
            <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono">
              Cybersecurity &amp; Cryptography Config
            </h2>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Integrity Hashing Algorithm</span>
              <span className="font-mono font-bold text-[#166534] text-xs">SHA-256 (FIPS PUB 180-4)</span>
              <p className="text-[11px] text-[#64748B]">WebCrypto API native accelerated with deterministic JSON canonicalization.</p>
            </div>

            <div className="p-3 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Password Hashing Layer</span>
              <span className="font-mono font-bold text-[#16A34A] text-xs">Argon2 / Secure Abstraction</span>
              <p className="text-[11px] text-[#64748B]">Production compliant PBKDF2/Argon2 password verification interface.</p>
            </div>

            <div className="p-3 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] space-y-1">
              <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Audit Immutability</span>
              <span className="font-mono font-bold text-[#166534] text-xs">Append-Only Ledger Active</span>
              <p className="text-[11px] text-[#64748B]">All session events, model executions, and data modifications cryptographically timestamped.</p>
            </div>
          </div>
        </div>

        {/* System Information */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2.5 border-b border-[#E2E8F0]">
            <Cpu className="w-4 h-4 text-[#16A34A]" />
            <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono">
              System Specifications &amp; Model Versions
            </h2>
          </div>

          <div className="divide-y divide-[#E2E8F0] text-xs font-mono">
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#64748B]">Application Version</span>
              <strong className="text-[#172B1D]">CYGEN VAULT v1.0 Prototype</strong>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#64748B]">Analysis Engine</span>
              <strong className="text-[#166534]">Prototype Computational Engine</strong>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#64748B]">Model Suite</span>
              <strong className="text-[#16A34A]">Ensemble ML-2026.10 (RF, SVM, LR, XGB)</strong>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#64748B]">Database Engine</span>
              <strong className="text-[#172B1D]">SQLite Prototype / Persistent Store</strong>
            </div>
            <div className="py-2.5 flex items-center justify-between">
              <span className="text-[#64748B]">Target Framework</span>
              <strong className="text-[#172B1D]">React 19 + TypeScript + Tailwind CSS</strong>
            </div>
          </div>
        </div>

        {/* Database Management & Demo Reset */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2.5 border-b border-[#E2E8F0]">
            <Database className="w-4 h-4 text-amber-600" />
            <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono">
              Database Maintenance
            </h2>
          </div>

          <p className="text-xs text-[#64748B] leading-relaxed">
            Resetting the database restores the initial demonstration records for Demo Compound A (DG-001), Human Reference AG-S001, completed analysis AN-0001, and sealed Evidence Passport EVP-2026-0001.
          </p>

          <div className="pt-2">
            <button
              onClick={onResetDemo}
              className="flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-600" />
              <span>Reset Database to Baseline Demo State</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
