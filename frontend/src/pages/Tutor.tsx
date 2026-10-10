import React, { useState, useRef, useEffect } from 'react';
import { 
  FileText, Presentation, Video, SendHorizontal, X, MessageSquare, 
  HelpCircle, CheckCircle2, AlertTriangle, Info, Plus
} from 'lucide-react';
import type { ChatMessage, Citation, ClaimVerification } from '@/types';
import { demoChatMessages } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

const SUGGESTED_PROMPTS = [
  "Explain the Chain Rule using my lecture notes",
  "Why do I need function composition?",
  "Give me a simpler explanation",
  "Compare lecture vs textbook explanations",
  "Quiz me on my weakest topic"
];

const getSourceIcon = (type: string, className?: string) => {
  switch (type) {
    case 'pdf': return <FileText className={className} />;
    case 'pptx': return <Presentation className={className} />;
    case 'video':
    case 'youtube': return <Video className={className} />;
    default: return <FileText className={className} />;
  }
};

const getVerificationBadge = (verification: ClaimVerification) => {
  switch (verification) {
    case 'supported':
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full backdrop-blur-md" title="Supported by material">
          <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Supported
        </span>
      );
    case 'partially_supported':
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-amber-500/15 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full backdrop-blur-md" title="Partially supported">
          <AlertTriangle className="w-3 h-3 text-amber-400" /> Partially supported
        </span>
      );
    case 'outside_material':
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-white/[0.06] text-slate-300 border border-white/[0.1] px-2 py-0.5 rounded-full backdrop-blur-md" title="Outside material">
          <Info className="w-3 h-3 text-slate-400" /> Outside material
        </span>
      );
    case 'unverified':
    default:
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-medium bg-white/[0.04] text-slate-400 border border-white/[0.08] px-2 py-0.5 rounded-full" title="Unverified">
          <HelpCircle className="w-3 h-3" /> Unverified
        </span>
      );
  }
};

