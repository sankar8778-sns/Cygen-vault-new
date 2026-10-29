/**
 * CYGEN VAULT - Synthetic Demonstration Dataset
 * NOTE: All data is SYNTHETIC / PUBLIC / ILLUSTRATIVE DEMO DATA for computational research prototyping.
 */

import {
  DrugProfile,
  BiologicalProfile,
  LabRecord,
  AnalysisRecord,
  EvidencePassport,
  AuditLog,
  User,
  ComputationalReport
} from '../types';
import { canonicalizeJson, computeSha256Sync } from '../utils/crypto';

export const DEMO_USERS: User[] = [
  {
    id: 'USR-001',
    username: 'researcher',
    name: 'Dr. Evelyn Vance',
    email: 'evelyn.vance@cygenvault.org',
    role: 'Researcher',
    department: 'Computational Chemical Biology',
    lastLogin: '2026-10-07 08:00:00 UTC'
  },
  {
    id: 'USR-002',
    username: 'admin',
    name: 'Marcus Chen',
    email: 'security.admin@cygenvault.org',
    role: 'Administrator',
    department: 'Platform Security & Integrity',
    lastLogin: '2026-10-07 07:45:00 UTC'
  },
  {
    id: 'USR-003',
    username: 'reviewer',
    name: 'Dr. Sarah Al-Mansoor',
    email: 'sarah.mansoor@cygenvault.org',
    role: 'Reviewer',
    department: 'Scientific Oversight Board',
    lastLogin: '2026-10-06 16:30:00 UTC'
  },
  {
    id: 'USR-004',
    username: 'viewer',
    name: 'Guest Auditor',
    email: 'auditor.external@cygenvault.org',
    role: 'Viewer',
    department: 'Regulatory Compliance Liaison',
    lastLogin: '2026-10-05 11:15:00 UTC'
  }
];

