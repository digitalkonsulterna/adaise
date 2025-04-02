import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Bot, LineChart, Sparkles, FileText, ArrowRight, Send, Wand2, Users, Sparkle, TrendingUp, ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { clsx } from 'clsx';
import { useTypingAnimation } from '../hooks/useTypingAnimation';
import { useNavigate } from 'react-router-dom';

interface SuggestionChip {
  id: string;
  text: string;
}

interface Client {
  id: string;
  name: string;
  activeCampaigns: number;
  lastActivity: string;
  topCampaign: {
    name: string;
    ctr: number;
    cpa: number;
  };
  hasAiSuggestions: boolean;
}

const placeholderSentences = [
  'create a campaign with your requirements',
  'analyze your campaign, audience or results',
  'optimize your CTR or CPA',
  'suggest improvements for your ads',
  'find your best-performing campaigns',
  'generate a campaign report'
];

const FadeInSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            delay,
            ease: [0.22, 1, 0.36, 1]
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const SmartResume = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const firstName = "Jens";
  const [inputValue, setInputValue] = useState('');
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const isDark = theme === 'dark';

  const placeholderText = useTypingAnimation({
    baseText: 'Ask Adaise to',
    sentences: placeholderSentences,
    typingSpeed: 5,
    deletingSpeed: 1,
    pauseDuration: 1000
  });

  const suggestionChips: SuggestionChip[] = [
    {
      id: '1',
      text: 'Show which ads performed best last week.'
    },
    {
      id: '2',
      text: 'Create a new TikTok campaign similar to my best one on Google.'
    },
    {
      id: '3',
      text: 'What can I do to lower my CPA?'
    }
  ];

  const mockClients: Client[] = [
    {
      id: '1',
      name: 'Klinik Estetika',
      activeCampaigns: 5,
      lastActivity: '2 days ago',
      topCampaign: {
        name: 'Summer Campaign 2024',
        ctr: 4.8,
        cpa: 245
      },
      hasAiSuggestions: true
    },
    {
      id: '2',
      name: 'Dental Care Plus',
      activeCampaigns: 3,
      lastActivity: '5 hours ago',
      topCampaign: {
        name: 'Teeth Whitening Offer',
        ctr: 5.2,
        cpa: 189
      },
      hasAiSuggestions: false
    },
    {
      id: '3',
      name: 'Beauty Center Stockholm',
      activeCampaigns: 7,
      lastActivity: '1 day ago',
      topCampaign: {
        name: 'Spring Campaign 2024',
        ctr: 6.1,
        cpa: 210
      },
      hasAiSuggestions: true
    },
    {
      id: '4',
      name: 'Hudvårdskliniken',
      activeCampaigns: 4,
      lastActivity: '3 days ago',
      topCampaign: {
        name: 'Acne Treatment',
        ctr: 4.5,
        cpa: 275
      },
      hasAiSuggestions: true
    }
  ];

  const handleSuggestionClick = (suggestion: SuggestionChip) => {
    setInputValue(suggestion.text);
    setSelectedSuggestion(suggestion.id);
  };

  const handleClientsView = () => {
    navigate('/clients');
  };

  const cardHoverVariants = {
    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(0,0,0,0)" },
    hover: { 
      scale: 1.02,
      boxShadow: isDark 
        ? "0px 10px 30px rgba(0,0,0,0.3)" 
        : "0px 10px 30px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    }
  };

  return (
    <div className={clsx(
      'min-h-screen pt-[48px] font-sans',
      isDark 
        ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white'
        : 'bg-gradient-to-b from-gray-50 to-white text-gray-900'
    )}>
      {/* Hero Section */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <FadeInSection>
            <div className="text-center py-16">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Hello again, {firstName}!
              </motion.h1>
              <motion.p 
                className={clsx(
                  'text-xl md:text-2xl',
                  isDark ? 'text-gray-300' : 'text-gray-600'
                )}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                What would you like to improve today?
              </motion.p>
            </div>
          </FadeInSection>

          {/* Chatbot Section */}
          <FadeInSection delay={0.2}>
            <div className={clsx(
              'rounded-3xl p-8 md:p-12 border mb-16',
              isDark 
                ? 'bg-white/10 backdrop-blur-lg border-white/20'
                : 'bg-white border-gray-200 shadow-xl'
            )}>
              <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                  <div className="relative">
                    <textarea
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      placeholder={isInputFocused ? 'Write a question or choose from our suggestions...' : placeholderText}
                      rows={3}
                      className={clsx(
                        'w-full px-6 py-4 pr-12 rounded-xl border text-lg transition-all duration-300 resize-none',
                        isDark 
                          ? 'bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-blue-500/50'
                          : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-blue-500',
                        'focus:ring-4 focus:ring-blue-500/20 outline-none'
                      )}
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={clsx(
                        'absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors',
                        isDark
                          ? 'text-gray-400 hover:text-white hover:bg-white/10'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                      )}
                    >
                      <Send className="w-6 h-6" />
                    </motion.button>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex flex-wrap gap-3">
                    {suggestionChips.map((suggestion) => (
                      <motion.button
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={clsx(
                          'px-5 py-2.5 rounded-full text-sm font-medium transition-colors',
                          selectedSuggestion === suggestion.id
                            ? isDark
                              ? 'bg-blue-500/30 text-blue-300 border border-blue-500/50'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                            : isDark
                              ? 'bg-white/5 text-gray-300 border border-white/10 hover:border-white/20'
                              : 'bg-gray-100 text-gray-700 border border-gray-200 hover:border-gray-300'
                        )}
                      >
                        {suggestion.text}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors',
                      isDark
                        ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
                        : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                    )}
                  >
                    <Bot className="w-5 h-5" />
                    Continue where we left off
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors',
                      isDark
                        ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400'
                        : 'bg-purple-50 hover:bg-purple-100 text-purple-700'
                    )}
                  >
                    <Wand2 className="w-5 h-5" />
                    Let AI optimize for me
                  </motion.button>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Cards Section */}
      <div className="container mx-auto px-4">
        <FadeInSection delay={0.4}>
          {/* New AI-powered heading */}
          <h2 className={clsx(
            'text-3xl font-bold text-center mb-12',
            isDark ? 'text-white' : 'text-gray-900'
          )}>
            Your AI-powered campaign control
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Campaign Analysis Card */}
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className={clsx(
                'rounded-2xl p-8 border transition-all duration-300',
                isDark 
                  ? 'bg-white/10 backdrop-blur-lg border-white/20'
                  : 'bg-white border-gray-200'
              )}
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                  <LineChart className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Analyze your latest campaigns
                </h3>
                <p className={clsx(
                  'mb-6',
                  isDark ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Get in-depth insights about your campaign performance and ROI with our advanced analytics engine.
                </p>
              </div>
              <button className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                isDark 
                  ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700'
              )}>
                View analysis
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* AI Optimization Card */}
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className={clsx(
                'rounded-2xl p-8 border transition-all duration-300',
                isDark 
                  ? 'bg-white/10 backdrop-blur-lg border-white/20'
                  : 'bg-white border-gray-200'
              )}
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Optimize with AI suggestions
                </h3>
                <p className={clsx(
                  'mb-6',
                  isDark ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Let our AI analyze and provide personalized recommendations to improve your campaign results.
                </p>
              </div>
              <button className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                isDark 
                  ? 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 hover:text-purple-300'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-600 hover:text-purple-700'
              )}>
                View suggestions
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Template Card */}
            <motion.div
              variants={cardHoverVariants}
              initial="rest"
              whileHover="hover"
              className={clsx(
                'rounded-2xl p-8 border transition-all duration-300',
                isDark 
                  ? 'bg-white/10 backdrop-blur-lg border-white/20'
                  : 'bg-white border-gray-200'
              )}
            >
              <div className="mb-6">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Create new from template or from scratch
                </h3>
                <p className={clsx(
                  'mb-6',
                  isDark ? 'text-gray-400' : 'text-gray-600'
                )}>
                  Choose from our optimized templates or start fresh with your own unique campaign.
                </p>
              </div>
              <button className={clsx(
                'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
                isDark 
                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 hover:text-emerald-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 hover:text-emerald-700'
              )}>
                Create campaign
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </FadeInSection>

        {/* Active Clients Section */}
        <FadeInSection delay={0.6}>
          <div className={clsx(
            'rounded-2xl p-8 border mb-16',
            isDark 
              ? 'bg-white/10 backdrop-blur-lg border-white/20'
              : 'bg-white border-gray-200 shadow-lg'
          )}>
            <h2 className="text-2xl font-semibold mb-8">Your most active clients right now</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {mockClients.map((client) => (
                <motion.div
                  key={client.id}
                  variants={cardHoverVariants}
                  initial="rest"
                  whileHover="hover"
                  className={clsx(
                    'rounded-xl p-6 border transition-all duration-300',
                    isDark 
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white border-gray-100'
                  )}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold mb-1">{client.name}</h3>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                          {client.activeCampaigns} active campaigns
                        </span>
                      </div>
                    </div>
                    {client.hasAiSuggestions && (
                      <div className={clsx(
                        'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                        isDark
                          ? 'bg-purple-500/20 text-purple-400'
                          : 'bg-purple-100 text-purple-700'
                      )}>
                        <Sparkle className="w-3 h-3" />
                        AI
                      </div>
                    )}
                  </div>

                  <div className={clsx(
                    'text-sm mb-4',
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  )}>
                    Latest activity: {client.lastActivity}
                  </div>

                  <div className={clsx(
                    'rounded-lg p-4 mb-4',
                    isDark
                      ? 'bg-white/5 border border-white/10'
                      : 'bg-gray-50 border border-gray-100'
                  )}>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">Best campaign</span>
                    </div>
                    <div className="text-sm mb-2">{client.topCampaign.name}</div>
                    <div className="flex items-center gap-4 text-sm">
                      <span>CTR: {client.topCampaign.ctr}%</span>
                      <span>CPA: ${client.topCampaign.cpa}</span>
                    </div>
                  </div>

                  <button className={clsx(
                    'w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors',
                    isDark
                      ? 'bg-white/5 hover:bg-white/10 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  )}>
                    View details
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClientsView}
                className={clsx(
                  'flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors',
                  isDark
                    ? 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
                    : 'bg-blue-50 hover:bg-blue-100 text-blue-700'
                )}
              >
                Go to Client View
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </FadeInSection>
      </div>
    </div>
  );
};