import React from 'react';
import { 
  Layers, 
  CheckCircle2, 
  XCircle, 
  Scale
} from 'lucide-react';
import { BiologicalProfile } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  profile: BiologicalProfile;
}

export const MultiOmicsPage: React.FC<Props> = ({ profile }) => {
  const layers = [
    {
      name: 'Genomics',
      chainStep: 'DNA Sequence & Variant Annotations',
      available: profile.genomics.available,
      quality: profile.genomics.quality,
      version: profile.genomics.datasetVersion,
      source: profile.genomics.source,
      status: profile.genomics.validationStatus,
      summary: profile.genomics.details,
      relevance: 'High',
      consistency: 'High'
    },
    {
      name: 'Transcriptomics',
      chainStep: 'RNA Expression (Illumina NovaSeq TPM)',
      available: profile.transcriptomics.available,
      quality: profile.transcriptomics.quality,
      version: profile.transcriptomics.datasetVersion,
      source: profile.transcriptomics.source,
      status: profile.transcriptomics.validationStatus,
      summary: profile.transcriptomics.details,
      relevance: 'High',
      consistency: 'Moderate'
    },
    {
      name: 'Proteomics',
      chainStep: 'Protein Abundance (Orbitrap Mass Spec)',
      available: profile.proteomics.available,
      quality: profile.proteomics.quality,
      version: profile.proteomics.datasetVersion,
      source: profile.proteomics.source,
      status: profile.proteomics.validationStatus,
      summary: profile.proteomics.details,
      relevance: 'High',
      consistency: 'High'
    },
    {
      name: 'Metabolomics',
      chainStep: 'Metabolite Pools & Clearance Dynamics',
      available: profile.metabolomics.available,
      quality: profile.metabolomics.quality,
      version: profile.metabolomics.datasetVersion,
      source: profile.metabolomics.source,
      status: profile.metabolomics.validationStatus,
      summary: profile.metabolomics.details,
      relevance: 'Moderate',
      consistency: 'Unavailable'
    },
    {
      name: 'Cellular Data',
      chainStep: 'Cell Viability & Phenotypic Assays',
      available: profile.cellular.available,
      quality: profile.cellular.quality,
      version: profile.cellular.datasetVersion,
      source: profile.cellular.source,
      status: profile.cellular.validationStatus,
      summary: profile.cellular.details,
      relevance: 'High',
      consistency: 'Moderate'
    }
  ];

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Layers className="w-5 h-5" />
              </div>
              Multi-Omics Evidence Chain &amp; Integration Matrix
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Harmonized evidence layers across central dogma: DNA → RNA → Protein → Metabolite → Cellular Response.
          </p>
        </div>

        <div className="text-xs font-mono bg-white text-[#172B1D] px-3.5 py-1.5 rounded-lg border border-[#E2E8F0] shadow-xs">
          Profile: <strong className="text-[#166534]">{profile.name}</strong> ({profile.system})
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Prominent Evidence Warning */}
      <div className="p-4 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl text-xs text-[#166534] space-y-2 shadow-xs">
        <div className="flex items-center gap-2 font-bold text-[#166534] text-sm font-mono">
          <Scale className="w-4 h-4 text-[#16A34A]" />
          <span>Core Evidence Principle: Quality Weighted Over Volume</span>
        </div>
        <p className="leading-relaxed text-[#172B1D]">
          &ldquo;<strong className="text-[#166534] font-semibold">Never automatically assume that more data means stronger evidence.</strong> Evidence strength must consider data quality, data relevance, completeness, consistency, validation, and model applicability.&rdquo;
        </p>
      </div>

      {/* Evidence Chain Visual Diagram */}
      <div className="bg-white border border-[#E2E8F0] text-[#172B1D] p-5 rounded-xl space-y-4 shadow-xs">
        <div className="flex items-center justify-between text-xs font-mono text-[#166534] font-bold">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
            THE CENTRAL DOGMA EVIDENCE CHAIN
          </span>
          <span className="text-[#64748B]">Cross-Omics Data Flow</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {layers.map((layer, idx) => (
            <div
              key={layer.name}
              className={`p-4 rounded-xl border relative transition-all ${
                layer.available
                  ? 'bg-[#F7FAF7] border-[#E2E8F0] hover:border-[#86EFAC] shadow-xs'
                  : 'bg-[#F7FAF7]/40 border-[#E2E8F0]/50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono text-[#166534] font-bold">0{idx + 1}</span>
                {layer.available ? (
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                ) : (
                  <XCircle className="w-4 h-4 text-slate-400" />
                )}
              </div>
              <div className="font-bold text-sm text-[#172B1D]">{layer.name}</div>
              <div className="text-[11px] text-[#64748B] mt-1 line-clamp-2">{layer.chainStep}</div>
              <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] font-mono">
                <span className="text-[#64748B]">Quality:</span>
                <span className={layer.quality === 'High' ? 'text-[#166534] font-bold' : layer.quality === 'Moderate' ? 'text-amber-700 font-semibold' : 'text-[#64748B]'}>
                  {layer.quality}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-Omics Evidence Matrix Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-[#E2E8F0] flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
              Multi-Omics Evidence Matrix
            </h2>
            <p className="text-xs text-[#64748B] mt-0.5">Structured evaluation across all biological dimensions</p>
          </div>
          <span className="text-xs font-mono bg-[#DCFCE7] border border-[#86EFAC] px-2.5 py-1 rounded-lg text-[#166534] font-bold">
            4 / 5 Layers Active
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAF7] text-[#64748B] font-mono text-[11px] border-b border-[#E2E8F0]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Evidence Layer</th>
                <th className="py-3.5 px-4 font-semibold">Available</th>
                <th className="py-3.5 px-4 font-semibold">Quality Level</th>
                <th className="py-3.5 px-4 font-semibold">Relevance</th>
                <th className="py-3.5 px-4 font-semibold">Dataset Version</th>
                <th className="py-3.5 px-4 font-semibold">Validation Status</th>
                <th className="py-3.5 px-4 font-semibold">Source &amp; Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#172B1D]">
              {layers.map(l => (
                <tr key={l.name} className="hover:bg-[#F0FDF4]/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-[#172B1D] flex items-center gap-2.5">
                    <span className={`w-2 h-2 rounded-full ${l.available ? 'bg-[#16A34A]' : 'bg-slate-300'}`}></span>
                    {l.name}
                  </td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {l.available ? (
                      <span className="inline-flex items-center gap-1.5 text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-2.5 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[#64748B] bg-[#F7FAF7] border border-[#E2E8F0] px-2.5 py-0.5 rounded">
                        <XCircle className="w-3.5 h-3.5 text-slate-400" /> No
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className={`px-2.5 py-0.5 rounded font-bold border ${
                      l.quality === 'High'
                        ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                        : l.quality === 'Moderate'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-[#F7FAF7] text-[#64748B] border-[#E2E8F0]'
                    }`}>
                      {l.quality}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#172B1D]">{l.relevance}</td>
                  <td className="py-3.5 px-4 font-mono text-[#64748B]">{l.version}</td>
                  <td className="py-3.5 px-4 text-[#172B1D] font-mono text-[11px]">{l.status}</td>
                  <td className="py-3.5 px-4 text-[#64748B] text-[11px] max-w-xs truncate" title={l.source}>
                    {l.source}
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
