import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { 
  X, 
  Plus,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  Settings,
  Building2,
  Puzzle,
  Users,
  ChevronLeft,
  ChevronRight,
  Upload,
  Trash2,
  Mail,
  Globe,
  Target,
  MessageSquare,
  Lightbulb,
  Briefcase,
  Languages
} from 'lucide-react';
import { clsx } from 'clsx';
import { GoogleIcon } from '../icons/GoogleIcon';
import { FacebookIcon } from '../icons/FacebookIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { IntegrationsSection } from './sections/IntegrationsSection';
import { BrandDetailsSection } from './sections/BrandDetailsSection';
import { WorkspaceSettingsSection } from './sections/WorkspaceSettingsSection';

type Section = 'main' | 'integrations' | 'brand' | 'settings';

interface ClientWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string | null;
}

interface UnsavedChangesState {
  isDirty: boolean;
  pendingSection: Section | null;
}

export const ClientWorkspace: React.FC<ClientWorkspaceProps> = ({
  isOpen,
  onClose,
  clientName
}) => {
  const [activeSection, setActiveSection] = useState<Section>('main');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState<UnsavedChangesState>({
    isDirty: false,
    pendingSection: null
  });
  const [showUnsavedDialog, setShowUnsavedDialog] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && unsavedChanges.isDirty) {
        e.preventDefault();
        setShowUnsavedDialog(true);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [unsavedChanges.isDirty]);

  if (!clientName) return null;

  const handleSectionChange = (section: Section) => {
    if (unsavedChanges.isDirty) {
      setUnsavedChanges(prev => ({ ...prev, pendingSection: section }));
      setShowUnsavedDialog(true);
    } else {
      setActiveSection(section);
    }
  };

  const handleClose = () => {
    if (unsavedChanges.isDirty) {
      setShowUnsavedDialog(true);
    } else {
      onClose();
    }
  };

  const handleUnsavedDialogAction = (action: 'save' | 'discard' | 'cancel') => {
    setShowUnsavedDialog(false);

    switch (action) {
      case 'save':
        // Save changes
        console.log('Saving changes...');
        setUnsavedChanges({ isDirty: false, pendingSection: null });
        if (unsavedChanges.pendingSection) {
          setActiveSection(unsavedChanges.pendingSection);
        } else {
          onClose();
        }
        break;
      case 'discard':
        setUnsavedChanges({ isDirty: false, pendingSection: null });
        if (unsavedChanges.pendingSection) {
          setActiveSection(unsavedChanges.pendingSection);
        } else {
          onClose();
        }
        break;
      case 'cancel':
        setUnsavedChanges(prev => ({ ...prev, pendingSection: null }));
        break;
    }
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'main':
        return `${clientName} Workspace`;
      case 'integrations':
        return `${clientName} - Platform Integrations`;
      case 'brand':
        return `${clientName} - Brand Details`;
      case 'settings':
        return `${clientName} - Workspace Settings`;
    }
  };

  const getSectionDescription = () => {
    switch (activeSection) {
      case 'main':
        return 'Manage your workspace settings and configurations';
      case 'integrations':
        return 'Connect and manage your advertising platforms';
      case 'brand':
        return 'Define your brand identity and target audience';
      case 'settings':
        return 'Configure workspace preferences and team access';
    }
  };

  const renderBreadcrumbs = () => {
    if (activeSection === 'main') return null;

    return (
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
        <button
          onClick={() => handleSectionChange('main')}
          className="hover:text-[var(--color-text-primary)] transition-colors"
        >
          {clientName}
        </button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-[var(--color-text-primary)]">
          {activeSection === 'integrations' && 'Platform Integrations'}
          {activeSection === 'brand' && 'Brand Details'}
          {activeSection === 'settings' && 'Workspace Settings'}
        </span>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'integrations':
        return (
          <IntegrationsSection 
            onBack={() => handleSectionChange('main')}
            onDirtyChange={(isDirty) => setUnsavedChanges(prev => ({ ...prev, isDirty }))}
          />
        );
      case 'brand':
        return (
          <BrandDetailsSection 
            onBack={() => handleSectionChange('main')}
            onDirtyChange={(isDirty) => setUnsavedChanges(prev => ({ ...prev, isDirty }))}
          />
        );
      case 'settings':
        return (
          <WorkspaceSettingsSection 
            onBack={() => handleSectionChange('main')}
            onDeleteWorkspace={() => setIsDeleteModalOpen(true)}
            onDirtyChange={(isDirty) => setUnsavedChanges(prev => ({ ...prev, isDirty }))}
          />
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {/* Integrations Card */}
            <button
              onClick={() => handleSectionChange('integrations')}
              className="flex flex-col items-center p-6 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]20 transition-colors">
                <Puzzle className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">Integrations</h3>
              <p className="text-sm text-[var(--color-text-secondary)] text-center">
                Connect and manage your advertising platforms and analytics tools
              </p>
            </button>

            {/* Brand Details Card */}
            <button
              onClick={() => handleSectionChange('brand')}
              className="flex flex-col items-center p-6 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]20 transition-colors">
                <Building2 className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">Brand Details</h3>
              <p className="text-sm text-[var(--color-text-secondary)] text-center">
                Define your brand identity and target audience for AI optimization
              </p>
            </button>

            {/* Workspace Settings Card */}
            <button
              onClick={() => handleSectionChange('settings')}
              className="flex flex-col items-center p-6 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors group"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent)]10 flex items-center justify-center mb-4 group-hover:bg-[var(--color-accent)]20 transition-colors">
                <Settings className="w-6 h-6 text-[var(--color-accent)]" />
              </div>
              <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-2">Workspace Settings</h3>
              <p className="text-sm text-[var(--color-text-secondary)] text-center">
                Manage workspace preferences, team access, and general settings
              </p>
            </button>
          </div>
        );
    }
  };

  return (
    <>
      <Dialog 
        open={isOpen} 
        onClose={handleClose}
        className="fixed inset-0 z-50 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay 
            className="fixed inset-0 bg-black/30" 
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          />

          <div className="relative bg-[var(--color-bg-secondary)] w-[95vw] max-w-6xl rounded-lg shadow-xl">
            {/* Header */}
            <div className="flex flex-col gap-2 p-6 border-b border-[var(--color-border)]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {activeSection !== 'main' && (
                    <button
                      onClick={() => handleSectionChange('main')}
                      className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-full transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-[var(--color-text-secondary)]" />
                    </button>
                  )}
                  <Dialog.Title className="text-xl font-semibold text-[var(--color-text-primary)]">
                    {getSectionTitle()}
                  </Dialog.Title>
                </div>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
                </button>
              </div>
              
              {renderBreadcrumbs()}
              
              <p className="text-sm text-[var(--color-text-secondary)]">
                {getSectionDescription()}
              </p>
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </div>
      </Dialog>

      {/* Unsaved Changes Dialog */}
      <Dialog
        open={showUnsavedDialog}
        onClose={() => setShowUnsavedDialog(false)}
        className="fixed inset-0 z-[60] overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-[var(--color-bg-secondary)] w-[90vw] max-w-md rounded-lg shadow-xl p-6">
            <Dialog.Title className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Unsaved Changes
            </Dialog.Title>
            <p className="text-[var(--color-text-secondary)] mb-4">
              You have unsaved changes. What would you like to do?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleUnsavedDialogAction('cancel')}
                className="px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUnsavedDialogAction('discard')}
                className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                Discard & Exit
              </button>
              <button
                onClick={() => handleUnsavedDialogAction('save')}
                className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      {/* Delete Workspace Confirmation Modal */}
      <Dialog
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        className="fixed inset-0 z-[60] overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen p-4">
          <Dialog.Overlay className="fixed inset-0 bg-black/30" />

          <div className="relative bg-[var(--color-bg-secondary)] w-[90vw] max-w-md rounded-lg shadow-xl p-6">
            <Dialog.Title className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Delete Workspace
            </Dialog.Title>
            <p className="text-[var(--color-text-secondary)] mb-4">
              Are you sure you want to delete this workspace? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  onClose();
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Workspace
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};