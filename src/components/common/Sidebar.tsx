import React from 'react';
import { 
  LayoutDashboard, 
  Pill, 
  Dna, 
  FlaskConical, 
  Crosshair, 
  Layers, 
  Cpu, 
  AlertTriangle, 
  Globe2, 
  FileCheck, 
  ShieldCheck, 
  History, 
  FileText, 
  Settings, 
  Play, 
  ChevronRight,
  Shield,
  Activity
} from 'lucide-react';
import { UserRole } from '../../types';

export type NavTabId = 
  | 'dashboard'
  | 'drugs'
  | 'biological'
  | 'lab-records'
  | 'target-pathway'
  | 'multi-omics'
  | 'ai-ml'
  | 'risk-evidence'
  | 'cross-system'
  | 'passport'
  | 'integrity'
  | 'audit-logs'
  | 'reports'
  | 'settings'
  | 'analysis-wizard';

interface Props {
  activeTab: NavTabId;
  setActiveTab: (tab: NavTabId) => void;
  userRole: UserRole;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  userRole,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const navItems = [
    { id: 'dashboard' as NavTabId, label: 'Dashboard', icon: LayoutDashboard, group: 'Overview' },
    { id: 'analysis-wizard' as NavTabId, label: 'Start Demo Analysis', icon: Play, group: 'Workflow', highlight: true },
    { id: 'drugs' as NavTabId, label: 'Drug Registry', icon: Pill, group: 'Data Repository' },
    { id: 'biological' as NavTabId, label: 'Biological Profiles', icon: Dna, group: 'Data Repository' },
    { id: 'lab-records' as NavTabId, label: 'Research Activity', icon: Activity, group: 'Data Repository' },
    { id: 'target-pathway' as NavTabId, label: 'Target & Pathway Analysis', icon: Crosshair, group: 'Computational Modules' },
    { id: 'multi-omics' as NavTabId, label: 'Multi-Omics Evidence', icon: Layers, group: 'Computational Modules' },
    { id: 'ai-ml' as NavTabId, label: 'AI/ML Analysis', icon: Cpu, group: 'Computational Modules' },
    { id: 'risk-evidence' as NavTabId, label: 'Risk & Evidence', icon: AlertTriangle, group: 'Computational Modules' },
    { id: 'cross-system' as NavTabId, label: 'Cross-System Comparison', icon: Globe2, group: 'Computational Modules' },
    { id: 'passport' as NavTabId, label: 'Evidence Passport', icon: FileCheck, group: 'Trust & Cryptography' },
    { id: 'integrity' as NavTabId, label: 'Integrity Verification', icon: ShieldCheck, group: 'Trust & Cryptography' },
    { id: 'audit-logs' as NavTabId, label: 'Audit Logs', icon: History, group: 'Compliance & Governance' },
    { id: 'reports' as NavTabId, label: 'Reports', icon: FileText, group: 'Compliance & Governance' },
    { id: 'settings' as NavTabId, label: 'Settings', icon: Settings, group: 'System' }
  ];

  const handleSelect = (tab: NavTabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-16 left-0 z-40 lg:z-10
        w-64 h-full lg:h-[calc(100vh-4rem)]
        bg-white text-[#64748B]
        border-r border-[#E2E8F0]
        flex flex-col justify-between
        transition-transform duration-200 ease-in-out shadow-xs
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {/* Mobile title */}
          <div className="lg:hidden px-3 pb-3 mb-2 border-b border-[#E2E8F0] flex items-center justify-between">
            <span className="font-bold text-[#172B1D] text-sm">Navigation</span>
            <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
              {userRole}
            </span>
          </div>

          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isHighlight = item.highlight;
            const prevItem = index > 0 ? navItems[index - 1] : null;
            const showGroupHeader = !prevItem || prevItem.group !== item.group;

            return (
              <React.Fragment key={item.id}>
                {showGroupHeader && (
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#64748B] font-semibold px-3 pt-3.5 pb-1">
                    {item.group}
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-[#DCFCE7] text-[#166534] font-bold border border-[#86EFAC] shadow-xs'
                      : isHighlight
                      ? 'bg-[#F0FDF4] text-[#166534] border border-[#86EFAC] hover:bg-[#DCFCE7] font-semibold'
                      : 'text-[#64748B] hover:text-[#172B1D] hover:bg-[#F0FDF4] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-colors shrink-0 ${
                      isActive ? 'text-[#166534]' : isHighlight ? 'text-[#16A34A]' : 'text-[#64748B] group-hover:text-[#16A34A]'
                    }`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#166534]" />}
                  {isHighlight && !isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                  )}
                </button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Bottom Platform Info Box */}
        <div className="p-3 border-t border-[#E2E8F0] bg-[#F7FAF7]">
          <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-[11px] space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 text-[#172B1D] font-semibold">
              <Shield className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>CYGEN VAULT Core</span>
            </div>
            <div className="text-[10px] text-[#64748B] font-mono">
              Engine: <span className="text-[#172B1D] font-medium">Prototype ML-2026.10</span>
            </div>
            <div className="text-[10px] text-[#64748B] font-mono">
              Database: <span className="text-[#172B1D] font-medium">Local Verified Ledger</span>
            </div>
            <div className="text-[10px] text-[#166534] font-mono flex items-center gap-1.5 pt-0.5 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
              SHA-256 Hash Guard Active
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
