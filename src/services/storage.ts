/**
 * CYGEN VAULT - Unified Data Storage & Audit Service Layer
 * Provides persistent relational-like repository with automated audit logging.
 */

import {
  DrugProfile,
  BiologicalProfile,
  LabRecord,
  AnalysisRecord,
  EvidencePassport,
  AuditLog,
  User,
  ComputationalReport,
  UserRole
} from '../types';
import {
  DEMO_USERS,
  INITIAL_DRUGS,
  INITIAL_BIOLOGICAL_PROFILES,
  INITIAL_LAB_RECORDS,
  INITIAL_ANALYSES,
  INITIAL_EVIDENCE_PASSPORTS,
  INITIAL_AUDIT_LOGS,
  INITIAL_REPORTS
} from '../data/mockData';

const KEYS = {
  DRUGS: 'cygen_vault_drugs_v1',
  BIO_PROFILES: 'cygen_vault_bio_profiles_v1',
  LAB_RECORDS: 'cygen_vault_lab_records_v1',
  ANALYSES: 'cygen_vault_analyses_v1',
  PASSPORTS: 'cygen_vault_passports_v1',
  AUDIT_LOGS: 'cygen_vault_audit_logs_v1',
  REPORTS: 'cygen_vault_reports_v1',
  CURRENT_USER: 'cygen_vault_current_user_v1'
};

function getStorage<T>(key: string, defaultVal: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (err) {
    console.warn('Storage set failed', err);
  }
}

export class CygenVaultStorage {
  // Current User
  static getCurrentUser(): User {
    const user = getStorage<User | null>(KEYS.CURRENT_USER, null);
    if (user) return user;
    return DEMO_USERS[0]; // Default to 'researcher'
  }

  static setCurrentUser(user: User | null): void {
    if (user) {
      setStorage(KEYS.CURRENT_USER, user);
      this.logAudit({
        action: 'Login',
        resource: 'AuthService',
        resourceId: user.id,
        status: 'Success',
        details: `User ${user.username} authenticated with role ${user.role}.`
      });
    } else {
      const prev = this.getCurrentUser();
      localStorage.removeItem(KEYS.CURRENT_USER);
      this.logAudit({
        action: 'Logout',
        resource: 'AuthService',
        resourceId: prev?.id || 'ANON',
        status: 'Success',
        details: `User ${prev?.username || 'Unknown'} logged out.`
      });
    }
  }

  static switchRole(newRole: UserRole): User {
    const current = this.getCurrentUser();
    const updated = { ...current, role: newRole };
    setStorage(KEYS.CURRENT_USER, updated);
    this.logAudit({
      action: 'Role Change',
      resource: 'RoleRBAC',
      resourceId: current.id,
      status: 'Success',
      details: `Active role updated from ${current.role} to ${newRole}.`
    });
    return updated;
  }

  // Audit Logs
  static getAuditLogs(): AuditLog[] {
    return getStorage<AuditLog[]>(KEYS.AUDIT_LOGS, INITIAL_AUDIT_LOGS);
  }

