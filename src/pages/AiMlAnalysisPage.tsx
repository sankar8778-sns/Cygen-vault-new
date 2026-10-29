import React from 'react';
import { 
  Cpu, 
  ShieldAlert 
} from 'lucide-react';
import { AnalysisRecord } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  analysis: AnalysisRecord;
}

export const AiMlAnalysisPage: React.FC<Props> = ({ analysis }) => {
  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Cpu className="w-5 h-5" />
              </div>
              Multi-Model AI/ML Ensemble Analysis
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Ensemble classification evaluating candidate <strong className="text-[#172B1D]">{analysis.drugName}</strong> ({analysis.drugId}) across 4 distinct machine learning architectures.
          </p>
        </div>

        <div className="text-xs font-mono bg-white text-[#172B1D] px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] shadow-xs">
          Ensemble Model: <strong className="text-[#166534]">ML-2026.10</strong>
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Critical Model Consensus Warning */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1.5 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm font-mono">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <span>Crucial Model Consensus Notice</span>
        </div>
        <p className="leading-relaxed">
          &ldquo;<strong className="text-amber-900 font-semibold">Model consensus indicates agreement among computational models. It does not establish biological toxicity or safety.</strong> Computational results are decision-support hypotheses requiring prospective bench validation.&rdquo;
        </p>
      </div>

      {/* Model Consensus & Agreement KPI Banner */}
      <div className="bg-white border border-[#E2E8F0] text-[#172B1D] rounded-xl p-5 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="p-3 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
            <span className="text-[10px] font-mono text-[#166534] uppercase tracking-wider block font-bold">
              Ensemble Model Agreement
            </span>
            <div className="text-3xl font-extrabold font-mono text-[#172B1D] mt-1 tabular-nums">
              {analysis.modelAgreement}
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">3 of 4 classifiers in accord</span>
          </div>

          <div className="p-3 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
            <span className="text-[10px] font-mono text-amber-800 uppercase tracking-wider block font-bold">
              Consensus Risk Signal
            </span>
            <div className="text-2xl font-bold font-mono text-amber-700 mt-1">
              {analysis.consensusRiskSignal}
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">Aggregated voting decision</span>
          </div>

          <div className="p-3 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
            <span className="text-[10px] font-mono text-[#0284C7] uppercase tracking-wider block font-bold">
              Model Ensemble Suite
            </span>
            <div className="text-sm font-semibold text-[#172B1D] mt-1.5 font-mono">
              RF / SVM / LR / XGBoost
            </div>
            <span className="text-[11px] text-[#64748B] font-mono">Scikit / XGBoost mock engine</span>
          </div>

          <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] text-xs text-[#64748B]">
            <span className="text-[10px] font-mono text-[#172B1D] uppercase block mb-1 font-semibold">Architecture Extensibility</span>
            Engine interface maps directly to future Python/scikit-learn REST microservices.
          </div>
        </div>
      </div>

      {/* 4 Models Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {analysis.modelPredictions.map(pred => {
          const isHigh = pred.riskSignal === 'High';
          return (
            <div
              key={pred.modelName}
              className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs space-y-4"
            >
              <div className="flex items-start justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-[#172B1D]">{pred.modelName}</h3>
                    <span className="text-[10px] font-mono text-[#64748B] bg-[#F7FAF7] border border-[#E2E8F0] px-2 py-0.5 rounded">
                      {pred.runtimeMs}ms
                    </span>
                  </div>
                  <span className="text-[11px] text-[#64748B] font-mono mt-1 block">
                    Softmax / Sigmoid Probability: <strong className="text-[#0284C7]">{(pred.probabilityScore * 100).toFixed(0)}%</strong>
                  </span>
                </div>

                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
                  isHigh
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                }`}>
                  {pred.riskSignal} Risk Signal
                </span>
              </div>

              {/* Probability Bar */}
              <div>
                <div className="flex justify-between text-[11px] font-mono text-[#64748B] mb-1.5">
                  <span>Computational Signal Strength</span>
                  <span className="text-[#172B1D] font-semibold">{(pred.probabilityScore * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      isHigh ? 'bg-amber-500' : 'bg-[#16A34A]'
                    }`}
                    style={{ width: `${pred.probabilityScore * 100}%` }}
                  />
                </div>
              </div>

              {/* Feature Weight Contributions */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">
                  Top Influencing Feature Weights (SHAP / Coeff Proxy)
                </span>
                <div className="space-y-2 text-xs">
                  {pred.featureWeights.map((fw, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-[#172B1D] text-[11px] truncate max-w-[240px]" title={fw.feature}>
                        {fw.feature}
                      </span>
                      <div className="flex items-center gap-2.5 font-mono text-[10px] text-[#64748B]">
                        <div className="w-20 bg-[#E2E8F0] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="bg-[#16A34A] h-full rounded-full"
                            style={{ width: `${fw.weight * 100}%` }}
                          />
                        </div>
                        <span className="tabular-nums text-[#172B1D] font-semibold">{(fw.weight * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
