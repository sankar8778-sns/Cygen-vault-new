import React from 'react';
import { 
  Globe2, 
  ShieldAlert 
} from 'lucide-react';
import { AnalysisRecord } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  analysis: AnalysisRecord;
}

export const CrossSystemPage: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Globe2 className="w-5 h-5" />
              </div>
              Cross-Biological-System Comparative Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Evaluating candidate <strong className="text-[#172B1D]">{analysis.drugName}</strong> across divergent mammalian, avian, and plant orthology systems.
          </p>
        </div>

        <div className="text-xs font-mono bg-white text-[#172B1D] px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] shadow-xs">
          6 Systems Benchmarked
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Critical Interpretation Notice */}
      <div className="p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl text-xs text-[#166534] space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-[#166534] text-sm font-mono">
          <ShieldAlert className="w-4 h-4 text-[#16A34A]" />
          <span>Non-Interchangeability Interpretation Mandate</span>
        </div>
        <p className="leading-relaxed text-[#172B1D]">
          &ldquo;<strong className="text-[#166534] font-semibold">Biological systems should not be treated as interchangeable.</strong> Differences in molecular targets, metabolism, pathways and physiology must be considered when interpreting computational results.&rdquo;
        </p>
      </div>

      {/* Visual Comparison Chart */}
      <div className="bg-white border border-[#E2E8F0] text-[#172B1D] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-[#166534] font-bold">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
            TARGET ORTHOLOGY &amp; BIOCHEMICAL CONSERVATION SCORES
          </span>
          <span className="text-[#64748B]">Human Baseline = 100%</span>
        </div>

        <div className="space-y-3.5">
          {analysis.crossSystemComparison.map(item => (
            <div key={item.system} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#172B1D] font-mono">{item.system} System</span>
                <span className="font-mono text-[#0284C7] tabular-nums font-semibold">{item.targetConservationScore}% Conservation</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    item.targetConservationScore > 80
                      ? 'bg-[#16A34A]'
                      : item.targetConservationScore > 60
                      ? 'bg-[#0284C7]'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${item.targetConservationScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
              Comparative System Matrix
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">Cross-species differences in metabolic clearance, targets, and risk signals</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAF7] text-[#64748B] font-mono text-[11px] border-b border-[#E2E8F0]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Biological System</th>
                <th className="py-3.5 px-4 font-semibold">Risk Signal</th>
                <th className="py-3.5 px-4 font-semibold">Evidence Strength</th>
                <th className="py-3.5 px-4 font-semibold">Target Conservation</th>
                <th className="py-3.5 px-4 font-semibold">Metabolic Divergence &amp; Physiology</th>
                <th className="py-3.5 px-4 font-semibold">Notes &amp; Vulnerability Benchmarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#172B1D]">
              {analysis.crossSystemComparison.map(item => (
                <tr key={item.system} className="hover:bg-[#F0FDF4]/50 transition-colors">
                  <td className="py-4 px-4 font-bold text-[#172B1D]">
                    {item.system}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold">
                    <span className={`px-2.5 py-0.5 rounded text-[11px] border ${
                      item.riskSignal === 'High'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : item.riskSignal === 'Moderate'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                    }`}>
                      {item.riskSignal}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono text-[#172B1D] font-semibold">
                    {item.evidenceStrength}
                  </td>
                  <td className="py-4 px-4 font-mono font-bold text-[#166534]">
                    {item.targetConservationScore}%
                  </td>
                  <td className="py-4 px-4 text-[#172B1D] text-xs max-w-xs">
                    {item.metabolicDivergence}
                  </td>
                  <td className="py-4 px-4 text-[#64748B] text-xs max-w-xs">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