  static logAudit(entry: Omit<AuditLog, 'id' | 'timestamp' | 'user' | 'role' | 'ipAddress'> & Partial<AuditLog>): AuditLog {
    const logs = this.getAuditLogs();
    const currentUser = this.getCurrentUser();
    const newLog: AuditLog = {
      id: `EVT-${Date.now().toString().slice(-4)}${Math.floor(Math.random() * 90 + 10)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      user: entry.user || currentUser.username,
      role: entry.role || currentUser.role,
      action: entry.action,
      resource: entry.resource,
      resourceId: entry.resourceId,
      status: entry.status || 'Success',
      ipAddress: entry.ipAddress || '10.240.0.14 (Internal)',
      details: entry.details
    };
    logs.unshift(newLog);
    setStorage(KEYS.AUDIT_LOGS, logs);
    return newLog;
  }

  // Drugs
  static getDrugs(): DrugProfile[] {
    return getStorage<DrugProfile[]>(KEYS.DRUGS, INITIAL_DRUGS);
  }

  static getDrugById(id: string): DrugProfile | undefined {
    return this.getDrugs().find(d => d.id === id);
  }

  static saveDrug(drug: DrugProfile): void {
    const drugs = this.getDrugs();
    const index = drugs.findIndex(d => d.id === drug.id);
    const isNew = index === -1;
    if (isNew) {
      drugs.push(drug);
    } else {
      drugs[index] = drug;
    }
    setStorage(KEYS.DRUGS, drugs);
    this.logAudit({
      action: isNew ? 'Data Creation' : 'Data Modification',
      resource: 'DrugRegistry',
      resourceId: drug.id,
      status: 'Success',
      details: `${isNew ? 'Registered new' : 'Updated'} drug record for "${drug.name}" (${drug.chemicalFormula}).`
    });
  }

  static archiveDrug(id: string): void {
    const drugs = this.getDrugs();
    const drug = drugs.find(d => d.id === id);
    if (!drug) return;
    drug.isArchived = true;
    drug.updatedAt = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
    setStorage(KEYS.DRUGS, drugs);
    this.logAudit({
      action: 'Data Deletion/Archive',
      resource: 'DrugRegistry',
      resourceId: id,
      status: 'Warning',
      details: `Archived drug profile "${drug.name}" (ID: ${id}).`
    });
  }

  // Biological Profiles
  static getBiologicalProfiles(): BiologicalProfile[] {
    return getStorage<BiologicalProfile[]>(KEYS.BIO_PROFILES, INITIAL_BIOLOGICAL_PROFILES);
  }

  static getBiologicalProfileById(id: string): BiologicalProfile | undefined {
    return this.getBiologicalProfiles().find(b => b.id === id);
  }

  static saveBiologicalProfile(profile: BiologicalProfile): void {
    const profiles = this.getBiologicalProfiles();
    const index = profiles.findIndex(p => p.id === profile.id);
    const isNew = index === -1;
    if (isNew) {
      profiles.push(profile);
    } else {
      profiles[index] = profile;
    }
    setStorage(KEYS.BIO_PROFILES, profiles);
    this.logAudit({
      action: isNew ? 'Data Creation' : 'Data Modification',
      resource: 'BiologicalProfile',
      resourceId: profile.id,
      status: 'Success',
      details: `${isNew ? 'Created' : 'Modified'} biological system profile "${profile.name}" (${profile.system}).`
    });
  }

  // Lab Records
  static getLabRecords(): LabRecord[] {
    return getStorage<LabRecord[]>(KEYS.LAB_RECORDS, INITIAL_LAB_RECORDS);
  }

  static saveLabRecord(record: LabRecord): void {
    const records = this.getLabRecords();
    records.unshift(record);
    setStorage(KEYS.LAB_RECORDS, records);
    this.logAudit({
      action: 'Data Upload',
      resource: 'AS_GARDIAN_Lab',
      resourceId: record.id,
      status: 'Success',
      details: `Logged AS GARDIAN laboratory sample record for ${record.sampleId} (${record.analysisRequested}).`
    });
  }

  // Analyses
  static getAnalyses(): AnalysisRecord[] {
    return getStorage<AnalysisRecord[]>(KEYS.ANALYSES, INITIAL_ANALYSES);
  }

  static getAnalysisById(id: string): AnalysisRecord | undefined {
    return this.getAnalyses().find(a => a.id === id);
  }

  static saveAnalysis(analysis: AnalysisRecord): void {
    const list = this.getAnalyses();
    list.unshift(analysis);
    setStorage(KEYS.ANALYSES, list);
    this.logAudit({
      action: 'Analysis Execution',
      resource: 'ComputationalEngine',
      resourceId: analysis.id,
      status: 'Success',
      details: `Completed computational analysis for ${analysis.drugName} vs ${analysis.biologicalSystem}. Risk Signal: ${analysis.consensusRiskSignal}.`
    });
  }

  // Evidence Passports
  static getPassports(): EvidencePassport[] {
    return getStorage<EvidencePassport[]>(KEYS.PASSPORTS, INITIAL_EVIDENCE_PASSPORTS);
  }

  static getPassportById(id: string): EvidencePassport | undefined {
    return this.getPassports().find(p => p.passportId === id);
  }

  static savePassport(passport: EvidencePassport): void {
    const passports = this.getPassports();
    const index = passports.findIndex(p => p.passportId === passport.passportId);
    if (index === -1) {
      passports.unshift(passport);
    } else {
      passports[index] = passport;
    }
    setStorage(KEYS.PASSPORTS, passports);
    this.logAudit({
      action: 'Evidence Passport Creation',
      resource: 'EvidencePassport',
      resourceId: passport.passportId,
      status: 'Success',
      details: `Issued Evidence Passport ${passport.passportId} with SHA-256 seal: ${passport.sha256Hash.substring(0, 16)}...`
    });
  }

  // Tampering simulation for verification testing!
  static simulateTamperPassport(passportId: string): void {
    const passports = this.getPassports();
    const p = passports.find(item => item.passportId === passportId);
    if (!p) return;
    try {
      const parsed = JSON.parse(p.canonicalPayload);
      parsed.riskSignal = 'Low (Tampered)';
      parsed.unauthorizedModification = 'TAMPERED_BY_SIMULATION';
      p.canonicalPayload = JSON.stringify(parsed);
      p.status = 'Flagged';
      setStorage(KEYS.PASSPORTS, passports);
      this.logAudit({
        action: 'Data Modification',
        resource: 'SecurityTestSandbox',
        resourceId: passportId,
        status: 'Warning',
        details: `Simulated unauthorized byte modification on Evidence Passport ${passportId} payload to test integrity alarm.`
      });
    } catch (e) {
      console.error(e);
    }
  }

  static resetTamperedPassport(passportId: string, originalPayload: string): void {
    const passports = this.getPassports();
    const p = passports.find(item => item.passportId === passportId);
    if (!p) return;
    p.canonicalPayload = originalPayload;
    p.status = 'Verified';
    setStorage(KEYS.PASSPORTS, passports);
    this.logAudit({
      action: 'Data Modification',
      resource: 'SecurityTestSandbox',
      resourceId: passportId,
      status: 'Success',
      details: `Restored authentic canonical payload for Evidence Passport ${passportId}.`
    });
  }

  // Reports
  static getReports(): ComputationalReport[] {
    return getStorage<ComputationalReport[]>(KEYS.REPORTS, INITIAL_REPORTS);
  }

  static saveReport(report: ComputationalReport): void {
    const reports = this.getReports();
    reports.unshift(report);
    setStorage(KEYS.REPORTS, reports);
    this.logAudit({
      action: 'Report Generation',
      resource: 'ReportBuilder',
      resourceId: report.reportId,
      status: 'Success',
      details: `Generated computational report ${report.reportId} for ${report.drugName}.`
    });
  }

  // Reset demo dataset
  static resetToDefaultDemo(): void {
    localStorage.removeItem(KEYS.DRUGS);
    localStorage.removeItem(KEYS.BIO_PROFILES);
    localStorage.removeItem(KEYS.LAB_RECORDS);
    localStorage.removeItem(KEYS.ANALYSES);
    localStorage.removeItem(KEYS.PASSPORTS);
    localStorage.removeItem(KEYS.AUDIT_LOGS);
    localStorage.removeItem(KEYS.REPORTS);
    setStorage(KEYS.CURRENT_USER, DEMO_USERS[0]);
    this.logAudit({
      action: 'Data Modification',
      resource: 'SystemAdmin',
      resourceId: 'RESET_FACTORY',
      status: 'Warning',
      details: 'Reset system database back to standard synthetic demo baseline.'
    });
  }
}
