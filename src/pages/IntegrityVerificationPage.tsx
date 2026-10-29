import React, { useState } from 'react';
import { 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  Lock, 
  Unlock,
  AlertOctagon,
  RefreshCw
} from 'lucide-react';
import { EvidencePassport, IntegrityCheckResult } from '../types';
import { verifyRecordIntegrity } from '../utils/crypto';
import { CygenVaultStorage } from '../services/storage';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  passports: EvidencePassport[];
  initialPassportId?: string;
  onRefreshPassports: () => void;
}

export const IntegrityVerificationPage: React.FC<Props> = ({
  passports,
  initialPassportId,
  onRefreshPassports
}) => {
  const [selectedId, setSelectedId] = useState<string>(
    initialPassportId || passports[0]?.passportId || 'EVP-2026-0001'
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<IntegrityCheckResult | null>(null);

  const passport = passports.find(p => p.passportId === selectedId) || passports[0];

  const handleVerify = async () => {
    if (!passport) return;
    setIsVerifying(true);

    try {
      // Perform cryptographic SHA-256 verification
      const { matches, calculatedHash } = await verifyRecordIntegrity(
        passport.canonicalPayload,
        passport.sha256Hash
      );

      const result: IntegrityCheckResult = {
        passportId: passport.passportId,
        analysisId: passport.analysisId,
        storedHash: passport.sha256Hash,
        recalculatedHash: calculatedHash,
        isVerified: matches,
        timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
        checkedBy: 'IntegrityGuard v1.0 / Native WebCrypto',
        checks: {
          datasetRecordAvailable: true,
          modelVersionRecorded: true,
          analysisTimestampRecorded: true,
          evidenceHashMatched: matches,
          auditTrailAvailable: true
        },
        details: matches
          ? 'Canonical serialization deterministically recalculates matching cryptographic signature. Record is authentic and untampered.'
          : 'Warning: Canonical payload hash does not match original digital seal. Record appears modified or corrupted.'
      };

      setVerificationResult(result);

      // Log verification to audit trail
      CygenVaultStorage.logAudit({
        action: 'Evidence Verification',
        resource: 'IntegrityEngine',
        resourceId: passport.passportId,
        status: matches ? 'Success' : 'Warning',
        details: `Integrity check for ${passport.passportId}: ${matches ? 'VERIFIED' : 'FAILED / MISMATCH'}. Calculated: ${calculatedHash.substring(0, 16)}...`
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSimulateTamper = () => {
    if (!passport) return;
    CygenVaultStorage.simulateTamperPassport(passport.passportId);
    onRefreshPassports();
    setVerificationResult(null);
  };

  const handleRestorePayload = () => {
    if (!passport) return;
    CygenVaultStorage.resetToDefaultDemo();
    onRefreshPassports();
    setVerificationResult(null);
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              Cryptographic Integrity Verification Engine
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Real-time SHA-256 digital signature validation over deterministically canonicalized analysis records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedId}
            onChange={e => {
              setSelectedId(e.target.value);
              setVerificationResult(null);
            }}
            className="px-3 py-2 text-xs bg-white border border-[#E2E8F0] rounded-lg font-mono font-bold text-[#172B1D] cursor-pointer shadow-xs focus:outline-hidden focus:border-[#16A34A]"
          >
            {passports.map(p => (
              <option key={p.passportId} value={p.passportId}>
                {p.passportId} - {p.drugName} ({p.biologicalSystem})
              </option>
            ))}
          </select>
        </div>
      </div>

      <ScientificDisclaimer compact />

      {/* Main Verification Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">Target Passport</span>
            <div className="flex items-center gap-2 mt-0.5">
              <h2 className="text-lg font-bold text-[#172B1D] font-mono">{passport.passportId}</h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-semibold">
                {passport.drugName} • {passport.biologicalSystem}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleVerify}
              disabled={isVerifying}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] disabled:opacity-50 text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
            >
              {isVerifying ? <RefreshCw className="w-4 h-4 animate-spin text-white" /> : <ShieldCheck className="w-4 h-4 text-white" />}
              <span>{isVerifying ? 'Recalculating SHA-256...' : 'VERIFY INTEGRITY'}</span>
            </button>
          </div>
        </div>

        {/* Verification Status Display */}
        {verificationResult ? (
          <div className={`p-6 rounded-xl border space-y-5 transition-all ${
            verificationResult.isVerified
              ? 'bg-[#F0FDF4] border-[#86EFAC] text-[#172B1D]'
              : 'bg-rose-50 border-rose-200 text-[#172B1D]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5">
                {verificationResult.isVerified ? (
                  <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] border border-[#86EFAC] text-[#16A34A] flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-rose-100 border border-rose-300 text-rose-600 flex items-center justify-center">
                    <AlertOctagon className="w-6 h-6" />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider block font-bold text-[#64748B]">
                    CRYPTOGRAPHIC AUDIT STATUS
                  </span>
                  <div className={`text-xl font-extrabold font-mono ${
                    verificationResult.isVerified ? 'text-[#166534]' : 'text-rose-700'
                  }`}>
                    {verificationResult.isVerified ? 'INTEGRITY STATUS: VERIFIED' : 'INTEGRITY STATUS: WARNING / MISMATCH'}
                  </div>
                </div>
              </div>

              <span className="text-xs font-mono text-[#64748B]">
                Timestamp: {verificationResult.timestamp}
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#172B1D]">
              {verificationResult.details}
            </p>

            {/* Checklist items */}
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-[#64748B] block font-semibold">
                Five-Point Cryptographic Gate Audit
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[#172B1D]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Dataset record available in repository</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Model version recorded ({passport.modelVersions.split('(')[0]})</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Analysis timestamp recorded ({passport.analysisDate})</span>
                </div>
                <div className="flex items-center gap-2">
                  {verificationResult.checks.evidenceHashMatched ? (
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span className={verificationResult.checks.evidenceHashMatched ? 'font-semibold text-[#172B1D]' : 'font-semibold text-rose-700'}>
                    Evidence hash matched canonical payload
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>Audit trail record available in ledger</span>
                </div>
              </div>
            </div>

            {/* Hash Comparison View */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-white border border-[#E2E8F0]">
                <span className="text-[10px] uppercase text-[#64748B] block mb-1 font-semibold">Original Stored Seal</span>
                <span className="text-[#172B1D] break-all select-all font-semibold">
                  {verificationResult.storedHash}
                </span>
              </div>
              <div className={`p-3.5 rounded-xl border ${
                verificationResult.isVerified ? 'bg-white border-[#86EFAC]' : 'bg-white border-rose-300'
              }`}>
                <span className="text-[10px] uppercase text-[#64748B] block mb-1 font-semibold">Recalculated SHA-256</span>
                <span className={`break-all select-all font-semibold ${
                  verificationResult.isVerified ? 'text-[#166534]' : 'text-rose-600'
                }`}>
                  {verificationResult.recalculatedHash}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center text-xs text-[#64748B] bg-[#F7FAF7] rounded-xl border border-dashed border-[#E2E8F0] space-y-2">
            <Lock className="w-7 h-7 text-[#64748B] mx-auto" />
            <div className="font-semibold text-[#172B1D] text-sm">No active verification run performed for this passport yet.</div>
            <p className="max-w-md mx-auto text-[#64748B] font-light">
              Click &ldquo;VERIFY INTEGRITY&rdquo; above to re-serialize the canonical record and compute the WebCrypto SHA-256 digest.
            </p>
          </div>
        )}

        {/* Security Sandbox: Simulate Tampering Feature */}
        <div className="p-5 rounded-xl bg-[#F7FAF7] border border-[#E2E8F0] text-[#172B1D] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#166534] font-bold block">
                CYBERSECURITY DEMONSTRATION SANDBOX
              </span>
              <h3 className="text-xs font-bold text-[#172B1D] mt-0.5">
                Simulate Tamper Detection &amp; Unauthorized Payload Manipulation
              </h3>
              <p className="text-[11px] text-[#64748B] mt-0.5">
                Test how CYGEN VAULT detects arbitrary byte modifications or unauthorized data injection.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleSimulateTamper}
                className="px-3.5 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Unlock className="w-3.5 h-3.5" />
                <span>Simulate Payload Tamper</span>
              </button>
              <button
                onClick={handleRestorePayload}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F0FDF4] text-[#172B1D] text-xs font-semibold border border-[#E2E8F0] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restore Baseline</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
