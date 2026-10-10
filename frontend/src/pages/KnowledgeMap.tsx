import { useState, useMemo, useCallback } from 'react';
import { 
  ReactFlow, 
  Background, 
  Controls, 
  MiniMap, 
  Panel, 
  useNodesState, 
  useEdgesState, 
  MarkerType, 
  Handle, 
  Position 
} from '@xyflow/react';
import type { Node, Edge, NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Search, 
  Clock, 
  X, 
  BookOpen, 
  Lightbulb, 
  MessageCircle, 
  PlayCircle 
} from 'lucide-react';
import { demoConcepts, demoEdges } from '@/lib/mock-data';
import type { Concept } from '@/types';
import { Link } from 'react-router-dom';
import { cn, getMasteryColor, getMasteryLabel, formatDate } from '@/lib/utils';

// Custom Dark Glass Node Component matching landing page aesthetic
const ConceptNode = ({ data }: NodeProps<Node>) => {
  const concept = data as unknown as Concept;
  const masteryColor = getMasteryColor(concept.mastery);
  
  const bgClass = concept.mastery < 40 
    ? 'bg-rose-950/50 border-rose-500/40 shadow-[0_0_15px_rgba(244,63,94,0.15)]' 
    : concept.mastery < 70 
      ? 'bg-amber-950/50 border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
      : 'bg-emerald-950/50 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.15)]';
      
  const dotColor = concept.importance === 'high' 
    ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' 
    : concept.importance === 'medium' 
      ? 'bg-slate-400' 
      : 'bg-transparent';
      
  const isReviewDue = concept.reviewDue && new Date(concept.reviewDue) <= new Date();

  return (
    <div className={cn('relative rounded-2xl border-2 backdrop-blur-md min-w-[170px] p-3.5 transition-all hover:scale-105', bgClass)}>
      <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 bg-blue-400 border border-white" />
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm text-white tracking-tight">{concept.name}</h3>
        <div className="flex gap-1.5 items-center ml-2">
          {isReviewDue && <Clock className="w-3.5 h-3.5 text-amber-400" />}
          <div className={cn('w-2 h-2 rounded-full', dotColor)} title={`Importance: ${concept.importance}`} />
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs pt-1 border-t border-white/[0.08]">
        <span className={cn('font-extrabold', masteryColor)}>{concept.mastery}%</span>
        <span className="text-slate-400 font-medium text-[11px]">{getMasteryLabel(concept.mastery)}</span>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-2.5 h-2.5 bg-blue-400 border border-white" />
    </div>
  );
};

const nodeTypes = {
  concept: ConceptNode,
};

// Initial nodes layout positioning
const initialNodes: Node[] = demoConcepts.map((concept, i) => {
  let x = 0;
  let y = 0;
  
  if (concept.id === 'c-limits') { x = 250; y = 50; }
  else if (concept.id === 'c-continuity') { x = 250; y = 160; }
  else if (concept.id === 'c-derivative-def') { x = 250; y = 280; }
  else if (concept.id === 'c-power-rule') { x = 90; y = 400; }
  else if (concept.id === 'c-product-rule') { x = 250; y = 400; }
  else if (concept.id === 'c-chain-rule') { x = 410; y = 400; }
  else {
    x = 100 + (i % 3) * 160;
    y = 520 + Math.floor(i / 3) * 110;
  }
  
  return {
    id: concept.id,
    type: 'concept',
    position: { x, y },
    data: concept,
  };
});

const initialEdges: Edge[] = demoEdges.map(edge => {
  const targetConcept = demoConcepts.find(c => c.id === edge.targetId);
  const strokeColor = targetConcept 
    ? targetConcept.mastery < 40 
      ? '#f43f5e' // rose-500
      : targetConcept.mastery < 70 
        ? '#f59e0b' // amber-500
        : '#10b981' // emerald-500
    : '#3b82f6';

  return {
    id: edge.id,
    source: edge.sourceId,
    target: edge.targetId,
    animated: edge.relationship === 'prerequisite',
    style: { stroke: strokeColor, strokeWidth: 2.2, opacity: 0.8 },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: strokeColor,
    },
  };
});