export const INITIAL_DRUGS: DrugProfile[] = [
  {
    id: 'DG-001',
    name: 'Demo Compound A',
    chemicalFormula: 'C8H9NO2',
    molecularWeight: 151.16,
    smiles: 'CC(=O)Nc1ccc(O)cc1',
    inchi: 'InChI=1S/C8H9NO2/c1-6(10)9-7-2-4-8(11)5-3-7/h2-5,11H,1H3,(H,9,10)',
    casNumber: '103-90-2',
    knownTargets: ['COX-1 (PTGS1)', 'COX-2 (PTGS2)', 'CYP2E1 (Metabolism)', 'TRPA1 (Secondary)'],
    knownProperties: {
      logP: 0.46,
      tpsa: 49.33,
      hbd: 2,
      hba: 2,
      rotatableBonds: 1,
      heavyAtomCount: 11,
      aromaticRings: 1
    },
    knownToxicityInfo: 'In animal models, metabolic oxidation via cytochrome P450 2E1 yields reactive intermediate N-acetyl-p-benzoquinone imine (NAPQI). Risk signal is concentration and glutathione-conjugation dependent.',
    sourceDatabase: 'Public Research Dataset (Synthetic Demonstration)',
    functionalGroups: ['Secondary Amide', 'Phenol / Hydroxyl', 'Para-substituted Aromatic Ring', 'Methyl Carbonyl'],
    fingerprintBits: [1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
    createdAt: '2026-10-01 10:00:00 UTC',
    updatedAt: '2026-10-01 10:00:00 UTC'
  },
  {
    id: 'DG-002',
    name: 'Demo Kinase Scaffold B',
    chemicalFormula: 'C21H18F3N7O',
    molecularWeight: 441.42,
    smiles: 'Cc1ccc(cc1Nc2nccc(n2)c3cccnc3)NC(=O)c4ccc(cc4)C(F)(F)F',
    inchi: 'InChI=1S/C21H18F3N7O/c1-14-5-8-16(11-19(14)28-21-25-10-7-18(27-21)15-3-2-6-24-12-15)26-20(32)17-4-9-22(23,24)13-17/h2-13H,1H3,(H,26,32)(H,25,27,28)',
    casNumber: '220127-57-1',
    knownTargets: ['BCR-ABL1 Kinase', 'PDGFR-alpha/beta', 'c-KIT (CD117)'],
    knownProperties: {
      logP: 3.25,
      tpsa: 86.42,
      hbd: 2,
      hba: 6,
      rotatableBonds: 5,
      heavyAtomCount: 32,
      aromaticRings: 4
    },
    knownToxicityInfo: 'Multi-target tyrosine kinase inhibition demonstrates off-target interaction with vascular endothelial receptors; potential fluid retention and hematologic markers noted in comparative literature.',
    sourceDatabase: 'Public Kinase Benchmark Archive (Simulated)',
    functionalGroups: ['Trifluoromethyl', 'Pyridine Ring', 'Pyrimidine-Amine', 'Diarylamide'],
    fingerprintBits: [1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0],
    createdAt: '2026-10-02 11:30:00 UTC',
    updatedAt: '2026-10-02 11:30:00 UTC'
  },
  {
    id: 'DG-003',
    name: 'Demo Polyphenol Derivative C',
    chemicalFormula: 'C15H14O6',
    molecularWeight: 290.27,
    smiles: 'O=C1CC(c2ccc(O)c(O)c2)Oc3cc(O)cc(O)c13',
    inchi: 'InChI=1S/C15H14O6/c16-8-4-10(18)14-11(6-8)21-13(7-12(14)19)9-1-2-15(20)5-3-9/h1-6,13,16,18,20H,7H2',
    casNumber: '480-41-1',
    knownTargets: ['NQO1 (Oxidoreductase)', 'Nrf2 Signaling Pathway', 'Keap1 Complex'],
    knownProperties: {
      logP: 1.84,
      tpsa: 107.22,
      hbd: 4,
      hba: 6,
      rotatableBonds: 1,
      heavyAtomCount: 21,
      aromaticRings: 2
    },
    knownToxicityInfo: 'High polyphenol concentrations may induce auto-oxidation in alkaline buffered systems, generating mild reactive oxygen species in cell culture models.',
    sourceDatabase: 'Public Phytochemical Library (Simulated)',
    functionalGroups: ['Flavanone Core', 'Catechol Ring', 'Resorcinol Ring', 'Ketone Carbonyl'],
    fingerprintBits: [0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0],
    createdAt: '2026-10-03 14:15:00 UTC',
    updatedAt: '2026-10-03 14:15:00 UTC'
  }
];

export const INITIAL_BIOLOGICAL_PROFILES: BiologicalProfile[] = [
  {
    id: 'AG-S001',
    name: 'Human Research Dataset',
    system: 'Human',
    datasetVersion: 'v1.0',
    source: 'AS GARDIAN Molecular Datasets',
    validationStatus: 'Reference Benchmark Dataset',
    description: 'Human primary hepatocytes and peripheral mononuclear cells reference profile. Includes high-depth DNA sequencing and validated RNA-seq expression sets.',
    genomics: {
      available: true,
      quality: 'High',
      datasetVersion: 'v1.0',
      source: 'AS GARDIAN NextGen Reference Library',
      validationStatus: 'Standard Reference',
      details: 'High-depth whole-exome sequencing; 98.4% target coverage across core ADME genes (CYP2E1, CYP3A4, PTGS1, PTGS2, GSTP1).',
      dnaSequenceSample: 'ATGTCGGCCACCGGCTTCCTGAACCCCGTCTACAGCAAGCTGGTCATCACCAACTTC...',
      geneInfo: ['CYP2E1', 'CYP1A2', 'PTGS1', 'PTGS2', 'GSTM1', 'GSTP1', 'TP53'],
      variants: ['CYP2E1*1D (rs6413432, wild-type allele)', 'GSTP1 Ile105Val (rs1695, heterozygous)'],
      biomarkers: ['Basal hepatic CYP2E1 activity index', 'GSTP1 enzymatic baseline']
    },
    transcriptomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.0',
      source: 'AS GARDIAN RNA-seq Core',
      validationStatus: 'Computational',
      details: 'Quantified Illumina NovaSeq RNA-seq reads (TPM baseline). Modest sample depth for early post-exposure timepoints.',
      rnaExpressionMetrics: 'Mean TPM: PTGS2 (42.1 TPM), CYP2E1 (128.5 TPM), HMOX1 (18.4 TPM)',
      differentialGenes: ['PTGS2 (Log2FC +1.8)', 'HMOX1 (Log2FC +2.1)', 'GCLM (Log2FC +1.4)'],
      transcriptSummary: 'Activation of antioxidant response element transcripts detected.'
    },
    proteomics: {
      available: true,
      quality: 'High',
      datasetVersion: 'v1.0',
      source: 'AS GARDIAN Orbitrap Mass Spectrometry',
      validationStatus: 'Standard Reference',
      details: 'Tandem mass spectrometry label-free quantification of 4,820 intracellular proteins.',
      proteinAbundance: 'High relative abundance of hepatic metabolic enzymes; microsomal fraction confirmed.',
      identifiedTargets: ['Cyclooxygenase-1', 'Cyclooxygenase-2', 'Cytochrome P450 2E1', 'Glutathione S-transferase P1']
    },
    metabolomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.0',
      source: 'AS GARDIAN Metabolomics Core (Scheduled Phase 2)',
      validationStatus: 'Pending Lab Verification',
      details: 'Metabolomic profiling pending liquid chromatography mass spectrometry batch scheduling.',
      keyMetabolites: [],
      biomarkers: []
    },
    cellular: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.0',
      source: 'AS GARDIAN Microplate Cytotoxicity Core',
      validationStatus: 'Literature Supported',
      details: 'High-content imaging and ATP-luminescence viability screening in HepG2/THP-1 co-cultures.',
      cellType: 'HepG2 human hepatoma & primary human hepatocytes (PHH)',
      cellViability: '91.8% viability at baseline vehicle control; 78.4% at 100 μM simulation',
      cellProliferation: 'Stable doubling time (32.4 h)',
      apoptosis: 'Annexin-V positivity < 4.2% under baseline conditions'
    },
    createdAt: '2026-10-01 09:00:00 UTC'
  },
  {
    id: 'AG-S002',
    name: 'Rat Preclinical Toxicogenomics Model',
    system: 'Rat',
    datasetVersion: 'v1.2',
    source: 'Comparative Toxicogenomics Database (CTD Benchmark)',
    validationStatus: 'Standard Reference',
    description: 'Sprague-Dawley rat liver slice RNA and protein reference panels.',
    genomics: {
      available: true,
      quality: 'High',
      datasetVersion: 'v1.2',
      source: 'Rattus norvegicus mRatBN7.2 genome assembly',
      validationStatus: 'Standard Reference',
      details: 'Complete annotated ortholog mapping for Cyp2e1, Ptgs1, Ptgs2.',
      dnaSequenceSample: 'ATGTCGGTCACAGGTTTCCTGAACTCCGTCTACAGCAAGCTGGTCATCACCAACTTC...',
      geneInfo: ['Cyp2e1', 'Cyp1a2', 'Ptgs1', 'Ptgs2', 'Gstm1'],
      variants: ['Wild-type Sprague Dawley background'],
      biomarkers: ['Rodent Cyp2e1 activity index']
    },
    transcriptomics: {
      available: true,
      quality: 'High',
      datasetVersion: 'v1.2',
      source: 'Affymetrix Rat GeneArray 2.0',
      validationStatus: 'Standard Reference',
      details: 'Extensive time-course microarray data available across 24h exposure profiles.',
      rnaExpressionMetrics: 'Ptgs2 (38.2 TPM), Cyp2e1 (185.0 TPM)',
      differentialGenes: ['Cyp2e1', 'Hmox1', 'Gsta1'],
      transcriptSummary: 'Robust induction of phase II conjugation pathways.'
    },
    proteomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.2',
      source: 'Public Proteomics PXD018442',
      validationStatus: 'Literature Supported',
      details: 'Subcellular fraction fractionation profiles.',
      proteinAbundance: 'Elevated baseline microsomal protein levels compared to primates.',
      identifiedTargets: ['Cyp2e1', 'Ptgs1', 'Gsta1']
    },
    metabolomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.2',
      source: 'GC-TOF-MS Comparative Archive',
      validationStatus: 'Literature Supported',
      details: 'Biliary and urinary metabolite reference maps for paracetamol-like analogues.',
      keyMetabolites: ['Glucuronide conjugate', 'Sulfate conjugate', 'Mercapturic acid metabolite'],
      biomarkers: ['Urinary glutathione conjugate ratio']
    },
    cellular: {
      available: true,
      quality: 'High',
      datasetVersion: 'v1.2',
      source: 'Primary rat hepatocyte culture assays',
      validationStatus: 'Standard Reference',
      details: 'Primary rat hepatocytes exhibit rapid glutathione depletion dynamics under oxidative challenge.',
      cellType: 'Primary Sprague-Dawley Hepatocytes',
      cellViability: '88.5% at baseline',
      cellProliferation: 'Non-proliferating primary monolayer',
      apoptosis: 'Caspase-3/7 activity fold change: 1.2x'
    },
    createdAt: '2026-10-02 09:30:00 UTC'
  },
  {
    id: 'AG-S003',
    name: 'Canine Physiological Model',
    system: 'Dog',
    datasetVersion: 'v1.0',
    source: 'Canine Toxicology Research Consortium',
    validationStatus: 'Computational',
    description: 'Canis lupus familiaris liver and renal metabolic reference.',
    genomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.0',
      source: 'CanFam3.1 reference assembly',
      validationStatus: 'Computational',
      details: 'Note: Canine species exhibit distinct CYP2E and glucuronidation gene family expansions.',
      dnaSequenceSample: 'ATGTCAGCCACCGGCTTCCTGAAC...',
      geneInfo: ['CYP2E1-like', 'PTGS1', 'PTGS2', 'UGT1A6-like'],
      variants: ['Breed specific polymorphisms documented'],
      biomarkers: ['Canine liver enzyme panel']
    },
    transcriptomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.0',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'Canine transcriptomic data has not been integrated into the current prototype matrix.',
      rnaExpressionMetrics: 'N/A',
      differentialGenes: [],
      transcriptSummary: 'N/A'
    },
    proteomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.0',
      source: 'Targeted SRM assays',
      validationStatus: 'Literature Supported',
      details: 'Targeted monitoring of 12 hepatic enzymes.',
      proteinAbundance: 'Intermediate CYP expression level.',
      identifiedTargets: ['Canine PTGS2', 'Canine CYP2E1']
    },
    metabolomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.0',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'Metabolomic profiling unavailable.',
      keyMetabolites: [],
      biomarkers: []
    },
    cellular: {
      available: true,
      quality: 'Low',
      datasetVersion: 'v1.0',
      source: 'MDCK cellular transport line reference',
      validationStatus: 'Literature Supported',
      details: 'MDCK epithelial line used for apical-basolateral permeability benchmarking.',
      cellType: 'MDCK-II Epithelial Cells',
      cellViability: '94.0%',
      cellProliferation: 'High (21.5 h)',
      apoptosis: 'Baseline'
    },
    createdAt: '2026-10-03 10:00:00 UTC'
  },
  {
    id: 'AG-S004',
    name: 'Feline Metabolic Model',
    system: 'Cat',
    datasetVersion: 'v0.9',
    source: 'Feline Veterinary Genomics Project',
    validationStatus: 'Literature Supported',
    description: 'Felis catus profile emphasizing distinctive UDP-glucuronosyltransferase (UGT1A6/9) pseudogenization and metabolic vulnerability.',
    genomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v0.9',
      source: 'FelCat9 genome assembly',
      validationStatus: 'Literature Supported',
      details: 'Critical species divergence: Feline UGT1A6 possesses disabling stop codons; severely diminished glucuronidation capacity.',
      dnaSequenceSample: 'ATGTCGGCCACGGGTTTCCTGAACCCTGTCTAC...',
      geneInfo: ['UGT1A6 (Pseudogene)', 'CYP2E1', 'PTGS1', 'GSTA1'],
      variants: ['UGT1A6 exon 1 premature stop codon'],
      biomarkers: ['Methemoglobin sensitivity marker']
    },
    transcriptomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v0.9',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'Transcriptomic array unavailable.',
      rnaExpressionMetrics: 'N/A',
      differentialGenes: [],
      transcriptSummary: 'N/A'
    },
    proteomics: {
      available: true,
      quality: 'Low',
      datasetVersion: 'v0.9',
      source: 'Comparative Western blot meta-analysis',
      validationStatus: 'Literature Supported',
      details: 'Quantified lack of functional UGT protein expression.',
      proteinAbundance: 'Absence of UGT1A6 band in feline liver microsomes.',
      identifiedTargets: ['Feline CYP2E1', 'Feline PTGS1']
    },
    metabolomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v0.9',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'N/A',
      keyMetabolites: [],
      biomarkers: []
    },
    cellular: {
      available: true,
      quality: 'Low',
      datasetVersion: 'v0.9',
      source: 'CRFK (Crandell-Rees Feline Kidney)',
      validationStatus: 'Computational',
      details: 'Renal cell line response data only.',
      cellType: 'CRFK Epithelial Cells',
      cellViability: '92.1%',
      cellProliferation: 'Active',
      apoptosis: 'Baseline'
    },
    createdAt: '2026-10-04 11:00:00 UTC'
  },
  {
    id: 'AG-S005',
    name: 'Avian Toxicological Model',
    system: 'Bird',
    datasetVersion: 'v1.1',
    source: 'Avian Comparative Genomics Registry',
    validationStatus: 'Computational',
    description: 'Gallus gallus embryonic model dataset.',
    genomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.1',
      source: 'GRCg6a assembly',
      validationStatus: 'Computational',
      details: 'Divergent renal clearance and uric acid metabolic handling genes.',
      dnaSequenceSample: 'ATGTCGGCCAGCGGCTTCCTGAA...',
      geneInfo: ['CYP2C45', 'PTGS1', 'PTGS2'],
      variants: ['Avian lineage specific duplications'],
      biomarkers: ['Uric acid metabolic markers']
    },
    transcriptomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.1',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'N/A',
      rnaExpressionMetrics: 'N/A',
      differentialGenes: [],
      transcriptSummary: 'N/A'
    },
    proteomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.1',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'N/A',
      proteinAbundance: 'N/A',
      identifiedTargets: []
    },
    metabolomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.1',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'N/A',
      keyMetabolites: [],
      biomarkers: []
    },
    cellular: {
      available: true,
      quality: 'Low',
      datasetVersion: 'v1.1',
      source: 'DF-1 chicken embryonic fibroblasts',
      validationStatus: 'Literature Supported',
      details: 'In vitro embryonic fibroblast viability assay.',
      cellType: 'DF-1 Chicken Embryonic Fibroblast',
      cellViability: '89.0%',
      cellProliferation: 'Rapid',
      apoptosis: 'Baseline'
    },
    createdAt: '2026-10-04 14:00:00 UTC'
  },
  {
    id: 'AG-S006',
    name: 'Arabidopsis Phytotoxicity Biomarker Set',
    system: 'Plant',
    datasetVersion: 'v1.0',
    source: 'Plant Phytochemical Vulnerability Consortium',
    validationStatus: 'Computational',
    description: 'Arabidopsis thaliana seedling root-growth inhibition and reactive oxygen species response dataset.',
    genomics: {
      available: true,
      quality: 'High',
      datasetVersion: 'v1.0',
      source: 'TAIR10 reference genome',
      validationStatus: 'Standard Reference',
      details: 'Plant-specific glutathione S-transferase and ABC-transporter family annotations.',
      dnaSequenceSample: 'ATGGCTTCAGTCACAGGTTTCCTGAACCCT...',
      geneInfo: ['AtGSTU19', 'AtGSTF2', 'AtPDR12', 'AtCAT1'],
      variants: ['Col-0 ecotype reference'],
      biomarkers: ['Root elongation inhibition index']
    },
    transcriptomics: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.0',
      source: 'Arabidopsis Microarray Repository',
      validationStatus: 'Literature Supported',
      details: 'Root tissue transcriptional response to xenobiotic exposure.',
      rnaExpressionMetrics: 'AtGSTU19 (Log2FC +3.2), AtHSP70 (Log2FC +1.9)',
      differentialGenes: ['AtGSTU19', 'AtCAT1', 'AtPDR12'],
      transcriptSummary: 'Activation of plant xenobiotic detoxification regulon.'
    },
    proteomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.0',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'N/A',
      proteinAbundance: 'N/A',
      identifiedTargets: []
    },
    metabolomics: {
      available: false,
      quality: 'Unavailable',
      datasetVersion: 'v1.0',
      source: 'Not available in prototype dataset',
      validationStatus: 'Pending Lab Verification',
      details: 'N/A',
      keyMetabolites: [],
      biomarkers: []
    },
    cellular: {
      available: true,
      quality: 'Moderate',
      datasetVersion: 'v1.0',
      source: 'Root tip elongation microscopy assays',
      validationStatus: 'Computational',
      details: 'Hydroponic seedling exposure root length quantification.',
      cellType: 'Root apical meristem cells',
      cellViability: '95.2%',
      cellProliferation: 'Elongation rate 1.2 mm/day',
      apoptosis: 'Non-apoptotic plant programmed cell death baseline'
    },
    createdAt: '2026-10-05 08:30:00 UTC'
  }
];

