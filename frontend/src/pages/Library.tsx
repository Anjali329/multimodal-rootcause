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
    case 'pdf': return <FileText className={cn("text-rose-500", className)} />;
    case 'pptx': return <Presentation className={cn("text-amber-500", className)} />;
    case 'video': return <Video className={cn("text-blue-500", className)} />;
    case 'youtube': return <YoutubeIcon className={cn("text-red-500", className)} />;
    default: return <FileText className={className} />;
  }
};

const getStatusBadge = (status: ProcessingStatus) => {
  if (status === 'ready') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
        Ready
      </span>
    );
  }
  if (status === 'failed') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200">
        <AlertTriangle className="w-3 h-3 text-rose-600" />
        Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
      <Loader2 className="w-3 h-3 animate-spin text-blue-600" />
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
    <div className="space-y-7">
      {/* ── Page Header ───────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Knowledge Library
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Source-grounded multimodal course materials with automated unit and concept indexing
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm shadow-xs transition-all cursor-pointer shrink-0">
          <Upload className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* ── Drag & Drop Box ───────────────────────────────────────── */}
      <div 
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 sm:p-10 text-center transition-all duration-200 relative bg-white",
          isDragging 
            ? "border-blue-500 bg-blue-50/50" 
            : "border-slate-200 hover:border-slate-300"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex justify-center mb-4 space-x-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center">
            <FileText className="w-5 h-5 text-rose-500" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
            <Presentation className="w-5 h-5 text-amber-500" />
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
            <Video className="w-5 h-5 text-blue-500" />
          </div>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">
          Drag & drop course materials or click to browse
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mb-3">
          Supported formats: PDF lecture notes, PPTX slides, MP4 / WebM lecture recordings
        </p>
        <span className="inline-block text-[11px] text-slate-400 font-mono">
          Max file size: 100MB • Auto-indexed into topological knowledge DAG
        </span>
        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
      </div>

      {/* ── Materials Grid ────────────────────────────────────────── */}
      {materials.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <h3 className="text-lg font-bold text-slate-900 mb-2">Your library is empty</h3>
          <p className="text-slate-500 text-sm mb-6">Upload your first course syllabus or lecture to begin indexing.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer">
            Upload Material
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {materials.map(material => (
            <div 
              key={material.id} 
              className="bg-white hover:border-slate-300 rounded-2xl border border-slate-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-5 transition-all duration-150 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                      {getSourceIcon(material.sourceType, "w-6 h-6")}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base truncate group-hover:text-blue-600 transition-colors" title={material.filename}>
                        {material.filename}
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
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
                    <div className="flex justify-between text-xs text-slate-500 mb-1.5">
                      <span>Extracting Units & OCR</span>
                      <span className="text-blue-600 font-mono">50%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-blue-600 h-1.5 rounded-full w-1/2 animate-pulse" />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-2">
                <div className="flex gap-5">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Units</p>
                    <p className="font-extrabold text-slate-900 text-sm">{material.extractedUnits}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Concepts</p>
                    <p className="font-extrabold text-slate-900 text-sm">{material.associatedConcepts}</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
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
