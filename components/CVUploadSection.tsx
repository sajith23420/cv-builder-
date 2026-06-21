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
      <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 shadow-sm">
        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

        <div className="relative flex items-center gap-4">
          {/* Spinner */}
          <div className="relative">
            <div className="h-12 w-12 rounded-full border-[3px] border-amber-200" />
            <div className="absolute inset-0 h-12 w-12 animate-spin rounded-full border-[3px] border-transparent border-t-amber-500" />
            <FileText className="absolute inset-0 m-auto text-amber-600" size={18} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-amber-800">AI is analyzing your CV...</p>
            <p className="mt-0.5 truncate text-xs text-amber-600">{fileName}</p>
            {/* Progress bar */}
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-amber-100">
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
      <div className="relative overflow-hidden rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 p-6 shadow-sm">
        <button
          onClick={resetUpload}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
          title="Dismiss"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-4 ring-emerald-50">
            <CheckCircle2 size={24} />
          </div>

          <div className="min-w-0 flex-1 pr-6">
            <p className="text-sm font-bold text-emerald-800">CV imported successfully!</p>
            <p className="mt-0.5 truncate text-xs text-emerald-600">{fileName}</p>
            {parsedSummary && (
              <p className="mt-2 rounded-lg bg-emerald-100/60 px-3 py-1.5 text-xs font-medium text-emerald-700">
                {parsedSummary}
              </p>
            )}
            <p className="mt-2.5 text-xs text-emerald-500">
              All form sections have been pre-filled. Review &amp; edit below.
            </p>
          </div>
        </div>

        <button
          onClick={resetUpload}
          className="mt-4 w-full rounded-xl border border-emerald-200 bg-white/70 px-4 py-2.5 text-xs font-semibold text-emerald-700 hover:bg-white transition-colors backdrop-blur-sm"
        >
          Upload a Different CV
        </button>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-6 shadow-sm">
        <button
          onClick={resetUpload}
          className="absolute right-3 top-3 rounded-lg p-1.5 text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors"
          title="Dismiss"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500 ring-4 ring-red-50">
            <AlertCircle size={24} />
          </div>

          <div className="min-w-0 flex-1 pr-6">
            <p className="text-sm font-bold text-red-800">Import failed</p>
            <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
          </div>
        </div>

        <button
          onClick={() => {
            resetUpload();
            fileInputRef.current?.click();
          }}
          className="mt-4 w-full rounded-xl border border-red-200 bg-white/70 px-4 py-2.5 text-xs font-semibold text-red-700 hover:bg-white transition-colors backdrop-blur-sm"
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
        transition-all duration-300 ease-out
        ${
          status === 'dragging'
            ? 'border-red-400 bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 shadow-lg shadow-red-100/50 scale-[1.01]'
            : 'border-slate-300 bg-gradient-to-br from-slate-50 via-white to-slate-50 hover:border-red-300 hover:shadow-md hover:shadow-red-100/30'
        }
      `}
      onClick={() => fileInputRef.current?.click()}
    >
      {/* Decorative corner accent */}
      <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-red-500/5 transition-transform duration-500 group-hover:scale-150" />
      <div className="absolute -left-4 -bottom-4 h-16 w-16 rounded-full bg-orange-500/5 transition-transform duration-500 group-hover:scale-150" />

      <div className="relative flex flex-col items-center gap-3 px-6 py-8">
        {/* Icon */}
        <div
          className={`
            flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300
            ${
              status === 'dragging'
                ? 'bg-red-100 text-red-600 scale-110 rotate-3'
                : 'bg-slate-100 text-slate-500 group-hover:bg-red-50 group-hover:text-red-500 group-hover:scale-105'
            }
          `}
        >
          {status === 'dragging' ? <FileUp size={26} /> : <Upload size={26} />}
        </div>

        {/* Title */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <Sparkles size={14} className="text-amber-500" />
            <p className="text-sm font-bold text-slate-800">Start from Existing CV</p>
          </div>
          <p className="mt-1 text-xs text-slate-500">
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
          className="mt-1 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-red-600 hover:shadow-md active:scale-95"
        >
          <span className="flex items-center gap-2">
            <Upload size={14} />
            Upload PDF / DOCX
          </span>
        </button>

        <p className="text-[10px] text-slate-400">Supports PDF files · Parsed by Gemini AI</p>
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
