import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  Target, 
  Calendar, 
  Award,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store';

type OnboardingStep = 1 | 2 | 3 | 4;

export function OnboardingPage() {
  const navigate = useNavigate();
  const { setProfile, profile } = useAppStore();
  const [step, setStep] = useState<OnboardingStep>(1);
  
  const [formData, setFormData] = useState({
    learningGoal: profile?.learningGoal || '',
    subject: 'mathematics',
    examDate: '',
    confidence: 'intermediate'
  });

  const handleNext = () => {
    if (step < 4) setStep((s) => (s + 1) as OnboardingStep);
    else handleComplete();
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as OnboardingStep);
  };

  const handleComplete = () => {
    if (profile) {
      setProfile({
        ...profile,
        learningGoal: formData.learningGoal
      });
    }
    navigate('/overview');
  };

  const subjects = [
    { id: 'mathematics', name: 'Mathematics', icon: '➗' },
    { id: 'physics', name: 'Physics', icon: '⚛️' },
    { id: 'chemistry', name: 'Chemistry', icon: '🧪' },
    { id: 'biology', name: 'Biology', icon: '🧬' },
    { id: 'computer_science', name: 'Computer Science', icon: '💻' }
  ];

  const confidenceLevels = [
    { id: 'beginner', name: 'Beginner', desc: 'Just starting out, need foundational help.' },
    { id: 'intermediate', name: 'Intermediate', desc: 'Have some knowledge, want to deepen understanding.' },
    { id: 'advanced', name: 'Advanced', desc: 'Preparing for tough exams, need expert guidance.' }
  ];

  return (
    <div className="min-h-screen bg-[#080D1A] text-white flex flex-col items-center justify-center p-4 relative selection:bg-blue-600 selection:text-white font-sans antialiased overflow-hidden">
      {/* ── Background Grid & Atmospheric Glow ─────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-70" />
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[150px]" />
      </div>

      {/* Header Logo */}
      <div 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-3 cursor-pointer z-10"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-500 flex items-center justify-center shadow-md shadow-purple-500/20">
          <Brain className="w-4.5 h-4.5 text-white" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">
          RootCause <span className="font-light text-slate-300">Tutor</span>
        </span>
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Progress Pills */}
        <div className="flex justify-center gap-2.5 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={cn(
                "w-12 h-2 rounded-full transition-all duration-300",
                step >= i ? "bg-[#2563EB] shadow-[0_0_10px_#3b82f6]" : "bg-white/10"
              )}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] rounded-3xl shadow-2xl border border-white/[0.08] p-8 sm:p-10 backdrop-blur-xl">
          
          {step === 1 && (
            <div className="animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-blue-500/15 border border-blue-400/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-400">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                Welcome! What&apos;s your learning goal?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
                Tell us what course you want to master so we calibrate the topological knowledge map.
              </p>
              
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Target Objective</label>
                <textarea 
                  className="w-full border border-white/[0.1] rounded-2xl p-4 text-white placeholder-slate-500 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white/[0.04] resize-none h-32 text-xs sm:text-sm outline-none transition-all"
                  placeholder="e.g., I want to master Calculus Chain Rule & Function Composition for my college exam..."
                  value={formData.learningGoal}
                  onChange={(e) => setFormData({...formData, learningGoal: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                Select your primary topic area
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                You can import multiple lecture syllabi and PDFs anytime inside your Library.
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                {subjects.map(subject => (
                  <button
                    key={subject.id}
                    onClick={() => setFormData({...formData, subject: subject.id})}
                    className={cn(
                      "p-4 rounded-2xl border text-left transition-all flex flex-col items-start gap-2 cursor-pointer",
                      formData.subject === subject.id 
                        ? "border-blue-500 bg-blue-600/20 shadow-md shadow-blue-500/20" 
                        : "border-white/[0.08] hover:border-white/20 bg-white/[0.03]"
                    )}
                  >
                    <span className="text-2xl">{subject.icon}</span>
                    <span className={cn(
                      "font-bold text-xs sm:text-sm",
                      formData.subject === subject.id ? "text-white" : "text-slate-300"
                    )}>{subject.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-amber-500/15 border border-amber-400/20 rounded-2xl flex items-center justify-center mb-6 text-amber-400">
                <Calendar className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                When is your target milestone?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                We calibrate adaptive study spacing so all identified prerequisite gaps are recovered in time.
              </p>
              
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">Exam / Milestone Date</label>
                <input 
                  type="date"
                  className="w-full border border-white/[0.1] rounded-2xl p-4 text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 bg-white/[0.04] text-xs sm:text-sm outline-none"
                  value={formData.examDate}
                  onChange={(e) => setFormData({...formData, examDate: e.target.value})}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in duration-300">
              <div className="w-12 h-12 bg-emerald-500/15 border border-emerald-400/20 rounded-2xl flex items-center justify-center mb-6 text-emerald-400">
                <Award className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                Current self-rated mastery level
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mb-6">
                Helps configure initial adaptive confidence weights in the Quiz Arena.
              </p>
              
              <div className="space-y-3">
                {confidenceLevels.map(level => (
                  <button
                    key={level.id}
                    onClick={() => setFormData({...formData, confidence: level.id})}
                    className={cn(
                      "w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-4 cursor-pointer",
                      formData.confidence === level.id 
                        ? "border-emerald-500 bg-emerald-500/20 shadow-md shadow-emerald-500/20" 
                        : "border-white/[0.08] hover:border-white/20 bg-white/[0.03]"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0",
                      formData.confidence === level.id ? "border-emerald-400 bg-emerald-500" : "border-white/20"
                    )}>
                      {formData.confidence === level.id && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <div className={cn(
                        "font-bold text-xs sm:text-sm",
                        formData.confidence === level.id ? "text-white" : "text-slate-300"
                      )}>{level.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{level.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="mt-8 pt-6 border-t border-white/[0.08] flex items-center justify-between">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full transition-colors cursor-pointer",
                step === 1 
                  ? "text-slate-600 cursor-not-allowed" 
                  : "text-slate-300 hover:text-white hover:bg-white/[0.06]"
              )}
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
            
            <button 
              onClick={handleNext}
              className="flex items-center gap-2 bg-[#2563EB] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer hover:scale-[1.02]"
            >
              <span>{step === 4 ? 'Enter Learning Workspace' : 'Continue'}</span>
              {step < 4 && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

        </div>
        
        {step < 4 && (
          <div className="text-center mt-6">
            <button 
              onClick={handleComplete}
              className="text-slate-400 hover:text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Skip directly to Overview Workspace →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
