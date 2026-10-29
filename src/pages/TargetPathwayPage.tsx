import React, { useState } from 'react';
import { 
  Crosshair, 
  GitFork, 
  ShieldAlert 
} from 'lucide-react';
import { AnalysisRecord, TargetCategory, PathwayItem } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  currentAnalysis: AnalysisRecord;
}

export const TargetPathwayPage: React.FC<Props> = ({ currentAnalysis }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPathway, setSelectedPathway] = useState<PathwayItem>(currentAnalysis.pathways[0] || null);

  const categories: (TargetCategory | 'All')[] = [
    'All',
    'Receptor',
    'Enzyme',
    'Transporter',
    'Ion Channel',
    'Regulatory Protein'
  ];

  const filteredTargets = selectedCategory === 'All'
    ? currentAnalysis.targets
    : currentAnalysis.targets.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Crosshair className="w-5 h-5" />
              </div>
              Target Identification &amp; Biological Pathway Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Analyzing candidate: <strong className="text-[#172B1D]">{currentAnalysis.drugName}</strong> ({currentAnalysis.drugId}) against <strong className="text-[#0284C7]">{currentAnalysis.biologicalSystem}</strong> reference profile.
          </p>
        </div>

        <div className="text-xs font-mono bg-white text-[#172B1D] px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] self-start sm:self-auto shadow-xs">
          Analysis ID: <strong className="text-[#166534]">{currentAnalysis.id}</strong>
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Target Notice Warning */}
      <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-3 shadow-xs">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-900 font-mono">Computational Target Classification Notice: </span>
          &ldquo;Target predictions are computational interaction hypotheses derived from molecular docking and sequence orthology models. Do not represent computational predictions as experimentally confirmed interactions.&rdquo;
        </div>
      </div>

      {/* Section 1: Target Identification */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#E2E8F0] gap-2">
          <div>
            <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
              1. Potential Target Identification by Functional Category
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">
              Categorized potential interactions: Receptors, Enzymes, Transporters, Ion Channels, and Regulatory Proteins
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-[#16A34A] text-white font-bold shadow-xs'
                    : 'bg-white text-[#64748B] hover:text-[#172B1D] hover:bg-[#F0FDF4] border border-[#E2E8F0]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Target Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredTargets.map(target => (
            <div
              key={target.id}
              className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F7FAF7] hover:border-[#86EFAC] transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] font-bold border border-[#86EFAC]">
                    {target.category}
                  </span>
                  <h3 className="font-bold text-sm text-[#172B1D] mt-1.5">{target.targetName}</h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#64748B] block">Docking Score</span>
                  <span className="text-base font-bold font-mono text-[#166534]">{target.interactionScore}</span>
                </div>
              </div>

              <p className="text-xs text-[#172B1D] leading-relaxed bg-white p-3 rounded-lg border border-[#E2E8F0]">
                {target.mechanismSummary}
              </p>

              <div className="grid grid-cols-3 gap-2 text-[11px] pt-1 border-t border-[#E2E8F0] font-mono">
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Evidence</span>
                  <span className="font-semibold text-[#172B1D]">{target.interactionEvidence}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Status</span>
                  <span className="text-amber-700 font-semibold">{target.evidenceStatus}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block">Confidence</span>
                  <span className="font-semibold text-[#0284C7]">{target.confidenceLevel}%</span>
                </div>
              </div>

              <div className="text-[10px] text-[#64748B] font-mono">
                Data Source: <span className="text-[#172B1D] font-medium">{target.evidenceSource}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Pathway Analysis & Biological Mechanism Visualization */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-5">
        <div className="pb-3.5 border-b border-[#E2E8F0]">
          <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono flex items-center gap-2">
            <GitFork className="w-4 h-4 text-[#0284C7]" />
            2. Biological Mechanism Pathway Visualization
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Mechanism progression: Candidate → Target Protein → Signalling Cascade → Molecular Response → Cellular Response → Potential Signal
          </p>
        </div>

        {/* Pathway Cascade Flow Diagram */}
        <div className="p-4 bg-[#F0FDF4] rounded-xl border border-[#86EFAC] space-y-4">
          <div className="text-[11px] font-mono text-[#166534] uppercase tracking-wider flex items-center gap-2 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
            Mechanism Progression Chain (Active Hypothesis: {selectedPathway?.pathwayName})
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Step 1 */}
            <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-center space-y-1 shadow-xs">
              <span className="text-[9px] font-mono text-[#64748B] uppercase block font-semibold">Step 1</span>
              <div className="text-xs font-bold text-[#172B1D]">Drug Candidate</div>
              <div className="text-[11px] font-mono text-[#166534] truncate font-semibold">{currentAnalysis.drugName}</div>
            </div>

            {/* Step 2 */}
            <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-center space-y-1 shadow-xs">
              <span className="text-[9px] font-mono text-[#64748B] uppercase block font-semibold">Step 2</span>
              <div className="text-xs font-bold text-[#172B1D]">Target Protein</div>
              <div className="text-[11px] font-mono text-[#0284C7] truncate font-semibold">{selectedPathway?.targetMolecule.split('/')[0]}</div>
            </div>

            {/* Step 3 */}
            <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-center space-y-1 shadow-xs">
              <span className="text-[9px] font-mono text-[#64748B] uppercase block font-semibold">Step 3</span>
              <div className="text-xs font-bold text-[#172B1D]">Signalling Pathway</div>
              <div className="text-[11px] font-mono text-indigo-700 truncate font-semibold">Phase I / II Axis</div>
            </div>

            {/* Step 4 */}
            <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-center space-y-1 shadow-xs">
              <span className="text-[9px] font-mono text-[#64748B] uppercase block font-semibold">Step 4</span>
              <div className="text-xs font-bold text-[#172B1D]">Molecular Response</div>
              <div className="text-[11px] font-mono text-purple-700 truncate font-semibold">ARE Induction</div>
            </div>

            {/* Step 5 */}
            <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-center space-y-1 shadow-xs">
              <span className="text-[9px] font-mono text-[#64748B] uppercase block font-semibold">Step 5</span>
              <div className="text-xs font-bold text-[#172B1D]">Cellular Response</div>
              <div className="text-[11px] font-mono text-amber-700 truncate font-semibold">Redox Equilibrium</div>
            </div>

            {/* Step 6 */}
            <div className="p-3 rounded-lg bg-white border border-[#E2E8F0] text-center space-y-1 shadow-xs">
              <span className="text-[9px] font-mono text-[#64748B] uppercase block font-semibold">Step 6</span>
              <div className="text-xs font-bold text-[#172B1D]">Risk Signal</div>
              <div className="text-[11px] font-mono text-amber-800 font-bold truncate">{currentAnalysis.consensusRiskSignal} Signal</div>
            </div>
          </div>
        </div>

        {/* Detailed Pathway Cards */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono">
            Tracked Biological Pathways ({currentAnalysis.pathways.length})
          </div>

          {currentAnalysis.pathways.map(pw => (
            <div
              key={pw.id}
              onClick={() => setSelectedPathway(pw)}
              className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
                selectedPathway?.id === pw.id
                  ? 'bg-white border-[#16A34A] ring-1 ring-[#16A34A]/30'
                  : 'bg-[#F7FAF7] border-[#E2E8F0] hover:border-[#86EFAC]'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#E2E8F0] gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#172B1D]">{pw.pathwayName}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#0284C7] border border-[#E2E8F0] font-semibold">
                    Target: {pw.targetMolecule}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                    Evidence: {pw.evidenceStrength}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Biological Function</span>
                  <p className="text-[#172B1D] mt-1 leading-relaxed">{pw.biologicalFunction}</p>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Cellular Process</span>
                  <p className="text-[#172B1D] mt-1 leading-relaxed">{pw.cellularProcess}</p>
                </div>
              </div>

              <div className="p-3 bg-white rounded-lg border border-[#E2E8F0] text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Interpretation</span>
                  <p className="text-[#172B1D] font-medium mt-0.5">{pw.interpretation}</p>
                </div>
                <div className="text-[11px] font-mono text-[#0284C7] shrink-0 font-semibold">
                  Genes: {pw.associatedGenes.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
