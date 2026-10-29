import React from 'react';
import { 
  Scale, 
  Compass, 
  FlaskConical, 
  FileCheck 
} from 'lucide-react';
import { AnalysisRecord } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  analysis: AnalysisRecord;
  onNavigateToPassport: () => void;
}

export const RiskEvidencePage: React.FC<Props> = ({
  analysis,
  onNavigateToPassport
}) => {
  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Scale className="w-5 h-5" />
              </div>
              Risk Signal, Evidence Strength &amp; Uncertainty Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Multivariate evidence synthesis for <strong className="text-[#172B1D]">{analysis.drugName}</strong> against <strong className="text-[#0284C7]">{analysis.biologicalSystem}</strong>.
          </p>
        </div>

        <button
          onClick={onNavigateToPassport}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
        >
          <FileCheck className="w-4 h-4" />
          <span>Inspect Evidence Passport</span>
        </button>
      </div>

      <ScientificDisclaimer />

      {/* Primary Evidence Score Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* 1. Computational Risk Signal */}
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
          <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
            Computational Signal
          </span>
          <div className="text-lg font-extrabold font-mono text-amber-700 mt-1.5">
            {analysis.consensusRiskSignal}
          </div>
          <span className="text-[10px] text-[#64748B] block mt-1 font-mono">Multi-model voting</span>
        </div>

        {/* 2. Model Agreement */}
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
          <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
            Model Agreement
          </span>
          <div className="text-lg font-extrabold font-mono text-[#166534] mt-1.5">
            {analysis.modelAgreement.split('(')[1]?.replace(')', '') || '75%'}
          </div>
          <span className="text-[10px] text-[#64748B] block mt-1 font-mono">3 of 4 classifiers</span>
        </div>

        {/* 3. Evidence Strength */}
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
          <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
            Evidence Strength
          </span>
          <div className="text-lg font-extrabold font-mono text-[#172B1D] mt-1.5">
            {analysis.evidenceStrength}
          </div>
          <span className="text-[10px] text-[#64748B] block mt-1 font-mono">Quality weighted</span>
        </div>

        {/* 4. Data Quality */}
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
          <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
            Data Quality
          </span>
          <div className="text-lg font-extrabold font-mono text-[#166534] mt-1.5">
            High
          </div>
          <span className="text-[10px] text-[#64748B] block mt-1 font-mono">Certified extraction</span>
        </div>

        {/* 5. Uncertainty */}
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
          <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
            Uncertainty
          </span>
          <div className="text-lg font-extrabold font-mono text-amber-700 mt-1.5">
            {analysis.uncertainty}
          </div>
          <span className="text-[10px] text-[#64748B] block mt-1 font-mono">Missing metabolomics</span>
        </div>

        {/* 6. Applicability Domain */}
        <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs">
          <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
            Domain Position
          </span>
          <div className="text-xs font-bold font-mono text-[#0284C7] mt-2 line-clamp-1">
            {analysis.applicabilityDomain}
          </div>
          <span className="text-[10px] text-[#64748B] block mt-1 font-mono">Physicochemical envelope</span>
        </div>
      </div>

      {/* Experimental Recommendation Banner */}
      <div className="p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl flex items-start gap-3.5 shadow-xs">
        <div className="p-2 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC] shrink-0 mt-0.5">
          <FlaskConical className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <span className="text-xs font-bold text-[#166534] uppercase tracking-wider font-mono">
            Experimental Prioritization Recommendation
          </span>
          <p className="text-xs text-[#172B1D] font-bold">
            &ldquo;Experimental validation should be prioritized to investigate the identified computational signal.&rdquo;
          </p>
          <p className="text-[11px] text-[#64748B] leading-relaxed">
            Specifically: Quantify primary hepatocyte glutathione depletion thresholds and run high-resolution LC-MS to verify whether electrophilic bioactivation intermediates are quenched at physiological dosing.
          </p>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Evidence Strength Engine */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#16A34A]" />
              <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono">
                Evidence Strength Engine Evaluation
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
              Level: {analysis.evidenceStrength}
            </span>
          </div>

          <div className="p-3.5 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl text-xs space-y-1">
            <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
              Deterministic Rationale &amp; Scoring Logic
            </span>
            <p className="text-[#172B1D] leading-relaxed">
              &ldquo;{analysis.evidenceStrengthReason}&rdquo;
            </p>
          </div>

          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
              Evidence Dimension Checklist
            </span>

            <div className="divide-y divide-[#E2E8F0] border border-[#E2E8F0] rounded-xl bg-[#F7FAF7]">
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#172B1D]">Multi-Model Agreement Ratio</span>
                <span className="font-mono font-bold text-[#166534]">75% (3 / 4)</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#172B1D]">Genomics &amp; Proteomics Availability</span>
                <span className="font-mono font-bold text-[#166534]">Available / Certified</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#172B1D]">Metabolomics Layer Completeness</span>
                <span className="font-mono font-bold text-amber-700">Incomplete (Gap)</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#172B1D]">Laboratory Wet-Lab Validation</span>
                <span className="font-mono font-bold text-[#64748B]">Pending Prospective</span>
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="text-[#172B1D]">Applicability Domain Position</span>
                <span className="font-mono font-bold text-[#0284C7]">Within Prototype Domain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Uncertainty & Applicability Domain */}
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#0284C7]" />
              <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono">
                Uncertainty Factors &amp; Applicability Domain
              </h2>
            </div>
            <span className="px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Uncertainty: {analysis.uncertainty}
            </span>
          </div>

          <div className="p-3.5 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl text-xs space-y-1">
            <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
              Uncertainty Synthesis
            </span>
            <p className="text-[#172B1D] leading-relaxed">
              &ldquo;{analysis.uncertaintyReason}&rdquo;
            </p>
          </div>

          {/* Uncertainty Factor Cards */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
              Identified Uncertainty Factors ({analysis.uncertaintyFactors.length})
            </span>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {analysis.uncertaintyFactors.map((uf, idx) => (
                <div key={idx} className="p-3 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#172B1D]">{uf.factor}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                      {uf.level}
                    </span>
                  </div>
                  <p className="text-[#172B1D] text-[11px]">{uf.description}</p>
                  <p className="text-[#64748B] text-[10px] font-mono">Impact: {uf.impactOnEvidence}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