export function KnowledgeMap() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTopic, setActiveTopic] = useState<string>('All');

  const topics = ['All', ...Array.from(new Set(demoConcepts.map(c => c.topic).filter(Boolean))) as string[]];

  const filteredNodes = useMemo(() => {
    return nodes.map((node: Node) => {
      const concept = node.data as unknown as Concept;
      const matchSearch = concept?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchTopic = activeTopic === 'All' || concept?.topic === activeTopic;
      const isVisible = matchSearch && matchTopic;
      return {
        ...node,
        hidden: !isVisible,
      };
    });
  }, [nodes, searchTerm, activeTopic]);

  const onNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedConcept(node.data as unknown as Concept);
  }, []);

  return (
    <div className="w-full h-[calc(100vh-6.5rem)] flex relative bg-white/[0.02] border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl">
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-transparent"
        >
          <Background color="#ffffff0d" gap={20} />
          <Controls className="bg-[#090E1D] border border-white/[0.08] text-white fill-white rounded-xl overflow-hidden shadow-xl" />
          <MiniMap 
            nodeColor={node => {
              const mastery = Number((node.data as any)?.mastery || 0);
              return mastery < 40 ? '#f43f5e' : mastery < 70 ? '#f59e0b' : '#10b981';
            }}
            maskColor="rgba(8, 13, 26, 0.75)"
            className="bg-[#090E1D] border border-white/[0.08] rounded-xl overflow-hidden"
          />
          
          {/* Top Left Search & Filter Panel */}
          <Panel position="top-left" className="bg-[#0A101F]/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/[0.08]">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search prerequisite concepts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-white/[0.12] bg-white/[0.04] text-white placeholder-slate-500 rounded-xl text-xs sm:text-sm w-64 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 max-w-sm">
                {topics.map(topic => (
                  <button
                    key={topic}
                    onClick={() => setActiveTopic(topic)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer",
                      activeTopic === topic 
                        ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25" 
                        : "bg-white/[0.04] text-slate-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white"
                    )}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          {/* Bottom Left Mastery Legend Panel */}
          <Panel position="bottom-left" className="bg-[#0A101F]/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-white/[0.08] mb-8 ml-8">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Mastery Tiers</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                <span className="text-xs text-slate-200 font-medium">Proficient (70%+)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
                <span className="text-xs text-slate-200 font-medium">Familiar (40-69%)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400 shadow-[0_0_8px_#f43f5e]" />
                <span className="text-xs text-slate-200 font-medium">Prerequisite Gap (&lt;40%)</span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* ── Concept Details Drawer (Slide-out) ─────────────────────── */}
      {selectedConcept && (
        <div className="w-96 bg-[#0A101F]/95 backdrop-blur-2xl border-l border-white/[0.08] shadow-2xl overflow-y-auto flex flex-col absolute right-0 top-0 bottom-0 z-20 transition-all text-white">
          <div className="p-5 border-b border-white/[0.08] flex justify-between items-start">
            <div>
              <h2 className="text-xl font-extrabold text-white tracking-tight">{selectedConcept.name}</h2>
              <span className="text-xs font-semibold text-blue-400 mt-0.5 block">{selectedConcept.topic}</span>
            </div>
            <button 
              onClick={() => setSelectedConcept(null)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.08] rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Current Mastery</span>
                <span className={cn("text-sm font-extrabold", getMasteryColor(selectedConcept.mastery))}>
                  {Math.round(selectedConcept.mastery)}% - {getMasteryLabel(selectedConcept.mastery)}
                </span>
              </div>
              <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${selectedConcept.mastery}%`,
                    backgroundColor: selectedConcept.mastery < 40 ? '#f43f5e' : selectedConcept.mastery < 70 ? '#f59e0b' : '#10b981'
                  }}
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-400" /> Formal Definition
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/[0.03] border border-white/[0.06] rounded-xl p-3.5">
                {selectedConcept.definition}
              </p>
            </div>

            {selectedConcept.misconceptions && selectedConcept.misconceptions.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" /> Diagnosed Misconceptions
                </h3>
                <div className="flex flex-col gap-2.5">
                  {selectedConcept.misconceptions.map((misc, idx) => (
                    <div key={idx} className="bg-amber-950/40 border border-amber-500/30 rounded-xl p-3.5">
                      <p className="text-xs text-amber-200 font-bold mb-1">⚠️ {misc.description}</p>
                      <p className="text-xs text-amber-300/80 leading-relaxed font-normal">{misc.correction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedConcept.reviewDue && (
              <div className="flex items-center gap-2 text-xs text-slate-400 bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>Last reviewed: {formatDate(selectedConcept.lastReviewed!)}</span>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-white/[0.08] flex flex-col gap-2.5 bg-white/[0.02]">
            <Link 
              to="/quiz" 
              className="w-full flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-slate-200 font-semibold py-2.5 rounded-full text-xs transition-all"
            >
              <PlayCircle className="w-4 h-4 text-cyan-400" /> Practice in Quiz Arena
            </Link>
            <Link 
              to="/tutor" 
              className="w-full flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-full text-xs transition-all shadow-md shadow-blue-500/25"
            >
              <MessageCircle className="w-4 h-4" /> Ask Socratic AI Tutor
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
