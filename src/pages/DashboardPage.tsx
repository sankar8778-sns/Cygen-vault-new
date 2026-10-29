import React, { useState } from 'react';
import { 
  Pill, 
  Dna, 
  Cpu, 
  FileCheck, 
  Clock, 
  ShieldCheck, 
  Plus, 
  Play, 
  History, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  RefreshCw,
  Activity,
  Layers,
  Database,
  Lock,
  ExternalLink,
  Eye,
  Check
} from 'lucide-react';
import { AnalysisRecord, DrugProfile, BiologicalProfile, EvidencePassport, AuditLog } from '../types';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { EvidencePipeline } from '../components/pipeline/EvidencePipeline';
import { Modal } from '../components/common/Modal';
import { NavTabId } from '../components/common/Sidebar';

interface Props {
  drugs: DrugProfile[];
  profiles: BiologicalProfile[];
  analyses: AnalysisRecord[];
  passports: EvidencePassport[];
  auditLogs?: AuditLog[];
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onNavigate: (tab: NavTabId, selectedId?: string) => void;
  onOpenRegisterDrug: () => void;
  onOpenRegisterBio: () => void;
}

export const DashboardPage: React.FC<Props> = ({
  drugs,
  profiles,
  analyses,
  passports,
  auditLogs = [],
  isRefreshing = false,
  onRefresh,
  onNavigate,
  onOpenRegisterDrug,
  onOpenRegisterBio
}) => {
  // Available real metrics from project state
  const totalDrugProfiles = drugs.length;
  const biologicalProfiles = profiles.length;
  const totalAnalyses = analyses.length;
  const completedAnalyses = analyses.length;
  const pendingAnalyses = 0; // Deterministic pipeline completes synchronously or on-demand
  const evidenceRecords = passports.length;

  const kpis = [
    {
      title: 'Total Drug Profiles',
      value: totalDrugProfiles,
      subtitle: 'Registered molecular candidates',
      icon: Pill,
      iconColor: 'text-[#16A34A]',
      iconBg: 'bg-[#DCFCE7] border-[#86EFAC]',
      tab: 'drugs' as NavTabId,
      demoTag: 'DEMO DATA'
    },
    {
      title: 'Biological Profiles',
      value: biologicalProfiles,
      subtitle: 'Species & cellular references',
      icon: Dna,
      iconColor: 'text-[#166534]',
      iconBg: 'bg-[#DCFCE7] border-[#86EFAC]',
      tab: 'biological' as NavTabId,
      demoTag: 'DEMO DATA'
    },
    {
      title: 'Total Analyses',
      value: totalAnalyses,
      subtitle: 'Ensemble ML interrogations',
      icon: Cpu,
      iconColor: 'text-[#16A34A]',
      iconBg: 'bg-[#DCFCE7] border-[#86EFAC]',
      tab: 'ai-ml' as NavTabId,
      demoTag: 'DEMO DATA'
    },
    {
      title: 'Completed Analyses',
      value: completedAnalyses,
      subtitle: '100% deterministic outputs',
      icon: CheckCircle2,
      iconColor: 'text-[#15803D]',
      iconBg: 'bg-[#DCFCE7] border-[#86EFAC]',
      tab: 'passport' as NavTabId,
      demoTag: 'DEMO DATA'
    },
    {
      title: 'Pending or Running',
      value: pendingAnalyses,
      subtitle: 'Zero queued executions',
      icon: Clock,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50 border-amber-200',
      tab: 'analysis-wizard' as NavTabId,
      demoTag: 'DEMO DATA'
    },
    {
      title: 'Evidence Records',
      value: evidenceRecords,
      subtitle: 'Cryptographic SHA-256 passports',
      icon: FileCheck,
      iconColor: 'text-[#166534]',
      iconBg: 'bg-[#DCFCE7] border-[#86EFAC]',
      tab: 'passport' as NavTabId,
      demoTag: 'DEMO DATA'
    }
  ];

  const quickActions = [
    {
      title: 'Start New Analysis',
      desc: 'Combine candidate compounds & multi-omics across deterministic ML ensemble.',
      icon: Play,
      action: () => onNavigate('analysis-wizard'),
      buttonText: 'Run Pipeline',
      primary: true
    },
    {
      title: 'Verify Evidence Integrity',
      desc: 'Recalculate cryptographic SHA-256 signatures to detect simulated tampering.',
      icon: ShieldCheck,
      action: () => onNavigate('integrity'),
      buttonText: 'Verify Signatures'
    },
    {
      title: 'Register Drug Candidate',
      desc: 'Add new small-molecule chemical formulas with canonical SMILES representations.',
      icon: Plus,
      action: onOpenRegisterDrug,
      buttonText: 'New Compound'
    },
    {
      title: 'Register Biological Profile',
      desc: 'Create an organism baseline model across Genomics, Transcriptomics, and Proteomics.',
      icon: Plus,
      action: onOpenRegisterBio,
      buttonText: 'New Profile'
    },
    {
      title: 'Inspect Evidence Passports',
      desc: 'Explore tamper-evident cryptographic digital certificates and provenance trail.',
      icon: FileCheck,
      action: () => onNavigate('passport'),
      buttonText: 'View Passports'
    },
    {
      title: 'Compliance & Audit Ledger',
      desc: 'Review immutable compliance records, user permissions, and tamper checks.',
      icon: History,
      action: () => onNavigate('audit-logs'),
      buttonText: 'Open Ledger'
    }
  ];

  const [selectedActivity, setSelectedActivity] = useState<{
    id: string;
    name: string;
    type: string;
    timestamp: string;
    status: string;
    operator: string;
    details: string;
    referenceId: string;
  } | null>(null);

  // Demonstration Research Activity Items
  const demoActivities = [
    {
      id: 'ACT-001',
      name: `Multi-Model Consensus Screening: ${analyses[0]?.drugName || 'Demo Compound A'}`,
      type: 'Ensemble ML Analysis',
      timestamp: analyses[0]?.completedAt || '2026-10-06 14:20 UTC',
      status: 'Completed',
      operator: 'Dr. Evelyn Vance',
      details: `Ensemble evaluation over 4 algorithms (RF, SVM, LR, XGBoost). Model agreement calculated at ${analyses[0]?.modelAgreement || '75%'}. Cryptographic Evidence Passport ${analyses[0]?.passportId || 'EVP-2026-0001'} issued.`,
      referenceId: analyses[0]?.id || 'AN-001'
    },
    {
      id: 'ACT-002',
      name: `Digital Evidence Passport SHA-256 Seal (${passports[0]?.passportId || 'EVP-2026-0001'})`,
      type: 'Cryptographic Seal',
      timestamp: passports[0]?.analysisDate || '2026-10-06 14:22 UTC',
      status: 'Verified',
      operator: 'IntegrityGuard / Native WebCrypto',
      details: `Deterministic canonical JSON serialization generated SHA-256 digest: ${passports[0]?.sha256Hash?.substring(0, 24) || 'e3b0c44298fc1c149afbf4c8'}... Zero tampering detected.`,
      referenceId: passports[0]?.passportId || 'EVP-2026-0001'
    },
    {
      id: 'ACT-003',
      name: 'Primary Hepatocyte & ADME Model Baseline (AG-S001)',
      type: 'Dataset Ingestion',
      timestamp: '2026-10-06 11:15 UTC',
      status: 'Quality Certified',
      operator: 'Marcus Chen',
      details: 'High-depth whole-exome sequencing target coverage indexed at 98.4%. Spectrophotometric purity A260/A280 = 1.85, DIN 8.7 passed.',
      referenceId: 'AG-S001'
    },
    {
      id: 'ACT-004',
      name: 'Molecular Scaffold Ingestion: Demo Kinase Scaffold B',
      type: 'Compound Registry',
      timestamp: '2026-10-05 16:40 UTC',
      status: 'Active',
      operator: 'Dr. Evelyn Vance',
      details: 'Compound DG-002 indexed with 32-bit topological fingerprint, canonical SMILES, MW 441.42 g/mol, and LogP 3.25.',
      referenceId: 'DG-002'
    },
    {
      id: 'ACT-005',
      name: 'Comparative Toxicogenomics Model Ingestion (Rat Model)',
      type: 'Biological Model',
      timestamp: '2026-10-05 09:30 UTC',
      status: 'Validated',
      operator: 'Dr. Sarah Al-Mansoor',
      details: 'Sprague-Dawley liver slice reference panel with Cyp2e1, Ptgs1, and Ptgs2 annotated ortholog mapping.',
      referenceId: 'AG-S002'
    }
  ];

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* 1. Welcome Hero Section */}
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-8 relative overflow-hidden shadow-xs">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-gradient-to-l from-[#DCFCE7]/60 via-[#F0FDF4]/30 to-transparent pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-bold tracking-wider">
                DEMO ENVIRONMENT
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#F0FDF4] text-[#166534] border border-[#E2E8F0] font-semibold">
                SYNTHETIC DEMONSTRATION DATA
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#172B1D]">
              CYGEN VAULT — Computational Biology &amp; Scientific Evidence Demo
            </h1>
            
            <p className="text-[#64748B] text-xs sm:text-sm leading-relaxed font-normal">
              Explore how molecular inputs, biological datasets, machine learning models, and scientific evidence can be organized in a unified research workflow.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('analysis-wizard')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-extrabold text-xs tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Demo Analysis</span>
            </button>
            
            <button
              onClick={() => onNavigate('drugs')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-[#F0FDF4] text-[#166534] border-2 border-[#86EFAC] hover:border-[#16A34A] font-bold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <Database className="w-4 h-4 text-[#16A34A]" />
              <span>Explore Sample Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scientific Disclaimer (Compact, visually organized) */}
      <ScientificDisclaimer compact />

      {/* 2. Interactive KPI Metrics Grid (All Clickable, Connected to real state) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
              Platform Evidence Metrics
            </h2>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-semibold">
              LIVE REPOSITORY
            </span>
          </div>

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="text-[11px] font-mono text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 cursor-pointer disabled:opacity-50 font-semibold"
              title="Refresh dashboard data"
            >
              <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Sync View'}</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {kpis.map((kpi, idx) => {
            const Icon = kpi.icon;
            return (
              <button
                key={idx}
                onClick={() => onNavigate(kpi.tab)}
                className="bg-white border border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4] rounded-xl p-3.5 text-left transition-all group cursor-pointer shadow-xs flex flex-col justify-between"
                title={`Click to view ${kpi.title}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-[#F7FAF7] text-[#64748B] border border-[#E2E8F0]">
                      {kpi.demoTag}
                    </span>
                    <div className={`p-1.5 rounded-lg border ${kpi.iconBg} ${kpi.iconColor}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold font-mono text-[#172B1D] tabular-nums group-hover:text-[#16A34A] transition-colors">
                    {kpi.value}
                  </div>
                  <div className="text-xs font-semibold text-[#172B1D] mt-0.5 line-clamp-1">
                    {kpi.title}
                  </div>
                </div>
                
                <div className="mt-2 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#64748B] font-mono">
                  <span className="truncate">{kpi.subtitle}</span>
                  <ArrowUpRight className="w-3 h-3 text-[#64748B] group-hover:text-[#16A34A] transition-colors shrink-0 ml-1" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Analysis Workflow Pipeline */}
      <EvidencePipeline onSelectStep={step => onNavigate(step as NavTabId)} />

      {/* 4. Recent Analyses & Evidence Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Recent Analyses (8 Cols) */}
        <div className="lg:col-span-8 bg-white border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden flex flex-col justify-between">
          <div>
            <div className="p-4 lg:p-5 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#16A34A]" />
                  Recent Computational Analyses
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  Multi-model consensus risk runs with SHA-256 signatures
                </p>
              </div>
              <button
                onClick={() => onNavigate('passport')}
                className="text-xs font-semibold text-[#16A34A] hover:text-[#15803D] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
              >
                <span>View All Passports</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7FAF7] text-[#64748B] font-mono text-[11px] border-b border-[#E2E8F0]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Analysis ID</th>
                    <th className="py-3 px-4 font-semibold">Candidate Compound</th>
                    <th className="py-3 px-4 font-semibold">Biological System</th>
                    <th className="py-3 px-4 font-semibold">Risk Signal</th>
                    <th className="py-3 px-4 font-semibold">Agreement</th>
                    <th className="py-3 px-4 font-semibold">Date</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#172B1D]">
                  {analyses.map(item => (
                    <tr key={item.id} className="hover:bg-[#F0FDF4]/70 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#166534]">
                        {item.id}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-[#172B1D]">{item.drugName}</div>
                        <div className="text-[10px] font-mono text-[#16A34A] font-bold">{item.drugId}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-medium text-[#172B1D]">{item.biologicalSystem}</span>
                        <span className="text-[10px] block text-[#64748B] font-mono">Dataset {item.datasetVersion}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                          item.consensusRiskSignal === 'High'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : item.consensusRiskSignal === 'Moderate'
                            ? 'bg-amber-50 text-amber-700 border-amber-200'
                            : 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                        }`}>
                          {item.consensusRiskSignal} Risk
                        </span>
                      </td>
                      <td className="py-3 px-4 font-mono text-[#172B1D] text-[11px] font-semibold">
                        {item.modelAgreement}
                      </td>
                      <td className="py-3 px-4 font-mono text-[#64748B] text-[10px]">
                        {item.completedAt.split(' ')[0]}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onNavigate('passport', item.passportId)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7FAF7] hover:bg-[#DCFCE7] text-[#166534] font-mono text-[11px] font-bold border border-[#E2E8F0] hover:border-[#86EFAC] transition-colors cursor-pointer"
                          title={`View Passport ${item.passportId}`}
                        >
                          <span>View Details</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Evidence & Trust Overview (4 Cols) */}
        <div className="lg:col-span-4 bg-white border border-[#E2E8F0] rounded-xl shadow-xs p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <h3 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
                Evidence &amp; Trust Overview
              </h3>
              <span className="text-[10px] font-mono text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                100% SEALED
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">
                  Active Cryptographic Passports
                </span>
                <div className="text-xl font-bold font-mono text-[#172B1D]">
                  {passports.length} Verified Records
                </div>
                <p className="text-[11px] text-[#64748B]">
                  Canonical JSON payloads sealed with native WebCrypto SHA-256 hash digests.
                </p>
              </div>

              <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">
                  Multi-Omics Evidence Layers
                </span>
                <div className="text-xs font-mono text-[#172B1D] flex flex-wrap gap-1.5 pt-1">
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#86EFAC] text-[#166534] font-semibold">Genomics</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#86EFAC] text-[#166534] font-semibold">Transcriptomics</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#86EFAC] text-[#166534] font-semibold">Proteomics</span>
                  <span className="px-1.5 py-0.5 rounded bg-white border border-[#E2E8F0] text-[#64748B]">Cellular</span>
                </div>
              </div>

              <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">
                  Consensus Engine Reliability
                </span>
                <div className="text-xs font-mono text-[#166534] flex items-center justify-between">
                  <span className="text-[#64748B]">Ensemble Voting Agreement</span>
                  <span className="font-bold">75% - 100%</span>
                </div>
                <p className="text-[10px] text-[#64748B]">
                  Cross-model verification across Random Forest, XGBoost, SVM, and Logistic Regression.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('integrity')}
            className="w-full py-2.5 px-3 rounded-lg bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] text-xs font-mono font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-[#16A34A]" />
            <span>Audit Cryptographic Hashes</span>
          </button>
        </div>
      </div>

      {/* 5. Research Activity & System Engine Status */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Research Activity (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-xl shadow-xs p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
            <div>
              <h3 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                <History className="w-4 h-4 text-[#16A34A]" />
                Research Activity
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                Demonstration activity stream with audit tracking &amp; quality gates
              </p>
            </div>
            <button
              onClick={() => onNavigate('lab-records')}
              className="text-xs font-semibold text-[#16A34A] hover:text-[#166534] flex items-center gap-1 cursor-pointer"
            >
              <span>View All Activities</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {demoActivities.map(act => (
              <div
                key={act.id}
                className="p-3 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-2.5"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-[#172B1D] text-xs">{act.name}</span>
                    <span className="text-[10px] font-mono text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC] font-semibold">
                      {act.type}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#64748B] flex items-center gap-2">
                    <span>{act.timestamp}</span>
                    <span>•</span>
                    <span>Ref: <strong className="text-[#172B1D] font-mono">{act.referenceId}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
                    act.status === 'Completed' || act.status === 'Verified' || act.status === 'Quality Certified'
                      ? 'bg-[#DCFCE7] text-[#166534] border-[#86EFAC]'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    {act.status}
                  </span>
                  
                  <button
                    onClick={() => setSelectedActivity(act)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-[#DCFCE7] text-[#166534] font-semibold text-xs border border-[#E2E8F0] hover:border-[#86EFAC] transition-all cursor-pointer shadow-xs"
                    title="View activity details"
                  >
                    <Eye className="w-3 h-3 text-[#16A34A]" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Engine Status (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E2E8F0] rounded-xl shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] mb-3">
              <h3 className="text-sm font-bold text-[#172B1D] flex items-center gap-2">
                <Database className="w-4 h-4 text-[#16A34A]" />
                System Engine Status
              </h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-2 py-0.5 rounded font-bold">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                ONLINE
              </span>
            </div>

            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded bg-[#F7FAF7] border border-[#E2E8F0]">
                <span className="text-[#64748B]">Deterministic ML Ensemble</span>
                <span className="text-[#166534] font-bold">v2026.10 Operational</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#F7FAF7] border border-[#E2E8F0]">
                <span className="text-[#64748B]">Cryptographic Seal Engine</span>
                <span className="text-[#166534] font-bold">SHA-256 Ready</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#F7FAF7] border border-[#E2E8F0]">
                <span className="text-[#64748B]">Session State Persistence</span>
                <span className="text-[#172B1D] font-medium">Synced ({passports.length} Passports)</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#F7FAF7] border border-[#E2E8F0]">
                <span className="text-[#64748B]">RBAC Security Policy</span>
                <span className="text-[#166534] font-bold">Enforced</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded bg-[#F7FAF7] border border-[#E2E8F0]">
                <span className="text-[#64748B]">Multi-Species Reference Models</span>
                <span className="text-[#172B1D] font-medium">6 Profiles Loaded</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#E2E8F0] text-[11px] text-[#64748B] font-normal leading-relaxed">
            All algorithms, hashes, and evidence passports execute deterministically within the browser environment.
          </div>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-bold text-[#172B1D] uppercase tracking-wider font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
            Computational Research Shortcuts
          </h2>
          <span className="text-xs text-[#64748B] font-mono">Direct workspace links</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {quickActions.map((qa, idx) => {
            const Icon = qa.icon;
            return (
              <div
                key={idx}
                className={`bg-white border rounded-xl p-4 transition-all shadow-xs flex flex-col justify-between ${
                  qa.primary 
                    ? 'border-[#86EFAC] bg-[#F0FDF4]/50 shadow-xs' 
                    : 'border-[#E2E8F0] hover:border-[#86EFAC] hover:bg-[#F0FDF4]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <h3 className="font-bold text-xs text-[#172B1D]">
                      {qa.title}
                    </h3>
                    <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed font-normal">
                    {qa.desc}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-[#E2E8F0] flex justify-end">
                  <button
                    onClick={qa.action}
                    className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all cursor-pointer font-bold ${
                      qa.primary
                        ? 'bg-[#16A34A] text-white hover:bg-[#15803D] shadow-xs'
                        : 'bg-[#F7FAF7] hover:bg-[#DCFCE7] text-[#166534] border border-[#E2E8F0] hover:border-[#86EFAC]'
                    }`}
                  >
                    <span>{qa.buttonText}</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Mandate Statement */}
      <div className="p-6 bg-white border border-[#E2E8F0] rounded-2xl text-center space-y-3 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DCFCE7] border border-[#86EFAC] rounded-full text-xs font-mono text-[#166534] font-bold">
          <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
          <span>CYGEN VAULT PLATFORM MANDATE</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-1">
          <h4 className="text-sm font-bold text-[#172B1D]">
            Drug Intelligence + Biological Evidence + AI/ML + Cryptographic Integrity
          </h4>
          <div className="text-[#16A34A] text-xs font-mono">↓</div>
          <h4 className="text-sm font-bold text-[#166534]">
            Traceable Computational Evidence Passport
          </h4>
          <div className="text-[#16A34A] text-xs font-mono">↓</div>
          <h4 className="text-sm font-bold text-[#16A34A]">
            Targeted Experimental Prioritization
          </h4>
        </div>

        <p className="text-xs text-[#64748B] max-w-2xl mx-auto leading-relaxed border-t border-[#E2E8F0] pt-3 font-normal">
          &ldquo;CYGEN VAULT does not replace the laboratory. It creates a secure, traceable computational evidence layer that helps researchers understand what should be investigated next.&rdquo;
        </p>
      </div>

      {/* Research Activity Details Modal */}
      {selectedActivity && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedActivity(null)}
          title={selectedActivity.name}
          subtitle={`Demonstration Record ID: ${selectedActivity.id} • ${selectedActivity.type}`}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#F7FAF7] rounded-xl border border-[#E2E8F0]">
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Activity Type</span>
                <span className="font-bold text-[#166534] text-xs mt-0.5 block">{selectedActivity.type}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Status</span>
                <span className="inline-flex items-center gap-1 font-bold text-[#166534] text-xs mt-0.5">
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  {selectedActivity.status}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Logged Timestamp</span>
                <span className="font-mono text-[#172B1D] text-xs mt-0.5 block">{selectedActivity.timestamp}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold">Operator / Agent</span>
                <span className="font-medium text-[#172B1D] text-xs mt-0.5 block">{selectedActivity.operator}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-mono text-[#64748B] uppercase block font-semibold mb-1">
                Activity Details &amp; Parameters
              </span>
              <div className="p-3 bg-white border border-[#E2E8F0] rounded-xl text-xs text-[#172B1D] leading-relaxed">
                {selectedActivity.details}
              </div>
            </div>

            <div className="p-3 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl text-[11px] text-[#166534] flex items-start gap-2">
              <span className="font-bold font-mono uppercase shrink-0">DEMO RECORD:</span>
              <span>This activity record is maintained within the active session state for demonstration and workflow verification.</span>
            </div>

            <div className="flex justify-end pt-2 border-t border-[#E2E8F0]">
              <button
                onClick={() => setSelectedActivity(null)}
                className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-lg transition-colors cursor-pointer text-xs shadow-xs"
              >
                Close Details
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
