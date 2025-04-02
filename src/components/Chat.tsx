import React, { useState, useRef, useEffect } from 'react';
import { Send, X, ExternalLink } from 'lucide-react';
import { clsx } from 'clsx';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  keywordAnalysis?: KeywordAnalysisResult[];
}

interface KeywordAnalysisResult {
  keyword: string;
  searchVolume: number;
  competition: 'High' | 'Medium' | 'Low';
  cpc: number;
  trend: 'up' | 'down' | 'neutral';
}

interface ChatProps {
  onClose: () => void;
  clientName: string;
  onKeywordAnalysis?: (keywords: string[]) => void;
}

const mockKeywordAnalysis = (keyword: string): KeywordAnalysisResult => ({
  keyword,
  searchVolume: Math.floor(Math.random() * 150000) + 50000,
  competition: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] as 'High' | 'Medium' | 'Low',
  cpc: Number((Math.random() * 5 + 1).toFixed(2)),
  trend: ['up', 'down', 'neutral'][Math.floor(Math.random() * 3)] as 'up' | 'down' | 'neutral'
});

const formatNumber = (num: number): string => {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
};

const getTrendEmoji = (trend: 'up' | 'down' | 'neutral'): string => {
  switch (trend) {
    case 'up': return '📈';
    case 'down': return '📉';
    default: return '➡️';
  }
};

const exampleQueries = [
  "Create a Google and Facebook campaign for Stockholm users aged 20-35 with a budget of 200 SEK/day for 30 days.",
  "Analyze keywords: Digital Marketing, SEO Tools, and Social Media Ads.",
  "Evaluate my Meta Ads campaign performance for the last 30 days.",
  "Suggest high-performing keywords for my Google Ads campaign.",
  "Optimize my LinkedIn Ads for better conversions.",
  "Compare performance between my Google, Meta, and LinkedIn ad campaigns.",
  "Find negative keywords for my SEM strategy.",
  "Analyze my ad group's engagement rate and suggest improvements.",
  "Generate ad creatives based on my campaign objectives.",
  "Optimize my budget allocation across different ad platforms."
];

const ThinkingAnimation = () => (
  <div className="flex justify-start">
    <div className="bg-[var(--color-sidebar-hover)] rounded-lg p-3 max-w-[80%]">
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <span className="text-sm text-[var(--color-text-secondary)] animate-pulse">Processing...</span>
      </div>
    </div>
  </div>
);

