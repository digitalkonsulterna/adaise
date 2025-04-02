import React, { useState } from 'react';
import { format } from 'date-fns';
import { Sparkles, Search, ChevronDown, GripVertical } from 'lucide-react';
import { clsx } from 'clsx';
import { useTheme } from '../contexts/ThemeContext';

interface Section {
  id: string;
  title: string;
  items: {
    id: string;
    name: string;
  }[];
}

export const GeneratedReport = () => {
  const { theme } = useTheme();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const sections: Section[] = [
    {
      id: 'google-ads',
      title: 'Google Ads',
      items: [
        { id: 'ctr', name: 'CTR (Click-Through Rate)' },
        { id: 'cpa', name: 'CPA (Cost per Acquisition)' },
        { id: 'roas', name: 'ROAS (Return on Ad Spend)' },
        { id: 'impressions', name: 'Impressions' },
        { id: 'conversions', name: 'Conversions' },
        { id: 'budget', name: 'Campaign Budget Utilization' },
        { id: 'keywords', name: 'Top Performing Keywords' },
        { id: 'devices', name: 'Device Performance Breakdown' },
        { id: 'scheduling', name: 'Ad Scheduling Insights' },
        { id: 'cpc', name: 'Cost per Click (CPC)' },
        { id: 'quality', name: 'Quality Score Distribution' }
      ]
    },
    {
      id: 'meta-ads',
      title: 'Meta Ads',
      items: [
        { id: 'meta-ctr', name: 'CTR' },
        { id: 'reach', name: 'Reach vs Frequency' },
        { id: 'conv-rate', name: 'Conversion Rate' },
        { id: 'meta-roas', name: 'ROAS' },
        { id: 'adset', name: 'Ad Set Performance' },
        { id: 'cpm', name: 'CPM (Cost per 1,000 Impressions)' },
        { id: 'video', name: 'Video View Metrics' },
        { id: 'engagement', name: 'Engagement Rate' },
        { id: 'ai-suggestions', name: 'AI-generated Ad Suggestions' },
        { id: 'audience', name: 'Target Audience Overlap' }
      ]
    },
    {
      id: 'ai-insights',
      title: 'AI Insights & Recommendations',
      items: [
        { id: 'campaign-improve', name: 'Campaign Improvement Suggestions' },
        { id: 'audience-expand', name: 'Audience Expansion Recommendations' },
        { id: 'budget-realloc', name: 'Budget Reallocation Advice' },
        { id: 'new-channels', name: 'Suggested New Channels' },
        { id: 'creative-review', name: 'AI-generated Creatives Performance Review' },
        { id: 'keyword-enhance', name: 'Keyword Enhancements' },
        { id: 'copy-analysis', name: 'Ad Copy Analysis & Feedback' },
        { id: 'best-time', name: 'Best Time to Run Ads' }
      ]
    },
    {
      id: 'audience-demographics',
      title: 'Audience & Demographics',
      items: [
        { id: 'top-audiences', name: 'Top Audiences by Conversion' },
        { id: 'age-gender', name: 'Age & Gender Breakdown' },
        { id: 'location', name: 'Location Targeting Map' },
        { id: 'device-usage', name: 'Device Usage Analysis' },
        { id: 'custom-audience', name: 'Custom Audience Performance' },
        { id: 'lookalike', name: 'Lookalike Audience Stats' },
        { id: 'engagement-type', name: 'Engagement by Audience Type' },
        { id: 'ai-segments', name: 'AI Suggested Target Segments' }
      ]
    },
    {
      id: 'landing-page',
      title: 'Landing Page Insights',
      items: [
        { id: 'conv-rate-lp', name: 'Conversion Rate by Landing Page' },
        { id: 'bounce-rate', name: 'Bounce Rate' },
        { id: 'time-on-page', name: 'Average Time on Page' },
        { id: 'cta-rate', name: 'CTA Click Rate' },
        { id: 'page-speed', name: 'Page Speed Impact' },
        { id: 'responsive', name: 'Mobile vs Desktop Experience' },
        { id: 'heatmap', name: 'Heatmap Summary' },
        { id: 'ux-improve', name: 'AI Suggestions to Improve UX' }
      ]
    },
    {
      id: 'campaign-summary',
      title: 'Campaign Summary & Trends',
      items: [
        { id: 'performance-summary', name: 'Campaign Performance Summary' },
        { id: 'growth-trends', name: 'Weekly/Monthly Growth Trends' },
        { id: 'spend-time', name: 'Spend Over Time' },
        { id: 'conv-trends', name: 'Conversion Trendlines' },
        { id: 'imp-trends', name: 'Impression Trends' },
        { id: 'funnel', name: 'Funnel Overview (Awareness → Conversion)' }
      ]
    },
    {
      id: 'budget-overview',
      title: 'Budget & Spend Overview',
      items: [
        { id: 'budget-usage', name: 'Daily/Weekly Budget Usage' },
        { id: 'platform-spend', name: 'Spend by Platform' },
        { id: 'cost-result', name: 'Cost Per Result (Grouped)' },
        { id: 'budget-alerts', name: 'Over/Under Budget Alerts' },
        { id: 'budget-realloc', name: 'Suggested Budget Reallocation (AI)' }
      ]
    },
    {
      id: 'attribution',
      title: 'Multi-Channel Attribution',
      items: [
        { id: 'conv-path', name: 'Conversion Path Breakdown' },
        { id: 'click-compare', name: 'First Click vs Last Click Performance' },
        { id: 'assisted-conv', name: 'Assisted Conversions' },
        { id: 'channel-contrib', name: 'Channel Contribution %' },
        { id: 'cross-roas', name: 'Cross-platform ROAS' },
        { id: 'attr-windows', name: 'Attribution Windows Comparison' }
      ]
    },
    {
      id: 'custom-notes',
      title: 'Custom Notes & Highlights',
      items: [
        { id: 'exec-summary', name: 'Executive Summary' },
        { id: 'section-notes', name: 'Notes per Section' },
        { id: 'ai-summary', name: 'AI-generated Summary per Channel' },
        { id: 'analyst-comments', name: 'Analyst Comments' },
        { id: 'chart-highlights', name: 'Chart Highlights with Commentary' }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const filteredSections = sections.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg-primary)]">
      {/* Sidebar */}
      <div className="fixed left-0 top-[48px] bottom-0 w-1/4 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)] overflow-y-auto">
        <div className="p-4">
          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
            <input
              type="text"
              placeholder="Search sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg text-sm text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            />
          </div>

          {/* Sections */}
          <div className="space-y-2">
            {filteredSections.map((section) => (
              <div key={section.id} className="border border-[var(--color-border)] rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-3 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80 transition-colors"
                >
                  <span className="font-medium text-[var(--color-text-primary)]">{section.title}</span>
                  <ChevronDown
                    className={clsx(
                      "w-4 h-4 text-[var(--color-text-tertiary)] transition-transform",
                      expandedSections.includes(section.id) ? "rotate-180" : ""
                    )}
                  />
                </button>
                {expandedSections.includes(section.id) && (
                  <div className="p-2 space-y-1">
                    {section.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-2 p-2 hover:bg-[var(--color-bg-tertiary)] rounded cursor-pointer group"
                        draggable
                      >
                        <GripVertical className="w-4 h-4 text-[var(--color-text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="text-sm text-[var(--color-text-secondary)]">{item.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Suggest New Sections Button */}
          <button className="w-full mt-4 px-4 py-2 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-bg-tertiary)]/80 text-[var(--color-text-secondary)] rounded-lg text-sm transition-colors">
            Suggest New Sections
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 ml-[25%] p-6">
        <div className="max-w-[800px] mx-auto">
          {/* Report Header */}
          <div className="bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
                Campaign Performance Report
              </h1>
              <span className="text-sm text-[var(--color-text-secondary)]">
                {format(new Date(), 'MMMM d, yyyy')}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[var(--color-text-secondary)]">
              <span>Period: Last 30 days</span>
              <span>•</span>
              <span>Generated by: AI Assistant</span>
            </div>
          </div>

          {/* Drop Zone */}
          <div 
            className={clsx(
              'min-h-[600px] bg-[var(--color-bg-secondary)] rounded-lg border-2 border-dashed transition-colors',
              selectedItems.length > 0
                ? 'border-[var(--color-accent)] bg-[var(--color-accent)]10'
                : 'border-[var(--color-border)]'
            )}
          >
            {selectedItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[var(--color-text-secondary)]">
                <Sparkles className="w-12 h-12 mb-4 text-[var(--color-text-tertiary)]" />
                <p className="text-lg font-medium mb-2">Drag sections here</p>
                <p className="text-sm">Build your report by dragging sections from the left sidebar</p>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {/* Example dropped content - replace with actual dragged items */}
                <div className="bg-[var(--color-bg-tertiary)] rounded-lg p-4">
                  <h3 className="text-lg font-medium text-[var(--color-text-primary)] mb-4">Campaign Overview</h3>
                  <div className="h-48 bg-[var(--color-bg-secondary)] rounded flex items-center justify-center text-[var(--color-text-tertiary)]">
                    Chart placeholder
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};