export const INITIAL_LAB_RECORDS: LabRecord[] = [
  {
    id: 'AG-LAB-2026-001',
    sampleId: 'AG-S001',
    laboratory: 'AS GARDIAN',
    sampleType: 'Research Dataset',
    analysisRequested: 'DNA + RNA',
    batchId: 'AG-EXT-2026-B04',
    datasetVersion: 'v1.0',
    timestamp: '2026-10-06 14:22:18 UTC',
    operator: 'Dr. Evelyn Vance (AS GARDIAN Senior Analyst)',
    dna: {
      status: 'Completed',
      concentration: 84.5, // ng/μL
      a260_a280: 1.85,
      a260_a230: 2.12,
      integrity: 'DIN 8.7',
      extractionBatch: 'AG-EXT-2026-B04-DNA',
      datasetVersion: 'v1.0'
    },
    rna: {
      status: 'Completed',
      concentration: 112.3, // ng/μL
      a260_a280: 2.02,
      a260_a230: 2.08,
      integrity: 'RIN 9.1',
      dnaseTreatment: 'Completed',
      extractionBatch: 'AG-EXT-2026-B04-RNA',
      datasetVersion: 'v1.0'
    },
    notes: 'Sample passed all spectral purity and fragment integrity gates. High molecular weight DNA confirmed by microcapillary electrophoresis. RNA RIN 9.1 confirms suitability for deep sequencing.'
  },
  {
    id: 'AG-LAB-2026-002',
    sampleId: 'AG-S002',
    laboratory: 'AS GARDIAN',
    sampleType: 'Comparative Reference Batch',
    analysisRequested: 'DNA + RNA',
    batchId: 'AG-EXT-2026-B05',
    datasetVersion: 'v1.2',
    timestamp: '2026-10-07 06:45:10 UTC',
    operator: 'Tech Specialist K. Ramos',
    dna: {
      status: 'Completed',
      concentration: 92.1,
      a260_a280: 1.88,
      a260_a230: 2.15,
      integrity: 'DIN 8.9',
      extractionBatch: 'AG-EXT-2026-B05-DNA',
      datasetVersion: 'v1.2'
    },
    rna: {
      status: 'Completed',
      concentration: 135.0,
      a260_a280: 2.05,
      a260_a230: 2.18,
      integrity: 'RIN 9.4',
      dnaseTreatment: 'Completed',
      extractionBatch: 'AG-EXT-2026-B05-RNA',
      datasetVersion: 'v1.2'
    },
    notes: 'Rat hepatic tissue sample processed under flash-frozen protocol. High yield and high RNA integrity.'
  }
];

