import React from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

interface Props {
  compact?: boolean;
}

export const ScientificDisclaimer: React.FC<Props> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 shadow-xs">
        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
        <span className="leading-relaxed">
          <strong className="text-amber-800 font-bold">Scientific &amp; Demonstration Notice:</strong> Computational predictions and sample records in this demo environment are illustrative and do not represent actual patient or clinical findings. Computational signals are for research decision-support only.
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white border border-amber-200 p-4 rounded-xl text-sm text-[#172B1D] shadow-xs">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-amber-100/80 border border-amber-300 text-amber-700 shrink-0 mt-0.5">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <div className="space-y-1.5 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-bold text-amber-800 tracking-wide text-xs uppercase font-mono flex items-center gap-2">
              Scientific &amp; Demonstration Notice
            </p>
            <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 font-mono px-2 py-0.5 rounded font-semibold">
              Synthetic Demonstration Environment
            </span>
          </div>
          <p className="text-xs text-[#64748B] leading-relaxed font-normal">
            CYGEN VAULT is a <strong className="text-[#172B1D] font-semibold">computational research demonstration platform</strong>. All molecular records, biological models, and analysis outputs in this environment are synthetic and illustrative, and do <strong className="text-amber-800 font-bold">not</strong> represent actual patient records, clinically validated findings, or drug approvals. Computational predictions prioritize prospective laboratory experiments and must be verified by certified experimental protocols.
          </p>
        </div>
      </div>
    </div>
  );
};
