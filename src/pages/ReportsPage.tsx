import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  ShieldCheck, 
  FlaskConical 
} from 'lucide-react';
import { ComputationalReport, AnalysisRecord, EvidencePassport } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  reports: ComputationalReport[];
  analyses: AnalysisRecord[];
  passports: EvidencePassport[];
  selectedReportId?: string;
  onGenerateReportFromAnalysis: (analysis: AnalysisRecord) => void;
}

export const ReportsPage: React.FC<Props> = ({
  reports,
  analyses,
  passports,
  selectedReportId,
  onGenerateReportFromAnalysis
}) => {
  const [activeReportId, setActiveReportId] = useState<string>(
    selectedReportId || reports[0]?.reportId || 'RPT-2026-0001'
  );

  const report = reports.find(r => r.reportId === activeReportId) || reports[0];

  const handlePrint = () => {
    window.print();
  };

  const handleExportMarkdown = () => {
    if (!report) return;
    const md = `# CYGEN VAULT Analysis Report
**Report ID:** ${report.reportId}  
**Analysis ID:** ${report.analysisId}  
**Evidence Passport:** ${report.passportId}  
**Dataset Version:** ${report.datasetVersion}  
**Model Versions:** ${report.modelVersions}  
**Date:** ${report.generatedAt}  
**Auditor / User:** ${report.generatedBy}  
**Audit Reference:** ${report.auditReference}  
**SHA-256 Signature:** \`${report.sha256Hash}\`

---

## 1. Drug Candidate
${report.drugName} (${report.chemicalFormula})

## 2. Biological System
${report.biologicalSystem}

## 3. Molecular Evidence
${report.molecularEvidenceStatus}

## 4. Biological Evidence
${report.biologicalEvidenceStatus}

## 5. Target Analysis
${report.targetAnalysisSummary}

## 6. Pathway Analysis
${report.pathwayAnalysisSummary}

## 7. AI/ML Ensemble Result
**Computational Risk Signal:** ${report.aiMlResult} Risk Signal  
**Model Agreement:** ${report.modelAgreement}

## 8. Evidence Strength
**Level:** ${report.evidenceStrength}  
**Rationale:** ${report.evidenceStrengthReason}

## 9. Uncertainty Analysis
**Level:** ${report.uncertainty}  
**Rationale:** ${report.uncertaintyReason}

## 10. Applicability Domain
${report.applicabilityDomain}

---

## 11. Experimental Recommendation
"${report.experimentalRecommendation}"

## 12. Scientific & Regulatory Disclaimer
"${report.scientificStatement}"
`;

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.reportId}-computational-evidence-report.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3 no-print">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <FileText className="w-5 h-5" />
              </div>
              Computational Evidence Reports
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Formal decision-support dossiers incorporating multi-omics, machine learning consensus, and SHA-256 seal.
          </p>
        </div>

        {report && (
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F0FDF4] text-[#172B1D] font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#16A34A]" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleExportMarkdown}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Markdown</span>
            </button>
          </div>
        )}
      </div>

      <div className="no-print">
        <ScientificDisclaimer compact />
      </div>

      {/* Main Grid: Left Selector, Right Formal Report Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Reports Index (4 cols) - Hidden in Print */}
        <div className="lg:col-span-4 space-y-2.5 no-print">
          <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold px-1">
            Generated Reports ({reports.length})
          </div>

          {reports.map(r => {
            const isSelected = activeReportId === r.reportId;
            return (
              <div
                key={r.reportId}
                onClick={() => setActiveReportId(r.reportId)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#F0FDF4] border-[#16A34A] shadow-xs ring-1 ring-[#16A34A]/30'
                    : 'bg-white border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#166534] font-mono">{r.reportId}</span>
                    <div className="text-[11px] font-semibold text-[#172B1D] mt-1">
                      {r.drugName}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                    {r.passportId}
                  </span>
                </div>

                <div className="mt-2.5 text-[10px] font-mono text-[#64748B] flex items-center justify-between border-t border-[#E2E8F0] pt-2">
                  <span>{r.biologicalSystem.split('(')[0]}</span>
                  <span>{r.generatedAt.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Formal Scientific Report Dossier (8 cols) */}
        <div className="lg:col-span-8">
          {report ? (
            <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 shadow-xs space-y-6 text-[#172B1D]">
              {/* Report Header */}
              <div className="border-b border-[#E2E8F0] pb-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#166534] font-bold">
                  <span>CYGEN VAULT COMPUTATIONAL EVIDENCE DOSSIER</span>
                  <span>REPORT ID: {report.reportId}</span>
                </div>
                <h1 className="text-2xl font-extrabold tracking-tight text-[#172B1D]">
                  CYGEN VAULT Analysis Report
                </h1>
                <p className="text-xs text-[#64748B] font-mono">
                  Analysis ID: <strong className="text-[#172B1D]">{report.analysisId}</strong> | Evidence Passport: <strong className="text-[#166534]">{report.passportId}</strong> | Audit Ref: <strong className="text-[#172B1D]">{report.auditReference}</strong>
                </p>
              </div>

              {/* Metadata strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] text-xs font-mono">
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block font-semibold">Dataset Version</span>
                  <span className="font-bold text-[#172B1D] mt-0.5 block">{report.datasetVersion}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block font-semibold">Model Version</span>
                  <span className="font-bold text-[#172B1D] mt-0.5 block">{report.modelVersions.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block font-semibold">Generated By</span>
                  <span className="font-bold text-[#16A34A] mt-0.5 block">{report.generatedBy}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#64748B] uppercase block font-semibold">Timestamp (UTC)</span>
                  <span className="font-bold text-[#64748B] mt-0.5 block">{report.generatedAt}</span>
                </div>
              </div>

              {/* Dossier Sections */}
              <div className="space-y-4 text-xs divide-y divide-[#E2E8F0]">
                {/* 1. Drug Candidate */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    1. Drug Candidate
                  </h3>
                  <p className="text-[#172B1D]">
                    <strong className="text-[#172B1D]">{report.drugName}</strong> (Formula: <span className="font-mono text-[#166534] font-semibold">{report.chemicalFormula}</span>)
                  </p>
                </div>

                {/* 2. Biological System */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    2. Biological System
                  </h3>
                  <p className="text-[#172B1D]">
                    {report.biologicalSystem}
                  </p>
                </div>

                {/* 3. Molecular Evidence */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    3. Molecular Evidence
                  </h3>
                  <p className="text-[#64748B]">
                    {report.molecularEvidenceStatus}
                  </p>
                </div>

                {/* 4. Biological Evidence */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    4. Biological Evidence
                  </h3>
                  <p className="text-[#64748B]">
                    {report.biologicalEvidenceStatus}
                  </p>
                </div>

                {/* 5. Target Analysis */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    5. Target Analysis
                  </h3>
                  <p className="text-[#64748B]">
                    {report.targetAnalysisSummary}
                  </p>
                </div>

                {/* 6. Pathway Analysis */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    6. Pathway Analysis
                  </h3>
                  <p className="text-[#64748B]">
                    {report.pathwayAnalysisSummary}
                  </p>
                </div>

                {/* 7. AI/ML Result & Agreement */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1.5 font-mono">
                    7. AI/ML Multi-Model Results
                  </h3>
                  <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase text-[#64748B] font-mono block">Ensemble Risk Signal</span>
                      <strong className="text-amber-700 text-sm font-mono">{report.aiMlResult} Risk Signal</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase text-[#64748B] font-mono block">Model Agreement</span>
                      <strong className="text-[#166534] font-mono font-bold">{report.modelAgreement}</strong>
                    </div>
                  </div>
                </div>

                {/* 8. Evidence Strength */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    8. Evidence Strength
                  </h3>
                  <p className="text-[#172B1D] font-semibold mb-1">
                    Level: <span className="font-mono text-[#166534]">{report.evidenceStrength}</span>
                  </p>
                  <p className="text-[#64748B] leading-relaxed">
                    {report.evidenceStrengthReason}
                  </p>
                </div>

                {/* 9. Uncertainty Analysis */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    9. Uncertainty Analysis
                  </h3>
                  <p className="text-[#172B1D] font-semibold mb-1">
                    Level: <span className="font-mono text-amber-700">{report.uncertainty}</span>
                  </p>
                  <p className="text-[#64748B] leading-relaxed">
                    {report.uncertaintyReason}
                  </p>
                </div>

                {/* 10. Applicability Domain */}
                <div className="pt-3.5">
                  <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1 font-mono">
                    10. Applicability Domain
                  </h3>
                  <p className="text-[#16A34A] font-mono font-semibold">
                    {report.applicabilityDomain}
                  </p>
                </div>

                {/* 11. Experimental Recommendation */}
                <div className="pt-3.5">
                  <div className="bg-[#F0FDF4] p-4 rounded-xl border border-[#86EFAC]">
                    <h3 className="font-bold text-[#166534] uppercase tracking-wider text-xs mb-1.5 flex items-center gap-2 font-mono">
                      <FlaskConical className="w-4 h-4 text-[#16A34A]" />
                      11. Experimental Prioritization Recommendation
                    </h3>
                    <p className="text-[#172B1D] font-medium text-xs leading-relaxed">
                      &ldquo;{report.experimentalRecommendation}&rdquo;
                    </p>
                  </div>
                </div>

                {/* 12. Scientific Statement */}
                <div className="pt-3.5">
                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200">
                    <h3 className="font-bold text-amber-900 uppercase tracking-wider text-xs mb-1 font-mono">
                      12. Mandatory Scientific &amp; Regulatory Statement
                    </h3>
                    <p className="text-amber-800 text-xs leading-relaxed">
                      &ldquo;{report.scientificStatement}&rdquo;
                    </p>
                  </div>
                </div>
              </div>

              {/* SHA-256 Signature Seal Footer */}
              <div className="pt-4 border-t border-[#E2E8F0] space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="font-bold text-[#172B1D] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                    CRYPTOGRAPHIC RECORD SIGNATURE (SHA-256)
                  </span>
                  <span className="text-[#166534] font-bold">SEALED &amp; IMMUTABLE</span>
                </div>
                <div className="p-3 bg-[#F7FAF7] text-[#166534] font-mono text-xs rounded-xl border border-[#E2E8F0] break-all select-all font-semibold">
                  {report.sha256Hash}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#64748B] bg-white border border-[#E2E8F0] rounded-xl font-mono">
              No report selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