export const Tutor = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(demoChatMessages);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const activeSourceCitation = useAppStore(state => state.activeSourceCitation);
  const setActiveSourceCitation = useAppStore(state => state.setActiveSourceCitation);
  const activeCourse = useAppStore(state => state.activeCourse);

  const [showMobileSource, setShowMobileSource] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (activeSourceCitation && window.innerWidth < 1024) {
      setShowMobileSource(true);
    }
  }, [activeSourceCitation]);

  const handleSend = () => {
    if (!inputValue.trim() || isSending) return;
    
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsSending(true);
    
    setTimeout(() => {
      const newAssistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Let's decompose this step by step. When evaluating this derivative, what is the outer function and what is the inner function? Notice how the lecture slide on Page 14 decomposes the arguments.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, newAssistantMsg]);
      setIsSending(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const CitationChip = ({ citation }: { citation: Citation }) => (
    <button 
      onClick={() => setActiveSourceCitation(citation)}
      className="inline-flex items-center gap-1.5 bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 rounded-full px-3 py-1 text-xs font-medium hover:bg-cyan-500/25 hover:border-cyan-400 transition-all cursor-pointer backdrop-blur-md"
    >
      {getSourceIcon(citation.sourceType, "w-3.5 h-3.5 text-cyan-400")}
      <span>
        [{citation.sourceType === 'pdf' ? 'PDF' : citation.sourceType === 'pptx' ? 'Slide' : 'Video'} · {
          citation.pageNumber ? `Page ${citation.pageNumber}` : 
          citation.slideNumber ? `${citation.slideNumber}` : 
          citation.timestamp ? `${Math.floor(citation.timestamp / 60)}:${(citation.timestamp % 60).toString().padStart(2, '0')}` : 
          'Source'
        }]
      </span>
    </button>
  );

  const SourceViewer = () => {
    if (!activeSourceCitation) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-8 text-center h-full">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-4">
            <FileText className="w-8 h-8 text-slate-500" />
          </div>
          <p className="text-base font-bold text-white mb-1">Source Grounding Inspector</p>
          <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
            Click any citation chip inside the Socratic dialogue to open the exact slide, OCR excerpt, or timestamped lecture clip.
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col h-full bg-[#090E1D] border-l border-white/[0.08]">
        <div className="px-5 py-4 border-b border-white/[0.08] bg-white/[0.02] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2 bg-blue-500/15 border border-blue-400/20 rounded-xl shrink-0">
              {getSourceIcon(activeSourceCitation.sourceType, "w-4 h-4 text-cyan-400")}
            </div>
            <div className="truncate">
              <h3 className="text-sm font-bold text-white truncate" title={activeSourceCitation.filename}>
                {activeSourceCitation.filename}
              </h3>
              <p className="text-xs text-slate-400">
                {activeSourceCitation.location}
              </p>
            </div>
          </div>
          <button 
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-lg lg:hidden"
            onClick={() => setShowMobileSource(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-transparent">
          <div className="bg-white/[0.03] rounded-2xl shadow-xl border border-white/[0.08] aspect-[3/4] max-h-full flex flex-col w-full max-w-2xl mx-auto overflow-hidden backdrop-blur-md">
            <div className="px-5 py-3 border-b border-white/[0.08] bg-white/[0.02] flex justify-between text-xs text-slate-400 font-medium">
              <span className="font-mono text-cyan-300">{activeSourceCitation.sourceType.toUpperCase()} VERIFIED GROUNDING</span>
              <span>{
                activeSourceCitation.pageNumber ? `Page ${activeSourceCitation.pageNumber}` : 
                activeSourceCitation.slideNumber ? `Slide ${activeSourceCitation.slideNumber}` : 
                activeSourceCitation.timestamp ? `Time ${activeSourceCitation.timestamp}s` : ''
              }</span>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto">
              <div className="w-full h-28 bg-white/[0.02] border border-white/[0.04] rounded-xl mb-6" />
              <div className="space-y-3">
                <div className="w-3/4 h-3 bg-white/[0.04] rounded" />
                <div className="w-full h-3 bg-white/[0.04] rounded" />
                
                {activeSourceCitation.excerpt && (
                  <div className="my-6 p-5 bg-cyan-950/40 border-l-4 border-cyan-400 rounded-r-xl text-cyan-100 text-xs sm:text-sm leading-relaxed font-mono shadow-lg">
                    {activeSourceCitation.excerpt}
                  </div>
                )}
                
                <div className="w-full h-3 bg-white/[0.04] rounded" />
                <div className="w-5/6 h-3 bg-white/[0.04] rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-6.5rem)] w-full overflow-hidden bg-white/[0.02] border border-white/[0.08] rounded-3xl shadow-2xl backdrop-blur-xl">
      
      {/* ── Left Panel: Chat ───────────────────────────────────────── */}
      <div className="flex-1 flex flex-col h-full min-w-0 lg:min-w-[55%] border-r border-white/[0.08]">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex justify-between items-center shrink-0 bg-white/[0.02]">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <span>{activeCourse?.name || 'Socratic AI Tutor'}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            </h2>
            <p className="text-xs text-slate-400">Source-Grounded Socratic Reasoning Coach</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-200 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] rounded-full transition-all cursor-pointer">
            <Plus className="w-3.5 h-3.5" />
            <span>New Session</span>
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-transparent">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center max-w-lg mx-auto w-full text-center">
              <div className="w-14 h-14 bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 text-white rounded-2xl flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-2">How can I guide your learning?</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                Ask a conceptual question, request a step-by-step hint, or explore prerequisite gaps.
              </p>
              
              <div className="w-full space-y-2.5">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button 
                    key={idx}
                    onClick={() => { setInputValue(prompt); textareaRef.current?.focus(); }}
                    className="w-full text-left p-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:border-blue-400/40 hover:bg-white/[0.06] text-slate-200 text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto w-full pb-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div 
                    className={cn(
                      "px-5 py-3.5 text-sm sm:text-base leading-relaxed shadow-lg",
                      msg.role === 'user' 
                        ? "bg-[#2563EB] text-white rounded-2xl rounded-br-sm shadow-blue-600/30 font-medium" 
                        : "bg-white/[0.04] border border-white/[0.08] text-slate-100 rounded-2xl rounded-bl-sm backdrop-blur-md"
                    )}
                  >
                    {msg.content.split('\n\n').map((paragraph, i) => (
                      <p key={i} className={cn(i > 0 && "mt-3")}>
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {msg.role === 'assistant' && (msg.citations?.length || msg.claims?.length) ? (
                    <div className="mt-2.5 flex flex-wrap gap-2 items-center">
                      {msg.citations?.map(cit => (
                        <CitationChip key={cit.id} citation={cit} />
                      ))}
                      
                      {msg.claims?.map(claim => (
                        <div key={claim.id} className="ml-1">
                          {getVerificationBadge(claim.verification)}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white/[0.02] border-t border-white/[0.08] shrink-0">
          <div className="max-w-3xl mx-auto w-full">
            <div className="relative flex items-end gap-2 bg-white/[0.04] border border-white/[0.12] focus-within:border-blue-400 focus-within:ring-1 focus-within:ring-blue-400 rounded-2xl transition-all p-2 backdrop-blur-md">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask a question or explain your reasoning step..."
                className="w-full max-h-32 min-h-[44px] bg-transparent resize-none outline-none text-white placeholder-slate-500 py-2.5 px-3 text-sm"
                rows={inputValue.split('\n').length > 1 ? Math.min(inputValue.split('\n').length, 4) : 1}
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isSending}
                className={cn(
                  "p-2.5 rounded-xl shrink-0 mb-0.5 transition-all cursor-pointer",
                  inputValue.trim() && !isSending
                    ? "bg-[#2563EB] text-white hover:bg-blue-600 shadow-md shadow-blue-500/25"
                    : "bg-white/[0.05] text-slate-500 cursor-not-allowed"
                )}
              >
                <SendHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
              <button 
                onClick={() => setInputValue("Can you give me a Socratic hint without spoiling the answer?")}
                className="shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition-colors cursor-pointer"
              >
                💡 Give Socratic hint
              </button>
              <button 
                onClick={() => setInputValue("Show me the underlying prerequisite concept for this")}
                className="shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition-colors cursor-pointer"
              >
                🎯 Prerequisite trace
              </button>
              <button 
                onClick={() => setInputValue("Where was this mentioned in the lecture video?")}
                className="shrink-0 text-xs font-medium px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/[0.08] transition-colors cursor-pointer"
              >
                🎥 Video citation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Source Viewer (Desktop) ───────────────────── */}
      <div className="hidden lg:flex w-[45%] h-full flex-col">
        <SourceViewer />
      </div>

      {/* Mobile Source Viewer Sheet */}
      <div className={cn(
        "fixed inset-0 z-50 bg-[#080D1A] transition-transform duration-300 lg:hidden flex flex-col",
        showMobileSource ? "translate-y-0" : "translate-y-full"
      )}>
        <SourceViewer />
      </div>

    </div>
  );
};
