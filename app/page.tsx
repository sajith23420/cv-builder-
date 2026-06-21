"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Upload, FileUp, Sparkles, Plus, Loader2 } from 'lucide-react';
import { useCVParser } from '@/hooks/useCVParser';

export default function LandingPage() {
  const router = useRouter();
  
  // Custom hook handles file parsing and auto-routes to /templates on success
  const { 
    status, 
    fileName, 
    errorMessage, 
    fileInputRef, 
    handleInputChange, 
    triggerUpload 
  } = useCVParser('/templates');

  const handleStartFromScratch = () => {
    router.push('/templates');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-red-200 selection:text-red-900 relative overflow-hidden">
      
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-red-100 rounded-[100%] blur-[120px] opacity-50 pointer-events-none" />
      
      {/* HEADER */}
      <header className="w-full px-8 py-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-xl">CV</span>
          </div>
          <span className="text-xl font-extrabold text-slate-800 tracking-tight">Modern CV Builder</span>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10 -mt-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight text-center mb-12 max-w-3xl">
          How will you make your resume?
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          {/* CARD 1: Upload Existing */}
          <div 
            onClick={status === 'parsing' ? undefined : triggerUpload}
            className={`
              relative group flex flex-col items-center text-center p-10 md:p-14 
              bg-white rounded-[2rem] border-2 border-slate-200 shadow-sm 
              transition-all duration-300 ease-out overflow-hidden
              ${status === 'parsing' ? 'cursor-wait border-red-300' : 'cursor-pointer hover:border-red-400 hover:shadow-xl hover:-translate-y-1'}
            `}
          >
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleInputChange}
              className="hidden"
            />

            {status === 'parsing' ? (
              <div className="flex flex-col items-center animate-pulse">
                <Loader2 className="animate-spin text-red-500 mb-6" size={56} />
                <h2 className="text-2xl font-bold text-slate-900 mb-3">AI is analyzing...</h2>
                <p className="text-slate-500 text-sm">{fileName}</p>
              </div>
            ) : (
              <>
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                  <FileUp size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Sparkles className="text-amber-500" size={20} />
                  I already have a resume
                </h2>
                <p className="text-slate-500 mb-8">
                  Upload your existing resume to make quick edits. Our AI will automatically extract your details.
                </p>
                <div className="mt-auto px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold shadow-sm group-hover:bg-red-600 transition-colors flex items-center gap-2">
                  <Upload size={16} /> Upload PDF/DOCX
                </div>
                {status === 'error' && errorMessage && (
                  <p className="text-red-500 text-xs mt-4 font-medium">{errorMessage}</p>
                )}
              </>
            )}
          </div>

          {/* CARD 2: Start from Scratch */}
          <div 
            onClick={handleStartFromScratch}
            className="group cursor-pointer flex flex-col items-center text-center p-10 md:p-14 bg-white rounded-[2rem] border-2 border-slate-200 shadow-sm transition-all duration-300 ease-out hover:border-slate-400 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-20 h-20 bg-slate-100 text-slate-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Plus size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              Start from scratch
            </h2>
            <p className="text-slate-500 mb-8">
              We'll guide you step-by-step through choosing a layout and filling out your details perfectly.
            </p>
            <div className="mt-auto px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-colors">
              Browse Templates
            </div>
          </div>

        </div>
      </div>
      
    </main>
  );
}
