import React from 'react';
import { DrugProfile } from '../../types';
import { Atom, Binary, Layers } from 'lucide-react';

interface Props {
  drug: DrugProfile;
  compact?: boolean;
}

export const ChemicalStructureView: React.FC<Props> = ({ drug, compact = false }) => {
  // Render deterministic SVG chemical representations based on drug ID / formula
  const renderStructureSvg = () => {
    if (drug.id === 'DG-001' || drug.chemicalFormula === 'C8H9NO2') {
      // Paracetamol-like 2D structure styled for light scientific display
      return (
        <svg viewBox="0 0 320 220" className="w-full h-full max-h-56 stroke-[#1E293B] fill-none text-[#172B1D]">
          <g strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Benzene ring with alternating double bonds */}
            <polygon points="160,70 195,90 195,130 160,150 125,130 125,90" className="stroke-[#1E293B] fill-[#DCFCE7]/40" />
            <line x1="160" y1="78" x2="188" y2="94" className="stroke-[#16A34A]" strokeWidth="2" />
            <line x1="190" y1="126" x2="160" y2="143" className="stroke-[#16A34A]" strokeWidth="2" />
            <line x1="132" y1="94" x2="132" y2="126" className="stroke-[#16A34A]" strokeWidth="2" />
            
            {/* Top 4-hydroxy group: bond to OH */}
            <line x1="160" y1="70" x2="160" y2="38" className="stroke-[#1E293B]" />
            <text x="160" y="32" textAnchor="middle" className="text-sm font-mono font-bold fill-[#DC2626] stroke-none">OH</text>
            
            {/* Bottom 1-acetamide group: bond to NH */}
            <line x1="160" y1="150" x2="160" y2="175" className="stroke-[#1E293B]" />
            <text x="160" y="190" textAnchor="middle" className="text-xs font-mono font-bold fill-[#0284C7] stroke-none">NH</text>
            
            {/* Carbonyl and methyl extension */}
            <line x1="172" y1="188" x2="200" y2="188" className="stroke-[#1E293B]" />
            <line x1="200" y1="188" x2="225" y2="205" className="stroke-[#1E293B]" />
            <text x="235" y="210" textAnchor="start" className="text-xs font-mono font-bold fill-[#64748B] stroke-none">CH₃</text>
            
            {/* Double bond to Oxygen (=O) */}
            <line x1="197" y1="188" x2="197" y2="165" className="stroke-[#DC2626]" strokeWidth="2.5" />
            <line x1="203" y1="188" x2="203" y2="165" className="stroke-[#DC2626]" strokeWidth="2.5" />
            <text x="200" y="158" textAnchor="middle" className="text-xs font-mono font-bold fill-[#DC2626] stroke-none">O</text>
          </g>
          {/* Subtle atom callout dots */}
          <circle cx="160" cy="70" r="3" className="fill-[#16A34A] stroke-none" />
          <circle cx="195" cy="90" r="3" className="fill-[#16A34A] stroke-none" />
          <circle cx="195" cy="130" r="3" className="fill-[#16A34A] stroke-none" />
          <circle cx="160" cy="150" r="3" className="fill-[#16A34A] stroke-none" />
          <circle cx="125" cy="130" r="3" className="fill-[#16A34A] stroke-none" />
          <circle cx="125" cy="90" r="3" className="fill-[#16A34A] stroke-none" />
        </svg>
      );
    } else if (drug.id === 'DG-002' || drug.chemicalFormula === 'C21H18F3N7O') {
      // Kinase Inhibitor scaffold 2D representation
      return (
        <svg viewBox="0 0 340 220" className="w-full h-full max-h-56 stroke-[#1E293B] fill-none text-[#172B1D]">
          <g strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            {/* Pyrimidine and Pyridine Rings */}
            <polygon points="50,90 75,75 100,90 100,120 75,135 50,120" className="stroke-[#1E293B] fill-[#DCFCE7]/40" />
            <text x="75" y="72" textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#0284C7] stroke-none">N</text>
            <polygon points="120,90 145,75 170,90 170,120 145,135 120,120" className="stroke-[#1E293B] fill-[#DCFCE7]/40" />
            <text x="145" y="72" textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#0284C7] stroke-none">N</text>
            <text x="145" y="138" textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#0284C7] stroke-none">N</text>
            
            <line x1="100" y1="105" x2="120" y2="105" className="stroke-[#1E293B]" />
            <line x1="170" y1="105" x2="195" y2="105" className="stroke-[#1E293B]" />
            <text x="195" y="100" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#0284C7] stroke-none">NH</text>
            
            {/* Central Phenyl ring */}
            <polygon points="215,90 240,75 265,90 265,120 240,135 215,120" className="stroke-[#1E293B] fill-[#DCFCE7]/40" />
            <line x1="265" y1="105" x2="285" y2="105" className="stroke-[#1E293B]" />
            
            {/* Trifluoromethyl group */}
            <text x="295" y="109" textAnchor="start" className="text-xs font-mono font-bold fill-[#16A34A] stroke-none">CF₃</text>
            
            {/* Carbonyl branch */}
            <line x1="240" y1="135" x2="240" y2="155" className="stroke-[#1E293B]" />
            <text x="240" y="170" textAnchor="middle" className="text-[11px] font-mono font-bold fill-[#DC2626] stroke-none">O</text>
          </g>
        </svg>
      );
    } else {
      // General scientific molecular network
      return (
        <svg viewBox="0 0 320 200" className="w-full h-full max-h-56 stroke-[#1E293B] fill-none text-[#172B1D]">
          <g strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="120,60 150,45 180,60 180,95 150,110 120,95" className="stroke-[#1E293B] fill-[#DCFCE7]/40" />
            <polygon points="180,95 210,80 240,95 240,130 210,145 180,130" className="stroke-[#1E293B] fill-[#DCFCE7]/40" />
            <line x1="150" y1="110" x2="150" y2="140" className="stroke-[#1E293B]" />
            <circle cx="150" cy="150" r="8" className="stroke-[#DC2626] fill-[#DC2626]/10" />
            <text x="150" y="154" textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#DC2626] stroke-none">OH</text>
            
            <line x1="120" y1="60" x2="95" y2="50" className="stroke-[#1E293B]" />
            <circle cx="85" cy="45" r="8" className="stroke-[#0284C7] fill-[#0284C7]/10" />
            <text x="85" y="49" textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#0284C7] stroke-none">N</text>
            
            <line x1="240" y1="95" x2="265" y2="85" className="stroke-[#1E293B]" />
            <text x="275" y="90" textAnchor="middle" className="text-[10px] font-mono font-bold fill-[#64748B] stroke-none">R</text>
          </g>
        </svg>
      );
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-5 shadow-xs text-[#172B1D]">
      <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
            <Atom className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-[#172B1D] tracking-wider uppercase font-mono">
            Molecular Structure &amp; Descriptors
          </h4>
        </div>
        <span className="text-[11px] font-mono text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] px-2.5 py-1 rounded font-bold">
          SMILES: {drug.smiles.length > 24 ? drug.smiles.substring(0, 24) + '...' : drug.smiles}
        </span>
      </div>

      {/* SVG 2D Visualization Container */}
      <div className="my-4 bg-[#F7FAF7] border border-[#E2E8F0] rounded-xl p-3 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 text-[10px] font-mono text-[#64748B]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]"></span>
          2D Topology Engine
        </div>
        {renderStructureSvg()}
        <div className="w-full text-center text-[10px] text-[#64748B] font-mono pt-2 border-t border-[#E2E8F0]">
          Formula: <strong className="text-[#172B1D] font-bold">{drug.chemicalFormula}</strong> | Mass: <strong className="text-[#166534] font-bold">{drug.molecularWeight} g/mol</strong> | CAS: <strong className="text-[#172B1D]">{drug.casNumber}</strong>
        </div>
      </div>

      {/* Descriptors Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
        <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] uppercase block font-mono font-medium">LogP (Lipophilicity)</span>
          <span className="font-mono font-bold text-[#172B1D] text-sm">{drug.knownProperties.logP.toFixed(2)}</span>
        </div>
        <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] uppercase block font-mono font-medium">TPSA (Polar Surface)</span>
          <span className="font-mono font-bold text-[#172B1D] text-sm">{drug.knownProperties.tpsa} Å²</span>
        </div>
        <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] uppercase block font-mono font-medium">H-Bond Donors / Acc</span>
          <span className="font-mono font-bold text-[#172B1D] text-sm">{drug.knownProperties.hbd} / {drug.knownProperties.hba}</span>
        </div>
        <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] uppercase block font-mono font-medium">Rotatable Bonds</span>
          <span className="font-mono font-bold text-[#172B1D] text-sm">{drug.knownProperties.rotatableBonds}</span>
        </div>
        <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] uppercase block font-mono font-medium">Heavy Atoms</span>
          <span className="font-mono font-bold text-[#172B1D] text-sm">{drug.knownProperties.heavyAtomCount}</span>
        </div>
        <div className="p-3 bg-[#F7FAF7] rounded-lg border border-[#E2E8F0]">
          <span className="text-[10px] text-[#64748B] uppercase block font-mono font-medium">Aromatic Rings</span>
          <span className="font-mono font-bold text-[#172B1D] text-sm">{drug.knownProperties.aromaticRings}</span>
        </div>
      </div>

      {!compact && (
        <>
          {/* Functional Groups */}
          <div className="mt-4 pt-3.5 border-t border-[#E2E8F0]">
            <span className="text-[10px] text-[#64748B] uppercase font-mono font-semibold flex items-center gap-1.5 mb-2">
              <Layers className="w-3.5 h-3.5 text-[#16A34A]" />
              Identified Functional Groups &amp; Pharmacophores
            </span>
            <div className="flex flex-wrap gap-1.5">
              {drug.functionalGroups.map((group, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] font-semibold"
                >
                  {group}
                </span>
              ))}
            </div>
          </div>

          {/* 32-bit Molecular Fingerprint Bit Matrix */}
          <div className="mt-4 pt-3.5 border-t border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] text-[#64748B] uppercase font-mono font-semibold flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5 text-[#16A34A]" />
                32-Bit Topological Fingerprint (Simulated Morgan / ECFP4)
              </span>
              <span className="text-[10px] font-mono text-[#64748B]">
                Density: <strong className="text-[#166534]">{drug.fingerprintBits.filter(b => b === 1).length}</strong> / 32
              </span>
            </div>
            <div className="grid grid-cols-16 gap-1 bg-[#F7FAF7] p-2.5 rounded-lg border border-[#E2E8F0]">
              {drug.fingerprintBits.map((bit, idx) => (
                <div
                  key={idx}
                  title={`Bit ${idx}: ${bit}`}
                  className={`h-5 rounded flex items-center justify-center text-[9px] font-mono transition-colors ${
                    bit === 1
                      ? 'bg-[#16A34A] text-white font-bold shadow-xs'
                      : 'bg-white border border-[#E2E8F0] text-slate-400'
                  }`}
                >
                  {bit}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
