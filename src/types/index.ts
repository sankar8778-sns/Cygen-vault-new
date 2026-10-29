/**
 * CYGEN VAULT - Domain Types
 * Secure, Mechanism-Aware Computational Evidence Platform for Drug–Biological System Analysis
 */

export type UserRole = 'Administrator' | 'Researcher' | 'Reviewer' | 'Viewer';

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  lastLogin: string;
}

export type RiskSignal = 'Low' | 'Moderate' | 'High' | 'Inconclusive';
export type EvidenceStrength = 'Low' | 'Moderate' | 'High' | 'Insufficient';
export type UncertaintyLevel = 'Low' | 'Moderate' | 'High';
export type ApplicabilityDomain = 'Within Prototype Domain' | 'Borderline' | 'Outside Prototype Domain';
export type DataQuality = 'High' | 'Moderate' | 'Low' | 'Unavailable';

export interface MolecularProperties {
  logP: number;
  tpsa: number; // Topological Polar Surface Area (Å²)
  hbd: number;  // Hydrogen Bond Donors
  hba: number;  // Hydrogen Bond Acceptors
  rotatableBonds: number;
  heavyAtomCount: number;
  aromaticRings: number;
}

export interface DrugProfile {
  id: string; // e.g. DG-001
  name: string; // Demo Compound A
  chemicalFormula: string; // C8H9NO2
  molecularWeight: number; // 151.16 g/mol
  smiles: string;
  inchi: string;
  casNumber: string;
  knownTargets: string[];
  knownProperties: MolecularProperties;
  knownToxicityInfo: string;
  sourceDatabase: string;
  functionalGroups: string[];
  fingerprintBits: number[]; // 32 simulated fingerprint bits (0 or 1)
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type BiologicalSystemType = 'Human' | 'Rat' | 'Dog' | 'Cat' | 'Bird' | 'Plant' | 'Other Research Model';

export interface EvidenceLayerState {
  available: boolean;
  quality: DataQuality;
  datasetVersion: string;
  source: string;
  validationStatus: 'Computational' | 'Standard Reference' | 'Literature Supported' | 'Pending Lab Verification';
  details: string;
}

export interface BiologicalProfile {
  id: string; // e.g. AG-S001
  name: string;
  system: BiologicalSystemType;
  datasetVersion: string;
  source: string;
  validationStatus: string;
  description: string;
  genomics: EvidenceLayerState & {
    dnaSequenceSample: string;
    geneInfo: string[];
    variants: string[];
    biomarkers: string[];
  };
  transcriptomics: EvidenceLayerState & {
    rnaExpressionMetrics: string;
    differentialGenes: string[];
    transcriptSummary: string;
  };
  proteomics: EvidenceLayerState & {
    proteinAbundance: string;
    identifiedTargets: string[];
  };
  metabolomics: EvidenceLayerState & {
    keyMetabolites: string[];
    biomarkers: string[];
  };
  cellular: EvidenceLayerState & {
    cellType: string;
    cellViability: string;
    cellProliferation: string;
    apoptosis: string;
  };
  createdAt: string;
}

export interface LabSampleDnaRecord {
  status: 'Completed' | 'Pending' | 'Flagged';
  concentration: number; // ng/μL
  a260_a280: number; // Purity ratio
  a260_a230: number;
  integrity: string; // e.g. DIN 8.7
  extractionBatch: string;
  datasetVersion: string;
}

export interface LabSampleRnaRecord {
  status: 'Completed' | 'Pending' | 'Flagged';
  concentration: number; // ng/μL
  a260_a280: number;
  a260_a230: number;
  integrity: string; // e.g. RIN 9.1
  dnaseTreatment: string;
  extractionBatch: string;
  datasetVersion: string;
}

export interface LabRecord {
  id: string; // e.g. AG-LAB-2026-001
  sampleId: string; // AG-S001
  laboratory: string; // AS GARDIAN
  sampleType: string; // Research Dataset
  analysisRequested: string; // DNA + RNA
  batchId: string;
  datasetVersion: string;
  timestamp: string;
  operator: string;
  dna: LabSampleDnaRecord;
  rna: LabSampleRnaRecord;
  notes: string;
}

export type TargetCategory = 'Receptor' | 'Enzyme' | 'Transporter' | 'Ion Channel' | 'Regulatory Protein';

export interface TargetItem {
  id: string;
  targetName: string;
  category: TargetCategory;
  interactionScore: number; // 0.00 - 1.00
  interactionEvidence: 'Low' | 'Moderate' | 'High';
  evidenceSource: string;
  evidenceStatus: 'Computational';
  confidenceLevel: number; // % (e.g. 78%)
  mechanismSummary: string;
}

export interface PathwayItem {
  id: string;
  pathwayName: string;
  targetMolecule: string;
  biologicalFunction: string;
  associatedGenes: string[];
  associatedProteins: string[];
  cellularProcess: string;
  evidenceStrength: 'Low' | 'Moderate' | 'High';
  interpretation: string;
}

export interface ModelPrediction {
  modelName: 'Random Forest' | 'Support Vector Machine' | 'Logistic Regression' | 'XGBoost';
  riskSignal: RiskSignal;
  probabilityScore: number; // 0.00 - 1.00
  featureWeights: { feature: string; weight: number }[];
  runtimeMs: number;
}

export interface UncertaintyFactor {
  factor: string;
  level: 'Low' | 'Moderate' | 'High';
  description: string;
  impactOnEvidence: string;
}

export interface CrossSystemComparisonItem {
  system: BiologicalSystemType;
  riskSignal: RiskSignal;
  evidenceStrength: EvidenceStrength;
  targetConservationScore: number; // 0 - 100%
  metabolicDivergence: string;
  notes: string;
}

export interface EvidencePassport {
  passportId: string; // e.g. EVP-2026-0001
  analysisId: string;
  drugId: string;
  drugName: string;
  chemicalFormula: string;
  biologicalProfileId: string;
  biologicalSystem: BiologicalSystemType;
  datasetVersion: string;
  modelVersions: string; // e.g. "RF-v2.1 / SVM-v1.8 / LR-v1.4 / XGB-v2.5 (Ensemble ML-2026.10)"
  analysisDate: string;
  riskSignal: RiskSignal;
  modelAgreement: string; // e.g. "3 / 4 (75%)"
  consensusRatio: number; // 0.75
  evidenceStrength: EvidenceStrength;
  evidenceStrengthReason: string;
  uncertainty: UncertaintyLevel;
  uncertaintyReason: string;
  applicabilityDomain: ApplicabilityDomain;
  applicabilityReason: string;
  canonicalPayload: string;
  sha256Hash: string;
  createdBy: string;
  createdRole: UserRole;
  auditRefId: string;
  status: 'Verified' | 'Active' | 'Archived' | 'Flagged';
}

export interface AnalysisRecord {
  id: string; // AN-0001
  passportId: string;
  drugId: string;
  drugName: string;
  biologicalProfileId: string;
  biologicalSystem: BiologicalSystemType;
  datasetVersion: string;
  modelVersion: string;
  timestamp: string;
  completedAt: string;
  status: 'Completed' | 'In Progress' | 'Failed';
  
