import React, { useState } from 'react';
import { 
  Upload,
  Globe,
  Target,
  MessageSquare,
  Lightbulb,
  Briefcase
} from 'lucide-react';
import { clsx } from 'clsx';

interface BrandDetailsSectionProps {
  onBack: () => void;
}

interface BrandDetails {
  name: string;
  logo: string | null;
  website: string;
  shortDescription: string;
  longDescription: string;
  targetAudience: {
    demographics: string[];
    interests: string[];
    locations: string[];
  };
  tone: string;
  usp: string[];
  industry: string;
  niche: string;
}

const toneOptions = [
  'Professional',
  'Casual',
  'Fun',
  'Serious',
  'Friendly',
  'Luxury',
  'Technical',
  'Educational'
];

export const BrandDetailsSection: React.FC<BrandDetailsSectionProps> = () => {
  const [brandDetails, setBrandDetails] = useState<BrandDetails>({
    name: '',
    logo: null,
    website: '',
    shortDescription: '',
    longDescription: '',
    targetAudience: {
      demographics: [],
      interests: [],
      locations: []
    },
    tone: 'Professional',
    usp: [''],
    industry: '',
    niche: ''
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (field: keyof BrandDetails, value: any) => {
    setBrandDetails(prev => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSave = () => {
    console.log('Saving brand details:', brandDetails);
    setIsDirty(false);
  };

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Basic Information */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Basic Information</h2>
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-lg border-2 border-dashed border-[var(--color-border)] flex items-center justify-center">
              {brandDetails.logo ? (
                <img
                  src={brandDetails.logo}
                  alt="Brand logo"
                  className="w-full h-full object-contain"
                />
              ) : (
                <button className="p-3 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
                  <Upload className="w-6 h-6" />
                </button>
              )}
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Brand Name"
                value={brandDetails.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>

          {/* Website URL */}
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-text-tertiary)]" />
            <input
              type="url"
              placeholder="Website URL"
              value={brandDetails.website}
              onChange={(e) => handleChange('website', e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>
        </section>

        {/* Brand Description */}
        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Brand Description</h2>
          
          <input
            type="text"
            placeholder="Short Description (1-2 sentences)"
            value={brandDetails.shortDescription}
            onChange={(e) => handleChange('shortDescription', e.target.value)}
            className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
          
          <textarea
            placeholder="Long Description"
            value={brandDetails.longDescription}
            onChange={(e) => handleChange('longDescription', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
          />
        </section>

        {/* Target Audience */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Target Audience</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Demographics
              </label>
              <input
                type="text"
                placeholder="Age, Gender, Income, etc."
                value={brandDetails.targetAudience.demographics.join(', ')}
                onChange={(e) => handleChange('targetAudience', {
                  ...brandDetails.targetAudience,
                  demographics: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Interests
              </label>
              <input
                type="text"
                placeholder="Hobbies, Activities, etc."
                value={brandDetails.targetAudience.interests.join(', ')}
                onChange={(e) => handleChange('targetAudience', {
                  ...brandDetails.targetAudience,
                  interests: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Locations
              </label>
              <input
                type="text"
                placeholder="Countries, Cities, etc."
                value={brandDetails.targetAudience.locations.join(', ')}
                onChange={(e) => handleChange('targetAudience', {
                  ...brandDetails.targetAudience,
                  locations: e.target.value.split(',').map(s => s.trim())
                })}
                className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
              />
            </div>
          </div>
        </section>

        {/* Tone & Messaging */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Tone & Messaging</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {toneOptions.map((tone) => (
              <button
                key={tone}
                onClick={() => handleChange('tone', tone)}
                className={clsx(
                  'px-4 py-2 rounded-lg border transition-colors',
                  brandDetails.tone === tone
                    ? 'border-[var(--color-accent)] bg-[var(--color-accent)]10 text-[var(--color-accent)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-accent)] text-[var(--color-text-secondary)]'
                )}
              >
                {tone}
              </button>
            ))}
          </div>
        </section>

        {/* Unique Selling Points */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Unique Selling Points</h2>
          </div>
          
          {brandDetails.usp.map((point, index) => (
            <input
              key={index}
              type="text"
              placeholder={`USP ${index + 1}`}
              value={point}
              onChange={(e) => {
                const newUsp = [...brandDetails.usp];
                newUsp[index] = e.target.value;
                handleChange('usp', newUsp);
              }}
              className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          ))}
          
          <button
            onClick={() => handleChange('usp', [...brandDetails.usp, ''])}
            className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] text-sm font-medium"
          >
            + Add another USP
          </button>
        </section>

        {/* Industry & Niche */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-[var(--color-text-secondary)]" />
            <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Industry & Niche</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Industry"
              value={brandDetails.industry}
              onChange={(e) => handleChange('industry ', e.target.value)}
              className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
            
            <input
              type="text"
              placeholder="Niche"
              value={brandDetails.niche}
              onChange={(e) => handleChange('niche', e.target.value)}
              className="w-full px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
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