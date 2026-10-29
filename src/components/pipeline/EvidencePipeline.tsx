import React from 'react';
import { 
  Pill, 
  Atom, 
  Dna, 
  Crosshair, 
  GitFork, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  FileCheck, 
  ShieldCheck, 
  FlaskConical,
  ArrowRight
} from 'lucide-react';

interface Props {
  activeStep?: string;
  onSelectStep?: (stepId: string) => void;
}

export const EvidencePipeline: React.FC<Props> = ({ activeStep, onSelectStep }) => {
  const steps = [
    { id: 'drug', label: 'Drug Candidate', icon: Pill, navTo: 'drugs', desc: 'SMILES & Formula' },
    { id: 'molecular', label: 'Molecular Evidence', icon: Atom, navTo: 'drugs', desc: 'Physicochemical & FP' },
    { id: 'biological', label: 'Biological Evidence', icon: Dna, navTo: 'biological', desc: 'Organism & Cell Lines' },
    { id: 'targets', label: 'Target Analysis', icon: Crosshair, navTo: 'target-pathway', desc: 'Receptor & Enzyme' },
    { id: 'pathways', label: 'Pathway Analysis', icon: GitFork, navTo: 'target-pathway', desc: 'Signaling Cascade' },
    { id: 'multi-omics', label: 'Multi-Omics', icon: Layers, navTo: 'multi-omics', desc: 'DNA → RNA → Protein' },
    { id: 'aiml', label: 'AI/ML Models', icon: Cpu, navTo: 'ai-ml', desc: 'RF / SVM / LR / XGB' },
    { id: 'consensus', label: 'Consensus', icon: CheckCircle2, navTo: 'risk-evidence', desc: 'Agreement Ratio' },
    { id: 'uncertainty', label: 'Uncertainty', icon: AlertTriangle, navTo: 'risk-evidence', desc: 'Domain & Gaps' },
    { id: 'evidence-strength', label: 'Evidence Strength', icon: Scale, navTo: 'risk-evidence', desc: 'Quality Weighted' },
    { id: 'passport', label: 'Evidence Passport', icon: FileCheck, navTo: 'passport', desc: 'Digital Certificate' },
    { id: 'integrity', label: 'Integrity Verification', icon: ShieldCheck, navTo: 'integrity', desc: 'SHA-256 Seal' },
    { id: 'prioritization', label: 'Lab Prioritization', icon: FlaskConical, navTo: 'reports', desc: 'Decision Support' }
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs text-[#172B1D]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-[#E2E8F0] gap-2">
        <div>
          <h3 className="text-sm font-bold text-[#172B1D] tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16A34A]"></span>
            Section C — CYGEN VAULT Analysis Workflow Pipeline
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Traceable computational sequence from molecular candidate to prospective experimental prioritization.
          </p>
        </div>
        <span className="text-[11px] font-mono text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-3 py-1 rounded-lg self-start sm:self-auto font-bold">
          Deterministic 13-Stage Audit Trail
        </span>
      </div>

      {/* Pipeline Flow Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <button
              key={step.id}
              onClick={() => onSelectStep?.(step.navTo)}
              type="button"
              className={`group text-left p-3 rounded-lg border transition-all relative cursor-pointer ${
                isActive
                  ? 'bg-[#DCFCE7] border-[#16A34A] shadow-xs ring-1 ring-[#16A34A]'
                  : 'bg-[#F7FAF7] border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#64748B] group-hover:text-[#172B1D] font-semibold">
                  {idx < 9 ? `0${idx + 1}` : idx + 1}
                </span>
                <Icon className={`w-3.5 h-3.5 transition-colors ${
                  isActive ? 'text-[#166534]' : 'text-[#64748B] group-hover:text-[#16A34A]'
                }`} />
              </div>
              <div className={`font-semibold text-xs line-clamp-1 group-hover:text-[#16A34A] transition-colors ${
                isActive ? 'text-[#166534]' : 'text-[#172B1D]'
              }`}>
                {step.label}
              </div>
              <div className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5">
                {step.desc}
              </div>
            </button>
          );
        })}
      </div>

      {/* Pipeline Summary Line */}
      <div className="mt-4 pt-3.5 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between text-xs text-[#64748B] gap-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#172B1D]">
          <span>Candidate</span>
          <ArrowRight className="w-3 h-3 text-[#16A34A]" />
          <span>Multi-Omics</span>
          <ArrowRight className="w-3 h-3 text-[#16A34A]" />
          <span>Ensemble ML</span>
          <ArrowRight className="w-3 h-3 text-[#16A34A]" />
          <span className="text-[#166534] font-bold">SHA-256 Passport</span>
        </div>
        <div className="text-[11px] text-[#64748B] font-mono">
          Click any stage to inspect underlying evidence layer
        </div>
      </div>
    </div>
  );
};
