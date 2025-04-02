import React from 'react';
import { Dialog } from '@headlessui/react';
import { 
  X,
  Building2,
  Puzzle,
  Paintbrush,
  Bell,
  Zap,
  Users,
  Lock,
  CreditCard,
  Wrench
} from 'lucide-react';
import { clsx } from 'clsx';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const settingsCategories = [
  {
    id: 'workspaces',
    name: 'Workspaces & Accounts',
    icon: Building2,
    description: 'Manage workspaces, connect ad accounts, and set user permissions'
  },
  {
    id: 'integrations',
    name: 'Integrations',
    icon: Puzzle,
    description: 'Connect and manage your advertising platforms and tools'
  },
  {
    id: 'branding',
    name: 'Branding & White-Labeling',
    icon: Paintbrush,
    description: 'Customize the platform appearance for your agency and clients'
  },
  {
    id: 'notifications',
    name: 'Notifications & Alerts',
    icon: Bell,
    description: 'Configure email and in-app notification preferences'
  },
  {
    id: 'automation',
    name: 'Automation & Scripts',
    icon: Zap,
    description: 'Set up automated rules and custom scripts'
  },
  {
    id: 'team',
    name: 'User & Team Management',
    icon: Users,
    description: 'Manage team members, roles, and permissions'
  },
  {
    id: 'security',
    name: 'Security & Authentication',
    icon: Lock,
    description: 'Configure security settings and authentication methods'
  },
  {
    id: 'billing',
    name: 'Billing',
    icon: CreditCard,
    description: 'Manage subscription, payment methods, and billing history'
  },
  {
    id: 'advanced',
    name: 'Advanced Settings',
    icon: Wrench,
    description: 'Technical configurations and advanced options'
  }
];

export const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = React.useState(settingsCategories[0].id);

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-[var(--color-bg-secondary)] w-[80vw] max-w-7xl h-[80vh] rounded-lg shadow-xl flex">
          {/* Sidebar */}
          <div className="w-80 border-r border-[var(--color-border)] p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">Settings</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[var(--color-text-secondary)]" />
              </button>
            </div>

            <nav className="space-y-1">
              {settingsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={clsx(
                    'w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors',
                    selectedCategory === category.id
                      ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]'
                      : 'hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                  )}
                >
                  <category.icon className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-[var(--color-text-tertiary)] line-clamp-1">
                      {category.description}
                    </div>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
                {settingsCategories.find(c => c.id === selectedCategory)?.name}
              </h3>
              
              <p className="text-[var(--color-text-secondary)] mb-6">
                {settingsCategories.find(c => c.id === selectedCategory)?.description}
              </p>

              {/* Placeholder for settings content */}
              <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-8 text-center text-[var(--color-text-secondary)]">
                Settings content for {selectedCategory} will be displayed here
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};