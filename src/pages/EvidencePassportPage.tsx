import React, { useState } from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Hash,
  Search,
  Filter,
  Dna,
  Pill,
  ExternalLink,
  Code
} from 'lucide-react';
import { EvidencePassport } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  passports: EvidencePassport[];
  selectedPassportId?: string;
  onNavigateToIntegrity: (passportId: string) => void;
  onNavigateToReport: (passportId: string) => void;
}

export const EvidencePassportPage: React.FC<Props> = ({
  passports,
  selectedPassportId,
  onNavigateToIntegrity,
  onNavigateToReport
}) => {
  const [activePassportId, setActivePassportId] = useState<string>(
    selectedPassportId || passports[0]?.passportId || 'EVP-2026-0001'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [systemFilter, setSystemFilter] = useState('All');
  const [copied, setCopied] = useState(false);
  const [showJsonPayload, setShowJsonPayload] = useState(false);

  // Filter passports
  const filteredPassports = passports.filter(p => {
    const matchesSearch = 
      p.passportId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.drugName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.chemicalFormula.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.biologicalSystem.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSystem = systemFilter === 'All' || p.biologicalSystem.toLowerCase().includes(systemFilter.toLowerCase());
    return matchesSearch && matchesSystem;
  });

  const activePassport = passports.find(p => p.passportId === activePassportId) || filteredPassports[0] || passports[0];

  const handleCopyHash = () => {
    if (!activePassport) return;
    navigator.clipboard.writeText(activePassport.sha256Hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    if (!activePassport) return;
    const blob = new Blob([JSON.stringify(activePassport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activePassport.passportId}-evidence-passport.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <FileCheck className="w-5 h-5" />
              </div>
              Digital Evidence Passport Repository
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Tamper-evident, cryptographically sealed computational evidence certificates with SHA-256 signatures.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {activePassport && (
            <>
              <button
                onClick={() => onNavigateToIntegrity(activePassport.passportId)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#86EFAC] text-[#166534] font-semibold text-xs transition-colors cursor-pointer shadow-xs"
                title="Verify cryptographic SHA-256 hash"
              >
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                <span>Verify Integrity</span>
              </button>
              
              <button
                onClick={() => onNavigateToReport(activePassport.passportId)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs transition-all shadow-xs cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>Generate Dossier</span>
              </button>

              <button
                onClick={handleDownloadJson}
                className="p-2 rounded-lg border border-[#E2E8F0] bg-white hover:bg-[#F0FDF4] text-[#64748B] hover:text-[#172B1D] text-xs transition-colors cursor-pointer shadow-xs"
                title="Download Evidence Passport JSON"
                aria-label="Download JSON"
              >
                <Download className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Main Grid: Selector with Search/Filters (Left 4 cols), Digital Passport Card (Right 8 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Passports List & Search (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          {/* Search & Filter Bar */}
          <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl space-y-2.5 shadow-xs">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#64748B]" />
              <input
                type="text"
                placeholder="Search by ID, compound, system..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-xs font-mono text-[#172B1D] placeholder-[#64748B] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[10px] uppercase text-[#64748B] font-semibold">Species:</span>
              <div className="flex items-center gap-1">
                {['All', 'Human', 'Rat', 'Dog'].map(sys => (
                  <button
                    key={sys}
                    onClick={() => setSystemFilter(sys)}
                    className={`px-2 py-0.5 rounded text-[10px] cursor-pointer transition-colors ${
                      systemFilter === sys
                        ? 'bg-[#16A34A] text-white font-bold'
                        : 'bg-[#F7FAF7] text-[#64748B] hover:text-[#172B1D] border border-[#E2E8F0]'
                    }`}
                  >
                    {sys}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold px-1 flex items-center justify-between">
            <span>Passports ({filteredPassports.length})</span>
            <span className="text-[10px] text-[#166534] font-bold">SHA-256 Valid</span>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto pr-1">
            {filteredPassports.length > 0 ? (
              filteredPassports.map(p => {
                const isSelected = activePassport?.passportId === p.passportId;
                return (
                  <div
                    key={p.passportId}
                    onClick={() => setActivePassportId(p.passportId)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
                      isSelected
                        ? 'bg-[#F0FDF4] border-[#16A34A] ring-1 ring-[#16A34A]/30'
                        : 'bg-white border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-bold text-xs text-[#172B1D] font-mono">{p.passportId}</span>
                        <div className="text-xs text-[#172B1D] mt-0.5 font-semibold">
                          {p.drugName} <span className="font-mono text-[#166534] text-[10px]">({p.chemicalFormula})</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                        {p.status}
                      </span>
                    </div>

                    <div className="mt-2 text-[10px] font-mono text-[#64748B] flex items-center justify-between border-t border-[#E2E8F0] pt-2">
                      <span className="truncate">System: <strong className="text-[#172B1D]">{p.biologicalSystem}</strong></span>
                      <span className="shrink-0">{p.analysisDate.split(' ')[0]}</span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 bg-white border border-[#E2E8F0] rounded-xl text-center text-xs text-[#64748B] font-mono">
                No matching evidence passports found.
              </div>
            )}
          </div>
        </div>

        {/* Digital Evidence Passport (8 cols) */}
        <div className="lg:col-span-8">
          {activePassport ? (
            <div className="relative bg-white text-[#172B1D] rounded-2xl p-6 lg:p-7 shadow-xs border border-[#E2E8F0] overflow-hidden space-y-5">
              {/* Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] flex items-center justify-center text-[#16A34A] shadow-xs shrink-0">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#166534] block font-bold">
                        COMPUTATIONAL EVIDENCE DEMONSTRATION CREDENTIAL
                      </span>
                      <span className="text-[9px] font-mono uppercase bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-1.5 py-0.2 rounded font-bold">
                        SYNTHETIC RECORD
                      </span>
                    </div>
                    <h2 className="text-lg font-extrabold tracking-tight text-[#172B1D] mt-0.5">
                      EVIDENCE PASSPORT
                    </h2>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] uppercase text-[#64748B] block font-semibold">Passport Identifier</span>
                  <span className="text-base font-bold text-[#166534] tracking-wider">
                    {activePassport.passportId}
                  </span>
                </div>
              </div>

              {/* Provenance & Identification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0] text-xs">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Drug Candidate</span>
                  <span className="font-bold text-[#172B1D] text-sm mt-0.5 block truncate">{activePassport.drugName}</span>
                  <span className="text-[10px] font-mono text-[#166534] mt-0.5 block font-semibold">{activePassport.drugId} • {activePassport.chemicalFormula}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Biological System</span>
                  <span className="font-bold text-[#172B1D] text-sm mt-0.5 block truncate">{activePassport.biologicalSystem}</span>
                  <span className="text-[10px] font-mono text-[#0284C7] mt-0.5 block font-semibold">Profile {activePassport.biologicalProfileId}</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Dataset Reference</span>
                  <span className="font-bold text-[#172B1D] text-sm mt-0.5 block">{activePassport.datasetVersion}</span>
                  <span className="text-[10px] font-mono text-[#64748B] mt-0.5 block">AS GARDIAN Reference</span>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Analysis Timestamp</span>
                  <span className="font-bold text-[#172B1D] text-sm mt-0.5 block">{activePassport.analysisDate.split(' ')[0]}</span>
                  <span className="text-[10px] font-mono text-[#64748B] mt-0.5 block">Ref: {activePassport.analysisId}</span>
                </div>
              </div>

              {/* Findings & Risk Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Risk Signal</span>
                  <div className="text-base font-bold font-mono text-amber-700 mt-1">
                    {activePassport.riskSignal}
                  </div>
                  <span className="text-[10px] text-[#64748B]">Consensus voting</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Model Agreement</span>
                  <div className="text-base font-bold font-mono text-[#166534] mt-1">
                    {activePassport.modelAgreement}
                  </div>
                  <span className="text-[10px] text-[#64748B]">Ensemble consensus</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Evidence Strength</span>
                  <div className="text-base font-bold font-mono text-[#0284C7] mt-1">
                    {activePassport.evidenceStrength}
                  </div>
                  <span className="text-[10px] text-[#64748B]">Quality-weighted</span>
                </div>

                <div className="p-3 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0]">
                  <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Uncertainty</span>
                  <div className="text-base font-bold font-mono text-amber-700 mt-1">
                    {activePassport.uncertainty}
                  </div>
                  <span className="text-[10px] text-[#64748B]">Applicability factor</span>
                </div>
              </div>

              {/* Input & Output Fingerprints */}
              <div className="p-4 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0] space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <span className="text-[10px] font-mono uppercase text-[#166534] font-bold">
                    Input &amp; Output Fingerprints
                  </span>
                  <button
                    onClick={() => setShowJsonPayload(!showJsonPayload)}
                    className="flex items-center gap-1 text-[10px] font-mono text-[#0284C7] hover:text-[#0369A1] transition-colors cursor-pointer font-semibold"
                  >
                    <Code className="w-3 h-3" />
                    <span>{showJsonPayload ? 'Hide JSON' : 'Inspect Canonical JSON'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
                  <div>
                    <span className="text-[#64748B] text-[10px] block">Applicability Domain:</span>
                    <span className="text-[#172B1D] font-semibold">{activePassport.applicabilityDomain}</span>
                  </div>
                  <div>
                    <span className="text-[#64748B] text-[10px] block">Signer &amp; Role:</span>
                    <span className="text-[#172B1D] font-semibold">{activePassport.createdBy} ({activePassport.createdRole})</span>
                  </div>
                </div>

                {showJsonPayload && (
                  <pre className="p-3 bg-white rounded-lg border border-[#E2E8F0] text-[10px] font-mono text-[#166534] overflow-x-auto max-h-48">
                    {JSON.stringify(activePassport, null, 2)}
                  </pre>
                )}
              </div>

              {/* Evidence Rationale Box */}
              <div className="p-4 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0] text-xs space-y-2">
                <span className="text-[10px] font-mono uppercase text-[#166534] block font-bold">
                  Evidence Rationale &amp; Scientific Interpretation
                </span>
                <p className="text-[#172B1D] leading-relaxed">
                  {activePassport.evidenceStrengthReason}
                </p>
                <p className="text-[#64748B] leading-relaxed text-[11px] pt-2 border-t border-[#E2E8F0]">
                  <strong className="text-[#172B1D]">Uncertainty Statement:</strong> {activePassport.uncertaintyReason}
                </p>
              </div>

              {/* Cryptographic SHA-256 Signature Stamp */}
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hash className="w-4 h-4 text-[#16A34A]" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#166534] font-bold">
                      SHA-256 Canonical Integrity Signature
                    </span>
                  </div>
                  <button
                    onClick={handleCopyHash}
                    className="flex items-center gap-1.5 text-[10px] font-mono text-[#166534] hover:text-[#15803D] transition-colors cursor-pointer px-2 py-0.5 rounded hover:bg-white border border-[#86EFAC]"
                  >
                    {copied ? <Check className="w-3 h-3 text-[#16A34A]" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied!' : 'Copy Hash'}</span>
                  </button>
                </div>

                <div className="font-mono text-xs text-[#166534] break-all bg-white p-3 rounded-lg border border-[#86EFAC] select-all tabular-nums font-semibold">
                  {activePassport.sha256Hash}
                </div>

                <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-[#64748B] pt-1">
                  <span>Signer: <strong className="text-[#172B1D]">{activePassport.createdBy}</strong></span>
                  <span>Audit Event: <strong className="text-[#172B1D]">{activePassport.auditRefId}</strong></span>
                  <span className="text-[#166534] font-bold">Status: {activePassport.status}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#64748B] bg-white border border-[#E2E8F0] rounded-xl font-mono">
              No Evidence Passport selected.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
