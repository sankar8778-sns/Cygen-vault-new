import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle 
} from 'lucide-react';
import { AuditLog } from '../types';
import { DemoNoticeBadge } from '../components/common/DemoNoticeBadge';
import { ScientificDisclaimer } from '../components/common/ScientificDisclaimer';

interface Props {
  logs: AuditLog[];
}

export const AuditLogsPage: React.FC<Props> = ({ logs }) => {
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const actions = [
    'All',
    'Login',
    'Logout',
    'Analysis Execution',
    'Evidence Passport Creation',
    'Evidence Verification',
    'Report Generation',
    'Data Creation',
    'Data Modification',
    'Data Deletion/Archive',
    'Data Upload',
    'Role Change'
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toLowerCase().includes(search.toLowerCase()) ||
      log.resource.toLowerCase().includes(search.toLowerCase()) ||
      log.resourceId.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());

    const matchesAction = actionFilter === 'All' || log.action === actionFilter;
    const matchesStatus = statusFilter === 'All' || log.status === statusFilter;

    return matchesSearch && matchesAction && matchesStatus;
  });

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cygen-vault-audit-trail-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case 'Success':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#DCFCE7] text-[#166534] border border-[#86EFAC]">
            <CheckCircle2 className="w-3 h-3 text-[#16A34A]" /> Success
          </span>
        );
      case 'Warning':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <AlertTriangle className="w-3 h-3 text-amber-600" /> Warning
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-50 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" /> Error
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 text-[#172B1D]">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#E2E8F0] gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl font-extrabold text-[#172B1D] tracking-tight flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#DCFCE7] text-[#16A34A] border border-[#86EFAC]">
                <History className="w-5 h-5" />
              </div>
              Cryptographic Audit Log &amp; Compliance Ledger
            </h1>
            <DemoNoticeBadge />
          </div>
          <p className="text-xs text-[#64748B] mt-1">
            Immutable traceability ledger recording all computational runs, modifications, verification events, and access.
          </p>
        </div>

        <button
          onClick={handleExportJson}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs transition-all shadow-xs cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit Trail (JSON)</span>
        </button>
      </div>

      <ScientificDisclaimer compact />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-3.5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by event ID, user, resource, details..."
            className="w-full pl-9 pr-3 py-2 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-[#172B1D] placeholder-[#64748B] focus:outline-hidden focus:border-[#16A34A] text-xs font-mono transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-[#64748B]">Action:</span>
            <select
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-xs font-mono text-[#172B1D] cursor-pointer focus:outline-hidden focus:border-[#16A34A]"
            >
              {actions.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-mono text-[#64748B]">Status:</span>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2.5 py-1.5 bg-[#F7FAF7] border border-[#E2E8F0] rounded-lg text-xs font-mono text-[#172B1D] cursor-pointer focus:outline-hidden focus:border-[#16A34A]"
            >
              <option value="All">All</option>
              <option value="Success">Success</option>
              <option value="Warning">Warning</option>
              <option value="Error">Error</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7FAF7] text-[#64748B] font-mono text-[11px] border-b border-[#E2E8F0]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Event ID</th>
                <th className="py-3.5 px-4 font-semibold">Timestamp (UTC)</th>
                <th className="py-3.5 px-4 font-semibold">User &amp; Role</th>
                <th className="py-3.5 px-4 font-semibold">Action</th>
                <th className="py-3.5 px-4 font-semibold">Resource Target</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">IP Address</th>
                <th className="py-3.5 px-4 font-semibold">Event Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0] text-[#172B1D]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#F0FDF4]/70 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#166534]">
                    {log.id}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#64748B] text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-[#172B1D] block">{log.user}</span>
                    <span className="text-[10px] font-mono text-[#64748B]">{log.role}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-[#16A34A]">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-[#172B1D]">{log.resource}</span>
                    <span className="text-[10px] font-mono text-[#166534] block font-semibold">{log.resourceId}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    {statusBadge(log.status)}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#64748B] text-[10px]">
                    {log.ipAddress}
                  </td>
                  <td className="py-3.5 px-4 text-xs max-w-sm text-[#64748B]">
                    {log.details}
                  </td>
                </tr>
              ))}

              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-[#64748B] font-mono">
                    No audit records match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
