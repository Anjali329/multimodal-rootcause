import React, { useState } from 'react';
import { 
  FileText, 
  Presentation, 
  Video, 
  PlayCircle as YoutubeIcon, 
  Upload, 
  CheckCircle2, 
  AlertTriangle,
  Loader2
} from 'lucide-react';
import type { SourceMaterial, SourceType, ProcessingStatus } from '@/types';
import { demoMaterials } from '@/lib/mock-data';
import { cn, formatDate } from '@/lib/utils';

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const getSourceIcon = (type: SourceType, className?: string) => {
  switch (type) {
    case 'pdf': return <FileText className={cn("text-rose-400", className)} />;
    case 'pptx': return <Presentation className={cn("text-amber-400", className)} />;
    case 'video': return <Video className={cn("text-cyan-400", className)} />;
    case 'youtube': return <YoutubeIcon className={cn("text-red-400", className)} />;
    default: return <FileText className={className} />;
  }
};

const getStatusBadge = (status: ProcessingStatus) => {
  if (status === 'ready') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        Ready
      </span>
    );
  }
  if (status === 'failed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/15 text-rose-300 border border-rose-500/30 backdrop-blur-md">
        <AlertTriangle className="w-3 h-3 text-rose-400" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 text-blue-300 border border-blue-500/30 backdrop-blur-md">
      <Loader2 className="w-3 h-3 animate-spin text-blue-400" />
      {status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
    </span>
  );
};

export const Library = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [materials] = useState<SourceMaterial[]>(demoMaterials);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-8">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Knowledge <span className="bg-gradient-to-r from-[#D946EF] via-[#C084FC] to-[#38BDF8] bg-clip-text text-transparent">Library</span>
          </h1>
          <p className="text-slate-400 mt-1.5 text-sm">
            Source-grounded multimodal course materials with automated unit and concept indexing
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-[#2563EB] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* ── Drag & Drop Box ───────────────────────────────────────── */}
      <div 
        className={cn(
          "border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-200 relative backdrop-blur-md",
          isDragging 
            ? "border-blue-400 bg-blue-500/15 shadow-[0_0_20px_rgba(59,130,246,0.2)]" 
            : "border-white/[0.12] hover:border-blue-400/40 bg-white/[0.03] hover:bg-white/[0.05]"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-center mb-4 space-x-4">
          <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/20 flex items-center justify-center">
            <FileText className="w-5 h-5 text-rose-400" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center">
            <Presentation className="w-5 h-5 text-amber-400" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/20 flex items-center justify-center">
            <Video className="w-5 h-5 text-cyan-400" />
          </div>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-white mb-1">
          Drag & drop course materials or click to browse
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mb-3">
          Supported formats: PDF lecture notes, PPTX slides, MP4 / WebM lecture recordings
        </p>
        <span className="inline-block text-[11px] text-slate-500 font-mono">
          Max file size: 100MB • Auto-indexed into topological knowledge DAG
        </span>
        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>

      {/* ── Materials Grid ────────────────────────────────────────── */}
      {materials.length === 0 ? (
        <div className="text-center py-16 bg-white/[0.03] rounded-2xl border border-white/[0.08] backdrop-blur-md">
          <h3 className="text-lg font-bold text-white mb-2">Your library is empty</h3>
          <p className="text-slate-400 text-sm mb-6">Upload your first course syllabus or lecture to begin indexing.</p>
          <button className="bg-[#2563EB] hover:bg-blue-600 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-md transition-all cursor-pointer">
            Upload Material
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materials.map(material => (
            <div 
              key={material.id} 
              className="bg-white/[0.03] hover:bg-white/[0.06] hover:border-blue-400/40 rounded-2xl border border-white/[0.08] shadow-xl p-5.5 transition-all duration-200 backdrop-blur-md flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className="p-2.5 bg-white/[0.05] border border-white/[0.08] rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                      {getSourceIcon(material.sourceType, "w-6 h-6")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-white text-sm sm:text-base truncate group-hover:text-blue-300 transition-colors" title={material.filename}>
                        {material.filename}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {formatFileSize(material.fileSize)} • {formatDate(material.uploadedAt)}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  {getStatusBadge(material.status)}
                </div>
                
                {material.status !== 'ready' && material.status !== 'failed' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1.5">
                      <span>Extracting Units & OCR</span>
                      <span className="text-blue-300 font-mono">50%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-500 h-1.5 rounded-full w-1/2 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08] mt-2">
                <div className="flex gap-5">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Units</p>
                    <p className="font-extrabold text-white text-sm">{material.extractedUnits}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Concepts</p>
                    <p className="font-extrabold text-white text-sm">{material.associatedConcepts}</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-blue-300 hover:text-white transition-colors cursor-pointer">
                  View Units →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
