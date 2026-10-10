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
    <div className="max-w-4xl mx-auto space-y-7 pb-12">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Platform Settings
        </h1>
        <p className="text-slate-500 mt-1 text-xs sm:text-sm">
          Customize adaptive learning difficulty, Socratic AI coaching style, and account preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          {[
            { id: 'profile', icon: User, label: 'Profile' },
            { id: 'learning', icon: Award, label: 'Learning Preferences' },
            { id: 'appearance', icon: Moon, label: 'Appearance' },
            { id: 'notifications', icon: Bell, label: 'Notifications' },
            { id: 'privacy', icon: Shield, label: 'Privacy & Security' },
            { id: 'about', icon: Info, label: 'About Platform' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left cursor-pointer",
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-xs" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4",
                activeTab === item.id ? "text-white" : "text-slate-500"
              )} />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-2 space-y-6">
          
          {/* Profile Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <h2 className="font-bold text-slate-900 text-sm">Student Profile</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 via-sky-400 to-indigo-600 flex items-center justify-center text-white text-xl font-extrabold shrink-0 shadow-xs">
                  {currentProfile.name.charAt(0)}
                </div>
                <div>
                  <button className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 px-4 py-2 rounded-xl transition-all cursor-pointer">
                    Change Avatar
                  </button>
                  <p className="text-[11px] text-slate-400 mt-1.5">JPG, PNG or GIF up to 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue={currentProfile.name}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="hana@mindjoy.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70">
              <h2 className="font-bold text-slate-900 text-sm">Adaptive AI Tutoring Preferences</h2>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span>Topological Prerequisite Rewind</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Automatically traverse DAG backward when consecutive errors occur on derivative concepts
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  Enabled
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-600" />
                    <span>Socratic Hint Mode</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Provide conceptual checkpoints and diagnostic hints before revealing the direct answer
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                {saved && (
                  <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4" /> Preferences saved!
                  </span>
                )}
                <div className="ml-auto">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
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