  // Computed Results
  molecularFeatures: MolecularProperties;
  targets: TargetItem[];
  pathways: PathwayItem[];
  modelPredictions: ModelPrediction[];
  modelAgreement: string;
  consensusRiskSignal: RiskSignal;
  evidenceStrength: EvidenceStrength;
  evidenceStrengthReason: string;
  uncertainty: UncertaintyLevel;
  uncertaintyReason: string;
  uncertaintyFactors: UncertaintyFactor[];
  applicabilityDomain: ApplicabilityDomain;
  applicabilityReason: string;
  crossSystemComparison: CrossSystemComparisonItem[];
  
  // Cryptographic & Integrity
  sha256Hash: string;
  tamperedPayload?: string; // For integrity simulation testing
}

export interface IntegrityCheckResult {
  passportId: string;
  analysisId: string;
  storedHash: string;
  recalculatedHash: string;
  isVerified: boolean;
  timestamp: string;
  checkedBy: string;
  checks: {
    datasetRecordAvailable: boolean;
    modelVersionRecorded: boolean;
    analysisTimestampRecorded: boolean;
    evidenceHashMatched: boolean;
    auditTrailAvailable: boolean;
  };
  details: string;
}

export interface AuditLog {
  id: string; // EVT-2026-xxxx
  timestamp: string;
  user: string;
  role: UserRole;
  action: 
    | 'Login' 
    | 'Logout' 
    | 'Data Upload' 
    | 'Data Creation' 
    | 'Data Modification' 
    | 'Data Deletion/Archive' 
    | 'Analysis Execution' 
    | 'Report Generation' 
    | 'Evidence Passport Creation' 
    | 'Evidence Verification' 
    | 'Role Change';
  resource: string;
  resourceId: string;
  status: 'Success' | 'Warning' | 'Error';
  ipAddress: string;
  details: string;
}

export interface ComputationalReport {
  reportId: string; // RPT-2026-0001
  analysisId: string;
  passportId: string;
  title: string;
  drugName: string;
  chemicalFormula: string;
  biologicalSystem: string;
  molecularEvidenceStatus: string;
  biologicalEvidenceStatus: string;
  targetAnalysisSummary: string;
  pathwayAnalysisSummary: string;
  aiMlResult: RiskSignal;
  modelAgreement: string;
  evidenceStrength: EvidenceStrength;
  evidenceStrengthReason: string;
  uncertainty: UncertaintyLevel;
  uncertaintyReason: string;
  applicabilityDomain: ApplicabilityDomain;
  experimentalRecommendation: string;
  scientificStatement: string;
  datasetVersion: string;
  modelVersions: string;
  sha256Hash: string;
  generatedBy: string;
  generatedAt: string;
  auditReference: string;
}
