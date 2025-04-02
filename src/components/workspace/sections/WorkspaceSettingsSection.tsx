import React, { useState } from 'react';
import { 
  Users,
  Mail,
  Trash2,
  Languages,
  CreditCard
} from 'lucide-react';
import { clsx } from 'clsx';

interface WorkspaceSettingsProps {
  onBack: () => void;
  onDeleteWorkspace: () => void;
}

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
}

interface WorkspaceSettings {
  name: string;
  teamMembers: TeamMember[];
  defaultBudget: {
    daily: number;
    monthly: number;
  };
  language: string;
  currency: string;
  timezone: string;
}

const roles = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' }
];

export const WorkspaceSettingsSection: React.FC<WorkspaceSettingsProps> = ({
  onDeleteWorkspace
}) => {
  const [settings, setSettings] = useState<WorkspaceSettings>({
    name: '',
    teamMembers: [],
    defaultBudget: {
      daily: 50,
      monthly: 1500
    },
    language: 'en',
    currency: 'USD',
    timezone: 'UTC'
  });

  const [newMemberEmail, setNewMemberEmail] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof WorkspaceSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleAddTeamMember = () => {
    if (newMemberEmail) {
      const newMember: TeamMember = {
        id: Math.random().toString(36).substr(2, 9),
        name: '',
        email: newMemberEmail,
        role: 'viewer'
      };
      
      handleChange('teamMembers', [...settings.teamMembers, newMember]);
      setNewMemberEmail('');
    }
  };

  const handleRemoveTeamMember = (id: string) => {
    handleChange(
      'teamMembers',
      settings.teamMembers.filter(member => member.id !== id)
    );
  };

  const handleUpdateTeamMember = (id: string, field: keyof TeamMember, value: any) => {
    handleChange(
      'teamMembers',
      settings.teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      )
    );
  };

  const handleSave = () => {
    console.log('Saving workspace settings:', settings);
    setIsDirty(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Workspace Name */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Workspace Name</h2>
          <input
            type="text"
            placeholder="Enter workspace name"
            value={settings.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </section>

        {/* Team Members */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Team Members</h2>
          </div>

          <div className="space-y-4">
            {settings.teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-4 bg-[var(--color-bg-tertiary)] rounded-lg border border-[var(--color-border)]"
              >
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Name"
                    value={member.name}
                    onChange={(e) => handleUpdateTeamMember(member.id, 'name', e.target.value)}
                    className="px-3 py-1.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={member.email}
                    onChange={(e) => handleUpdateTeamMember(member.id, 'email', e.target.value)}
                    className="px-3 py-1.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                  <select
                    value={member.role}
                    onChange={(e) => handleUpdateTeamMember(member.id, 'role', e.target.value)}
                    className="px-3 py-1.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => handleRemoveTeamMember(member.id)}
                  className="p-2 text-[var(--color-text-secondary)] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
                <input
                  type="email"
                  placeholder="Enter email to invite"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <button
                onClick={handleAddTeamMember}
                disabled={!newMemberEmail}
                className={clsx(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  newMemberEmail
                    ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                    : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]'
                )}
              >
                Add Member
              </button>
            </div>
          </div>
        </section>

        {/* Default Budget Preferences */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Default Budget</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Daily Budget
              </label>
              <input
                type="number"
                value={settings.defaultBudget.daily}
                onChange={(e) => handleChange('defaultBudget', {
                  ...settings.defaultBudget,
                  daily: Number(e.target.value)
                })}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Monthly Budget
              </label>
              <input
                type="number"
                value={settings.defaultBudget.monthly}
                onChange={(e) => handleChange('defaultBudget', {
                  ...settings.defaultBudget,
                  monthly: Number(e.target.value)
                })}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>
        </section>

        {/* Language & Localization */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Language & Localization</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Language
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Timezone
              </label>
              <select
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
                <option value="CET">CET</option>
              </select>
            </div>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-red-700 font-medium">Delete Workspace</h3>
                <p className="text-red-600 text-sm">
                  Once you delete a workspace, there is no going back. Please be certain.
                </p>
              </div>
              <button
                onClick={onDeleteWorkspace}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete Workspace
              </button>
            </div>
          </div>
        </section>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={!isDirty}
            className={clsx(
              'px-6 py-2 rounded-lg font-medium transition-colors',
              isDirty
                ? 'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)]'
                : 'bg-[var(--color-bg-tertiary)] text-[var(--color-text-tertiary)]'
            )}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};