import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';
import { 
  LayoutDashboard, 
  Megaphone, 
  Palette, 
  BarChart3, 
  ChevronDown, 
  Settings, 
  Bell, 
  Users, 
  CreditCard, 
  Shield, 
  LogOut, 
  Building2, 
  Puzzle, 
  Paintbrush, 
  Bell as BellIcon, 
  UserCog, 
  Lock, 
  Wrench, 
  MessageSquare, 
  Search, 
  Plus, 
  Settings2, 
  KeyRound, 
  PenTool as Tool, 
  FileText,
  Menu as MenuIcon,
  X
} from 'lucide-react';
import { GoogleIcon } from '../icons/GoogleIcon';
import { FacebookIcon } from '../icons/FacebookIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';
import { clsx } from 'clsx';
import { SettingsPanel } from './SettingsPanel';
import { ThemeToggle } from '../ThemeToggle';
import { ClientWorkspace } from '../workspace/ClientWorkspace';
import { useTheme } from '../../contexts/ThemeContext';

interface Platform {
  name: string;
  icons: React.ReactNode[];
}

interface MainNavProps {
  onClientChange: (client: string) => void;
}

const allPlatforms: Platform[] = [
  {
    name: 'Woshapp',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />]
  },
  {
    name: 'BlancheStories',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />]
  },
  {
    name: 'Elgiganten',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />, <LinkedInIcon key="linkedin" />]
  },
  {
    name: 'YogaMana EpiCenter',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />]
  },
  {
    name: 'Liqvida Finans',
    icons: [<GoogleIcon key="google" />, <LinkedInIcon key="linkedin" />]
  },
  {
    name: 'SysterElsa',
    icons: [<FacebookIcon key="fb" />]
  },
  {
    name: 'FyndGiganten',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />, <LinkedInIcon key="linkedin" />]
  },
  {
    name: 'Espresso House',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />]
  },
  {
    name: 'Madina AB',
    icons: [<FacebookIcon key="fb" />, <LinkedInIcon key="linkedin" />]
  },
  {
    name: 'ByggaHuset',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />]
  },
  {
    name: 'Clas Ohlsson',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />, <LinkedInIcon key="linkedin" />]
  },
  {
    name: 'Solhem inredning',
    icons: [<FacebookIcon key="fb" />]
  },
  {
    name: 'Mobleria',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />]
  },
  {
    name: 'ByggMax',
    icons: [<GoogleIcon key="google" />, <FacebookIcon key="fb" />, <LinkedInIcon key="linkedin" />]
  },
  {
    name: 'Aqarat SY',
    icons: [<FacebookIcon key="fb" />]
  }
];

const platformColors = {
  google: '#4285F4',
  facebook: '#1877F2',
  linkedin: '#0A66C2'
};

