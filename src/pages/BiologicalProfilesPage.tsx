import React, { useState } from 'react';
import { 
  Dna, 
  Layers, 
  Activity, 
  FlaskConical, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Filter, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { BiologicalProfile, BiologicalSystemType, UserRole } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  profiles: BiologicalProfile[];
  onSaveProfile: (profile: BiologicalProfile) => void;
  userRole: UserRole;
  onSelectForAnalysis: (profile: BiologicalProfile) => void;
}

export const BiologicalProfilesPage: React.FC<Props> = ({
  profiles,
  onSaveProfile,
  userRole,
  onSelectForAnalysis
}) => {
  const [selectedSystem, setSelectedSystem] = useState<string>('All');
  const [activeProfile, setActiveProfile] = useState<BiologicalProfile>(profiles[0] || null);

  const systems: (BiologicalSystemType | 'All')[] = [
    'All',
    'Human',
    'Rat',
    'Dog',
    'Cat',
    'Bird',
    'Plant'
  ];

  const filtered = selectedSystem === 'All' 
    ? profiles 
    : profiles.filter(p => p.system === selectedSystem);

  const qualityBadge = (quality: string) => {
    switch (quality) {
      case 'High':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">High Quality</span>;
      case 'Moderate':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">Moderate Quality</span>;
      case 'Low':
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">Low Quality</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F7FAF7] text-[#64748B] border border-[#E2E8F0]">Unavailable</span>;
    }
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Dna className="w-5 h-5" />
              </div>
              Biological System Profiles &amp; Multi-Layer Evidence
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Genomics, transcriptomics, proteomics, metabolomics, and cellular baseline models across experimental species.
          </p>
        </div>

        <button
          onClick={() => onSelectForAnalysis(activeProfile)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Use {activeProfile?.name || 'Selected'} in Pipeline</span>
        </button>
      </div>

      <ScientificDisclaimer compact />

      {/* Species Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#E2E8F0] text-xs">
        <Filter className="w-3.5 h-3.5 text-[#64748B] shrink-0" />
        <span className="text-[11px] font-semibold text-[#64748B] uppercase font-mono mr-1">Species Filter:</span>
        {systems.map(s => (
          <button
            key={s}
            onClick={() => setSelectedSystem(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer font-mono ${
              selectedSystem === s
                ? 'bg-[#16A34A] text-white font-bold shadow-xs'
                : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#172B1D] hover:bg-[#F0FDF4]'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Profiles List (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          {filtered.map(profile => {
            const isSelected = activeProfile?.id === profile.id;
            return (
              <div
                key={profile.id}
                onClick={() => setActiveProfile(profile)}
                className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#F0FDF4] border-[#16A34A] ring-1 ring-[#16A34A]/30'
                    : 'bg-white border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#172B1D]">{profile.name}</span>
                    <div className="text-[11px] font-mono text-[#64748B] mt-1 flex items-center gap-2">
                      <span className="bg-[#DCFCE7] px-2 py-0.5 rounded text-[#166534] border border-[#86EFAC] font-semibold">{profile.system}</span>
                      <span>•</span>
                      <span>Version {profile.datasetVersion}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC] font-bold">
                    {profile.id}
                  </span>
                </div>

                <div className="mt-2 text-[11px] text-[#64748B] line-clamp-2">
                  {profile.description}
                </div>

                {/* Layer pills indicator */}
                <div className="mt-3 pt-2.5 border-t border-[#E2E8F0] flex items-center gap-2 text-[10px] font-mono">
                  <span className={profile.genomics.available ? 'text-[#16A34A] font-bold' : 'text-slate-300'}>G</span>
                  <span className={profile.transcriptomics.available ? 'text-[#0284C7] font-bold' : 'text-slate-300'}>T</span>
                  <span className={profile.proteomics.available ? 'text-purple-600 font-bold' : 'text-slate-300'}>P</span>
                  <span className={profile.metabolomics.available ? 'text-amber-600 font-bold' : 'text-slate-300'}>M</span>
                  <span className={profile.cellular.available ? 'text-emerald-600 font-bold' : 'text-slate-300'}>C</span>
                  <span className="text-[#64748B] ml-auto">{profile.source.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Details - 5 Omics Layers (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {activeProfile && (
            <>
              {/* Profile Header Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#E2E8F0] gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-[#172B1D]">{activeProfile.name}</h2>
                      <span className="text-xs font-mono font-bold bg-[#DCFCE7] px-2.5 py-0.5 rounded text-[#166534] border border-[#86EFAC]">
                        {activeProfile.system}
                      </span>
                    </div>
                    <div className="text-xs text-[#64748B] font-mono mt-1">
                      Sample ID: <strong className="text-[#172B1D]">{activeProfile.id}</strong> | Version: <strong className="text-[#172B1D]">{activeProfile.datasetVersion}</strong> | Source: <strong className="text-[#172B1D]">{activeProfile.source}</strong>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] self-start sm:self-auto font-mono">
                    {activeProfile.validationStatus}
                  </span>
                </div>

                <p className="text-xs text-[#172B1D] mt-3 leading-relaxed">
                  {activeProfile.description}
                </p>
              </div>

              {/* Layer 1: Genomics */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                    <h3 className="font-bold text-[#172B1D] uppercase tracking-wider font-mono">1. Genomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.genomics.quality)}
                    <span className="text-[10px] font-mono text-[#64748B]">Ver: {activeProfile.genomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-[#172B1D] text-xs">{activeProfile.genomics.details}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-[#F7FAF7] border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1.5 font-semibold">Key Genes Tracked</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProfile.genomics.geneInfo.map((g, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] font-mono bg-white border border-[#86EFAC] text-[#166534] font-semibold">
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#F7FAF7] border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1.5 font-semibold">Genomic Variants &amp; Alleles</span>
                    <ul className="text-[11px] text-[#172B1D] space-y-1">
                      {activeProfile.genomics.variants.map((v, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
                          <span>{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] font-mono text-[10px] text-[#166534] overflow-x-auto font-semibold">
                  <span className="text-[#64748B] block mb-1 uppercase font-semibold">FASTA Sequence Excerpt (ADME Reference):</span>
                  {activeProfile.genomics.dnaSequenceSample}
                </div>
              </div>

              {/* Layer 2: Transcriptomics */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0284C7]"></span>
                    <h3 className="font-bold text-[#172B1D] uppercase tracking-wider font-mono">2. Transcriptomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.transcriptomics.quality)}
                    <span className="text-[10px] font-mono text-[#64748B]">Ver: {activeProfile.transcriptomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-[#172B1D] text-xs">{activeProfile.transcriptomics.details}</p>

                {activeProfile.transcriptomics.available ? (
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] space-y-1.5 font-mono">
                    <div className="text-[11px] text-[#172B1D]">
                      <strong className="text-[#172B1D]">Expression Metrics:</strong> {activeProfile.transcriptomics.rnaExpressionMetrics}
                    </div>
                    <div className="text-[11px] text-[#166534] font-semibold">
                      <strong className="text-[#0284C7]">Differential Genes:</strong> {activeProfile.transcriptomics.differentialGenes.join(' | ')}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs">
                    Notice: Transcriptomics data is currently not available for this profile in prototype dataset version {activeProfile.datasetVersion}.
                  </div>
                )}
              </div>

              {/* Layer 3: Proteomics */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                    <h3 className="font-bold text-[#172B1D] uppercase tracking-wider font-mono">3. Proteomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.proteomics.quality)}
                    <span className="text-[10px] font-mono text-[#64748B]">Ver: {activeProfile.proteomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-[#172B1D] text-xs">{activeProfile.proteomics.details}</p>

                {activeProfile.proteomics.available && (
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] text-xs space-y-2">
                    <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Identified Proteomic Target Pool</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProfile.proteomics.identifiedTargets.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Layer 4: Metabolomics */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                    <h3 className="font-bold text-[#172B1D] uppercase tracking-wider font-mono">4. Metabolomics Layer</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.metabolomics.quality)}
                    <span className="text-[10px] font-mono text-[#64748B]">Ver: {activeProfile.metabolomics.datasetVersion}</span>
                  </div>
                </div>

                <p className="text-[#172B1D] text-xs">{activeProfile.metabolomics.details}</p>

                {activeProfile.metabolomics.available ? (
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block mb-1.5 font-semibold">Key Metabolites</span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeProfile.metabolomics.keyMetabolites.map((m, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-3 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-xs text-[#64748B] flex items-center gap-2 font-mono">
                    <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Layer unavailable in current version. Contributes to model uncertainty evaluation.</span>
                  </div>
                )}
              </div>

              {/* Layer 5: Cellular Information */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]"></span>
                    <h3 className="font-bold text-[#172B1D] uppercase tracking-wider font-mono">5. Cellular Response Information</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {qualityBadge(activeProfile.cellular.quality)}
                    <span className="text-[10px] font-mono text-[#64748B]">Ver: {activeProfile.cellular.datasetVersion}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 pt-1">
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] font-mono block font-semibold">Cell Line / Type</span>
                    <span className="font-semibold text-[#172B1D] mt-1 block">{activeProfile.cellular.cellType}</span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] font-mono block font-semibold">Cell Viability</span>
                    <span className="font-semibold text-[#166534] mt-1 block font-mono">{activeProfile.cellular.cellViability}</span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] font-mono block font-semibold">Proliferation Rate</span>
                    <span className="font-semibold text-[#172B1D] mt-1 block">{activeProfile.cellular.cellProliferation}</span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] text-[#64748B] font-mono block font-semibold">Apoptotic Rate</span>
                    <span className="font-semibold text-[#0284C7] mt-1 block font-mono">{activeProfile.cellular.apoptosis}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
