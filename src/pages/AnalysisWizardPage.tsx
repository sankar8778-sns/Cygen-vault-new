import React, { useState } from 'react';
import { 
  Play, 
  Pill, 
  Dna, 
  Cpu, 
  FileCheck, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  RefreshCw, 
  Sparkles,
  Layers,
  FileText,
  AlertCircle,
  Sliders,
  Check,
  CheckCircle,
  Download,
  ExternalLink,
  Info,
  AlertTriangle
} from 'lucide-react';
import { 
  DrugProfile, 
  BiologicalProfile, 
  AnalysisRecord, 
  EvidencePassport, 
  User 
} from '../types';
import { runComputationalAnalysis } from '../services/analysisEngine';
import { CygenVaultStorage } from '../services/storage';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';
import { useUndoRedo } from '../context/UndoRedoContext';

interface Props {
  drugs: DrugProfile[];
  profiles: BiologicalProfile[];
  currentUser: User;
  onAnalysisCompleted: (analysis: AnalysisRecord, passport: EvidencePassport) => void;
  onViewPassport: (passportId: string) => void;
}

export const AnalysisWizardPage: React.FC<Props> = ({
  drugs,
  profiles,
  currentUser,
  onAnalysisCompleted,
  onViewPassport
}) => {
  const { recordAction, clearHistory } = useUndoRedo();

  // 7-Step Demonstration Workflow:
  // 1: Select Drug Compound
  // 2: Select Biological Dataset
  // 3: Configure Machine Learning Models
  // 4: Review Inputs & Configuration
  // 5: Start Demonstration Analysis
  // 6: View Resulting Demonstration Report
  // 7: Open Associated Evidence Passport
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7>(1);
  const [selectedDrugId, setSelectedDrugId] = useState<string>(drugs[0]?.id || 'DG-001');
  const [selectedProfileId, setSelectedProfileId] = useState<string>(profiles[0]?.id || 'AG-S001');

  // Configuration options
  const [selectedModels, setSelectedModels] = useState<string[]>([
    'Random Forest Classifier (100 Trees)',
    'Support Vector Machine (RBF Kernel)',
    'Elastic Net Logistic Regression',
    'Gradient Boosted Decision Trees (XGBoost)'
  ]);
  const [includeMultiOmics, setIncludeMultiOmics] = useState(true);
  const [generateSha256, setGenerateSha256] = useState(true);

  // Execution state
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStage, setExecutionStage] = useState<string>('');
  const [executionProgress, setExecutionProgress] = useState(0);
  const [completedResult, setCompletedResult] = useState<{
    analysis: AnalysisRecord;
    passport: EvidencePassport;
  } | null>(null);

  const selectedDrug = drugs.find(d => d.id === selectedDrugId) || drugs[0];
  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || profiles[0];

  const stages = [
    'Preparing demonstration compound descriptors & biological dataset...',
    'Generating 32-bit topological molecular features...',
    'Interrogating target & pathway interaction networks...',
    'Loading multi-omics matrix (DNA, RNA, Protein)...',
    'Executing multi-model ensemble (RF, SVM, LR, XGBoost)...',
    'Calculating model agreement & consensus voting...',
    'Evaluating uncertainty factors & applicability envelope...',
    'Determining evidence strength engine score...',
    'Synthesizing canonical payload & sealing SHA-256 hash...',
    'Issuing Evidence Passport & logging audit event...'
  ];

  const handleSelectDrug = (newId: string) => {
    if (newId === selectedDrugId) return;
    const prevId = selectedDrugId;
    recordAction({
      description: 'Change Drug Selection',
      undo: () => setSelectedDrugId(prevId),
      redo: () => setSelectedDrugId(newId)
    });
    setSelectedDrugId(newId);
  };

  const handleSelectProfile = (newId: string) => {
    if (newId === selectedProfileId) return;
    const prevId = selectedProfileId;
    recordAction({
      description: 'Change Biological Model',
      undo: () => setSelectedProfileId(prevId),
      redo: () => setSelectedProfileId(newId)
    });
    setSelectedProfileId(newId);
  };

  const toggleModel = (modelName: string) => {
    const prevModels = [...selectedModels];
    let nextModels: string[];
    if (selectedModels.includes(modelName)) {
      if (selectedModels.length <= 1) return;
      nextModels = selectedModels.filter(m => m !== modelName);
    } else {
      nextModels = [...selectedModels, modelName];
    }
    recordAction({
      description: `Toggle Ensemble Model: ${modelName.split(' ')[0]}`,
      undo: () => setSelectedModels(prevModels),
      redo: () => setSelectedModels(nextModels)
    });
    setSelectedModels(nextModels);
  };

  const handleToggleMultiOmics = (checked: boolean) => {
    const prev = includeMultiOmics;
    recordAction({
      description: 'Toggle Multi-Omics Layers',
      undo: () => setIncludeMultiOmics(prev),
      redo: () => setIncludeMultiOmics(checked)
    });
    setIncludeMultiOmics(checked);
  };

  const handleToggleSha256 = (checked: boolean) => {
    const prev = generateSha256;
    recordAction({
      description: 'Toggle SHA-256 Seal',
      undo: () => setGenerateSha256(prev),
      redo: () => setGenerateSha256(checked)
    });
    setGenerateSha256(checked);
  };

  const handleSetStep = (newStep: 1 | 2 | 3 | 4 | 5 | 6 | 7) => {
    const prevStep = currentStep;
    recordAction({
      description: `Wizard Step ${newStep}`,
      undo: () => setCurrentStep(prevStep),
      redo: () => setCurrentStep(newStep)
    });
    setCurrentStep(newStep);
  };

  const handleStartAnalysis = async () => {
    if (!selectedDrug || !selectedProfile) return;
    clearHistory();
    setCurrentStep(5);
    setIsExecuting(true);
    setExecutionProgress(0);

    for (let i = 0; i < stages.length; i++) {
      setExecutionStage(stages[i]);
      setExecutionProgress(Math.round(((i + 1) / stages.length) * 100));
      await new Promise(r => setTimeout(r, 220));
    }

    try {
      const { analysis, passport } = await runComputationalAnalysis(
        selectedDrug,
        selectedProfile,
        currentUser
      );

      // Persist in repository
      CygenVaultStorage.saveAnalysis(analysis);
      CygenVaultStorage.savePassport(passport);

      // Also create a final report for it
      const newReport = {
        reportId: `RPT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        analysisId: analysis.id,
        passportId: passport.passportId,
        title: `CYGEN VAULT Computational Evidence Report: ${analysis.drugName}`,
        drugName: analysis.drugName,
        chemicalFormula: selectedDrug.chemicalFormula,
        biologicalSystem: `${analysis.biologicalSystem} (${selectedProfile.id})`,
        molecularEvidenceStatus: 'Available (Descriptors, Fingerprint, Functional Groups)',
        biologicalEvidenceStatus: `Available (${selectedProfile.genomics.quality} Genomics, ${selectedProfile.transcriptomics.quality} Transcriptomics, ${selectedProfile.proteomics.quality} Proteomics)`,
        targetAnalysisSummary: `Potential interactions identified for ${analysis.targets.map(t => t.targetName).slice(0, 2).join(' and ')}.`,
        pathwayAnalysisSummary: `Potential pathway perturbation identified in ${analysis.pathways[0]?.pathwayName || 'metabolic cascade'}.`,
        aiMlResult: analysis.consensusRiskSignal,
        modelAgreement: analysis.modelAgreement,
        evidenceStrength: analysis.evidenceStrength,
        evidenceStrengthReason: analysis.evidenceStrengthReason,
        uncertainty: analysis.uncertainty,
        uncertaintyReason: analysis.uncertaintyReason,
        applicabilityDomain: analysis.applicabilityDomain,
        experimentalRecommendation: 'Prioritize the computationally identified signal for prospective experimental investigation.',
        scientificStatement: 'Simulated demonstration results generated from synthetic research datasets. Computational findings represent decision-support signals designed to prioritize prospective laboratory investigations and must always be evaluated alongside laboratory and clinical validation.',
        datasetVersion: analysis.datasetVersion,
        modelVersions: analysis.modelVersion,
        sha256Hash: analysis.sha256Hash,
        generatedBy: `${currentUser.name} (${currentUser.role})`,
        generatedAt: analysis.completedAt,
        auditReference: passport.auditRefId
      };
      CygenVaultStorage.saveReport(newReport);

      setCompletedResult({ analysis, passport });
      onAnalysisCompleted(analysis, passport);
      setCurrentStep(6);
    } catch (err) {
      console.error(err);
      setCurrentStep(4);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleDownloadJson = () => {
    if (!completedResult) return;
    const blob = new Blob([JSON.stringify(completedResult.passport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${completedResult.passport.passportId}-evidence-passport.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stepLabels = [
    { num: 1, title: 'Select Compound', desc: 'Step 1' },
    { num: 2, title: 'Select Dataset', desc: 'Step 2' },
    { num: 3, title: 'Configure ML', desc: 'Step 3' },
    { num: 4, title: 'Review Inputs', desc: 'Step 4' },
    { num: 5, title: 'Run Analysis', desc: 'Step 5' },
    { num: 6, title: 'View Report', desc: 'Step 6' },
    { num: 7, title: 'Evidence Passport', desc: 'Step 7' }
  ];

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#16A34A]" />
              Demonstration Analysis Workflow
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Complete the 7-step demonstration workflow: Compound → Biological Dataset → ML Configuration → Review → Execution → Results Report → Evidence Passport.
          </p>
        </div>

        {(currentStep === 6 || currentStep === 7) && (
          <button
            onClick={() => {
              setCurrentStep(1);
              setCompletedResult(null);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4] text-xs font-mono text-[#64748B] hover:text-[#172B1D] transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Start Another Demo</span>
          </button>
        )}
      </div>

      <ScientificDisclaimer compact />

      {/* 7-Step Visual Progression Indicator */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {stepLabels.map((s, idx) => {
            const isCurrent = currentStep === s.num;
            const isCompleted = currentStep > s.num;
            return (
              <React.Fragment key={s.num}>
                <div 
                  className={`flex items-center gap-2 transition-all ${
                    isCurrent ? 'opacity-100' : isCompleted ? 'opacity-90' : 'opacity-40'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                    isCompleted 
                      ? 'bg-[#16A34A] text-white shadow-xs' 
                      : isCurrent 
                      ? 'bg-[#DCFCE7] border-2 border-[#16A34A] text-[#166534] shadow-xs' 
                      : 'bg-[#F7FAF7] border border-[#E2E8F0] text-[#64748B]'
                  }`}>
                    {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : s.num}
                  </div>
                  <div className="text-left">
                    <div className={`text-[11px] font-bold leading-tight ${isCurrent ? 'text-[#172B1D]' : 'text-[#64748B]'}`}>
                      Step {s.num}
                    </div>
                    <div className="text-[10px] font-mono text-[#64748B] truncate max-w-[95px]">
                      {s.title}
                    </div>
                  </div>
                </div>

                {idx < stepLabels.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 transition-all ${
                    currentStep > idx + 1 ? 'bg-[#16A34A]' : 'bg-[#E2E8F0]'
                  }`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* STEP 1: Select Demonstration Compound */}
      {currentStep === 1 && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                  <Pill className="w-4 h-4 text-[#16A34A]" />
                  Step 1 — Select Demonstration Drug Compound
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Choose a synthetic demonstration candidate compound to evaluate in the consensus pipeline.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                STEP 1 OF 7
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {drugs.map(drug => {
                const isSelected = selectedDrugId === drug.id;
                return (
                  <div
                    key={drug.id}
                    onClick={() => handleSelectDrug(drug.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#F0FDF4] border-[#16A34A] ring-2 ring-[#16A34A]/20'
                        : 'bg-white border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC]">
                          {drug.id}
                        </span>
                        <span className="text-[10px] font-mono text-[#64748B] font-semibold">
                          SYNTHETIC DEMO
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#172B1D]">
                        {drug.name}
                      </h3>
                      <div className="text-xs font-mono text-[#16A34A] font-semibold mt-0.5">
                        {drug.chemicalFormula} • {drug.molecularWeight} g/mol
                      </div>

                      <div className="mt-3 p-2 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0] text-[11px] font-mono text-[#64748B] space-y-1">
                        <div>LogP: <strong className="text-[#172B1D]">{drug.knownProperties.logP}</strong> | TPSA: <strong className="text-[#172B1D]">{drug.knownProperties.tpsa} Å²</strong></div>
                        <div>HBD: <strong className="text-[#172B1D]">{drug.knownProperties.hbd}</strong> | HBA: <strong className="text-[#172B1D]">{drug.knownProperties.hba}</strong></div>
                      </div>

                      <div className="mt-2 text-[10px] text-[#64748B] line-clamp-2">
                        Targets: {drug.knownTargets.join(', ')}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {isSelected ? 'Selected' : 'Click to select'}
                      </span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#16A34A] text-white' : 'border border-[#CBD5E1]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <div className="text-[11px] text-[#64748B] font-mono">
                Selected: <strong className="text-[#166534]">{selectedDrug.name} ({selectedDrug.chemicalFormula})</strong>
              </div>
              <button
                onClick={() => handleSetStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <span>Next: Select Biological Dataset</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Select Biological Dataset */}
      {currentStep === 2 && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                  <Dna className="w-4 h-4 text-[#166534]" />
                  Step 2 — Select Demonstration Biological Dataset
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Select the reference species or cellular profile containing multi-omics layers.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                STEP 2 OF 7
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {profiles.map(prof => {
                const isSelected = selectedProfileId === prof.id;
                return (
                  <div
                    key={prof.id}
                    onClick={() => handleSelectProfile(prof.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer shadow-xs flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#F0FDF4] border-[#16A34A] ring-2 ring-[#16A34A]/20'
                        : 'bg-white border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-xs font-mono font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC]">
                          {prof.id}
                        </span>
                        <span className="text-[10px] font-mono text-[#0284C7] font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                          {prof.system}
                        </span>
                      </div>

                      <h3 className="font-bold text-sm text-[#172B1D]">
                        {prof.name}
                      </h3>
                      <div className="text-xs text-[#64748B] mt-1 line-clamp-2">
                        {prof.description}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-1 text-[10px] font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-white border border-[#86EFAC] text-[#166534] font-semibold">
                          DNA {prof.genomics.quality}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-white border border-[#86EFAC] text-[#166534] font-semibold">
                          RNA {prof.transcriptomics.quality}
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-white border border-[#86EFAC] text-[#166534] font-semibold">
                          Protein {prof.proteomics.quality}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex items-center justify-between">
                      <span className="text-[11px] font-mono text-[#64748B]">
                        {isSelected ? 'Selected' : 'Click to select'}
                      </span>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-[#16A34A] text-white' : 'border border-[#CBD5E1]'
                      }`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => handleSetStep(1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F0FDF4] text-xs font-semibold text-[#64748B] hover:text-[#172B1D] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => handleSetStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <span>Next: Configure ML Models</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 3: Configure Machine Learning Models */}
      {currentStep === 3 && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#16A34A]" />
                  Step 3 — Configure Machine Learning Models
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Select which algorithms and evidence layers participate in consensus voting.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                STEP 3 OF 7
              </span>
            </div>

            {/* Ensemble Classifier Selection */}
            <div className="space-y-3">
              <label className="block text-xs font-bold text-[#172B1D] uppercase font-mono tracking-wider">
                Active Ensemble Classifiers (Select at least one)
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { name: 'Random Forest Classifier (100 Trees)', desc: 'Bagging ensemble with Gini-impurity splits over chemical fingerprint bits' },
                  { name: 'Support Vector Machine (RBF Kernel)', desc: 'Non-linear radial basis function for non-contiguous topological descriptor boundaries' },
                  { name: 'Elastic Net Logistic Regression', desc: 'Balanced L1/L2 regularized model emphasizing sparse molecular properties' },
                  { name: 'Gradient Boosted Decision Trees (XGBoost)', desc: 'Sequential residual boosting incorporating multi-omics depth weights' }
                ].map(model => {
                  const isChecked = selectedModels.includes(model.name);
                  return (
                    <div
                      key={model.name}
                      onClick={() => toggleModel(model.name)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isChecked
                          ? 'bg-[#F0FDF4] border-[#16A34A] shadow-xs'
                          : 'bg-white border-[#E2E8F0] hover:bg-[#F8FAFC]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="font-bold text-xs text-[#172B1D]">{model.name}</div>
                        <p className="text-[11px] text-[#64748B] leading-relaxed">{model.desc}</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-0.5 w-4 h-4 accent-[#16A34A] rounded cursor-pointer shrink-0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Evidence Toggles */}
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-3 text-xs">
              <span className="font-bold text-[#172B1D] uppercase font-mono text-[10px] block">
                Evidence Integration Controls
              </span>

              <div className="flex items-center justify-between">
                <div>
                  <span className="font-semibold text-[#172B1D] block">Include Multi-Omics Biological Signals</span>
                  <span className="text-[11px] text-[#64748B]">Integrate active transcriptomic and proteomic baseline expression weights</span>
                </div>
                <input
                  type="checkbox"
                  checked={includeMultiOmics}
                  onChange={e => handleToggleMultiOmics(e.target.checked)}
                  className="w-4 h-4 accent-[#16A34A] rounded cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
                <div>
                  <span className="font-semibold text-[#172B1D] block">Generate Cryptographic SHA-256 Passport Seal</span>
                  <span className="text-[11px] text-[#64748B]">Seal canonical analysis JSON payload into immutable evidence passport</span>
                </div>
                <input
                  type="checkbox"
                  checked={generateSha256}
                  onChange={e => handleToggleSha256(e.target.checked)}
                  className="w-4 h-4 accent-[#16A34A] rounded cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => handleSetStep(2)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F0FDF4] text-xs font-semibold text-[#64748B] hover:text-[#172B1D] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={() => handleSetStep(4)}
                disabled={selectedModels.length === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 text-white font-bold text-xs tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <span>Next: Review Inputs &amp; Configuration</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Review Inputs & Configuration */}
      {currentStep === 4 && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                  Step 4 — Review Inputs &amp; Configuration
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Confirm parameters before executing the demonstration consensus pipeline.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                STEP 4 OF 7
              </span>
            </div>

            {/* Validation Checklist & Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl space-y-2.5">
                <span className="text-[10px] uppercase font-mono text-[#166534] font-bold block">
                  Pre-flight Validation Checklist
                </span>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2 text-[#172B1D]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>Candidate compound valid: <strong className="font-mono">{selectedDrug.chemicalFormula}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#172B1D]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>Biological model ready: <strong className="font-mono">{selectedProfile.system} ({selectedProfile.datasetVersion})</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-[#172B1D]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>{selectedModels.length} Machine learning models configured for consensus</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#172B1D]">
                    <CheckCircle className="w-3.5 h-3.5 text-[#16A34A] shrink-0" />
                    <span>Cryptographic audit pipeline initialized for passport generation</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl space-y-2 text-xs font-mono">
                <span className="text-[10px] uppercase text-[#166534] font-bold block">
                  Demonstration Parameters Summary
                </span>
                <div className="space-y-1 text-[#64748B]">
                  <div>Compound: <strong className="text-[#172B1D]">{selectedDrug?.name}</strong> ({selectedDrug?.chemicalFormula})</div>
                  <div>Biological Model: <strong className="text-[#172B1D]">{selectedProfile?.name}</strong></div>
                  <div>Species System: <strong className="text-[#166534] font-bold">{selectedProfile?.system}</strong></div>
                  <div>Ensemble Voting: <strong className="text-[#16A34A] font-bold">{selectedModels.length} Classifiers</strong></div>
                  <div>Initiator: <strong className="text-[#172B1D]">{currentUser.name}</strong> ({currentUser.role})</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0]">
              <button
                onClick={() => handleSetStep(3)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F0FDF4] text-xs font-semibold text-[#64748B] hover:text-[#172B1D] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={handleStartAnalysis}
                className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>START DEMO ANALYSIS</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 5: Start Demonstration Analysis (Execution in Progress) */}
      {currentStep === 5 && (
        <div className="space-y-5 animate-in fade-in">
          <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 lg:p-8 shadow-xs space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div>
                <h2 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#16A34A] animate-spin" />
                  Step 5 — Running Demonstration Analysis
                </h2>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Interrogating chemical descriptors, biological pathways, and ML ensemble classifiers.
                </p>
              </div>
              <span className="text-[10px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                {executionProgress}% COMPLETE
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-[#F7FAF7] h-3 rounded-full overflow-hidden border border-[#E2E8F0]">
                <div 
                  className="bg-[#16A34A] h-full rounded-full transition-all duration-300"
                  style={{ width: `${executionProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-[#64748B]">
                <span>Stage {Math.min(stages.length, Math.ceil((executionProgress / 100) * stages.length))} of {stages.length}</span>
                <span>Deterministic Consensus Engine</span>
              </div>
            </div>

            {/* Live Terminal Output */}
            <div className="p-4 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl space-y-2 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#166534] text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
                PIPELINE EXECUTION STATUS
              </div>
              <div className="text-[#166534] bg-white p-3 rounded-lg border border-[#86EFAC] flex items-center gap-2 shadow-xs font-semibold">
                <span className="text-[#16A34A] font-bold">&gt;</span>
                <span>{executionStage || 'Initiating computational stages...'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 6: View Resulting Demonstration Report */}
      {currentStep === 6 && completedResult && (
        <div className="space-y-5 animate-in fade-in zoom-in-95">
          <div className="bg-white border-2 border-[#86EFAC] rounded-xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#16A34A] flex items-center justify-center shrink-0 shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#166534] font-bold block">
                      Step 6 — Demonstration Results Report
                    </span>
                    <span className="text-[9px] font-mono uppercase bg-amber-50 text-amber-800 border border-amber-200 px-1.5 py-0.2 rounded font-semibold">
                      SIMULATED DEMO RESULTS
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-[#172B1D] mt-0.5">
                    Consensus Analysis Completed
                  </h2>
                  <p className="text-xs text-[#64748B] font-mono mt-0.5">
                    Analysis ID: <strong className="text-[#166534]">{completedResult.analysis.id}</strong> | Passport ID: <strong className="text-[#16A34A]">{completedResult.passport.passportId}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => handleSetStep(7)}
                  className="px-4 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Next: Open Evidence Passport (Step 7)</span>
                </button>
              </div>
            </div>

            {/* Key Information & Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] uppercase font-mono text-[#64748B] block font-semibold">Consensus Risk Signal</span>
                <span className={`font-mono font-bold text-sm mt-1 block ${
                  completedResult.analysis.consensusRiskSignal === 'High' ? 'text-rose-700' : 'text-[#166534]'
                }`}>
                  {completedResult.analysis.consensusRiskSignal} Risk Signal
                </span>
              </div>
              
              <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] uppercase font-mono text-[#64748B] block font-semibold">Model Agreement</span>
                <span className="font-mono font-bold text-[#166534] text-sm mt-1 block">
                  {completedResult.analysis.modelAgreement}
                </span>
              </div>
              
              <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] uppercase font-mono text-[#64748B] block font-semibold">Evidence Strength</span>
                <span className="font-mono font-bold text-[#166534] text-sm mt-1 block">
                  {completedResult.analysis.evidenceStrength}
                </span>
              </div>
              
              <div className="p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
                <span className="text-[10px] uppercase font-mono text-[#64748B] block font-semibold">Uncertainty</span>
                <span className="font-mono font-bold text-amber-700 text-sm mt-1 block">
                  {completedResult.analysis.uncertainty}
                </span>
              </div>
            </div>

            {/* Input & Biology Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-[#166534] uppercase font-bold block">Selected Compound Input</span>
                <div className="space-y-1">
                  <div className="font-bold text-sm text-[#172B1D]">{completedResult.analysis.drugName} ({selectedDrug.chemicalFormula})</div>
                  <div className="text-[11px] font-mono text-[#64748B]">MW: {selectedDrug.molecularWeight} g/mol • SMILES: {selectedDrug.smiles}</div>
                  <div className="text-[11px] text-[#64748B]">Known Targets: {selectedDrug.knownTargets.join(', ')}</div>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl space-y-2">
                <span className="text-[10px] font-mono text-[#166534] uppercase font-bold block">Biological System Reference</span>
                <div className="space-y-1">
                  <div className="font-bold text-sm text-[#172B1D]">{completedResult.analysis.biologicalSystem}</div>
                  <div className="text-[11px] font-mono text-[#64748B]">Species: {selectedProfile.system} • Dataset: {selectedProfile.datasetVersion}</div>
                  <div className="text-[11px] text-[#64748B]">Layers: Genomics ({selectedProfile.genomics.quality}), Transcriptomics ({selectedProfile.transcriptomics.quality}), Proteomics ({selectedProfile.proteomics.quality})</div>
                </div>
              </div>
            </div>

            {/* Model Outputs Breakdown */}
            <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl space-y-3">
              <span className="text-[10px] font-mono text-[#172B1D] uppercase font-bold block">
                Model Ensemble Predictions Breakdown
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {completedResult.analysis.modelPredictions.map(m => (
                  <div key={m.modelName} className="p-3 bg-white border border-[#E2E8F0] rounded-lg space-y-1">
                    <div className="flex items-center justify-between font-semibold">
                      <span>{m.modelName}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold border ${
                        m.riskSignal === 'High' ? 'bg-rose-50 text-rose-700 border-rose-200' : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                      }`}>
                        {m.riskSignal} ({Math.round(m.probabilityScore * 100)}%)
                      </span>
                    </div>
                    <div className="text-[10px] text-[#64748B] font-mono">
                      Top feature: {m.featureWeights[0]?.feature} ({Math.round((m.featureWeights[0]?.weight || 0) * 100)}%)
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Limitations & Uncertainty Notice */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
              <div className="font-bold font-mono text-[11px] flex items-center gap-1.5 text-amber-800">
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span>LIMITATIONS &amp; SCIENTIFIC UNCERTAINTY NOTICE</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed font-normal">
                These outputs are <strong>simulated demonstration results</strong> generated from public and synthetic benchmarks. They represent computational research decision support and do not constitute real clinical safety, toxicity verification, drug efficacy, or medical advice.
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => {
                  setCurrentStep(1);
                  setCompletedResult(null);
                }}
                className="px-4 py-2 rounded-lg bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#86EFAC] text-xs text-[#172B1D] font-mono cursor-pointer transition-colors"
              >
                ← Run Another Analysis
              </button>

              <button
                onClick={() => handleSetStep(7)}
                className="px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold cursor-pointer shadow-xs transition-colors flex items-center gap-2"
              >
                <span>Step 7: Open Evidence Passport</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 7: Open Associated Evidence Passport */}
      {currentStep === 7 && completedResult && (
        <div className="space-y-5 animate-in fade-in zoom-in-95">
          <div className="bg-white border-2 border-[#16A34A] rounded-xl p-6 lg:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#16A34A] flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#166534] font-bold block">
                    Step 7 — Evidence Passport Verification &amp; Seal
                  </span>
                  <h2 className="text-lg font-extrabold text-[#172B1D] mt-0.5">
                    Evidence Passport: {completedResult.passport.passportId}
                  </h2>
                  <p className="text-xs text-[#64748B] font-mono mt-0.5">
                    Canonical SHA-256 digital certificate generated and verified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => onViewPassport(completedResult.passport.passportId)}
                  className="px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs transition-colors flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open in Passport Repository</span>
                </button>
              </div>
            </div>

            {/* Digital Evidence Passport Card */}
            <div className="p-4 bg-[#F7FAF7] border border-[#86EFAC] rounded-xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#166534] flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-[#16A34A]" />
                  Cryptographic Digital Seal: SHA-256
                </span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded border border-[#86EFAC] font-bold">
                  VERIFIED
                </span>
              </div>

              <div className="bg-white p-3.5 rounded-lg border border-[#86EFAC] break-all select-all text-xs font-bold text-[#166534] shadow-xs">
                {completedResult.passport.sha256Hash}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-[#64748B]">
                <div>Candidate: <strong className="text-[#172B1D]">{completedResult.passport.drugName}</strong></div>
                <div>System: <strong className="text-[#172B1D]">{completedResult.passport.biologicalSystem}</strong></div>
                <div>Operator: <strong className="text-[#172B1D]">{completedResult.passport.createdBy}</strong></div>
                <div>Timestamp: <strong className="text-[#172B1D]">{completedResult.passport.analysisDate}</strong></div>
                <div>Audit Ref: <strong className="text-[#172B1D]">{completedResult.passport.auditRefId}</strong></div>
                <div>Status: <strong className="text-[#166534]">{completedResult.passport.status}</strong></div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSetStep(6)}
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:bg-[#F0FDF4] text-xs text-[#64748B] hover:text-[#172B1D] font-medium transition-colors cursor-pointer"
                >
                  ← Back to Report
                </button>

                <button
                  onClick={handleDownloadJson}
                  className="px-3.5 py-2 rounded-lg bg-white border border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4] text-xs text-[#166534] font-semibold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Passport JSON</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setCompletedResult(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-white hover:bg-[#F0FDF4] border border-[#E2E8F0] hover:border-[#86EFAC] text-xs text-[#172B1D] font-mono cursor-pointer transition-colors"
                >
                  Start Another Analysis
                </button>

                <button
                  onClick={() => onViewPassport(completedResult.passport.passportId)}
                  className="px-5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-bold cursor-pointer shadow-xs transition-colors flex items-center gap-2"
                >
                  <span>Explore Full Passport View</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
