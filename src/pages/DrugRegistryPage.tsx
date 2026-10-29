import React, { useState } from 'react';
import { 
  Pill, 
  Search, 
  Plus, 
  Edit3, 
  Archive, 
  Eye, 
  SlidersHorizontal, 
  Sparkles 
} from 'lucide-react';
import { DrugProfile, UserRole } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';
import { ChemicalStructureView } from '../components/molecular/ChemicalStructureView';
import { Modal } from '../components/common/Modal';

interface Props {
  drugs: DrugProfile[];
  onSaveDrug: (drug: DrugProfile) => void;
  onArchiveDrug: (id: string) => void;
  userRole: UserRole;
  onRunAnalysisWithDrug: (drug: DrugProfile) => void;
}

export const DrugRegistryPage: React.FC<Props> = ({
  drugs,
  onSaveDrug,
  onArchiveDrug,
  userRole,
  onRunAnalysisWithDrug
}) => {
  const [search, setSearch] = useState('');
  const [selectedDrug, setSelectedDrug] = useState<DrugProfile | null>(drugs[0] || null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [similarityTarget, setSimilarityTarget] = useState<string>('DG-001');

  // Form state for creating/editing
  const [form, setForm] = useState<Partial<DrugProfile>>({
    id: '',
    name: '',
    chemicalFormula: '',
    molecularWeight: 150,
    smiles: '',
    inchi: '',
    casNumber: '',
    knownTargets: [],
    knownProperties: {
      logP: 1.0,
      tpsa: 50,
      hbd: 2,
      hba: 3,
      rotatableBonds: 2,
      heavyAtomCount: 12,
      aromaticRings: 1
    },
    knownToxicityInfo: '',
    sourceDatabase: 'Public Research Dataset (Synthetic Demonstration)',
    functionalGroups: ['Aromatic Ring', 'Amide'],
    fingerprintBits: Array(32).fill(0).map(() => Math.round(Math.random()))
  });

  const canEdit = userRole === 'Administrator' || userRole === 'Researcher';

  const filteredDrugs = drugs.filter(d => 
    !d.isArchived && (
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.chemicalFormula.toLowerCase().includes(search.toLowerCase()) ||
      d.casNumber.toLowerCase().includes(search.toLowerCase())
    )
  );

  const handleOpenNew = () => {
    const newId = `DG-00${drugs.length + 1}`;
    setForm({
      id: newId,
      name: `Demo Candidate ${String.fromCharCode(65 + drugs.length)}`,
      chemicalFormula: 'C10H12N2O',
      molecularWeight: 176.22,
      smiles: 'CC(=O)Nc1ccc(C)cc1',
      inchi: 'InChI=1S/C10H12N2O/...',
      casNumber: `100-${Math.floor(100 + Math.random() * 900)}-${Math.floor(1 + Math.random() * 9)}`,
      knownTargets: ['COX-2 (PTGS2)', 'Albumin Binding (HSA)'],
      knownProperties: {
        logP: 1.45,
        tpsa: 38.2,
        hbd: 1,
        hba: 2,
        rotatableBonds: 2,
        heavyAtomCount: 13,
        aromaticRings: 1
      },
      knownToxicityInfo: 'Computational screen indicates low to moderate reactive metabolite signal; experimental validation required.',
      sourceDatabase: 'Public Research Dataset (Synthetic Demonstration)',
      functionalGroups: ['Aromatic Amide', 'Methyl Group'],
      fingerprintBits: Array(32).fill(0).map(() => Math.round(Math.random()))
    });
    setIsNew(true);
    setIsEditModalOpen(true);
  };

  const handleOpenEdit = (drug: DrugProfile) => {
    setForm({ ...drug });
    setIsNew(false);
    setIsEditModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.chemicalFormula) return;

    const drugToSave: DrugProfile = {
      id: form.id || `DG-00${drugs.length + 1}`,
      name: form.name,
      chemicalFormula: form.chemicalFormula,
      molecularWeight: Number(form.molecularWeight) || 150,
      smiles: form.smiles || 'C',
      inchi: form.inchi || 'InChI=1S/...',
      casNumber: form.casNumber || 'N/A',
      knownTargets: typeof form.knownTargets === 'string' 
        ? (form.knownTargets as string).split(',').map(s => s.trim()) 
        : (form.knownTargets || ['Non-specific']),
      knownProperties: form.knownProperties || {
        logP: 1.0,
        tpsa: 50,
        hbd: 2,
        hba: 3,
        rotatableBonds: 2,
        heavyAtomCount: 12,
        aromaticRings: 1
      },
      knownToxicityInfo: form.knownToxicityInfo || 'No preliminary risk signal registered.',
      sourceDatabase: form.sourceDatabase || 'Public Research Dataset',
      functionalGroups: typeof form.functionalGroups === 'string'
        ? (form.functionalGroups as string).split(',').map(s => s.trim())
        : (form.functionalGroups || ['Aromatic']),
      fingerprintBits: form.fingerprintBits || Array(32).fill(0).map(() => Math.round(Math.random())),
      createdAt: form.createdAt || new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    onSaveDrug(drugToSave);
    setSelectedDrug(drugToSave);
    setIsEditModalOpen(false);
  };

  // Compute simulated Tanimoto molecular similarity between 32-bit fingerprints
  const calculateSimulatedSimilarity = (fp1: number[], fp2: number[]) => {
    if (!fp1 || !fp2 || fp1.length !== fp2.length) return 0.5;
    let both = 0;
    let either = 0;
    for (let i = 0; i < fp1.length; i++) {
      if (fp1[i] === 1 && fp2[i] === 1) both++;
      if (fp1[i] === 1 || fp2[i] === 1) either++;
    }
    return either === 0 ? 1 : +(both / either).toFixed(2);
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <Pill className="w-5 h-5" />
              </div>
              Drug Registry &amp; Molecular Intelligence
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Standardized chemical inventory, simulated molecular fingerprints, and known pharmacophore profiles.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {canEdit && (
            <button
              onClick={handleOpenNew}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Register Compound</span>
            </button>
          )}
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Main Grid: Left List, Right Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Drug List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-3 shadow-xs">
            <div className="relative">
              <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, ID, formula, CAS..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] placeholder-[#64748B] focus:outline-hidden focus:border-[#16A34A] font-mono transition-colors"
              />
            </div>
          </div>

          <div className="space-y-2.5">
            {filteredDrugs.map(drug => {
              const isSelected = selectedDrug?.id === drug.id;
              return (
                <div
                  key={drug.id}
                  onClick={() => setSelectedDrug(drug)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
                    isSelected
                      ? 'bg-[#F0FDF4] border-[#16A34A] ring-1 ring-[#16A34A]/30'
                      : 'bg-white border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-[#172B1D]">{drug.name}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-semibold">
                          {drug.id}
                        </span>
                      </div>
                      <div className="text-[11px] font-mono text-[#64748B] mt-1 flex items-center gap-2">
                        <span className="text-[#172B1D] font-semibold">{drug.chemicalFormula}</span>
                        <span>•</span>
                        <span>{drug.molecularWeight} g/mol</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#64748B] bg-[#F7FAF7] px-2 py-0.5 rounded border border-[#E2E8F0]">
                      CAS: {drug.casNumber}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#64748B] border-t border-[#E2E8F0] pt-2.5">
                    <span className="truncate max-w-[200px] text-[#64748B]">
                      Targets: <span className="text-[#172B1D] font-medium">{drug.knownTargets.join(', ')}</span>
                    </span>
                    <span className="text-[#16A34A] font-semibold flex items-center gap-1 font-mono text-[10px]">
                      <Eye className="w-3 h-3" />
                      <span>Inspect</span>
                    </span>
                  </div>
                </div>
              );
            })}

            {filteredDrugs.length === 0 && (
              <div className="p-8 text-center text-xs text-[#64748B] bg-white border border-[#E2E8F0] rounded-xl font-mono">
                No compounds found matching &quot;{search}&quot;.
              </div>
            )}
          </div>
        </div>

        {/* Drug Details & Molecular Intelligence (7 cols) */}
        <div className="lg:col-span-7">
          {selectedDrug ? (
            <div className="space-y-4">
              {/* Top Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-bold text-[#172B1D]">{selectedDrug.name}</h2>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-bold">
                        {selectedDrug.id}
                      </span>
                    </div>
                    <div className="text-xs text-[#64748B] font-mono mt-1">
                      Formula: <strong className="text-[#172B1D]">{selectedDrug.chemicalFormula}</strong> | Mass: <strong className="text-[#0284C7]">{selectedDrug.molecularWeight} g/mol</strong> | CAS: <strong className="text-[#172B1D]">{selectedDrug.casNumber}</strong>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onRunAnalysisWithDrug(selectedDrug)}
                      className="px-3.5 py-1.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Analyze with Profile</span>
                    </button>
                    {canEdit && (
                      <>
                        <button
                          onClick={() => handleOpenEdit(selectedDrug)}
                          className="p-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F0FDF4] text-[#64748B] hover:text-[#172B1D] text-xs transition-colors cursor-pointer shadow-xs"
                          title="Edit compound"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onArchiveDrug(selectedDrug.id)}
                          className="p-2 rounded-lg border border-[#E2E8F0] hover:bg-rose-50 text-rose-600 text-xs transition-colors cursor-pointer shadow-xs"
                          title="Archive compound"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Primary Identifiers */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3.5 border-b border-[#E2E8F0] text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Canonical SMILES</span>
                    <span className="font-mono text-[#166534] break-all select-all text-[11px] bg-[#F7FAF7] p-2 rounded-lg border border-[#E2E8F0] block mt-1 font-semibold">
                      {selectedDrug.smiles}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Standard InChI</span>
                    <span className="font-mono text-[#172B1D] break-all select-all text-[11px] bg-[#F7FAF7] p-2 rounded-lg border border-[#E2E8F0] block mt-1 font-semibold">
                      {selectedDrug.inchi}
                    </span>
                  </div>
                </div>

                {/* Known Toxicity & Targets */}
                <div className="py-3.5 border-b border-[#E2E8F0] text-xs space-y-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1 font-mono">
                      Reported Mechanistic &amp; Toxicity Information
                    </span>
                    <p className="text-[#172B1D] bg-[#F7FAF7] p-3 rounded-lg border border-[#E2E8F0] text-xs leading-relaxed">
                      {selectedDrug.knownToxicityInfo}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] block mb-1 font-mono">
                      Reported Target Interactions
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedDrug.knownTargets.map((t, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-semibold">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-[#64748B] font-mono flex items-center justify-between">
                  <span>Source: <strong className="text-[#172B1D]">{selectedDrug.sourceDatabase}</strong></span>
                  <span>Registered: <strong className="text-[#172B1D]">{selectedDrug.createdAt}</strong></span>
                </div>
              </div>

              {/* Chemical Structure & Descriptors View */}
              <ChemicalStructureView drug={selectedDrug} />

              {/* Molecular Similarity Sandbox */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0] mb-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-[#16A34A]" />
                    <h4 className="font-bold text-[#172B1D] uppercase tracking-wider text-xs font-mono">
                      Simulated Tanimoto Molecular Similarity Screen
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-[#64748B]">ECFP4 Bit Sim</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F7FAF7] p-3 rounded-lg border border-[#E2E8F0]">
                  <div className="text-[#172B1D]">
                    Compare <strong className="text-[#166534]">{selectedDrug.name}</strong> against:
                  </div>
                  <div className="flex items-center gap-2">
                    <select
                      value={similarityTarget}
                      onChange={e => setSimilarityTarget(e.target.value)}
                      className="px-2.5 py-1.5 text-xs bg-white border border-[#E2E8F0] rounded-lg font-mono text-[#172B1D] shadow-xs"
                    >
                      {drugs.filter(d => d.id !== selectedDrug.id).map(d => (
                        <option key={d.id} value={d.id}>
                          {d.id} - {d.name}
                        </option>
                      ))}
                    </select>
                    {(() => {
                      const other = drugs.find(d => d.id === similarityTarget);
                      if (!other) return null;
                      const score = calculateSimulatedSimilarity(selectedDrug.fingerprintBits, other.fingerprintBits);
                      return (
                        <div className="px-3 py-1.5 rounded-lg bg-[#DCFCE7] text-[#166534] font-mono font-bold text-xs border border-[#86EFAC]">
                          Tanimoto: {(score * 100).toFixed(0)}%
                        </div>
                      );
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#64748B] bg-white border border-[#E2E8F0] rounded-xl font-mono">
              Select a compound from the left to view molecular intelligence.
            </div>
          )}
        </div>
      </div>

      {/* Edit/Create Compound Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={isNew ? 'Register New Compound Profile' : `Edit Compound: ${form.name}`}
        subtitle="Provide chemical formula, SMILES, and known mechanistic properties"
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Compound ID</label>
              <input
                type="text"
                value={form.id || ''}
                onChange={e => setForm({ ...form, id: e.target.value })}
                required
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Compound Name</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
                placeholder="e.g. Demo Compound A"
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Chemical Formula</label>
              <input
                type="text"
                value={form.chemicalFormula || ''}
                onChange={e => setForm({ ...form, chemicalFormula: e.target.value })}
                required
                placeholder="e.g. C8H9NO2"
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Molecular Weight</label>
              <input
                type="number"
                step="0.01"
                value={form.molecularWeight || 0}
                onChange={e => setForm({ ...form, molecularWeight: parseFloat(e.target.value) })}
                required
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">CAS Number</label>
              <input
                type="text"
                value={form.casNumber || ''}
                onChange={e => setForm({ ...form, casNumber: e.target.value })}
                placeholder="e.g. 103-90-2"
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Canonical SMILES</label>
            <input
              type="text"
              value={form.smiles || ''}
              onChange={e => setForm({ ...form, smiles: e.target.value })}
              placeholder="e.g. CC(=O)Nc1ccc(O)cc1"
              className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono text-xs focus:border-[#16A34A] focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">LogP</label>
              <input
                type="number"
                step="0.01"
                value={form.knownProperties?.logP || 0}
                onChange={e => setForm({
                  ...form,
                  knownProperties: { ...form.knownProperties!, logP: parseFloat(e.target.value) }
                })}
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">TPSA (Å²)</label>
              <input
                type="number"
                step="0.1"
                value={form.knownProperties?.tpsa || 0}
                onChange={e => setForm({
                  ...form,
                  knownProperties: { ...form.knownProperties!, tpsa: parseFloat(e.target.value) }
                })}
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Rotatable Bonds</label>
              <input
                type="number"
                value={form.knownProperties?.rotatableBonds || 0}
                onChange={e => setForm({
                  ...form,
                  knownProperties: { ...form.knownProperties!, rotatableBonds: parseInt(e.target.value) }
                })}
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Known Targets (Comma-separated)</label>
            <input
              type="text"
              value={Array.isArray(form.knownTargets) ? form.knownTargets.join(', ') : (form.knownTargets || '')}
              onChange={e => setForm({ ...form, knownTargets: e.target.value as any })}
              placeholder="e.g. COX-2 (PTGS2), CYP2E1"
              className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] focus:border-[#16A34A] focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Known Toxicity / ADME Mechanism Notes</label>
            <textarea
              rows={2}
              value={form.knownToxicityInfo || ''}
              onChange={e => setForm({ ...form, knownToxicityInfo: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] focus:border-[#16A34A] focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F0FDF4] text-[#172B1D] font-medium cursor-pointer shadow-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold shadow-xs cursor-pointer"
            >
              Save Compound Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
