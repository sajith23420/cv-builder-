"use client";

import React, { useState, useRef, useCallback } from 'react';
import { Upload, FileUp, CheckCircle2, AlertCircle, Sparkles, X, FileText } from 'lucide-react';
import { parseCVFile, mapParsedDataToCVData, type ParsedCVData } from '@/utils/cvParser';
import { useCVStore } from '@/store/useCVStore';

type UploadStatus = 'idle' | 'dragging' | 'parsing' | 'success' | 'error';

export default function CVUploadSection() {
  const { loadImportedData } = useCVStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [parsedSummary, setParsedSummary] = useState<string | null>(null);

  // -----------------------------------------------------------------------
  // Core handler – takes a File, calls the Gemini AI parser, and autofills
  // -----------------------------------------------------------------------
  const handleFile = useCallback(async (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
      'application/msword', // .doc
    ];
    const validExtensions = ['.pdf', '.docx', '.doc'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!validTypes.includes(file.type) && !validExtensions.includes(ext)) {
      setStatus('error');
      setErrorMessage('Unsupported file type. Please upload a PDF or DOCX file.');
      return;
    }

    setFileName(file.name);
    setStatus('parsing');
    setErrorMessage(null);

    try {
      const parsed: ParsedCVData = await parseCVFile(file);
      const cvData = mapParsedDataToCVData(parsed);
      loadImportedData(cvData);

      // Build a short summary of what was imported
      const parts: string[] = [];
      if (parsed.name) parts.push(`Name: ${parsed.name}`);
      if (parsed.experience?.length) parts.push(`${parsed.experience.length} experience(s)`);
      if (parsed.projects?.length) parts.push(`${parsed.projects.length} project(s)`);
      if (parsed.education?.length) parts.push(`${parsed.education.length} education entry(s)`);
      setParsedSummary(parts.join(' · '));

      setStatus('success');
    } catch (err) {
      console.error('CV parsing failed:', err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Something went wrong while parsing your CV. Please try again.'
      );
    }
  }, [loadImportedData]);

  // -----------------------------------------------------------------------
  // Drag & drop handlers
  // -----------------------------------------------------------------------
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus((prev) => (prev === 'parsing' || prev === 'success' ? prev : 'dragging'));
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setStatus((prev) => (prev === 'dragging' ? 'idle' : prev));
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset so the same file can be re-selected
    e.target.value = '';
  };

  const resetUpload = () => {
    setStatus('idle');
    setFileName(null);
    setErrorMessage(null);
    setParsedSummary(null);
  };

  // -----------------------------------------------------------------------
  // Render states
  // -----------------------------------------------------------------------

  // Parsing / loading state
  if (status === 'parsing') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md p-6 shadow-sm">
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        <div className="relative flex items-center gap-4 z-10">
          {/* Spinner */}
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-[3px] border-amber-500/20" />
            <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-[3px] border-transparent border-t-amber-400" />
            <FileText className="absolute inset-0 m-auto text-amber-400" size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-amber-200">AI is analyzing your CV...</p>
            <p className="mt-0.5 truncate text-xs text-amber-400/80">{fileName}</p>
            {/* Progress bar */}
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-amber-500/20">
              <div className="h-full animate-[progressIndeterminate_1.5s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (status === 'success') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md p-6 shadow-sm">
        <button
          onClick={resetUpload}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors z-20"
          title="Dismiss"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4 relative z-10">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-2 ring-emerald-500/20">
            <CheckCircle2 size={24} />
          </div>

          <div className="min-w-0 flex-1 pr-6">
            <p className="text-sm font-bold text-emerald-100">CV imported successfully!</p>
            <p className="mt-0.5 truncate text-xs text-emerald-400/80">{fileName}</p>
            {parsedSummary && (
              <p className="mt-2 rounded-lg bg-emerald-500/20 px-3 py-1.5 text-xs font-medium text-emerald-200">
                {parsedSummary}
              </p>
            )}
            <p className="mt-2.5 text-xs text-emerald-300/80">
              All form sections have been pre-filled. Review &amp; edit below.
            </p>
          </div>
        </div>

        <button
          onClick={resetUpload}
          className="mt-4 w-full rounded-xl border border-emerald-500/30 bg-emerald-500/20 px-4 py-2.5 text-xs font-semibold text-emerald-100 hover:bg-emerald-500/30 transition-colors backdrop-blur-sm relative z-10"
        >
          Upload a Different CV
        </button>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-md p-6 shadow-sm">
        <button
          onClick={resetUpload}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors z-20"
          title="Dismiss"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4 relative z-10">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 ring-2 ring-red-500/20">
            <AlertCircle size={24} />
          </div>

          <div className="min-w-0 flex-1 pr-6">
            <p className="text-sm font-bold text-red-100">Import failed</p>
            <p className="mt-1 text-xs text-red-400/80">{errorMessage}</p>
          </div>
        </div>

        <button
          onClick={() => {
            resetUpload();
            fileInputRef.current?.click();
          }}
          className="mt-4 w-full rounded-xl border border-red-500/30 bg-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-100 hover:bg-red-500/30 transition-colors backdrop-blur-sm relative z-10"
        >
          Try Again
        </button>
      </div>
    );
  }

  // Idle / dragging state (default)
  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        group relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed
        transition-all duration-300 ease-out backdrop-blur-md
        ${
          status === 'dragging'
            ? 'border-blue-400 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.2)] scale-[1.02]'
            : 'border-white/20 bg-white/5 hover:border-blue-400/50 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]'
        }
      `}
      onClick={() => fileInputRef.current?.click()}
    >
      {/* Decorative corner accent */}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-500/10 blur-xl transition-transform duration-500 group-hover:scale-150" />
      <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-purple-500/10 blur-xl transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex flex-col items-center gap-3 px-6 py-8 z-10">
        {/* Icon */}
        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 shadow-inner
            ${
              status === 'dragging'
                ? 'bg-blue-500/20 text-blue-400 scale-110 rotate-3'
                : 'bg-black/20 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:scale-105 border border-white/5'
            }
          `}
        >
          {status === 'dragging' ? <FileUp size={26} /> : <Upload size={26} />}
        </div>

        {/* Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-blue-400" />
            <p className="text-sm font-bold text-white tracking-tight">Start from Existing CV</p>
          </div>
          <p className="mt-1 text-xs text-slate-400 font-light">
            {status === 'dragging'
              ? 'Release to upload your file'
              : 'Drop your PDF here, or click to browse — powered by Gemini AI'}
          </p>
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className="mt-2 rounded-xl bg-blue-600/80 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-blue-600 hover:shadow-md active:scale-95 border border-blue-500/50"
        >
          <span className="flex items-center gap-2">
            <Upload size={14} />
            Upload PDF / DOCX
          </span>
        </button>

        <p className="text-[10px] text-slate-500 mt-1">Supports PDF files · Parsed by Gemini AI</p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleInputChange}
        className="hidden"
        id="cv-upload-input"
      />
    </div>
  );
}
