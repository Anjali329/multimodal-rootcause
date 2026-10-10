import { useState, useMemo } from 'react';
import { Link } from 'react-router';
import { 
  BookOpen, 
  Trophy, 
  PenTool, 
  Video, 
  FileText, 
  CheckCircle2, 
  SkipForward,
  Play,
  Calendar,
  Clock,
  RefreshCw
} from 'lucide-react';
import { demoStudyPlan } from '@/lib/mock-data';
import type { StudyTask, TaskType, TaskPriority, TaskStatus } from '@/types';
import { cn, formatDate } from '@/lib/utils';

type FilterType = 'all' | 'pending' | 'completed';

export function StudyPlan() {
  const [tasks, setTasks] = useState<StudyTask[]>(demoStudyPlan.tasks);
  const [filter, setFilter] = useState<FilterType>('all');

  const toggleTaskStatus = (id: string, currentStatus: TaskStatus) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          status: currentStatus === 'completed' ? 'pending' : 'completed'
        };
      }
      return task;
    }));
  };

  const skipTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        return { ...task, status: 'skipped' };
      }
      return task;
    }));
  };

  const getTaskIcon = (type: TaskType) => {
    switch (type) {
      case 'review': return <BookOpen className="w-5 h-5 text-blue-400" />;
      case 'quiz': return <Trophy className="w-5 h-5 text-amber-400" />;
      case 'practice': return <PenTool className="w-5 h-5 text-purple-400" />;
      case 'rewatch': return <Video className="w-5 h-5 text-cyan-400" />;
      case 'reread': return <FileText className="w-5 h-5 text-rose-400" />;
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent': return 'bg-rose-500/15 text-rose-300 border-rose-500/30';
      case 'high': return 'bg-amber-500/15 text-amber-300 border-amber-500/30';
      case 'medium': return 'bg-blue-500/15 text-blue-300 border-blue-500/30';
      case 'low': return 'bg-white/[0.05] text-slate-400 border-white/[0.1]';
    }
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'all') return true;
      if (filter === 'pending') return task.status === 'pending' || task.status === 'in_progress';
      if (filter === 'completed') return task.status === 'completed';
      return true;
    });
  }, [tasks, filter]);

  const tasksByDate = useMemo(() => {
    const grouped = filteredTasks.reduce((acc, task) => {
      const dateStr = task.dueDate.split('T')[0];
      if (!acc[dateStr]) acc[dateStr] = [];
      acc[dateStr].push(task);
      return acc;
    }, {} as Record<string, StudyTask[]>);
    
    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredTasks]);

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  const estimatedTotalTime = tasks
    .filter(t => t.status !== 'completed' && t.status !== 'skipped')
    .reduce((acc, task) => acc + (task.estimatedMinutes || 0), 0);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Adaptive <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">Study Roadmap</span>
          </h1>
          <div className="flex items-center text-slate-400 gap-2 mt-1.5 text-xs sm:text-sm">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Targeted prerequisite recovery scheduled before exam</span>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-slate-200 font-semibold text-xs rounded-full transition-all cursor-pointer shadow-sm self-start sm:self-auto">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Regenerate Roadmap</span>
        </button>
      </div>

      {/* ── Progress Overview Card ────────────────────────────────── */}
      <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] p-6 sm:p-7 shadow-xl backdrop-blur-md">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">Curriculum Completion</h2>
            <p className="text-xs text-slate-400 mt-0.5">{completedCount} of {totalCount} remedial tasks completed</p>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{Math.round(progressPercent)}%</p>
            <div className="flex items-center text-xs text-slate-400 gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>~{estimatedTotalTime} mins remaining</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-2.5 rounded-full transition-all duration-500" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ── Filter Tabs ───────────────────────────────────────────── */}
      <div className="flex gap-2">
        {(['all', 'pending', 'completed'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-5 py-2 rounded-full text-xs font-semibold capitalize transition-all cursor-pointer",
              filter === f 
                ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25" 
                : "bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]"
            )}
          >
            {f} Tasks
          </button>
        ))}
      </div>

      {/* ── Task Timeline ─────────────────────────────────────────── */}
      <div className="space-y-8">
        {tasksByDate.length > 0 ? tasksByDate.map(([dateStr, dateTasks]) => (
          <div key={dateStr} className="space-y-3.5">
            {/* Date Header */}
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>{formatDate(dateStr)}</span>
            </h3>
            
            {/* Tasks list */}
            <div className="space-y-3.5">
              {dateTasks.map((task) => {
                const isCompleted = task.status === 'completed';
                const isSkipped = task.status === 'skipped';
                
                return (
                  <div 
                    key={task.id} 
                    className={cn(
                      "bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl border p-5 sm:p-6 shadow-xl transition-all duration-200 backdrop-blur-md",
                      isCompleted ? "border-white/[0.04] opacity-50" : "border-white/[0.08] hover:border-blue-400/40",
                      isSkipped ? "opacity-30 grayscale" : ""
                    )}
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                          {getTaskIcon(task.taskType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className={cn(
                              "text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                              isCompleted ? "bg-white/[0.05] text-slate-500 border-white/[0.08]" : getPriorityColor(task.priority)
                            )}>
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider bg-white/[0.05] border border-white/[0.08] px-2.5 py-0.5 rounded-full">
                              {task.taskType}
                            </span>
                          </div>
                          
                          <h4 className={cn(
                            "text-base sm:text-lg font-bold text-white mb-1 tracking-tight",
                            isCompleted && "line-through text-slate-500"
                          )}>
                            {task.conceptName}
                          </h4>
                          
                          <p className={cn(
                            "text-xs sm:text-sm mb-3 leading-relaxed",
                            isCompleted ? "text-slate-500" : "text-slate-300"
                          )}>
                            {task.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-cyan-400" />
                              {task.estimatedMinutes} mins
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap md:flex-col justify-end gap-2 shrink-0 pt-3 md:pt-0 border-t border-white/[0.06] md:border-0">
                        {!isCompleted && !isSkipped && (
                          <Link 
                            to={task.taskType === 'quiz' || task.taskType === 'practice' ? '/quiz' : '/tutor'}
                            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold rounded-full shadow-md shadow-blue-500/25 transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Start Task</span>
                          </Link>
                        )}
                        
                        <button
                          onClick={() => toggleTaskStatus(task.id, task.status)}
                          className={cn(
                            "inline-flex items-center justify-center gap-1.5 px-4 py-2 border text-xs font-semibold rounded-full transition-all cursor-pointer",
                            isCompleted 
                              ? "bg-white/[0.05] border-white/[0.1] text-slate-300 hover:bg-white/[0.1]"
                              : "bg-white/[0.04] border-white/[0.08] text-slate-300 hover:border-emerald-400/40 hover:text-emerald-300 hover:bg-emerald-500/10"
                          )}
                        >
                          {isCompleted ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Undo</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                              <span>Complete</span>
                            </>
                          )}
                        </button>
                        
                        {!isCompleted && !isSkipped && (
                          <button
                            onClick={() => skipTask(task.id)}
                            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] text-slate-400 hover:text-white text-xs font-medium rounded-full transition-all cursor-pointer"
                          >
                            <SkipForward className="w-3.5 h-3.5" />
                            <span>Skip</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )) : (
          <div className="text-center py-16 bg-white/[0.03] rounded-3xl border border-white/[0.08] backdrop-blur-md">
            <CheckCircle2 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No tasks matching current filter</h3>
            <p className="text-slate-400 text-xs mt-1">Select &quot;All Tasks&quot; to review your full learning roadmap.</p>
          </div>
        )}
      </div>
    </div>
  );
}
