import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Settings2,
  AlertCircle,
  Building2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  X,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import { Switch } from '../components/ui/Switch';
import { GoogleIcon } from '../components/icons/GoogleIcon';
import { FacebookIcon } from '../components/icons/FacebookIcon';
import { LinkedInIcon } from '../components/icons/LinkedInIcon';
import { ClientWorkspace } from '../components/workspace/ClientWorkspace';
import { clsx } from 'clsx';

interface Workspace {
  id: string;
  name: string;
  logo?: string;
  status: 'active' | 'inactive';
  platforms: {
    google: boolean;
    facebook: boolean;
    linkedin: boolean;
  };
  lastModified: string;
  teamMembers: number;
}

const mockWorkspaces: Workspace[] = [
  {
    id: '1',
    name: 'Woshapp',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&auto=format',
    status: 'active',
    platforms: {
      google: true,
      facebook: true,
      linkedin: false
    },
    lastModified: '2024-03-15T10:30:00Z',
    teamMembers: 5
  },
  {
    id: '2',
    name: 'BlancheStories',
    logo: 'https://images.unsplash.com/photo-1549921296-3b0f18f79e92?w=64&h=64&fit=crop&auto=format',
    status: 'active',
    platforms: {
      google: true,
      facebook: true,
      linkedin: false
    },
    lastModified: '2024-03-14T15:45:00Z',
    teamMembers: 3
  },
  {
    id: '3',
    name: 'Elgiganten',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=64&h=64&fit=crop&auto=format',
    status: 'active',
    platforms: {
      google: true,
      facebook: true,
      linkedin: true
    },
    lastModified: '2024-03-13T09:15:00Z',
    teamMembers: 8
  }
];

type Tab = 'workspaces' | 'account-center';

export const Workspaces = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('workspaces');
  const [workspaces, setWorkspaces] = useState<Workspace[]>(mockWorkspaces);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [showClientWorkspace, setShowClientWorkspace] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const filteredWorkspaces = workspaces
    .filter(workspace => 
      workspace.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === 'all' || workspace.status === filter)
    );

  const handleStatusToggle = (workspaceId: string) => {
    setWorkspaces(prev => prev.map(workspace => 
      workspace.id === workspaceId
        ? { ...workspace, status: workspace.status === 'active' ? 'inactive' : 'active' }
        : workspace
    ));
  };

  const handleDeleteWorkspace = (workspaceId: string) => {
    setWorkspaces(prev => prev.filter(workspace => workspace.id !== workspaceId));
    setShowDeleteConfirm(null);
  };

  const handleManageWorkspace = (clientName: string) => {
    setSelectedClient(clientName);
    setShowClientWorkspace(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[48px]">
      {/* Header */}
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              Workspaces & Accounts
            </h1>
            <p className="text-[var(--color-text-secondary)]">
              Manage your client workspaces and ad platform accounts
            </p>
          </div>
          {activeTab === 'workspaces' && (
            <button
              onClick={() => setShowClientWorkspace(true)}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Workspace</span>
            </button>
          )}
        </div>

        {/* Enhanced Tabs */}
        <div className="flex border-b border-[var(--color-border)] mt-6">
          <button
            onClick={() => setActiveTab('workspaces')}
            className={clsx(
              'px-6 py-3 text-sm font-medium transition-colors relative',
              activeTab === 'workspaces'
                ? 'text-[var(--color-accent)] border-[var(--color-accent)] border-b-2'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            )}
          >
            Workspaces
          </button>
          <button
            onClick={() => setActiveTab('account-center')}
            className={clsx(
              'px-6 py-3 text-sm font-medium transition-colors relative',
              activeTab === 'account-center'
                ? 'text-[var(--color-accent)] border-[var(--color-accent)] border-b-2'
                : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
            )}
          >
            Account Center
          </button>
        </div>
      </div>

      {activeTab === 'workspaces' ? (
        <>
          {/* Filters and Search */}
          <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
                  <input
                    type="text"
                    placeholder="Search workspaces..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={clsx(
                      'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                      filter === 'all'
                        ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                    )}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={clsx(
                      'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                      filter === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                    )}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter('inactive')}
                    className={clsx(
                      'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                      filter === 'inactive'
                        ? 'bg-gray-100 text-gray-700'
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                    )}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Workspaces List */}
          <div className="p-6">
            <div className="grid gap-4">
              {filteredWorkspaces.map((workspace) => (
                <div
                  key={workspace.id}
                  className={clsx(
                    'bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] p-4',
                    workspace.status === 'inactive' && 'opacity-75'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Logo */}
                      <div className="w-12 h-12 rounded-lg bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] overflow-hidden flex items-center justify-center">
                        {workspace.logo ? (
                          <img
                            src={workspace.logo}
                            alt={`${workspace.name} logo`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-[var(--color-text-tertiary)]" />
                        )}
                      </div>

                      {/* Workspace Info */}
                      <div>
                        <h3 className="text-lg font-medium text-[var(--color-text-primary)]">
                          {workspace.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                            <span>{workspace.teamMembers} team members</span>
                            <span>•</span>
                            <span>Last modified {formatDate(workspace.lastModified)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Connected Platforms */}
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <div className={clsx(
                          'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                          workspace.platforms.google
                            ? 'bg-[#4285F4]10 text-[#4285F4]'
                            : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]'
                        )}>
                          <GoogleIcon className="w-5 h-5" />
                        </div>
                        <div className={clsx(
                          'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                          workspace.platforms.facebook
                            ? 'bg-[#1877F2]10 text-[#1877F2]'
                            : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]'
                        )}>
                          <FacebookIcon className="w-5 h-5" />
                        </div>
                        <div className={clsx(
                          'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
                          workspace.platforms.linkedin
                            ? 'bg-[#0A66C2]10 text-[#0A66C2]'
                            : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]'
                        )}>
                          <LinkedInIcon className="w-5 h-5" />
                        </div>
                      </div>

                      <Switch
                        checked={workspace.status === 'active'}
                        onChange={() => handleStatusToggle(workspace.id)}
                      />

                      <button
                        onClick={() => handleManageWorkspace(workspace.name)}
                        className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
                      >
                        <Settings2 className="w-5 h-5" />
                      </button>

                      <Menu as="div" className="relative">
                        <Menu.Button className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-1 w-48 bg-[var(--color-bg-secondary)] rounded-lg shadow-lg border border-[var(--color-border)] py-1 z-10">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={() => setShowDeleteConfirm(workspace.id)}
                                className={clsx(
                                  'w-full text-left px-4 py-2 text-sm',
                                  active ? 'bg-red-50 text-red-600' : 'text-red-500'
                                )}
                              >
                                Delete Workspace
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="p-6">
          <div className="text-center text-[var(--color-text-secondary)]">
            Account Center functionality coming soon...
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 w-[400px]">
            <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">Delete Workspace</h2>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Are you sure you want to delete this workspace? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteWorkspace(showDeleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Client Workspace Dialog */}
      <ClientWorkspace
        isOpen={showClientWorkspace}
        onClose={() => setShowClientWorkspace(false)}
        clientName={selectedClient}
      />
    </div>
  );
};