// Seed analysis record matching section 25 of prompt
const demoAnalysisCanonicalData = {
  analysisId: 'AN-0001',
  passportId: 'EVP-2026-0001',
  drugId: 'DG-001',
  drugName: 'Demo Compound A',
  chemicalFormula: 'C8H9NO2',
  molecularWeight: 151.16,
  biologicalProfileId: 'AG-S001',
  biologicalSystem: 'Human',
  datasetVersion: 'v1.0',
  modelVersion: 'Ensemble ML-2026.10 (RF / SVM / LR / XGBoost)',
  models: {
    'Random Forest': { signal: 'Moderate', score: 0.68 },
    'Support Vector Machine': { signal: 'Moderate', score: 0.65 },
    'Logistic Regression': { signal: 'Moderate', score: 0.62 },
    'XGBoost': { signal: 'High', score: 0.81 }
  },
  consensusRiskSignal: 'Moderate',
  modelAgreement: '3 / 4 (75%)',
  evidenceStrength: 'Moderate',
  uncertainty: 'Moderate',
  applicabilityDomain: 'Within Prototype Domain',
  timestamp: '2026-10-07 08:00:00 UTC'
};

const canonicalPayloadString = canonicalizeJson(demoAnalysisCanonicalData);
const demoSha256Hash = computeSha256Sync(canonicalPayloadString);