export const MainNav: React.FC<MainNavProps> = ({ onClientChange }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = React.useState(false);
  const [selectedPlatform, setSelectedPlatform] = React.useState('Woshapp');
  const [searchQuery, setSearchQuery] = useState('');
  const [showWorkspaceDialog, setShowWorkspaceDialog] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [showClientWorkspace, setShowClientWorkspace] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filteredPlatforms = allPlatforms.filter(platform =>
    platform.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePlatformSelect = (platformName: string) => {
    setSelectedPlatform(platformName);
    onClientChange(platformName);
    setIsMobileMenuOpen(false);
  };

  const handleManageClient = (clientName: string) => {
    setSelectedClient(clientName);
    setShowClientWorkspace(true);
  };

  const navigationItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Campaigns', icon: Megaphone, path: '/campaigns' },
    { name: 'Creative Studio', icon: Palette, path: '/creative-studio' },
    {
      name: 'Tools',
      icon: Tool,
      items: [
        { name: 'Reporting Builder', icon: BarChart3, path: '/reporting' },
        { name: 'Keyword Analysis', icon: KeyRound, path: '/keyword-analysis' },
        { name: 'Smart Resume', icon: FileText, path: '/smart-resume' }
      ]
    }
  ];

  const profileMenuItems = [
    { name: 'Profile Settings', icon: UserCog },
    { name: 'Billing', icon: CreditCard },
    { name: 'Security', icon: Shield },
    { name: 'Team', icon: Users },
    { name: 'Logout', icon: LogOut }
  ];

  const settingsMenuItems = [
    { name: 'Workspaces & Accounts', icon: Building2, action: () => navigate('/workspaces') },
    { name: 'Integrations', icon: Puzzle },
    { name: 'Branding', icon: Paintbrush },
    { name: 'Notifications', icon: BellIcon },
    { name: 'Show all settings', icon: Settings, action: () => setIsSettingsPanelOpen(true) }
  ];

  const handleNewWorkspace = () => {
    if (newWorkspaceName.trim()) {
      console.log('Creating new workspace:', newWorkspaceName);
      setShowWorkspaceDialog(false);
      setNewWorkspaceName('');
      navigate('/workspace/connect');
    }
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[var(--color-navbar)] border-b border-[var(--color-border)] text-[var(--color-text-secondary)] px-4 py-2 flex items-center fixed top-0 left-0 right-0 z-50">
        {/* Logo */}
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/smart-resume')}
            className="transition-transform hover:scale-105 focus:outline-none"
          >
            <img 
              src={theme === 'light' ? 'https://dk.se/wp-content/uploads/2025/02/adaise-black.png' : 'https://dk.se/wp-content/uploads/2025/02/adaise-white.png'} 
              alt="ADAISE Logo" 
              className="h-5"
            />
          </button>
        </div>

        {/* Platform Selector */}
        <div className="flex items-center lg:ml-4">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center space-x-2 px-3 py-1.5 hover:bg-[var(--color-navbar-hover)] rounded-md transition">
              <span className="text-[var(--color-text-primary)] truncate max-w-[120px] lg:max-w-none">{selectedPlatform}</span>
              <div className="hidden lg:flex space-x-2">
                {allPlatforms.find(p => p.name === selectedPlatform)?.icons}
              </div>
              <ChevronDown className="w-4 h-4 text-[var(--color-text-secondary)]" />
            </Menu.Button>

            <Menu.Items className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 mt-1 w-[calc(100vw-2rem)] max-w-[320px] lg:w-80 bg-[var(--color-bg-secondary)] rounded-md shadow-lg border border-[var(--color-border)] py-1 z-50">
              <div className="p-2">
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
                  <input
                    type="text"
                    placeholder="Search clients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-[var(--color-bg-tertiary)] rounded-md text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                  />
                </div>
                <div className="max-h-[280px] overflow-y-auto">
                  {filteredPlatforms.map((platform, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <div
                          className={clsx(
                            'px-4 py-2 flex items-center justify-between rounded-md group',
                            active ? 'bg-[var(--color-bg-tertiary)]' : ''
                          )}
                        >
                          <div
                            className="flex-1 cursor-pointer"
                            onClick={() => handlePlatformSelect(platform.name)}
                          >
                            <span className="text-[var(--color-text-primary)]">{platform.name}</span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex space-x-2">
                              {platform.icons}
                            </div>
                            <button
                              onClick={() => handleManageClient(platform.name)}
                              className={clsx(
                                'p-1.5 rounded-md transition-colors',
                                active ? 'bg-[var(--color-bg-secondary)]' : 'bg-[var(--color-bg-tertiary)]',
                                'hover:bg-[var(--color-accent)]10 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]'
                              )}
                              title="Manage integrations"
                            >
                              <Settings2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </Menu.Item>
                  ))}
                </div>
                <div className="pt-2 mt-2 border-t border-[var(--color-border)]">
                  <button
                    onClick={() => setShowWorkspaceDialog(true)}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-hover)] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Client</span>
                  </button>
                </div>
              </div>
            </Menu.Items>
          </Menu>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 items-center justify-center space-x-8">
          {navigationItems.map((item) => (
            item.items ? (
              <Menu as="div" key={item.name} className="relative">
                <Menu.Button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[var(--color-navbar-hover)] transition-colors">
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  <ChevronDown className="w-4 h-4" />
                </Menu.Button>
                <Menu.Items className="absolute left-0 mt-1 w-48 bg-[var(--color-bg-secondary)] rounded-md shadow-lg border border-[var(--color-border)] py-1 z-50">
                  {item.items.map((subItem) => (
                    <Menu.Item key={subItem.name}>
                      {({ active }) => (
                        <button
                          onClick={() => handleNavigate(subItem.path)}
                          className={clsx(
                            'w-full text-left px-4 py-2 flex items-center space-x-2',
                            active ? 'bg-[var(--color-bg-tertiary)]' : ''
                          )}
                        >
                          <subItem.icon className="w-4 h-4" />
                          <span>{subItem.name}</span>
                        </button>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Menu>
            ) : (
              <button
                key={item.name}
                onClick={() => handleNavigate(item.path)}
                className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-[var(--color-navbar-hover)] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </button>
            )
          ))}
        </div>

        {/* Right Side Icons and Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 hover:bg-[var(--color-navbar-hover)] rounded-full transition">
                <Bell className="w-5 h-5" />
              </Menu.Button>
            </Menu>

            <Menu as="div" className="relative">
              <Menu.Button className="p-2 hover:bg-[var(--color-navbar-hover)] rounded-full transition">
                <Settings className="w-5 h-5" />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-1 w-56 bg-[var(--color-bg-secondary)] rounded-md shadow-lg border border-[var(--color-border)] py-1 z-50">
                {settingsMenuItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        className={clsx(
                          'w-full text-left px-4 py-2 flex items-center space-x-2',
                          active ? 'bg-[var(--color-bg-tertiary)]' : ''
                        )}
                        onClick={item.action}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>

            <Menu as="div" className="relative">
              <Menu.Button className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-medium">
                DK
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-1 w-56 bg-[var(--color-bg-secondary)] rounded-md shadow-lg border border-[var(--color-border)] py-1 z-50">
                {profileMenuItems.map((item, index) => (
                  <Menu.Item key={index}>
                    {({ active }) => (
                      <button
                        className={clsx(
                          'w-full text-left px-4 py-2 flex items-center space-x-2',
                          active ? 'bg-[var(--color-bg-tertiary)]' : ''
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-[var(--color-navbar-hover)] rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={clsx(
          'fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300',
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      
      <div
        className={clsx(
          'fixed top-[48px] right-0 bottom-0 w-64 bg-[var(--color-bg-secondary)] z-40 lg:hidden transform transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-4">
            {navigationItems.map((item) => (
              item.items ? (
                <div key={item.name} className="px-4 py-2">
                  <div className="flex items-center space-x-2 text-[var(--color-text-secondary)] mb-2">
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                  <div className="pl-6 space-y-2">
                    {item.items.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleNavigate(subItem.path)}
                        className="w-full flex items-center space-x-2 px-4 py-2 rounded-md hover:bg-[var(--color-navbar-hover)] transition-colors text-[var(--color-text-secondary)]"
                      >
                        <subItem.icon className="w-4 h-4" />
                        <span>{subItem.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleNavigate(item.path)}
                  className="w-full flex items-center space-x-2 px-8 py-3 hover:bg-[var(--color-navbar-hover)] transition-colors text-[var(--color-text-secondary)]"
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Footer */}
          <div className="border-t border-[var(--color-border)] p-4 space-y-2">
            <div className="flex items-center justify-between px-2">
              <ThemeToggle />
              <button className="p-2 hover:bg-[var(--color-navbar-hover)] rounded-full transition">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-[var(--color-navbar-hover)] rounded-full transition">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center text-white font-medium">
                DK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Workspace Dialog */}
      {showWorkspaceDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-[var(--color-bg-secondary)] rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-text-primary)]">Create New Client</h2>
            <input
              type="text"
              value={newWorkspaceName}
              onChange={(e) => setNewWorkspaceName(e.target.value)}
              placeholder="Enter client name"
              className="w-full px-4 py-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-text-primary)] mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowWorkspaceDialog(false)}
                className="px-4 py-2 rounded-md hover:bg-[var(--color-bg-tertiary)] transition-colors text-[var(--color-text-secondary)]"
              >
                Cancel
              </button>
              <button
                onClick={handleNewWorkspace}
                className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      <SettingsPanel 
        isOpen={isSettingsPanelOpen} 
        onClose={() => setIsSettingsPanelOpen(false)} 
      />

      <ClientWorkspace
        isOpen={showClientWorkspace}
        onClose={() => setShowClientWorkspace(false)}
        clientName={selectedClient}
      />
    </>
  );
};