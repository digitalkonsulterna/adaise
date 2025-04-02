import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { MainNav } from './components/navigation/MainNav';
import { ThemeProvider } from './contexts/ThemeContext';
import { Chat } from './components/Chat';
import { CampaignManagement } from './pages/CampaignManagement';
import { Dashboard } from './pages/Dashboard';
import { Workspaces } from './pages/Workspaces';
import { KeywordAnalysis } from './pages/KeywordAnalysis';
import { ReportingBuilder } from './pages/ReportingBuilder';
import { SmartResume } from './pages/SmartResume';
import { ClientList } from './pages/ClientList';
import { GeneratedReport } from './pages/GeneratedReport';
import { CreativeStudio } from './pages/CreativeStudio';
import { AdCreator } from './pages/AdCreator';
import { MessageSquare, GripVertical } from 'lucide-react';
import clsx from 'clsx';

// Wrapper component to handle chat visibility based on route
const AppContent = () => {
  const location = useLocation();
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState('Woshapp');
  const [keywordsToAnalyze, setKeywordsToAnalyze] = useState<string[]>([]);
  const [chatWidth, setChatWidth] = useState(() => {
    const savedWidth = localStorage.getItem('chatWidth');
    return savedWidth ? parseInt(savedWidth) : Math.max(320, window.innerWidth * 0.1);
  });
  
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  
  const minWidth = 280;
  const maxWidth = window.innerWidth * 0.3;

  useEffect(() => {
    localStorage.setItem('chatWidth', chatWidth.toString());
  }, [chatWidth]);

  // Hide chat on Smart Resume page
  useEffect(() => {
    if (location.pathname === '/smart-resume') {
      setIsChatVisible(false);
    }
  }, [location.pathname]);

  const isSmartResumePage = location.pathname === '/smart-resume';

  const handleDragStart = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startWidth.current = chatWidth;
    document.body.style.cursor = 'ew-resize';
    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    
    const deltaX = e.clientX - startX.current;
    const newWidth = Math.max(minWidth, Math.min(maxWidth, startWidth.current + deltaX));
    
    setChatWidth(newWidth);
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    document.body.style.cursor = 'default';
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const chatWidthRem = chatWidth / 16;

  const handleKeywordAnalysis = (keywords: string[]) => {
    setKeywordsToAnalyze(keywords);
    window.location.href = '/keyword-analysis';
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] flex flex-col">
      <MainNav onClientChange={setSelectedClient} />
      
      <div className="flex flex-1 pt-[48px] relative">
        {/* Only show chat if visible and not on Smart Resume page */}
        {isChatVisible && !isSmartResumePage && (
          <div 
            className="fixed left-0 top-[48px] bottom-0 bg-[var(--color-sidebar)] border-r border-[var(--color-border)] text-[var(--color-text-primary)] flex flex-col z-40"
            style={{ width: `${chatWidthRem}rem` }}
          >
            <Chat 
              onClose={() => setIsChatVisible(false)} 
              clientName={selectedClient}
              onKeywordAnalysis={handleKeywordAnalysis}
            />
            
            <div 
              className="absolute top-0 right-0 bottom-0 w-1 cursor-ew-resize hover:bg-[var(--color-accent)]"
              onMouseDown={handleDragStart}
            >
              <div className="absolute top-1/2 right-0 -translate-y-1/2 flex items-center justify-center p-1 bg-[var(--color-sidebar-hover)] rounded-l-md">
                <GripVertical className="w-3 h-6 text-[var(--color-text-tertiary)]" />
              </div>
            </div>
          </div>
        )}

        {/* Show toggle button when chat is hidden and not on Smart Resume page */}
        {!isChatVisible && !isSmartResumePage && (
          <button
            onClick={() => setIsChatVisible(true)}
            className={clsx(
              "fixed bottom-6 left-6 z-50",
              "w-12 h-12 rounded-full shadow-lg",
              "flex items-center justify-center",
              "bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]",
              "transition-all duration-300 ease-in-out",
              "hover:scale-110"
            )}
            title="Show chat"
          >
            <MessageSquare className="w-5 h-5 text-white" />
          </button>
        )}

        <div 
          className="flex-1 transition-all duration-300 overflow-hidden"
          style={{ marginLeft: isChatVisible && !isSmartResumePage ? `${chatWidthRem}rem` : '0' }}
        >
          <Routes>
            {/* Redirect root to Smart Resume */}
            <Route path="/" element={<Navigate to="/smart-resume" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/campaigns" element={<CampaignManagement />} />
            <Route path="/workspaces" element={<Workspaces />} />
            <Route path="/reporting" element={<ReportingBuilder />} />
            <Route path="/smart-resume" element={<SmartResume />} />
            <Route path="/clients" element={<ClientList />} />
            <Route path="/generated-report" element={<GeneratedReport />} />
            <Route path="/creative-studio" element={<CreativeStudio />} />
            <Route path="/creative-studio/create" element={<AdCreator />} />
            <Route 
              path="/keyword-analysis" 
              element={
                <KeywordAnalysis 
                  initialKeywords={keywordsToAnalyze}
                  onAnalysisComplete={() => setKeywordsToAnalyze([])}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
}

export default App;