export const INITIAL_EVIDENCE_PASSPORTS: EvidencePassport[] = [
  {
    passportId: 'EVP-2026-0001',
    analysisId: 'AN-0001',
    drugId: 'DG-001',
    drugName: 'Demo Compound A',
    chemicalFormula: 'C8H9NO2',
    biologicalProfileId: 'AG-S001',
    biologicalSystem: 'Human',
    datasetVersion: 'v1.0',
    modelVersions: 'RF-v2.1 / SVM-v1.8 / LR-v1.4 / XGB-v2.5 (Ensemble ML-2026.10)',
    analysisDate: '07 October 2026',
    riskSignal: 'Moderate',
    modelAgreement: '3 / 4 (75%)',
    consensusRatio: 0.75,
    evidenceStrength: 'Moderate',
    evidenceStrengthReason: 'Three of four computational models produced a consistent signal, but experimental validation is unavailable and some biological evidence layers (metabolomics) are incomplete.',
    uncertainty: 'Moderate',
    uncertaintyReason: 'Uncertainty is influenced by limited training representation and incomplete metabolomics evidence.',
    applicabilityDomain: 'Within Prototype Domain',
    applicabilityReason: 'The candidate contains chemical features and physicochemical descriptors (MW 151.16, logP 0.46, TPSA 49.33) well-spanned by the prototype training dataset domain boundaries.',
    canonicalPayload: canonicalPayloadString,
    sha256Hash: demoSha256Hash,
    createdBy: 'researcher',
    createdRole: 'Researcher',
    auditRefId: 'EVT-2026-0042',
    status: 'Verified'
  }
];