const Chat: React.FC<ChatProps> = ({ onClose, clientName, onKeywordAnalysis }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: "I've successfully imported your project. I'm ready to assist you with analyzing and improving your keywords.",
    sender: 'ai',
    timestamp: new Date()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [placeholder, setPlaceholder] = useState('');
  const [currentQueryIndex, setCurrentQueryIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const typingSpeed = useRef(30);
  const deletingSpeed = useRef(15);
  const pauseDuration = useRef(3000);
  const animationActive = useRef(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const lineHeight = 20;
      textareaRef.current.style.height = `${lineHeight * 3}px`;
    }
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const lineHeight = 20;
      const maxHeight = lineHeight * 5;
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`;
    }
  }, [inputValue]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAiThinking]);

  useEffect(() => {
    if (isFocused || inputValue.length > 0) {
      animationActive.current = false;
    } else {
      animationActive.current = true;
      if (!isTyping && !isDeleting && !isPaused) {
        setIsTyping(true);
        setPlaceholder('');
      }
    }
  }, [isFocused, inputValue, isTyping, isDeleting, isPaused]);

  useEffect(() => {
    if (!animationActive.current) return;
    
    const currentQuery = exampleQueries[currentQueryIndex];
    let timeoutId: NodeJS.Timeout;

    if (isTyping) {
      if (placeholder.length < currentQuery.length) {
        timeoutId = setTimeout(() => {
          setPlaceholder(currentQuery.substring(0, placeholder.length + 1));
        }, typingSpeed.current);
      } else {
        setIsTyping(false);
        setIsPaused(true);
        timeoutId = setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration.current);
      }
    } else if (isDeleting) {
      if (placeholder.length > 0) {
        timeoutId = setTimeout(() => {
          setPlaceholder(placeholder.substring(0, placeholder.length - 1));
        }, deletingSpeed.current);
      } else {
        setIsDeleting(false);
        setIsTyping(true);
        setCurrentQueryIndex((currentQueryIndex + 1) % exampleQueries.length);
      }
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [placeholder, isTyping, isDeleting, isPaused, currentQueryIndex]);

  const analyzeKeywords = (text: string): string[] => {
    const quotedKeywords = text.match(/'([^']+)'/g)?.map(k => k.replace(/'/g, '')) || [];
    
    if (quotedKeywords.length === 0) {
      return text.split(/[,;]/).map(k => k.trim()).filter(k => k.length > 0);
    }
    
    return quotedKeywords;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsAiThinking(true);

    const processingTime = Math.floor(Math.random() * 2000) + 1000;
    
    setTimeout(() => {
      const keywordAnalysisRegex = /(?:analyze|research|check)\s+(?:the\s+)?(?:keywords?|terms?)\s*/i;
      if (keywordAnalysisRegex.test(userMessage.text)) {
        const keywords = analyzeKeywords(userMessage.text);
        
        if (keywords.length > 0) {
          const analysisResults = keywords.map(mockKeywordAnalysis);
          
          const aiResponse: Message = {
            id: Date.now().toString(),
            text: `✅ Here's the keyword analysis for ${keywords.length === 1 ? 'the keyword' : 'these keywords'}:`,
            sender: 'ai',
            timestamp: new Date(),
            keywordAnalysis: analysisResults
          };

          setMessages(prev => [...prev, aiResponse]);
          setIsAiThinking(false);
          return;
        }
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: "I'm analyzing your request and will help you with that.",
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsAiThinking(false);
    }, processingTime);
  };

  const handleViewFullAnalysis = (keywords: KeywordAnalysisResult[]) => {
    if (onKeywordAnalysis) {
      onKeywordAnalysis(keywords.map(k => k.keyword));
    } else {
      navigate('/keyword-analysis', { state: { keywords: keywords.map(k => k.keyword) } });
    }
  };

  const renderKeywordAnalysis = (analysis: KeywordAnalysisResult[]) => (
    <div className="mt-2 overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            <th className="text-left py-2 px-3 font-medium">Keyword</th>
            <th className="text-left py-2 px-3 font-medium">Search Volume</th>
            <th className="text-left py-2 px-3 font-medium">Competition</th>
            <th className="text-left py-2 px-3 font-medium">CPC ($)</th>
            <th className="text-left py-2 px-3 font-medium">Trend</th>
          </tr>
        </thead>
        <tbody>
          {analysis.map((result, index) => (
            <tr key={index} className="border-b border-[var(--color-border)]">
              <td className="py-2 px-3">{result.keyword}</td>
              <td className="py-2 px-3">{formatNumber(result.searchVolume)}</td>
              <td className="py-2 px-3">
                <span className={clsx(
                  'px-2 py-0.5 rounded-full text-xs font-medium',
                  result.competition === 'High' ? 'bg-red-100 text-red-700' :
                  result.competition === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                )}>
                  {result.competition}
                </span>
              </td>
              <td className="py-2 px-3">${result.cpc}</td>
              <td className="py-2 px-3">{getTrendEmoji(result.trend)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => handleViewFullAnalysis(analysis)}
        className="mt-3 flex items-center gap-2 text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors text-sm"
      >
        <ExternalLink className="w-4 h-4" />
        View Full Analysis
      </button>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-1 text-sm">
          <span className="text-[var(--color-text-secondary)]">Adaise Assistant for</span>
          <span className="font-semibold text-[var(--color-text-primary)]">{clientName}</span>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[var(--color-navbar-hover)] rounded-full transition-colors"
          title="Close chat"
        >
          <X className="w-4 h-4 text-[var(--color-text-secondary)]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={clsx(
                'max-w-[80%] rounded-lg p-3',
                message.sender === 'user'
                  ? 'bg-[var(--color-accent)] text-white'
                  : 'bg-[var(--color-sidebar-hover)] text-[var(--color-text-primary)]'
              )}
            >
              <p className="text-sm">{message.text}</p>
              {message.keywordAnalysis && renderKeywordAnalysis(message.keywordAnalysis)}
            </div>
          </div>
        ))}
        
        {isAiThinking && <ThinkingAnimation />}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--color-border)]">
        <div className="relative">
          <div 
            className={clsx(
              "p-[2px] rounded-lg overflow-hidden",
              "bg-gradient-to-r from-purple-500 via-pink-500 via-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500",
              "bg-[length:200%_auto]",
              "animate-rainbow-border",
              isFocused ? "opacity-100" : "opacity-70 hover:opacity-90"
            )}
          >
            <div className="relative bg-[var(--color-bg-primary)] rounded-lg">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => {
                  setIsFocused(false);
                  if (inputValue.length === 0) {
                    setIsTyping(true);
                    setIsDeleting(false);
                    setIsPaused(false);
                    setPlaceholder('');
                    animationActive.current = true;
                  }
                }}
                placeholder={isFocused || inputValue.length > 0 ? "Type your message..." : placeholder}
                className={clsx(
                  "w-full text-[var(--color-text-primary)]",
                  "placeholder-[var(--color-text-tertiary)] rounded-lg pl-4 pr-12 py-2 text-sm",
                  "focus:outline-none resize-none overflow-y-auto",
                  "min-h-[60px] max-h-[120px] transition-height duration-200",
                  "bg-transparent"
                )}
                rows={3}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                disabled={isAiThinking}
              />
              <button
                type="submit"
                disabled={isAiThinking || !inputValue.trim()}
                className={clsx(
                  "absolute right-2 top-1/2 -translate-y-1/2 p-2 transition-colors rounded-lg",
                  isAiThinking || !inputValue.trim() 
                    ? "text-[var(--color-text-tertiary)]" 
                    : "text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-tertiary)]"
                )}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Chat;

export { Chat }