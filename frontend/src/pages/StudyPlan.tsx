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
      case 'review': return <BookOpen className="w-5 h-5 text-blue-600" />;
      case 'quiz': return <Trophy className="w-5 h-5 text-amber-500" />;
      case 'practice': return <PenTool className="w-5 h-5 text-purple-600" />;
      case 'rewatch': return <Video className="w-5 h-5 text-cyan-600" />;
      case 'reread': return <FileText className="w-5 h-5 text-rose-500" />;
    }
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent': return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'high': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'medium': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'low': return 'bg-slate-100 text-slate-600 border-slate-200';
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
    <div className="space-y-7 max-w-5xl mx-auto">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Adaptive Study Roadmap
          </h1>
          <div className="flex items-center text-slate-500 gap-2 mt-1 text-xs sm:text-sm">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>Targeted prerequisite recovery scheduled before exam</span>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer shadow-2xs self-start sm:self-auto">
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Regenerate Roadmap</span>
        </button>
      </div>

      {/* ── Progress Overview Card ────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="flex justify-between items-end mb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Curriculum Completion</h2>
            <p className="text-xs text-slate-500 mt-0.5">{completedCount} of {totalCount} remedial tasks completed</p>
          </div>
          <div className="text-right">
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{Math.round(progressPercent)}%</p>
            <div className="flex items-center text-xs text-slate-500 gap-1.5 mt-0.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>~{estimatedTotalTime} mins remaining</span>
            </div>
          </div>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
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
              "px-5 py-2 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer",
              filter === f 
                ? "bg-blue-600 text-white shadow-xs" 
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            )}
          >
            {f} Tasks
          </button>
        ))}
      </div>

      {/* ── Task Timeline ─────────────────────────────────────────── */}
      <div className="space-y-7">
        {tasksByDate.length > 0 ? tasksByDate.map(([dateStr, dateTasks]) => (
          <div key={dateStr} className="space-y-3.5">
            {/* Date Header */}
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
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
                      "bg-white hover:border-slate-300 rounded-2xl border p-5 sm:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-150",
                      isCompleted ? "border-slate-100 opacity-60" : "border-slate-200/80",
                      isSkipped ? "opacity-40 grayscale" : ""
                    )}
                  >
                    <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between">
                      <div className="flex gap-4 flex-1">
                        <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                          {getTaskIcon(task.taskType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className={cn(
                              "text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider",
                              isCompleted ? "bg-slate-100 text-slate-500 border-slate-200" : getPriorityColor(task.priority)
                            )}>
                              {task.priority}
                            </span>
                            <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
                              {task.taskType}
                            </span>
                          </div>
                          
                          <h4 className={cn(
                            "text-base sm:text-lg font-bold text-slate-900 mb-1 tracking-tight",
                            isCompleted && "line-through text-slate-400"
                          )}>
                            {task.conceptName}
                          </h4>
                          
                          <p className={cn(
                            "text-xs sm:text-sm mb-3 leading-relaxed",
                            isCompleted ? "text-slate-400" : "text-slate-600"
                          )}>
                            {task.description}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-blue-600" />
                              {task.estimatedMinutes} mins
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap md:flex-col justify-end gap-2 shrink-0 pt-3 md:pt-0 border-t border-slate-100 md:border-0">
                        {!isCompleted && !isSkipped && (
                          <Link 
                            to={task.taskType === 'quiz' || task.taskType === 'practice' ? '/quiz' : '/tutor'}
                            className="inline-flex items-center justify-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Start Task</span>
                          </Link>
                        )}
                        
                        <button
                          onClick={() => toggleTaskStatus(task.id, task.status)}
                          className={cn(
                            "inline-flex items-center justify-center gap-1.5 px-4 py-2 border text-xs font-semibold rounded-xl transition-all cursor-pointer",
                            isCompleted 
                              ? "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
                              : "bg-white border-slate-200 text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50"
                          )}
                        >
                          {isCompleted ? (
                            <>
                              <span>Mark Pending</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Complete</span>
                            </>
                          )}
                        </button>
                        
                        {!isCompleted && !isSkipped && (
                          <button
                            onClick={() => skipTask(task.id)}
                            className="inline-flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-slate-600 px-3 py-1 transition-colors cursor-pointer"
                          >
                            <SkipForward className="w-3 h-3" />
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
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 mb-2">No tasks found</h3>
            <p className="text-slate-500 text-sm">
              {filter === 'completed' 
                ? "You haven't completed any tasks yet. Keep practicing!"
                : "All scheduled tasks for this filter are completed. Great work!"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