export const INITIAL_ANALYSES: AnalysisRecord[] = [
  {
    id: 'AN-0001',
    passportId: 'EVP-2026-0001',
    drugId: 'DG-001',
    drugName: 'Demo Compound A',
    biologicalProfileId: 'AG-S001',
    biologicalSystem: 'Human',
    datasetVersion: 'v1.0',
    modelVersion: 'ML-2026.10',
    timestamp: '2026-10-07 07:55:00 UTC',
    completedAt: '2026-10-07 08:00:00 UTC',
    status: 'Completed',
    molecularFeatures: {
      logP: 0.46,
      tpsa: 49.33,
      hbd: 2,
      hba: 2,
      rotatableBonds: 1,
      heavyAtomCount: 11,
      aromaticRings: 1
    },
    targets: [
      {
        id: 'TGT-001',
        targetName: 'Cyclooxygenase-2 (PTGS2)',
        category: 'Enzyme',
        interactionScore: 0.82,
        interactionEvidence: 'Moderate',
        evidenceSource: 'Public Dataset (ChEMBL / BindingDB simulated)',
        evidenceStatus: 'Computational',
        confidenceLevel: 82,
        mechanismSummary: 'Selective active site binding pocket interaction at Tyr385 / Ser530.'
      },
      {
        id: 'TGT-002',
        targetName: 'Cytochrome P450 2E1 (CYP2E1)',
        category: 'Enzyme',
        interactionScore: 0.74,
        interactionEvidence: 'Moderate',
        evidenceSource: 'Public Dataset (P450 Metabolism Screen simulated)',
        evidenceStatus: 'Computational',
        confidenceLevel: 74,
        mechanismSummary: 'Phase I bioactivation substrate; leads to transient quinoneimine reactive intermediate generation.'
      },
      {
        id: 'TGT-003',
        targetName: 'Transient Receptor Potential A1 (TRPA1)',
        category: 'Ion Channel',
        interactionScore: 0.58,
        interactionEvidence: 'Low',
        evidenceSource: 'Public Dataset (Ion Channel QSAR simulated)',
        evidenceStatus: 'Computational',
        confidenceLevel: 58,
        mechanismSummary: 'Modest electrophilic interaction with cysteine residue cluster in ankyrin repeat domain.'
      },
      {
        id: 'TGT-004',
        targetName: 'Glutathione S-Transferase P (GSTP1)',
        category: 'Enzyme',
        interactionScore: 0.69,
        interactionEvidence: 'Moderate',
        evidenceSource: 'Public Dataset (Phase II Conjugation screen simulated)',
        evidenceStatus: 'Computational',
        confidenceLevel: 69,
        mechanismSummary: 'Phase II conjugation pathway facilitating nucleophilic glutathione quenching.'
      }
    ],
    pathways: [
      {
        id: 'PTH-001',
        pathwayName: 'Demo Prostaglandin & Inflammatory Signaling Pathway',
        targetMolecule: 'PTGS2 / Cyclooxygenase-2',
        biologicalFunction: 'Conversion of arachidonic acid to prostaglandin H2',
        associatedGenes: ['PTGS1', 'PTGS2', 'PLA2G4A'],
        associatedProteins: ['COX-2', 'cPLA2', 'PGE synthase'],
        cellularProcess: 'Modulation of prostaglandin synthesis and local inflammatory signaling',
        evidenceStrength: 'Moderate',
        interpretation: 'Computational evidence indicating down-regulation of pro-inflammatory eicosanoids. Requires experimental validation.'
      },
      {
        id: 'PTH-002',
        pathwayName: 'Demo Xenobiotic Metabolism & Reactive Metabolite Formation',
        targetMolecule: 'CYP2E1 / Glutathione Pool',
        biologicalFunction: 'Microsomal drug oxidation and Phase II mercapturic acid conjugation',
        associatedGenes: ['CYP2E1', 'GSTA1', 'GSTP1', 'GCLC'],
        associatedProteins: ['Cytochrome P450 2E1', 'Glutathione Synthetase', 'Catalase'],
        cellularProcess: 'Antioxidant depletion and oxidative challenge upon glutathione saturation',
        evidenceStrength: 'Moderate',
        interpretation: 'Computational signal suggests secondary oxidative stress potential under depleted glutathione states. Laboratory titration required.'
      }
    ],
    modelPredictions: [
      {
        modelName: 'Random Forest',
        riskSignal: 'Moderate',
        probabilityScore: 0.68,
        featureWeights: [
          { feature: 'Electrophilic Substructure / NAPQI Scaffold', weight: 0.34 },
          { feature: 'Molecular Weight (151.16)', weight: 0.22 },
          { feature: 'Polar Surface Area (49.33)', weight: 0.18 },
          { feature: 'Transcriptomic HMOX1 Induction', weight: 0.16 },
          { feature: 'Baseline Cellular Viability', weight: 0.10 }
        ],
        runtimeMs: 42
      },
      {
        modelName: 'Support Vector Machine',
        riskSignal: 'Moderate',
        probabilityScore: 0.65,
        featureWeights: [
          { feature: 'RBF Support Distance to ADME Cluster', weight: 0.38 },
          { feature: 'LogP (0.46)', weight: 0.24 },
          { feature: 'Aromatic Ring Count (1)', weight: 0.20 },
          { feature: 'Hydrogen Bond Donors (2)', weight: 0.18 }
        ],
        runtimeMs: 31
      },
      {
        modelName: 'Logistic Regression',
        riskSignal: 'Moderate',
        probabilityScore: 0.62,
        featureWeights: [
          { feature: 'Normalized Reactive Group Log-odds', weight: 0.40 },
          { feature: 'Heavy Atom Count Beta', weight: 0.26 },
          { feature: 'Proteomic CYP2E1 Abundance', weight: 0.21 },
          { feature: 'Genomic Variant Risk Factor', weight: 0.13 }
        ],
        runtimeMs: 14
      },
      {
        modelName: 'XGBoost',
        riskSignal: 'High',
        probabilityScore: 0.81,
        featureWeights: [
          { feature: 'Nonlinear Interaction: CYP2E1 x Missing Metabolomics', weight: 0.44 },
          { feature: 'Gradient Tree Split: Free Phenol / Para-Amide', weight: 0.28 },
          { feature: 'HMOX1 Transcript Ratio Split', weight: 0.17 },
          { feature: 'Rotatable Bonds Penalization', weight: 0.11 }
        ],
        runtimeMs: 55
      }
    ],
    modelAgreement: '3 / 4 (75%)',
    consensusRiskSignal: 'Moderate',
    evidenceStrength: 'Moderate',
    evidenceStrengthReason: 'Three of four computational models produced a consistent signal, but experimental validation is unavailable and some biological evidence layers (metabolomics) are incomplete.',
    uncertainty: 'Moderate',
    uncertaintyReason: 'Uncertainty is influenced by limited training representation and incomplete metabolomics evidence.',
    uncertaintyFactors: [
      {
        factor: 'Missing Biological Data Layer',
        level: 'Moderate',
        description: 'Metabolomics dataset for sample AG-S001 is unavailable in the current version.',
        impactOnEvidence: 'Cannot verify whether reactive intermediate is effectively cleared through native phase II conjugation.'
      },
      {
        factor: 'Model Disagreement (XGBoost Outlier)',
        level: 'Moderate',
        description: 'XGBoost predicted High Risk Signal (0.81) due to heavily weighted nonlinear tree interaction between bioactivation potential and missing metabolomics, while 3 models predicted Moderate.',
        impactOnEvidence: 'Indicates sensitivity to model architectural assumptions regarding non-linear compound dynamics.'
      },
      {
        factor: 'Limited Experimental Validation',
        level: 'Moderate',
        description: 'No wet-lab confirmation has been logged for this specific computational batch.',
        impactOnEvidence: 'All conclusions remain decision-support computational evidence.'
      },
      {
        factor: 'Biological-System Differences',
        level: 'Moderate',
        description: 'Cross-species metabolic divergence exists between human hepatocytes and preclinical models.',
        impactOnEvidence: 'Findings cannot be generalized directly across other biological species without orthology calibration.'
      }
    ],
    applicabilityDomain: 'Within Prototype Domain',
    applicabilityReason: 'The candidate chemical properties (MW 151.16, logP 0.46, TPSA 49.33) and molecular fingerprint bits fall comfortably within the 95th percentile confidence envelope of the reference training library.',
    crossSystemComparison: [
      {
        system: 'Human',
        riskSignal: 'Moderate',
        evidenceStrength: 'Moderate',
        targetConservationScore: 100,
        metabolicDivergence: 'Baseline Human metabolic profile (balanced CYP bioactivation vs UGT conjugation).',
        notes: 'Primary investigation model.'
      },
      {
        system: 'Rat',
        riskSignal: 'Low',
        evidenceStrength: 'Moderate',
        targetConservationScore: 89,
        metabolicDivergence: 'Significantly higher glutathione synthesis and biliary clearance capacity.',
        notes: 'Rodents show higher tolerance threshold due to rapid phase II regeneration.'
      },
      {
        system: 'Dog',
        riskSignal: 'Moderate',
        evidenceStrength: 'Low',
        targetConservationScore: 84,
        metabolicDivergence: 'Differential CYP2E and UGT isoform distributions.',
        notes: 'Limited transcriptomic data available in canine model.'
      },
      {
        system: 'Cat',
        riskSignal: 'High',
        evidenceStrength: 'Moderate',
        targetConservationScore: 78,
        metabolicDivergence: 'Deficiency in UGT1A6 glucuronidation makes reactive intermediate accumulation more rapid.',
        notes: 'Critical feline species vulnerability benchmark.'
      },
      {
        system: 'Bird',
        riskSignal: 'Low',
        evidenceStrength: 'Low',
        targetConservationScore: 62,
        metabolicDivergence: 'Avian uricotelic metabolism and divergence in orthologous CYP clusters.',
        notes: 'Insufficient biological evidence layers in prototype dataset.'
      },
      {
        system: 'Plant',
        riskSignal: 'Low',
        evidenceStrength: 'Low',
        targetConservationScore: 31,
        metabolicDivergence: 'Plant systems lack mammalian CYP2E1; detoxification occurs via plant GST tau/phi classes.',
        notes: 'Minimal target conservation; phytotoxicity unlikely at physiological levels.'
      }
    ],
    sha256Hash: demoSha256Hash
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'EVT-2026-0040',
    timestamp: '2026-10-07 07:45:00 UTC',
    user: 'researcher',
    role: 'Researcher',
    action: 'Login',
    resource: 'AuthService',
    resourceId: 'USR-001',
    status: 'Success',
    ipAddress: '10.240.0.14 (Internal)',
    details: 'User authenticated successfully via credentials session.'
  },
  {
    id: 'EVT-2026-0041',
    timestamp: '2026-10-07 07:55:00 UTC',
    user: 'researcher',
    role: 'Researcher',
    action: 'Analysis Execution',
    resource: 'ComputationalEngine',
    resourceId: 'AN-0001',
    status: 'Success',
    ipAddress: '10.240.0.14 (Internal)',
    details: 'Executed multi-model pipeline for Drug DG-001 against Biological System AG-S001 (Human).'
  },
  {
    id: 'EVT-2026-0042',
    timestamp: '2026-10-07 08:00:00 UTC',
    user: 'researcher',
    role: 'Researcher',
    action: 'Evidence Passport Creation',
    resource: 'EvidencePassport',
    resourceId: 'EVP-2026-0001',
    status: 'Success',
    ipAddress: '10.240.0.14 (Internal)',
    details: `Generated canonical serialization and sealed SHA-256 integrity hash: ${demoSha256Hash.substring(0, 16)}...`
  },
  {
    id: 'EVT-2026-0043',
    timestamp: '2026-10-07 08:01:25 UTC',
    user: 'researcher',
    role: 'Researcher',
    action: 'Evidence Verification',
    resource: 'IntegrityEngine',
    resourceId: 'EVP-2026-0001',
    status: 'Success',
    ipAddress: '10.240.0.14 (Internal)',
    details: 'SHA-256 integrity check verified match between stored hash and calculated canonical payload.'
  },
  {
    id: 'EVT-2026-0044',
    timestamp: '2026-10-07 08:02:10 UTC',
    user: 'researcher',
    role: 'Researcher',
    action: 'Report Generation',
    resource: 'ReportBuilder',
    resourceId: 'RPT-2026-0001',
    status: 'Success',
    ipAddress: '10.240.0.14 (Internal)',
    details: 'Compiled Final Computational Report for AN-0001 under version control ML-2026.10 / Dataset v1.0.'
  }
];

