/**
 * CYGEN VAULT - Main Application Controller
 * Secure, Mechanism-Aware Computational Evidence Platform for Drug–Biological System Analysis
 */

import React, { useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  DrugProfile, 
  BiologicalProfile, 
  LabRecord, 
  AnalysisRecord, 
  EvidencePassport, 
  AuditLog, 
  ComputationalReport 
} from './types';
import { CygenVaultStorage } from './services/storage';

// Common Components
import { Header } from './components/common/Header';
import { Sidebar, NavTabId } from './components/common/Sidebar';
import { ToastContainer, ToastMessage } from './components/common/Toast';
import { Modal } from './components/common/Modal';
import { BottomNav } from './components/common/BottomNav';
import { useUndoRedo } from './context/UndoRedoContext';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { DrugRegistryPage } from './pages/DrugRegistryPage';
import { BiologicalProfilesPage } from './pages/BiologicalProfilesPage';
import { LabRecordsPage } from './pages/LabRecordsPage';
import { TargetPathwayPage } from './pages/TargetPathwayPage';
import { MultiOmicsPage } from './pages/MultiOmicsPage';
import { AiMlAnalysisPage } from './pages/AiMlAnalysisPage';
import { RiskEvidencePage } from './pages/RiskEvidencePage';
import { CrossSystemPage } from './pages/CrossSystemPage';
import { EvidencePassportPage } from './pages/EvidencePassportPage';
import { IntegrityVerificationPage } from './pages/IntegrityVerificationPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { AnalysisWizardPage } from './pages/AnalysisWizardPage';
import { LoginPage } from './pages/LoginPage';

