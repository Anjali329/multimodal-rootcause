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

// Custom Node Component matching clean light aesthetic
const ConceptNode = ({ data }: NodeProps<Node>) => {
  const concept = data as unknown as Concept;
  const masteryColor = getMasteryColor(concept.mastery);
  
  const bgClass = concept.mastery < 40 
    ? 'bg-rose-50 border-rose-200 shadow-xs' 
    : concept.mastery < 70 
      ? 'bg-amber-50 border-amber-200 shadow-xs' 
      : 'bg-emerald-50 border-emerald-200 shadow-xs';
      
  const dotColor = concept.importance === 'high' 
    ? 'bg-blue-600 shadow-[0_0_8px_#3b82f6]' 
    : concept.importance === 'medium' 
      ? 'bg-slate-400' 
      : 'bg-transparent';
      
  const isReviewDue = concept.reviewDue && new Date(concept.reviewDue) <= new Date();

  return (
    <div className={cn('relative rounded-xl border-2 min-w-[170px] p-3 transition-all hover:scale-105 bg-white', bgClass)}>
      <Handle type="target" position={Position.Top} className="w-2.5 h-2.5 bg-blue-600 border border-white" />
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-sm text-slate-900 tracking-tight">{concept.name}</h3>
        <div className="flex gap-1.5 items-center ml-2">
          {isReviewDue && <Clock className="w-3.5 h-3.5 text-amber-600" />}
          <div className={cn('w-2 h-2 rounded-full', dotColor)} title={`Importance: ${concept.importance}`} />
        </div>
      </div>
      
      <div className="flex justify-between items-center text-xs pt-1 border-t border-slate-200/60">
        <span className={cn('font-extrabold', masteryColor)}>{concept.mastery}%</span>
        <span className="text-slate-500 font-medium text-[11px]">{getMasteryLabel(concept.mastery)}</span>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-2.5 h-2.5 bg-blue-600 border border-white" />
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
    <div className="w-full h-[calc(100vh-6.5rem)] flex relative bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-2xs">
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={filteredNodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="bg-[#F8FAFC]"
        >
          <Background color="#cbd5e1" gap={20} />
          <Controls className="bg-white border border-slate-200 text-slate-700 fill-slate-700 rounded-xl overflow-hidden shadow-xs" />
          <MiniMap 
            nodeColor={node => {
              const mastery = Number((node.data as any)?.mastery || 0);
              return mastery < 40 ? '#f43f5e' : mastery < 70 ? '#f59e0b' : '#10b981';
            }}
            maskColor="rgba(248, 250, 252, 0.75)"
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          />
          
          {/* Top Left Search & Filter Panel */}
          <Panel position="top-left" className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xs border border-slate-200">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search prerequisite concepts..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 rounded-xl text-xs sm:text-sm w-64 focus:outline-none focus:border-blue-500 focus:bg-white"
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
                        ? "bg-blue-600 text-white shadow-xs" 
                        : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100"
                    )}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          </Panel>

          {/* Bottom Left Mastery Legend Panel */}
          <Panel position="bottom-left" className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xs border border-slate-200 mb-6 ml-6">
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">Mastery Tiers</h4>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-700 font-medium">Proficient (70%+)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-xs text-slate-700 font-medium">Familiar (40-69%)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-xs text-slate-700 font-medium">Prerequisite Gap (&lt;40%)</span>
              </div>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* ── Concept Details Drawer (Slide-out) ─────────────────────── */}
      {selectedConcept && (
        <div className="w-96 bg-white border-l border-slate-200 shadow-xl overflow-y-auto flex flex-col absolute right-0 top-0 bottom-0 z-20 transition-all text-slate-900">
          <div className="p-5 border-b border-slate-100 flex justify-between items-start">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{selectedConcept.name}</h2>
              <span className="text-xs font-semibold text-blue-600 mt-0.5 block">{selectedConcept.topic}</span>
            </div>
            <button 
              onClick={() => setSelectedConcept(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 flex-1 flex flex-col gap-6">
            <div>
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Current Mastery</span>
                <span className={cn("text-sm font-extrabold", getMasteryColor(selectedConcept.mastery))}>
                  {Math.round(selectedConcept.mastery)}% - {getMasteryLabel(selectedConcept.mastery)}
                </span>
              </div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
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
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2 mb-2">
                <BookOpen className="w-3.5 h-3.5 text-blue-600" /> Formal Definition
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 border border-slate-100 rounded-xl p-3.5">
                {selectedConcept.definition}
              </p>
            </div>

            {selectedConcept.misconceptions && selectedConcept.misconceptions.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center gap-2 mb-2.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-600" /> Diagnosed Misconceptions
                </h3>
                <div className="flex flex-col gap-2.5">
                  {selectedConcept.misconceptions.map((misc, idx) => (
                    <div key={idx} className="bg-amber-50 border border-amber-200 rounded-xl p-3.5">
                      <p className="text-xs text-amber-900 font-bold mb-1">⚠️ {misc.description}</p>
                      <p className="text-xs text-amber-800 leading-relaxed font-normal">{misc.correction}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedConcept.reviewDue && (
              <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Last reviewed: {formatDate(selectedConcept.lastReviewed!)}</span>
              </div>
            )}
          </div>

          <div className="p-5 border-t border-slate-100 flex flex-col gap-2.5 bg-slate-50/50">
            <Link 
              to="/quiz" 
              className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-all shadow-2xs"
            >
              <PlayCircle className="w-4 h-4 text-blue-600" /> Practice in Quiz Arena
            </Link>
            <Link 
              to="/tutor" 
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-xs transition-all shadow-xs"
            >
              <MessageCircle className="w-4 h-4" /> Ask Socratic AI Tutor
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
