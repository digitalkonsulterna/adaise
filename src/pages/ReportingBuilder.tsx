import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Settings2,
  AlertCircle,
  Clock,
  MessageSquare,
  ChevronDown,
  FileText,
  Calendar,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import { clsx } from 'clsx';

interface Report {
  id: string;
  title: string;
  updated: string;
  sent?: string;
  frequency?: string;
  language: string;
  period?: string;
  status?: 'scheduled' | 'sent' | 'draft';
}

const reports: Report[] = [
  {
    id: '1',
    title: 'justia.com Project Report',
    updated: 'Nov-21 2024',
    frequency: 'Every week, on Thursday',
    language: 'English',
    period: 'Mar-14 2025 - Mar-20 2025',
    status: 'scheduled'
  },
  {
    id: '2',
    title: 'businessinsider.com Project Report',
    updated: 'Nov-19 2024',
    frequency: 'Every week, on Tuesday',
    language: 'English',
    period: 'Mar-14 2025 - Mar-20 2025',
    status: 'scheduled'
  },
  {
    id: '3',
    title: 'SEO report_Tesla Motors',
    updated: 'Nov-15 2024',
    language: 'English',
    period: 'Nov 04 2024 - Nov 10 2024',
    status: 'draft'
  },
  {
    id: '4',
    title: 'Nike Project Report',
    updated: 'Nov-30 2020',
    sent: 'Mar-14 2025',
    frequency: 'Every week, on Sunday',
    language: 'English',
    status: 'sent'
  }
];

export const ReportingBuilder = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'reports' | 'templates' | 'invoicing'>('reports');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const getStatusIcon = (status?: Report['status']) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4 text-blue-500" />;
      case 'sent':
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case 'draft':
        return <AlertCircle className="w-4 h-4 text-amber-500" />;
      default:
        return null;
    }
  };

  const handleCreateReport = () => {
    navigate('/generated-report');
  };

  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[48px]">
      {/* Header */}
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Report Builder</h1>
              <p className="text-[var(--color-text-secondary)]">Create and manage your reports</p>
            </div>
            <button
              onClick={handleCreateReport}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>CREATE REPORT</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-[var(--color-border)] mt-6">
            <button
              onClick={() => setActiveTab('reports')}
              className={clsx(
                'px-6 py-3 text-sm font-medium transition-colors relative',
                activeTab === 'reports'
                  ? 'text-[var(--color-accent)] border-[var(--color-accent)] border-b-2'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              Reports
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={clsx(
                'px-6 py-3 text-sm font-medium transition-colors relative',
                activeTab === 'templates'
                  ? 'text-[var(--color-accent)] border-[var(--color-accent)] border-b-2'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('invoicing')}
              className={clsx(
                'px-6 py-3 text-sm font-medium transition-colors relative',
                activeTab === 'invoicing'
                  ? 'text-[var(--color-accent)] border-[var(--color-accent)] border-b-2'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              Performance-Based Invoicing
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {activeTab === 'reports' ? (
          <>
            {/* Search and Filters */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <button className="px-4 py-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Reports List */}
            <div className="bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    <th className="text-left py-4 px-6 font-medium text-[var(--color-text-secondary)]">Report Title</th>
                    <th className="text-left py-4 px-6 font-medium text-[var(--color-text-secondary)]">Updated</th>
                    <th className="text-left py-4 px-6 font-medium text-[var(--color-text-secondary)]">Sent</th>
                    <th className="text-left py-4 px-6 font-medium text-[var(--color-text-secondary)]">Frequency</th>
                    <th className="text-left py-4 px-6 font-medium text-[var(--color-text-secondary)]">Language</th>
                    <th className="text-left py-4 px-6 font-medium text-[var(--color-text-secondary)]">Report Period</th>
                    <th className="w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.map((report) => (
                    <tr key={report.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(report.status)}
                          <span className="text-[var(--color-text-primary)]">{report.title}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-[var(--color-text-secondary)]">{report.updated}</td>
                      <td className="py-4 px-6 text-[var(--color-text-secondary)]">{report.sent || '-'}</td>
                      <td className="py-4 px-6 text-[var(--color-text-secondary)]">{report.frequency || '-'}</td>
                      <td className="py-4 px-6 text-[var(--color-text-secondary)]">{report.language}</td>
                      <td className="py-4 px-6 text-[var(--color-text-secondary)]">{report.period || '-'}</td>
                      <td className="py-4 px-6">
                        <Menu as="div" className="relative">
                          <Menu.Button className="p-1 hover:bg-[var(--color-bg-tertiary)] rounded">
                            <MoreVertical className="w-4 h-4 text-[var(--color-text-tertiary)]" />
                          </Menu.Button>
                          <Menu.Items className="absolute right-0 mt-1 w-48 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg border border-[var(--color-border)] py-1 z-10">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={clsx(
                                    'w-full text-left px-4 py-2 text-sm',
                                    active ? 'bg-[var(--color-bg-tertiary)]' : ''
                                  )}
                                >
                                  Edit report
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={clsx(
                                    'w-full text-left px-4 py-2 text-sm',
                                    active ? 'bg-[var(--color-bg-tertiary)]' : ''
                                  )}
                                >
                                  Delete report
                                </button>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Menu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <div className="text-center text-[var(--color-text-secondary)]">
            {activeTab === 'templates' ? 'Templates' : 'Invoicing'} functionality coming soon...
          </div>
        )}
      </div>
    </div>
  );
};