export default function App() {
  const { canUndo, canRedo, undo, redo, undoDescription, redoDescription, recordAction, clearHistory } = useUndoRedo();

  // Session & Authentication
  const [currentUser, setCurrentUser] = useState<User | null>(() => CygenVaultStorage.getCurrentUser());
  const [activeTab, setActiveTab] = useState<NavTabId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // In-App Navigation History Stack for Home, Back, Forward
  const [navHistory, setNavHistory] = useState<NavTabId[]>(['dashboard']);
  const [historyIndex, setHistoryIndex] = useState<number>(0);

  // Repository States
  const [drugs, setDrugs] = useState<DrugProfile[]>(() => CygenVaultStorage.getDrugs());
  const [profiles, setProfiles] = useState<BiologicalProfile[]>(() => CygenVaultStorage.getBiologicalProfiles());
  const [labRecords, setLabRecords] = useState<LabRecord[]>(() => CygenVaultStorage.getLabRecords());
  const [analyses, setAnalyses] = useState<AnalysisRecord[]>(() => CygenVaultStorage.getAnalyses());
  const [passports, setPassports] = useState<EvidencePassport[]>(() => CygenVaultStorage.getPassports());
  const [reports, setReports] = useState<ComputationalReport[]>(() => CygenVaultStorage.getReports());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => CygenVaultStorage.getAuditLogs());

  // Navigation targets
  const [targetPassportId, setTargetPassportId] = useState<string>('EVP-2026-0001');
  const [targetReportId, setTargetReportId] = useState<string>('RPT-2026-0001');

  // Quick Register Modals
  const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);

  // Navigation Handler that maintains in-app route history
  const handleNavigate = (tab: NavTabId, passportId?: string) => {
    if (passportId) {
      setTargetPassportId(passportId);
    }
    if (tab === activeTab) return;
    const nextHistory = navHistory.slice(0, historyIndex + 1);
    nextHistory.push(tab);
    setNavHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    setActiveTab(tab);
  };

  const handleHome = () => {
    handleNavigate('dashboard');
  };

  const canGoBack = historyIndex > 0;
  const handleBack = () => {
    if (historyIndex > 0) {
      const prevIdx = historyIndex - 1;
      setHistoryIndex(prevIdx);
      setActiveTab(navHistory[prevIdx]);
    } else if (activeTab !== 'dashboard') {
      handleNavigate('dashboard');
    }
  };

  const canGoForward = historyIndex < navHistory.length - 1;
  const handleForward = () => {
    if (canGoForward) {
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setActiveTab(navHistory[nextIdx]);
    }
  };

  // New Drug Form State
  const [newDrugForm, setNewDrugForm] = useState<Partial<DrugProfile>>({
    name: 'Demo Scaffold Alpha',
    chemicalFormula: 'C12H15NO3',
    molecularWeight: 221.25,
    smiles: 'CC(=O)Oc1ccccc1C(=O)O',
    casNumber: '50-78-2',
    knownTargets: ['Cyclooxygenase-1', 'Cyclooxygenase-2'],
    knownProperties: {
      logP: 1.19,
      tpsa: 63.6,
      hbd: 1,
      hba: 4,
      rotatableBonds: 3,
      heavyAtomCount: 16,
      aromaticRings: 1
    },
    knownToxicityInfo: 'Prostaglandin synthase inhibitor with known gastric mucosal prostaglandin depletion profile.',
    sourceDatabase: 'Public Reference Dataset (Synthetic Demo)'
  });

  // Reversible Drug Form Editor with Undo/Redo registration
  const updateDrugField = <K extends keyof DrugProfile>(field: K, value: DrugProfile[K]) => {
    const prevForm = { ...newDrugForm };
    const nextForm = { ...newDrugForm, [field]: value };
    recordAction({
      description: `Edit Compound ${String(field)}`,
      undo: () => setNewDrugForm(prevForm),
      redo: () => setNewDrugForm(nextForm)
    });
    setNewDrugForm(nextForm);
  };

  // New Biological Profile Form State
  const [newBioForm, setNewBioForm] = useState<Partial<BiologicalProfile>>({
    name: 'Murine Cardiac Tissue Model',
    system: 'Rat',
    datasetVersion: 'v1.1',
    description: 'Ventricular myocyte model with annotated ion channel kinetics and baseline oxidative stress markers.'
  });

  // Reversible Biological Profile Form Editor with Undo/Redo registration
  const updateBioField = <K extends keyof BiologicalProfile>(field: K, value: BiologicalProfile[K]) => {
    const prevForm = { ...newBioForm };
    const nextForm = { ...newBioForm, [field]: value };
    recordAction({
      description: `Edit Biological Model ${String(field)}`,
      undo: () => setNewBioForm(prevForm),
      redo: () => setNewBioForm(nextForm)
    });
    setNewBioForm(nextForm);
  };

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'warning' | 'error' | 'info', title: string, message?: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Refresh state
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Refresh data from storage
  const refreshAllState = () => {
    setDrugs(CygenVaultStorage.getDrugs());
    setProfiles(CygenVaultStorage.getBiologicalProfiles());
    setLabRecords(CygenVaultStorage.getLabRecords());
    setAnalyses(CygenVaultStorage.getAnalyses());
    setPassports(CygenVaultStorage.getPassports());
    setReports(CygenVaultStorage.getReports());
    setAuditLogs(CygenVaultStorage.getAuditLogs());
  };

  // Handle Dashboard and Global Refresh
  const handleRefreshDashboard = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      refreshAllState();
      await new Promise(resolve => setTimeout(resolve, 450));
      addToast('success', 'Dashboard Refreshed', 'Synchronized live records and cryptographic verification status.');
    } catch (err) {
      addToast('error', 'Refresh Failed', 'Unable to refresh dashboard records.');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Handle Login
  const handleLogin = (user: User) => {
    setCurrentUser(user);
    CygenVaultStorage.setCurrentUser(user);
    refreshAllState();
    addToast('success', 'Authentication Successful', `Logged in as ${user.name} (${user.role}).`);
  };

  // Handle Logout
  const handleLogout = () => {
    CygenVaultStorage.setCurrentUser(null);
    setCurrentUser(null);
    addToast('info', 'Logged Out', 'Session terminated successfully.');
  };

  // Handle Role Change
  const handleRoleChange = (newRole: UserRole) => {
    const updated = CygenVaultStorage.switchRole(newRole);
    setCurrentUser(updated);
    refreshAllState();
    addToast('info', 'Role Switched', `Active RBAC role set to ${newRole}.`);
  };

  // Handle Reset Demo
  const handleResetDemo = () => {
    CygenVaultStorage.resetToDefaultDemo();
    refreshAllState();
    addToast('warning', 'Demo Reset', 'Database restored to initial synthetic baseline.');
  };

  // Handle Save Drug
  const handleSaveDrug = (drug: DrugProfile) => {
    CygenVaultStorage.saveDrug(drug);
    refreshAllState();
    addToast('success', 'Drug Registered', `Profile saved for ${drug.name} (${drug.chemicalFormula}).`);
  };

  // Handle Archive Drug
  const handleArchiveDrug = (id: string) => {
    CygenVaultStorage.archiveDrug(id);
    refreshAllState();
    addToast('warning', 'Drug Archived', `Profile ${id} archived from active view.`);
  };

  // Quick register drug submission
  const handleQuickRegisterDrug = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DG-00${drugs.length + 1}`;
    const drug: DrugProfile = {
      id: newId,
      name: newDrugForm.name || 'Demo Compound',
      chemicalFormula: newDrugForm.chemicalFormula || 'C10H10O2',
      molecularWeight: Number(newDrugForm.molecularWeight) || 180,
      smiles: newDrugForm.smiles || 'C',
      inchi: `InChI=1S/${newDrugForm.chemicalFormula}/...`,
      casNumber: newDrugForm.casNumber || 'N/A',
      knownTargets: newDrugForm.knownTargets || ['COX-1', 'COX-2'],
      knownProperties: newDrugForm.knownProperties || {
        logP: 1.0,
        tpsa: 50,
        hbd: 1,
        hba: 3,
        rotatableBonds: 2,
        heavyAtomCount: 14,
        aromaticRings: 1
      },
      knownToxicityInfo: newDrugForm.knownToxicityInfo || 'Preliminary synthetic compound screen.',
      sourceDatabase: newDrugForm.sourceDatabase || 'Public Research Dataset',
      functionalGroups: ['Aromatic Ring', 'Carbonyl'],
      fingerprintBits: Array(32).fill(0).map(() => Math.round(Math.random())),
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };
    handleSaveDrug(drug);
    clearHistory();
    setIsDrugModalOpen(false);
  };

  // Quick register bio profile submission
  const handleQuickRegisterBio = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `AG-S00${profiles.length + 1}`;
    const profile: BiologicalProfile = {
      id: newId,
      name: newBioForm.name || 'Custom Biological Model',
      system: (newBioForm.system as any) || 'Other Research Model',
      datasetVersion: newBioForm.datasetVersion || 'v1.0',
      source: 'AS GARDIAN Molecular Datasets',
      validationStatus: 'Computational Reference',
      description: newBioForm.description || 'Custom biological system profile.',
      genomics: {
        available: true,
        quality: 'High',
        datasetVersion: 'v1.0',
        source: 'Targeted Amplicon Panel',
        validationStatus: 'Standard Reference',
        details: 'Baseline ADME panel sequenced.',
        dnaSequenceSample: 'ATGTCGGCCACCGGCTTCCTGAAC...',
        geneInfo: ['CYP1A1', 'CYP2D6', 'PTGS2'],
        variants: ['Wild-type baseline'],
        biomarkers: ['Cardiac oxidative markers']
      },
      transcriptomics: {
        available: true,
        quality: 'Moderate',
        datasetVersion: 'v1.0',
        source: 'NovaSeq Quant',
        validationStatus: 'Computational',
        details: 'Baseline TPM expression index.',
        rnaExpressionMetrics: 'Mean TPM: 38.5',
        differentialGenes: ['HMOX1', 'SOD2'],
        transcriptSummary: 'Moderate stress response transcripts.'
      },
      proteomics: {
        available: true,
        quality: 'Moderate',
        datasetVersion: 'v1.0',
        source: 'SRM Targeted Assay',
        validationStatus: 'Literature Supported',
        details: 'Selected reaction monitoring.',
        proteinAbundance: 'Normal expression range.',
        identifiedTargets: ['Cyclooxygenase-2', 'SOD2']
      },
      metabolomics: {
        available: false,
        quality: 'Unavailable',
        datasetVersion: 'v1.0',
        source: 'Pending Phase 2',
        validationStatus: 'Pending Lab Verification',
        details: 'Metabolomics dataset not yet available.',
        keyMetabolites: [],
        biomarkers: []
      },
      cellular: {
        available: true,
        quality: 'Moderate',
        datasetVersion: 'v1.0',
        source: 'Primary explant assay',
        validationStatus: 'Literature Supported',
        details: 'Primary myocyte cell viability model.',
        cellType: 'Cardiomyocyte primary culture',
        cellViability: '92.4%',
        cellProliferation: 'Quiescent',
        apoptosis: '2.1%'
      },
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'
    };

    CygenVaultStorage.saveBiologicalProfile(profile);
    refreshAllState();
    clearHistory();
    setIsBioModalOpen(false);
    addToast('success', 'Profile Created', `Biological profile ${profile.id} registered.`);
  };

  // If not logged in, show Login Screen
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Active analysis for Target / Multi-Omics / AI-ML / Risk views
  const activeAnalysis = analyses[0];
  const activeProfile = profiles[0];

  return (
    <div className="min-h-screen bg-[#F7FAF7] flex flex-col text-[#172B1D]">
      {/* Header Bar */}
      <Header
        currentUser={currentUser}
        onLogout={handleLogout}
        onRoleChange={handleRoleChange}
        onResetDemo={handleResetDemo}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex-1 flex flex-row">
        {/* Persistent Desktop Sidebar & Collapsible Mobile Drawer */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleNavigate}
          userRole={currentUser.role}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main Content Viewport with bottom padding for fixed navigation bar */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full overflow-y-auto pb-24 lg:pb-28">
          {activeTab === 'dashboard' && (
            <DashboardPage
              drugs={drugs}
              profiles={profiles}
              analyses={analyses}
              passports={passports}
              auditLogs={auditLogs}
              isRefreshing={isRefreshing}
              onRefresh={handleRefreshDashboard}
              onNavigate={(tab, id) => handleNavigate(tab, id)}
              onOpenRegisterDrug={() => setIsDrugModalOpen(true)}
              onOpenRegisterBio={() => setIsBioModalOpen(true)}
            />
          )}

          {activeTab === 'drugs' && (
            <DrugRegistryPage
              drugs={drugs}
              onSaveDrug={handleSaveDrug}
              onArchiveDrug={handleArchiveDrug}
              userRole={currentUser.role}
              onRunAnalysisWithDrug={() => handleNavigate('analysis-wizard')}
            />
          )}

          {activeTab === 'biological' && (
            <BiologicalProfilesPage
              profiles={profiles}
              onSaveProfile={prof => {
                CygenVaultStorage.saveBiologicalProfile(prof);
                refreshAllState();
              }}
              userRole={currentUser.role}
              onSelectForAnalysis={() => handleNavigate('analysis-wizard')}
            />
          )}

          {activeTab === 'lab-records' && (
            <LabRecordsPage
              records={labRecords}
              onSaveRecord={rec => {
                CygenVaultStorage.saveLabRecord(rec);
                refreshAllState();
                addToast('success', 'Research Activity Logged', `Activity record ${rec.sampleId} saved.`);
              }}
              userRole={currentUser.role}
            />
          )}

          {activeTab === 'target-pathway' && (
            <TargetPathwayPage currentAnalysis={activeAnalysis} />
          )}

          {activeTab === 'multi-omics' && (
            <MultiOmicsPage profile={activeProfile} />
          )}

          {activeTab === 'ai-ml' && (
            <AiMlAnalysisPage analysis={activeAnalysis} />
          )}

          {activeTab === 'risk-evidence' && (
            <RiskEvidencePage
              analysis={activeAnalysis}
              onNavigateToPassport={() => handleNavigate('passport')}
            />
          )}

          {activeTab === 'cross-system' && (
            <CrossSystemPage analysis={activeAnalysis} />
          )}

          {activeTab === 'passport' && (
            <EvidencePassportPage
              passports={passports}
              selectedPassportId={targetPassportId}
              onNavigateToIntegrity={pId => handleNavigate('integrity', pId)}
              onNavigateToReport={pId => handleNavigate('reports', pId)}
            />
          )}

          {activeTab === 'integrity' && (
            <IntegrityVerificationPage
              passports={passports}
              initialPassportId={targetPassportId}
              onRefreshPassports={refreshAllState}
            />
          )}

          {activeTab === 'audit-logs' && (
            <AuditLogsPage logs={auditLogs} />
          )}

          {activeTab === 'reports' && (
            <ReportsPage
              reports={reports}
              analyses={analyses}
              passports={passports}
              selectedReportId={targetReportId}
              onGenerateReportFromAnalysis={an => {
                addToast('success', 'Report Generated', `Report compiled for ${an.id}.`);
              }}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsPage
              currentUser={currentUser}
              onRoleChange={handleRoleChange}
              onResetDemo={handleResetDemo}
            />
          )}

          {activeTab === 'analysis-wizard' && (
            <AnalysisWizardPage
              drugs={drugs}
              profiles={profiles}
              currentUser={currentUser}
              onAnalysisCompleted={(an, pass) => {
                refreshAllState();
                setTargetPassportId(pass.passportId);
                addToast('success', 'Analysis Completed', `Issued Evidence Passport ${pass.passportId}.`);
              }}
              onViewPassport={passId => handleNavigate('passport', passId)}
            />
          )}
        </main>
      </div>

      {/* Quick Register Drug Modal */}
      <Modal
        isOpen={isDrugModalOpen}
        onClose={() => setIsDrugModalOpen(false)}
        title="Register New Drug Candidate"
        subtitle="Quick form to add a molecular profile for analysis"
      >
        <form onSubmit={handleQuickRegisterDrug} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Compound Name</label>
              <input
                type="text"
                value={newDrugForm.name || ''}
                onChange={e => updateDrugField('name', e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#172B1D] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Chemical Formula</label>
              <input
                type="text"
                value={newDrugForm.chemicalFormula || ''}
                onChange={e => updateDrugField('chemicalFormula', e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-mono font-bold text-[#166534] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Molecular Weight (g/mol)</label>
              <input
                type="number"
                step="0.01"
                value={newDrugForm.molecularWeight || 0}
                onChange={e => updateDrugField('molecularWeight', parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-mono text-[#172B1D] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">CAS Registry Number</label>
              <input
                type="text"
                value={newDrugForm.casNumber || ''}
                onChange={e => updateDrugField('casNumber', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-mono text-[#172B1D] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Canonical SMILES</label>
            <input
              type="text"
              value={newDrugForm.smiles || ''}
              onChange={e => updateDrugField('smiles', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-mono text-[#0284C7] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setIsDrugModalOpen(false)}
              className="px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white hover:bg-[#F0FDF4] text-[#64748B] hover:text-[#172B1D] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Register Candidate
            </button>
          </div>
        </form>
      </Modal>

      {/* Quick Register Biological Profile Modal */}
      <Modal
        isOpen={isBioModalOpen}
        onClose={() => setIsBioModalOpen(false)}
        title="Register Biological System Profile"
        subtitle="Add experimental species or cellular model reference"
      >
        <form onSubmit={handleQuickRegisterBio} className="space-y-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Profile Name</label>
            <input
              type="text"
              value={newBioForm.name || ''}
              onChange={e => updateBioField('name', e.target.value)}
              required
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#172B1D] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Species / Model</label>
              <select
                value={newBioForm.system || 'Human'}
                onChange={e => updateBioField('system', e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#172B1D] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              >
                <option value="Human">Human</option>
                <option value="Rat">Rat</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Bird">Bird</option>
                <option value="Plant">Plant</option>
                <option value="Other Research Model">Other Research Model</option>
              </select>
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Dataset Version</label>
              <input
                type="text"
                value={newBioForm.datasetVersion || 'v1.0'}
                onChange={e => updateBioField('datasetVersion', e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs font-mono text-[#172B1D] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-[#64748B] mb-1 uppercase tracking-wider font-mono">Description & Scope</label>
            <textarea
              rows={2}
              value={newBioForm.description || ''}
              onChange={e => updateBioField('description', e.target.value)}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-xs text-[#172B1D] focus:outline-hidden focus:border-[#16A34A] focus:ring-1 focus:ring-[#16A34A]"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={() => setIsBioModalOpen(false)}
              className="px-3 py-2 border border-[#E2E8F0] rounded-lg bg-white hover:bg-[#F0FDF4] text-[#64748B] hover:text-[#172B1D] font-medium transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Create Profile
            </button>
          </div>
        </form>
      </Modal>

      {/* Fixed Persistent Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        canGoBack={canGoBack}
        canGoForward={canGoForward}
        isRefreshing={isRefreshing}
        onHome={handleHome}
        onBack={handleBack}
        onForward={handleForward}
        onRefresh={handleRefreshDashboard}
      />

      {/* Global Toast Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
