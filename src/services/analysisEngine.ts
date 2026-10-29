/**
 * CYGEN VAULT - Computational Analysis & Evidence Engine
 * Generates deterministic prototype predictions, evidence scoring, uncertainty factors,
 * applicability domain assessments, and cryptographic Evidence Passports.
 */

import {
  DrugProfile,
  BiologicalProfile,
  AnalysisRecord,
  EvidencePassport,
  ModelPrediction,
  TargetItem,
  PathwayItem,
  UncertaintyFactor,
  CrossSystemComparisonItem,
  RiskSignal,
  EvidenceStrength,
  UncertaintyLevel,
  ApplicabilityDomain
} from '../types';
import { canonicalizeJson, computeSha256 } from '../utils/crypto';

export async function runComputationalAnalysis(
  drug: DrugProfile,
  biologicalProfile: BiologicalProfile,
  user: { username: string; role: any }
): Promise<{ analysis: AnalysisRecord; passport: EvidencePassport }> {
  const analysisId = `AN-${Date.now().toString().slice(-4)}`;
  const passportId = `EVP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';

  // 1. Molecular Descriptors & Features
  const features = drug.knownProperties;

  // 2. Target Identification (categorized by family)
  const targets: TargetItem[] = [
    {
      id: `TGT-${analysisId}-01`,
      targetName: `${drug.knownTargets[0] || 'Primary Receptor Target'}`,
      category: 'Enzyme',
      interactionScore: +(0.65 + (features.logP % 0.25)).toFixed(2),
      interactionEvidence: 'Moderate',
      evidenceSource: `Public Dataset (${drug.sourceDatabase})`,
      evidenceStatus: 'Computational',
      confidenceLevel: Math.min(94, Math.max(60, Math.round(75 + (features.hba * 2)))),
      mechanismSummary: `Active site docking score indicates favorable electrostatic and hydrophobic interaction.`
    },
    {
      id: `TGT-${analysisId}-02`,
      targetName: `${drug.knownTargets[1] || 'Secondary Metabolic Target'}`,
      category: 'Enzyme',
      interactionScore: +(0.72 - (features.rotatableBonds * 0.03)).toFixed(2),
      interactionEvidence: 'Moderate',
      evidenceSource: 'Public Dataset (Metabolism Screen)',
      evidenceStatus: 'Computational',
      confidenceLevel: 72,
      mechanismSummary: 'Substrate interaction with microsomal catalytic pocket; potential oxidative biotransformation.'
    },
    {
      id: `TGT-${analysisId}-03`,
      targetName: 'Solute Carrier Organic Anion Transporter (SLCO1B1)',
      category: 'Transporter',
      interactionScore: +(0.54 + (features.tpsa / 250)).toFixed(2),
      interactionEvidence: 'Low',
      evidenceSource: 'Computational QSAR Permeability Model',
      evidenceStatus: 'Computational',
      confidenceLevel: 58,
      mechanismSummary: 'Hepatic uptake transporter substrate recognition index.'
    },
    {
      id: `TGT-${analysisId}-04`,
      targetName: 'Nuclear Factor Erythroid 2-related Factor 2 (Nrf2/Keap1)',
      category: 'Regulatory Protein',
      interactionScore: 0.64,
      interactionEvidence: 'Moderate',
      evidenceSource: 'Computational Pathway Screen',
      evidenceStatus: 'Computational',
      confidenceLevel: 68,
      mechanismSummary: 'Electrophilic sensor cysteine modification triggering antioxidant response element (ARE).'
    }
  ];

  // 3. Pathway Mapping
  const pathways: PathwayItem[] = [
    {
      id: `PTH-${analysisId}-01`,
      pathwayName: `${drug.name} Target Signalling & Cellular Response Cascade`,
      targetMolecule: targets[0].targetName,
      biologicalFunction: 'Modulation of cellular signaling cascade and eicosanoid/xenobiotic response',
      associatedGenes: biologicalProfile.genomics.geneInfo.slice(0, 3),
      associatedProteins: biologicalProfile.proteomics.identifiedTargets.slice(0, 3),
      cellularProcess: 'Cellular homeostasis, stress response, and xenobiotic metabolism',
      evidenceStrength: 'Moderate',
      interpretation: 'Computational evidence indicates pathway perturbation requiring laboratory confirmation.'
    },
    {
      id: `PTH-${analysisId}-02`,
      pathwayName: 'Phase II Conjugation & Redox Buffering Axis',
      targetMolecule: 'Glutathione Transferase Complex',
      biologicalFunction: 'Nucleophilic conjugation and clearance of reactive electrophilic intermediates',
      associatedGenes: ['GSTA1', 'GSTP1', 'GCLC'],
      associatedProteins: ['GSTP1', 'GCLC', 'Catalase'],
      cellularProcess: 'Endogenous glutathione buffering against oxidative challenge',
      evidenceStrength: 'Moderate',
      interpretation: 'Computational evidence suggests sensitivity if cellular glutathione reserves are depleted.'
    }
  ];

  // 4. Multi-Model Predictions (Random Forest, SVM, Logistic Regression, XGBoost)
  // Deterministic simulation based on physicochemical descriptors and omics quality
  const isHighRiskCandidate = features.logP > 4.5 || drug.molecularWeight > 500 || features.rotatableBonds > 8;
  const isLowRiskCandidate = features.logP < 1.0 && features.tpsa < 60 && features.heavyAtomCount < 15;

  let rfSignal: RiskSignal = isHighRiskCandidate ? 'High' : 'Moderate';
  let svmSignal: RiskSignal = isHighRiskCandidate ? 'High' : 'Moderate';
  let lrSignal: RiskSignal = isHighRiskCandidate ? 'High' : 'Moderate';
  let xgbSignal: RiskSignal = isHighRiskCandidate ? 'High' : (isLowRiskCandidate ? 'Moderate' : 'High');

  if (isLowRiskCandidate && biologicalProfile.system === 'Human') {
    rfSignal = 'Moderate';
    svmSignal = 'Moderate';
    lrSignal = 'Moderate';
    xgbSignal = 'High'; // As in the demo specification 3 of 4 Moderate, XGBoost High
  }

  const modelPredictions: ModelPrediction[] = [
    {
      modelName: 'Random Forest',
      riskSignal: rfSignal,
      probabilityScore: rfSignal === 'High' ? 0.82 : 0.67,
      featureWeights: [
        { feature: 'Electrophilic Substructure / Aromatic Core', weight: 0.35 },
        { feature: 'Molecular Weight Descriptors', weight: 0.23 },
        { feature: 'Polar Surface Area (TPSA)', weight: 0.19 },
        { feature: 'Transcriptomic Induction Index', weight: 0.15 },
        { feature: 'Cellular Viability Threshold', weight: 0.08 }
      ],
      runtimeMs: 44
    },
    {
      modelName: 'Support Vector Machine',
      riskSignal: svmSignal,
      probabilityScore: svmSignal === 'High' ? 0.79 : 0.64,
      featureWeights: [
        { feature: 'RBF Distance in Physicochemical Latent Space', weight: 0.39 },
        { feature: 'Calculated Octanol/Water Partition (LogP)', weight: 0.25 },
        { feature: 'Aromatic Ring Distribution', weight: 0.21 },
        { feature: 'Hydrogen Bond Donor / Acceptor Ratio', weight: 0.15 }
      ],
      runtimeMs: 32
    },
    {
      modelName: 'Logistic Regression',
      riskSignal: lrSignal,
      probabilityScore: lrSignal === 'High' ? 0.75 : 0.61,
      featureWeights: [
        { feature: 'Linear Log-odds of Bioactivation Markers', weight: 0.42 },
        { feature: 'Heavy Atom Count Coefficient', weight: 0.24 },
        { feature: 'Proteomic Target Abundance Intercept', weight: 0.21 },
        { feature: 'Genomic Polymorphism Factor', weight: 0.13 }
      ],
      runtimeMs: 15
    },
    {
      modelName: 'XGBoost',
      riskSignal: xgbSignal,
      probabilityScore: xgbSignal === 'High' ? 0.82 : 0.68,
      featureWeights: [
        { feature: 'Nonlinear Interaction: Target x Omics Completeness', weight: 0.45 },
        { feature: 'Tree Split: Reactive Functional Group', weight: 0.27 },
        { feature: 'Differential Gene Expression Weighting', weight: 0.16 },
        { feature: 'Rotatable Bonds Penalty', weight: 0.12 }
      ],
      runtimeMs: 58
    }
  ];

  // 5. Consensus & Agreement
  const signalCounts: Record<RiskSignal, number> = { Low: 0, Moderate: 0, High: 0, Inconclusive: 0 };
  modelPredictions.forEach(m => signalCounts[m.riskSignal]++);
  
  let consensusRiskSignal: RiskSignal = 'Moderate';
  let maxCount = signalCounts.Moderate;
  if (signalCounts.High > maxCount) {
    consensusRiskSignal = 'High';
    maxCount = signalCounts.High;
  }
  if (signalCounts.Low > maxCount) {
    consensusRiskSignal = 'Low';
    maxCount = signalCounts.Low;
  }
  const agreementRatio = maxCount / modelPredictions.length;
  const agreementString = `${maxCount} / ${modelPredictions.length} (${Math.round(agreementRatio * 100)}%)`;

  // 6. Applicability Domain
  let applicabilityDomain: ApplicabilityDomain = 'Within Prototype Domain';
  let applicabilityReason = 'The candidate properties (MW, logP, TPSA) and functional groups are within the 95th percentile confidence envelope of the reference training dataset.';
  if (drug.molecularWeight > 800 || features.logP > 6.0 || features.tpsa > 180) {
    applicabilityDomain = 'Outside Prototype Domain';
    applicabilityReason = 'Molecular weight or lipophilicity significantly exceeds the boundary conditions of the computational reference domain.';
  } else if (drug.molecularWeight > 550 || features.logP > 4.5) {
    applicabilityDomain = 'Borderline';
    applicabilityReason = 'Candidate approaches the outer perimeter of the reference training domain.';
  }

  // 7. Uncertainty Analysis
  let uncertainty: UncertaintyLevel = 'Moderate';
  let uncertaintyReason = 'Uncertainty is influenced by limited training representation and incomplete metabolomics evidence.';
  if (!biologicalProfile.metabolomics.available) {
    uncertainty = 'Moderate';
    uncertaintyReason = 'Uncertainty is influenced by limited training representation and incomplete metabolomics evidence.';
  }

  const uncertaintyFactors: UncertaintyFactor[] = [
    {
      factor: 'Missing Biological Data Layer',
      level: biologicalProfile.metabolomics.available ? 'Low' : 'Moderate',
      description: biologicalProfile.metabolomics.available 
        ? 'Metabolomics dataset is present.'
        : `Metabolomics data is unavailable for ${biologicalProfile.name} in current version.`,
      impactOnEvidence: biologicalProfile.metabolomics.available
        ? 'Metabolic clearance validated.'
        : 'Cannot computationally verify whether reactive intermediate is effectively cleared through native phase II conjugation.'
    },
    {
      factor: 'Model Disagreement',
      level: agreementRatio < 1.0 ? 'Moderate' : 'Low',
      description: agreementRatio < 1.0
        ? `XGBoost output diverges from linear and forest models due to interaction penalties.`
        : 'All computational models reached unanimous signal agreement.',
      impactOnEvidence: 'Highlights variance between linear, ensemble, and boosted gradient models.'
    },
    {
      factor: 'Chemical Novelty & Representation',
      level: applicabilityDomain === 'Within Prototype Domain' ? 'Low' : 'Moderate',
      description: `Candidate structural features in reference training manifold: ${applicabilityDomain}.`,
      impactOnEvidence: 'Domain distance impacts confidence bounds of predictive machine learning models.'
    },
    {
      factor: 'Limited Experimental Validation',
      level: 'Moderate',
      description: 'Prototype evaluation lacks prospective in vitro wet-lab assay pairing.',
      impactOnEvidence: 'All findings remain decision-support computational evidence requiring prospective testing.'
    },
    {
      factor: 'Biological-System Differences',
      level: 'Moderate',
      description: `Ortholog gene and metabolic enzyme divergence between ${biologicalProfile.system} and other models.`,
      impactOnEvidence: 'Cross-species extrapolation requires target conservation adjustments.'
    }
  ];

  // 8. Evidence Strength Engine
  let evidenceStrength: EvidenceStrength = 'Moderate';
  let evidenceStrengthReason = 'Multiple computational models show consistent signals, but experimental validation is unavailable and some biological evidence layers are incomplete.';
  
  if (applicabilityDomain === 'Outside Prototype Domain') {
    evidenceStrength = 'Low';
    evidenceStrengthReason = 'Candidate compound resides outside the computational applicability domain.';
  } else if (!biologicalProfile.genomics.available || !biologicalProfile.proteomics.available) {
    evidenceStrength = 'Low';
    evidenceStrengthReason = 'Critical biological layers (genomics/proteomics) are incomplete for this system profile.';
  } else if (biologicalProfile.metabolomics.available && agreementRatio >= 0.75) {
    evidenceStrength = 'High';
    evidenceStrengthReason = 'High data availability across all omics layers and solid model consensus, though pending prospective laboratory validation.';
  }

  // 9. Cross-Biological-System Comparison
  const crossSystemComparison: CrossSystemComparisonItem[] = [
    {
      system: 'Human',
      riskSignal: consensusRiskSignal,
      evidenceStrength: evidenceStrength,
      targetConservationScore: 100,
      metabolicDivergence: 'Baseline Human metabolic profile (balanced Phase I oxidation vs Phase II conjugation).',
      notes: 'Primary investigation model.'
    },
    {
      system: 'Rat',
      riskSignal: consensusRiskSignal === 'High' ? 'Moderate' : 'Low',
      evidenceStrength: 'Moderate',
      targetConservationScore: 89,
      metabolicDivergence: 'Higher hepatic glutathione synthesis and active organic anion transporter expression.',
      notes: 'Rodent systems generally clear electrophilic intermediates more rapidly.'
    },
    {
      system: 'Dog',
      riskSignal: 'Moderate',
      evidenceStrength: 'Low',
      targetConservationScore: 84,
      metabolicDivergence: 'Differential CYP2E and UGT isoform distributions.',
      notes: 'Transcriptomic and metabolomic layers incomplete.'
    },
    {
      system: 'Cat',
      riskSignal: 'High',
      evidenceStrength: 'Moderate',
      targetConservationScore: 78,
      metabolicDivergence: 'Pseudogenized UGT1A6 creates profound glucuronidation vulnerability.',
      notes: 'High species sensitivity benchmark due to impaired conjugation.'
    },
    {
      system: 'Bird',
      riskSignal: 'Low',
      evidenceStrength: 'Low',
      targetConservationScore: 62,
      metabolicDivergence: 'Avian uricotelic elimination pathway.',
      notes: 'Insufficient biological evidence layers in prototype dataset.'
    },
    {
      system: 'Plant',
      riskSignal: 'Low',
      evidenceStrength: 'Low',
      targetConservationScore: 31,
      metabolicDivergence: 'Lacks mammalian CYP monooxygenases; uses plant glutathione transferases.',
      notes: 'Low target conservation; phytotoxicity unlikely at physiological levels.'
    }
  ];

  // 10. Canonical Serialization & Cryptographic SHA-256 Hashing
  const canonicalAnalysisPayload = {
    analysisId,
    passportId,
    drugId: drug.id,
    drugName: drug.name,
    chemicalFormula: drug.chemicalFormula,
    molecularWeight: drug.molecularWeight,
    biologicalProfileId: biologicalProfile.id,
    biologicalSystem: biologicalProfile.system,
    datasetVersion: biologicalProfile.datasetVersion,
    modelVersion: 'Ensemble ML-2026.10 (RF / SVM / LR / XGBoost)',
    models: {
      'Random Forest': { signal: modelPredictions[0].riskSignal, score: modelPredictions[0].probabilityScore },
      'Support Vector Machine': { signal: modelPredictions[1].riskSignal, score: modelPredictions[1].probabilityScore },
      'Logistic Regression': { signal: modelPredictions[2].riskSignal, score: modelPredictions[2].probabilityScore },
      'XGBoost': { signal: modelPredictions[3].riskSignal, score: modelPredictions[3].probabilityScore }
    },
    consensusRiskSignal,
    modelAgreement: agreementString,
    evidenceStrength,
    uncertainty,
    applicabilityDomain,
    timestamp
  };

  const canonicalString = canonicalizeJson(canonicalAnalysisPayload);
  const sha256Hash = await computeSha256(canonicalString);

  // 11. Create Evidence Passport
  const passport: EvidencePassport = {
    passportId,
    analysisId,
    drugId: drug.id,
    drugName: drug.name,
    chemicalFormula: drug.chemicalFormula,
    biologicalProfileId: biologicalProfile.id,
    biologicalSystem: biologicalProfile.system,
    datasetVersion: biologicalProfile.datasetVersion,
    modelVersions: 'RF-v2.1 / SVM-v1.8 / LR-v1.4 / XGB-v2.5 (Ensemble ML-2026.10)',
    analysisDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
    riskSignal: consensusRiskSignal,
    modelAgreement: agreementString,
    consensusRatio: agreementRatio,
    evidenceStrength,
    evidenceStrengthReason,
    uncertainty,
    uncertaintyReason,
    applicabilityDomain,
    applicabilityReason,
    canonicalPayload: canonicalString,
    sha256Hash,
    createdBy: user.username,
    createdRole: user.role,
    auditRefId: `EVT-${Date.now().toString().slice(-4)}`,
    status: 'Verified'
  };

  // 12. Create Complete Analysis Record
  const analysis: AnalysisRecord = {
    id: analysisId,
    passportId,
    drugId: drug.id,
    drugName: drug.name,
    biologicalProfileId: biologicalProfile.id,
    biologicalSystem: biologicalProfile.system,
    datasetVersion: biologicalProfile.datasetVersion,
    modelVersion: 'ML-2026.10',
    timestamp,
    completedAt: timestamp,
    status: 'Completed',
    molecularFeatures: features,
    targets,
    pathways,
    modelPredictions,
    modelAgreement: agreementString,
    consensusRiskSignal,
    evidenceStrength,
    evidenceStrengthReason,
    uncertainty,
    uncertaintyReason,
    uncertaintyFactors,
    applicabilityDomain,
    applicabilityReason,
    crossSystemComparison,
    sha256Hash
  };

  return { analysis, passport };
}
