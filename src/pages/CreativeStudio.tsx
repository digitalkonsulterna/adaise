import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus,
  Search,
  Filter,
  Grid,
  LayoutGrid,
  Download,
  Trash2,
  Star,
  StarOff,
  MoreVertical,
  ChevronDown,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { Menu } from '@headlessui/react';
import { clsx } from 'clsx';

interface Image {
  id: string;
  url: string;
  name: string;
  type: string;
  size: string;
  dimensions: string;
  uploaded: string;
  favorite: boolean;
}

const mockImages: Image[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8',
    name: 'Summer Campaign 1',
    type: 'Image',
    size: '2.4 MB',
    dimensions: '1920x1080',
    uploaded: '2024-03-15',
    favorite: true
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74',
    name: 'Product Showcase',
    type: 'Image',
    size: '1.8 MB',
    dimensions: '1920x1080',
    uploaded: '2024-03-14',
    favorite: false
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    name: 'Office Setup',
    type: 'Image',
    size: '3.2 MB',
    dimensions: '2560x1440',
    uploaded: '2024-03-13',
    favorite: true
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
    name: 'Marketing Stats',
    type: 'Image',
    size: '1.5 MB',
    dimensions: '1920x1080',
    uploaded: '2024-03-12',
    favorite: false
  }
];

export const CreativeStudio = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [images, setImages] = useState(mockImages);

  const filteredImages = images.filter(image =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (imageId: string) => {
    setImages(prev => prev.map(img =>
      img.id === imageId ? { ...img, favorite: !img.favorite } : img
    ));
  };

  const handleCreateNew = () => {
    navigate('/creative-studio/create');
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] pt-[48px]">
      {/* Header */}
      <div className="bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)]">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold text-[var(--color-text-primary)]">Creative Studio</h1>
            <button
              onClick={handleCreateNew}
              className="flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)] text-white rounded-lg hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create a Creative
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
                <input
                  type="text"
                  placeholder="Search creatives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                />
              </div>
              <button className="px-4 py-2 border border-[var(--color-border)] rounded-lg hover:bg-[var(--color-bg-tertiary)] transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'grid'
                    ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={clsx(
                  'p-2 rounded-lg transition-colors',
                  viewMode === 'list'
                    ? 'bg-[var(--color-accent)]20 text-[var(--color-accent)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
                )}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className={clsx(
          viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'
        )}>
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={clsx(
                'group bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] overflow-hidden transition-shadow hover:shadow-lg',
                viewMode === 'list' && 'flex items-center'
              )}
            >
              <div className={clsx(
                'relative',
                viewMode === 'list' ? 'w-48' : 'aspect-video'
              )}>
                <img
                  src={`${image.url}?w=400&h=225&fit=crop`}
                  alt={image.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <div className={clsx(
                'p-4',
                viewMode === 'list' && 'flex-1'
              )}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-[var(--color-text-primary)]">{image.name}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)]">{image.dimensions}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(image.id)}
                      className={clsx(
                        'p-1 rounded-lg transition-colors',
                        image.favorite
                          ? 'text-amber-400 hover:bg-amber-500/10'
                          : 'text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-tertiary)]'
                      )}
                    >
                      {image.favorite ? (
                        <Star className="w-5 h-5 fill-current" />
                      ) : (
                        <StarOff className="w-5 h-5" />
                      )}
                    </button>
                    <Menu as="div" className="relative">
                      <Menu.Button className="p-1 text-[var(--color-text-tertiary)] hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
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
                              Edit
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
                              Duplicate
                            </button>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={clsx(
                                'w-full text-left px-4 py-2 text-sm text-red-500',
                                active ? 'bg-red-50' : ''
                              )}
                            >
                              Delete
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};