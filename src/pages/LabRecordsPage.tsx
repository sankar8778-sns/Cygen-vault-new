import React, { useState } from 'react';
import { 
  FlaskConical, 
  Dna, 
  Plus, 
  CheckCircle2, 
  Microscope,
  Info
} from 'lucide-react';
import { LabRecord, UserRole } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';
import { Modal } from '../components/common/Modal';

interface Props {
  records: LabRecord[];
  onSaveRecord: (rec: LabRecord) => void;
  userRole: UserRole;
}

export const LabRecordsPage: React.FC<Props> = ({
  records,
  onSaveRecord,
  userRole
}) => {
  const [selectedRecord, setSelectedRecord] = useState<LabRecord>(records[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Record state
  const [newRec, setNewRec] = useState<Partial<LabRecord>>({
    sampleId: `AG-S00${records.length + 1}`,
    laboratory: 'AS GARDIAN',
    sampleType: 'Research Dataset',
    analysisRequested: 'DNA + RNA',
    batchId: `AG-EXT-2026-B0${records.length + 4}`,
    datasetVersion: 'v1.0',
    notes: 'Standard quality control batch passing electrophoretic and spectrophotometric gates.',
    dna: {
      status: 'Completed',
      concentration: 88.0,
      a260_a280: 1.86,
      a260_a230: 2.10,
      integrity: 'DIN 8.8',
      extractionBatch: `AG-EXT-2026-B0${records.length + 4}-DNA`,
      datasetVersion: 'v1.0'
    },
    rna: {
      status: 'Completed',
      concentration: 120.5,
      a260_a280: 2.04,
      a260_a230: 2.12,
      integrity: 'RIN 9.2',
      dnaseTreatment: 'Completed',
      extractionBatch: `AG-EXT-2026-B0${records.length + 4}-RNA`,
      datasetVersion: 'v1.0'
    }
  });

  const canCreate = userRole === 'Administrator' || userRole === 'Researcher';

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const rec: LabRecord = {
      id: `AG-LAB-2026-00${records.length + 1}`,
      sampleId: newRec.sampleId || 'AG-S001',
      laboratory: newRec.laboratory || 'AS GARDIAN',
      sampleType: newRec.sampleType || 'Research Dataset',
      analysisRequested: newRec.analysisRequested || 'DNA + RNA',
      batchId: newRec.batchId || 'AG-EXT-2026-B01',
      datasetVersion: newRec.datasetVersion || 'v1.0',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      operator: 'Dr. Evelyn Vance (Senior Laboratory Analyst)',
      dna: newRec.dna as any,
      rna: newRec.rna as any,
      notes: newRec.notes || 'Routine sample preparation.'
    };
    onSaveRecord(rec);
    setSelectedRecord(rec);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <FlaskConical className="w-5 h-5" />
              </div>
              Research Activity
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Demonstration research activity log, sample quality controls, and experimental batch records.
          </p>
        </div>

        {canCreate && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Research Activity</span>
          </button>
        )}
      </div>

      {/* Demonstration Notice */}
      <div className="p-3.5 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl text-xs text-[#166534] flex items-start gap-3 shadow-xs">
        <Info className="w-4 h-4 text-[#16A34A] shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-[#166534] font-mono">Demonstration Activity Notice: </span>
          &ldquo;Research activities displayed here represent session-level demonstration workflows and illustrative extraction records. No persistent database storage is claimed.&rdquo;
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left: Activities list (4 cols) */}
        <div className="lg:col-span-4 space-y-2.5">
          <div className="text-[11px] font-mono text-[#64748B] uppercase font-semibold px-1 flex items-center justify-between">
            <span>Research Activities ({records.length})</span>
            <span className="text-[10px] text-[#166534] font-bold">SESSION STATE</span>
          </div>
          {records.map(rec => {
            const isSelected = selectedRecord?.id === rec.id;
            return (
              <div
                key={rec.id}
                onClick={() => setSelectedRecord(rec)}
                className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-[#F0FDF4] border-[#16A34A] ring-1 ring-[#16A34A]/30'
                    : 'bg-white border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/40'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-xs text-[#172B1D]">Sample QC: {rec.sampleId}</span>
                    <div className="text-[11px] font-mono text-[#166534] mt-1 font-semibold">
                      Type: <span className="text-[#172B1D] font-normal">{rec.analysisRequested}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                    Completed
                  </span>
                </div>

                <div className="mt-3 text-[11px] text-[#64748B] flex items-center justify-between border-t border-[#E2E8F0] pt-2">
                  <span className="font-mono text-[10px]">Batch: <strong className="text-[#172B1D]">{rec.batchId}</strong></span>
                  <span className="font-mono text-[#64748B] text-[10px]">{rec.timestamp.split(' ')[0]}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detailed Research Activity Record (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {selectedRecord ? (
            <div className="space-y-4">
              {/* Main Record Header Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 border-b border-[#E2E8F0] gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#166534] uppercase tracking-wider block font-bold">
                      RESEARCH ACTIVITY DETAILS
                    </span>
                    <h2 className="text-lg font-bold text-[#172B1D] mt-0.5">
                      Activity: Biological Sample QC ({selectedRecord.sampleId})
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-3 py-1 rounded-lg font-mono">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A]" />
                      Quality Certified
                    </span>
                  </div>
                </div>


                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3.5 border-b border-[#E2E8F0] text-xs">
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Laboratory</span>
                    <span className="font-bold text-[#172B1D] text-sm mt-0.5 block">{selectedRecord.laboratory}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Sample Type</span>
                    <span className="font-bold text-[#172B1D] text-sm mt-0.5 block">{selectedRecord.sampleType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Requested Analysis</span>
                    <span className="font-bold text-[#0284C7] text-sm mt-0.5 block font-mono">{selectedRecord.analysisRequested}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Extraction Batch</span>
                    <span className="font-bold font-mono text-[#172B1D] text-sm mt-0.5 block">{selectedRecord.batchId}</span>
                  </div>
                </div>

                <div className="pt-3 text-[11px] text-[#64748B] flex flex-wrap items-center justify-between gap-2">
                  <span>Operator: <strong className="text-[#172B1D]">{selectedRecord.operator}</strong></span>
                  <span className="font-mono">Timestamp: <strong className="text-[#172B1D]">{selectedRecord.timestamp}</strong></span>
                </div>
              </div>

              {/* DNA Record Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs text-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                      <Dna className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#172B1D] text-sm">DNA Extraction &amp; Purity Record</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                    Status: {selectedRecord.dna.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">DNA Concentration</span>
                    <span className="text-lg font-bold font-mono text-[#172B1D] mt-1 block">
                      {selectedRecord.dna.concentration} <span className="text-xs text-[#64748B] font-normal">ng/μL</span>
                    </span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">A260 / A280 Purity</span>
                    <span className="text-lg font-bold font-mono text-[#166534] mt-1 block">
                      {selectedRecord.dna.a260_a280}
                    </span>
                    <span className="text-[10px] text-[#16A34A] block mt-0.5 font-mono">1.8 - 2.0 Optimal</span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">A260 / A230 Ratio</span>
                    <span className="text-lg font-bold font-mono text-[#166534] mt-1 block">
                      {selectedRecord.dna.a260_a230}
                    </span>
                    <span className="text-[10px] text-[#16A34A] block mt-0.5 font-mono">&gt; 2.0 Pure</span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">DNA Integrity</span>
                    <span className="text-lg font-bold font-mono text-[#0284C7] mt-1 block">
                      {selectedRecord.dna.integrity}
                    </span>
                    <span className="text-[10px] text-[#64748B] block mt-0.5 font-mono">Microfluidic DIN</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] font-mono text-[11px] text-[#64748B] flex items-center justify-between">
                  <span>DNA Batch: <strong className="text-[#172B1D]">{selectedRecord.dna.extractionBatch}</strong></span>
                  <span>Dataset Version: <strong className="text-[#172B1D]">{selectedRecord.dna.datasetVersion}</strong></span>
                </div>
              </div>

              {/* RNA Record Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs text-xs space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-[#E2E8F0]">
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                      <Microscope className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-[#172B1D] text-sm">RNA Extraction &amp; Purity Record</h3>
                  </div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
                    Status: {selectedRecord.rna.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">RNA Concentration</span>
                    <span className="text-lg font-bold font-mono text-[#172B1D] mt-1 block">
                      {selectedRecord.rna.concentration} <span className="text-xs text-[#64748B] font-normal">ng/μL</span>
                    </span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">A260 / A280 Purity</span>
                    <span className="text-lg font-bold font-mono text-[#166534] mt-1 block">
                      {selectedRecord.rna.a260_a280}
                    </span>
                    <span className="text-[10px] text-[#16A34A] block mt-0.5 font-mono">2.0 ± 0.1 Pure</span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">A260 / A230 Ratio</span>
                    <span className="text-lg font-bold font-mono text-[#166534] mt-1 block">
                      {selectedRecord.rna.a260_a230}
                    </span>
                    <span className="text-[10px] text-[#16A34A] block mt-0.5 font-mono">&gt; 2.0 Pure</span>
                  </div>
                  <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
                    <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">RNA Integrity</span>
                    <span className="text-lg font-bold font-mono text-[#0284C7] mt-1 block">
                      {selectedRecord.rna.integrity}
                    </span>
                    <span className="text-[10px] text-[#64748B] block mt-0.5 font-mono">Bioanalyzer RIN</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] font-mono text-[11px] text-[#64748B] flex items-center justify-between">
                  <span>DNase Treatment: <strong className="text-[#166534] font-semibold">{selectedRecord.rna.dnaseTreatment}</strong></span>
                  <span>RNA Batch: <strong className="text-[#172B1D]">{selectedRecord.rna.extractionBatch}</strong></span>
                </div>
              </div>

              {/* Lab Technician Notes */}
              <div className="p-4 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl text-xs space-y-1.5">
                <span className="font-bold text-[#64748B] uppercase tracking-wider text-[10px] block font-mono">
                  Laboratory Verification &amp; Quality Sign-Off Notes
                </span>
                <p className="text-[#172B1D] leading-relaxed">{selectedRecord.notes}</p>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-xs text-[#64748B] bg-white border border-[#E2E8F0] rounded-xl font-mono">
              Select a sample record to view extraction and purity parameters.
            </div>
          )}
        </div>
      </div>

      {/* Modal: Log New Record */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Log AS GARDIAN Molecular Sample Record"
        subtitle="Record DNA and RNA quality metrics for new biological dataset batch"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Sample ID</label>
              <input
                type="text"
                value={newRec.sampleId || ''}
                onChange={e => setNewRec({ ...newRec, sampleId: e.target.value })}
                required
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Batch ID</label>
              <input
                type="text"
                value={newRec.batchId || ''}
                onChange={e => setNewRec({ ...newRec, batchId: e.target.value })}
                required
                className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] font-mono focus:border-[#16A34A] focus:outline-hidden"
              />
            </div>
          </div>

          <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <h4 className="font-bold text-[#166534] text-xs font-mono uppercase tracking-wider">DNA Extraction Parameters</h4>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] text-[#64748B] mb-1 font-mono">DNA Conc (ng/μL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newRec.dna?.concentration || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    dna: { ...newRec.dna!, concentration: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded text-[#172B1D] font-mono shadow-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#64748B] mb-1 font-mono">A260 / A280</label>
                <input
                  type="number"
                  step="0.01"
                  value={newRec.dna?.a260_a280 || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    dna: { ...newRec.dna!, a260_a280: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded text-[#172B1D] font-mono shadow-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#64748B] mb-1 font-mono">Integrity (DIN)</label>
                <input
                  type="text"
                  value={newRec.dna?.integrity || 'DIN 8.7'}
                  onChange={e => setNewRec({
                    ...newRec,
                    dna: { ...newRec.dna!, integrity: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded text-[#172B1D] font-mono shadow-xs"
                />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0] space-y-2.5">
            <h4 className="font-bold text-[#0284C7] text-xs font-mono uppercase tracking-wider">RNA Extraction Parameters</h4>
            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[10px] text-[#64748B] mb-1 font-mono">RNA Conc (ng/μL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={newRec.rna?.concentration || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    rna: { ...newRec.rna!, concentration: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded text-[#172B1D] font-mono shadow-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#64748B] mb-1 font-mono">A260 / A280</label>
                <input
                  type="number"
                  step="0.01"
                  value={newRec.rna?.a260_a280 || 0}
                  onChange={e => setNewRec({
                    ...newRec,
                    rna: { ...newRec.rna!, a260_a280: parseFloat(e.target.value) }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded text-[#172B1D] font-mono shadow-xs"
                />
              </div>
              <div>
                <label className="block text-[10px] text-[#64748B] mb-1 font-mono">Integrity (RIN)</label>
                <input
                  type="text"
                  value={newRec.rna?.integrity || 'RIN 9.0'}
                  onChange={e => setNewRec({
                    ...newRec,
                    rna: { ...newRec.rna!, integrity: e.target.value }
                  })}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#E2E8F0] rounded text-[#172B1D] font-mono shadow-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#172B1D] mb-1 font-mono">Quality Sign-Off Notes</label>
            <textarea
              rows={2}
              value={newRec.notes || ''}
              onChange={e => setNewRec({ ...newRec, notes: e.target.value })}
              className="w-full px-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] focus:border-[#16A34A] focus:outline-hidden"
            />
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg border border-[#E2E8F0] hover:bg-[#F0FDF4] text-[#172B1D] font-medium cursor-pointer shadow-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold shadow-xs cursor-pointer"
            >
              Log Sample
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