export const INITIAL_REPORTS: ComputationalReport[] = [
  {
    reportId: 'RPT-2026-0001',
    analysisId: 'AN-0001',
    passportId: 'EVP-2026-0001',
    title: 'CYGEN VAULT Computational Evidence Report: Demo Compound A',
    drugName: 'Demo Compound A',
    chemicalFormula: 'C8H9NO2',
    biologicalSystem: 'Human Research Dataset (AG-S001)',
    molecularEvidenceStatus: 'Available (Descriptors, Fingerprint, Functional Groups)',
    biologicalEvidenceStatus: 'Available (Genomics High, Transcriptomics Moderate, Proteomics High, Metabolomics Unavailable)',
    targetAnalysisSummary: 'Potential interaction identified with PTGS2 (COX-2) and CYP2E1 metabolic complex.',
    pathwayAnalysisSummary: 'Potential pathway perturbation identified in prostanoid synthesis and xenobiotic bioactivation signaling.',
    aiMlResult: 'Moderate',
    modelAgreement: '3 / 4 Models (75%)',
    evidenceStrength: 'Moderate',
    evidenceStrengthReason: 'Three of four computational models produced a consistent signal, but experimental validation is unavailable and some biological evidence layers (metabolomics) are incomplete.',
    uncertainty: 'Moderate',
    uncertaintyReason: 'Uncertainty is influenced by limited training representation and incomplete metabolomics evidence.',
    applicabilityDomain: 'Within Prototype Domain',
    experimentalRecommendation: 'Prioritize the computationally identified signal for appropriate experimental investigation (e.g. glutathione depletion titration and LC-MS metabolite confirmation).',
    scientificStatement: 'Computational results are decision-support evidence and must be interpreted alongside laboratory, clinical and regulatory validation. This computational research prototype does not claim clinical safety or toxicity.',
    datasetVersion: 'v1.0',
    modelVersions: 'RF-v2.1 / SVM-v1.8 / LR-v1.4 / XGB-v2.5 (Ensemble ML-2026.10)',
    sha256Hash: demoSha256Hash,
    generatedBy: 'Dr. Evelyn Vance (Researcher)',
    generatedAt: '2026-10-07 08:02:10 UTC',
    auditReference: 'EVT-2026-0044'
  }
];
