import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Upload,
  Type,
  Square,
  Image as ImageIcon,
  Palette,
  Undo2,
  Redo2,
  Download,
  Save,
  Sparkles,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Underline,
  ChevronDown,
  Minus,
  Plus,
  Crop,
  SlidersHorizontal,
  Layout,
  ArrowLeft
} from 'lucide-react';
import { clsx } from 'clsx';

const ToolButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={clsx(
      'flex flex-col items-center gap-1 p-3 rounded-lg transition-colors w-full',
      active
        ? 'bg-[var(--color-accent)]10 text-[var(--color-accent)]'
        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
    )}
  >
    {icon}
    <span className="text-xs">{label}</span>
  </button>
);

export const AdCreator = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[48px]">
      {/* Top Toolbar */}
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] px-6 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/creative-studio')}
              className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
              <Undo2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
              <Redo2 className="w-5 h-5" />
            </button>
            <div className="h-6 w-px bg-[var(--color-border)]" />
            <button className="px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors flex items-center gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="px-4 py-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
            <button className="px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Auto-generate with AI
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-96px)]">
        {/* Left Sidebar */}
        <div className="w-20 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] p-2 flex flex-col gap-2">
          <ToolButton
            icon={<Upload className="w-5 h-5" />}
            label="Upload"
            active={selectedTool === 'upload'}
            onClick={() => setSelectedTool('upload')}
          />
          <ToolButton
            icon={<Type className="w-5 h-5" />}
            label="Text"
            active={selectedTool === 'text'}
            onClick={() => setSelectedTool('text')}
          />
          <ToolButton
            icon={<Square className="w-5 h-5" />}
            label="Shapes"
            active={selectedTool === 'shapes'}
            onClick={() => setSelectedTool('shapes')}
          />
          <ToolButton
            icon={<ImageIcon className="w-5 h-5" />}
            label="Images"
            active={selectedTool === 'images'}
            onClick={() => setSelectedTool('images')}
          />
          <ToolButton
            icon={<Palette className="w-5 h-5" />}
            label="Background"
            active={selectedTool === 'background'}
            onClick={() => setSelectedTool('background')}
          />
          <ToolButton
            icon={<Layout className="w-5 h-5" />}
            label="Templates"
            active={selectedTool === 'templates'}
            onClick={() => setSelectedTool('templates')}
          />
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 bg-[var(--color-bg-tertiary)] p-8 flex items-center justify-center overflow-auto">
          <div className="relative w-[800px] h-[600px] bg-white rounded-lg shadow-xl">
            {/* Sample Image */}
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
              alt="Sample canvas"
              className="w-full h-full object-cover rounded-lg"
            />

            {/* Sample Overlays */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="text-6xl font-bold text-white drop-shadow-lg mb-4">
                Summer Sale
              </div>
              <div className="text-2xl text-white drop-shadow-lg">
                Up to 50% Off
              </div>
            </div>

            {/* Sample Shape */}
            <div className="absolute bottom-8 right-8 w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <div className="text-xl font-bold text-white">
                Limited Time
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Text Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <Bold className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <Italic className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <Underline className="w-4 h-4" />
                  </button>
                  <div className="h-6 w-px bg-[var(--color-border)]" />
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <AlignLeft className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <AlignCenter className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <AlignRight className="w-4 h-4" />
                  </button>
                </div>

                <button className="w-full flex items-center justify-between p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  <span>Arial</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2">
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="number"
                    value="48"
                    className="w-16 px-2 py-1 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded text-center"
                  />
                  <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Image Adjustments</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  <span className="flex items-center gap-2">
                    <Crop className="w-4 h-4" />
                    Crop
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="w-full flex items-center justify-between p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  <span className="flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4" />
                    Adjust
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">Element Alignment</h3>
              <div className="grid grid-cols-3 gap-2">
                <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  Left
                </button>
                <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  Center
                </button>
                <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  Right
                </button>
                <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  Top
                </button>
                <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  Middle
                </button>
                <button className="p-2 text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                  Bottom
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};