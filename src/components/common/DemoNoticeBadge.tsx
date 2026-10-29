import React from 'react';
import { Database } from 'lucide-react';

interface Props {
  text?: string;
  className?: string;
}

export const DemoNoticeBadge: React.FC<Props> = ({ 
  text = 'SYNTHETIC / PUBLIC / ILLUSTRATIVE DEMO DATA',
  className = ''
}) => {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC] tracking-wider uppercase ${className}`}>
      <Database className="w-3 h-3 text-[#16A34A]" />
      <span>{text}</span>
    </span>
  );
};
