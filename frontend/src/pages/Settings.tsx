import { useState } from 'react';
import { 
  User, 
  Moon, 
  Bell, 
  Shield, 
  Info,
  Calendar,
  Target,
  Award,
  CheckCircle2
} from 'lucide-react';
import { useAppStore } from '@/store';
import { demoProfile } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

export function SettingsPage() {
  const { profile } = useAppStore();
  const currentProfile = profile || demoProfile;
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Platform <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">Settings</span>
        </h1>
        <p className="text-slate-400 mt-1.5 text-xs sm:text-sm">
          Customize adaptive learning difficulty, Socratic AI coaching style, and account preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-1.5">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'learning', icon: Award, label: 'Learning Preferences' },
            { id: 'appearance', icon: Moon, label: 'Appearance' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'privacy', icon: Shield, label: 'Privacy & Security' },
            { id: 'about', icon: Info, label: 'About Track D' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer",
                activeTab === item.id 
                  ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/25" 
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                activeTab === item.id ? "text-white" : "text-slate-400"
              )} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Section */}
          <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] shadow-xl overflow-hidden backdrop-blur-md">
            <div className="px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <h2 className="font-bold text-white text-sm">Student Profile</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-white text-xl font-extrabold shrink-0 shadow-lg shadow-blue-500/20">
                  {currentProfile.name.charAt(0)}
                </div>
                <div>
                  <button className="text-xs font-semibold text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] px-4 py-2 rounded-full transition-all cursor-pointer">
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-slate-400 mt-1.5">JPG, PNG or GIF up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={currentProfile.name}
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="alex.student@mit.edu"
                    className="w-full bg-white/[0.04] border border-white/[0.1] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-white/[0.03] rounded-3xl border border-white/[0.08] shadow-xl overflow-hidden backdrop-blur-md">
            <div className="px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
              <h2 className="font-bold text-white text-sm">Adaptive AI Tutoring Preferences</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>Topological Prerequisite Rewind</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Automatically traverse DAG backward when 2+ consecutive errors occur on derivative concepts
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span>Socratic Hint Mode</span>
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Provide conceptual checkpoints and diagnostic hints before revealing the direct answer
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/15 border border-blue-500/30 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                {saved && (
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" /> Preferences saved!
                  </span>
                )}
                <div className="ml-auto">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-full shadow-lg shadow-blue-500/25 transition-all cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
