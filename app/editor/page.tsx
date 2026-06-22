"use client";

import dynamic from 'next/dynamic';
import CVForm from '@/components/CVForm';
import { useCVStore } from '@/store/useCVStore';
import { useEffect, useState } from 'react';
import { Loader2, Layout, FileText } from 'lucide-react';


// Strictly dynamically import PDFExportWrapper with ssr: false
const PDFExportWrapper = dynamic(
  () => import('@/components/PDFExportWrapper'),
  { ssr: false }
);

export default function EditorPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center text-slate-600">
        <Loader2 className="animate-spin text-red-500 mb-4" size={40} />
        <p className="font-semibold text-lg">Initializing Workspace...</p>
      </div>
    );
  }

  return (
    <main className="h-[calc(100vh-80px)] flex flex-col overflow-hidden font-sans selection:bg-blue-500/30 selection:text-white">
      
      {/* MOBILE TAB NAVIGATION */}
      <div className="lg:hidden flex border-b border-white/10 bg-slate-950/50 backdrop-blur-md z-20 sticky top-0">
        <button
          onClick={() => setActiveTab('editor')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all duration-200 ${
            activeTab === 'editor' 
              ? 'text-blue-400 bg-blue-500/10 border-b-2 border-blue-500' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <Layout size={16} />
          Editor
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-all duration-200 ${
            activeTab === 'preview' 
              ? 'text-indigo-400 bg-indigo-500/10 border-b-2 border-indigo-500' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
          }`}
        >
          <FileText size={16} />
          Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT SIDE: SCROLLABLE FORM */}
        <div className={`w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto border-r border-white/10 custom-scrollbar bg-white/5 backdrop-blur-md ${activeTab === 'editor' ? 'block' : 'hidden lg:block'}`}>
          <div className="p-4 md:p-8 lg:px-12 pt-8">
            <CVForm pdfDownloadButton={<PDFExportWrapper mode="button" />} />
          </div>
        </div>
        
        {/* RIGHT SIDE: STICKY PDF PREVIEW */}
        <div className={`flex-1 h-full flex-col relative bg-transparent ${activeTab === 'preview' ? 'flex' : 'hidden lg:flex'}`}>
          <div className="absolute inset-0 p-4 lg:p-8 pt-6 flex items-center justify-center">
            {/* Elegant framing for the PDF preview */}
            <div className="w-full h-full max-w-4xl bg-slate-900/50 backdrop-blur-2xl rounded-2xl lg:rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 flex items-center justify-center relative z-10">
              <PDFExportWrapper mode="viewer" />
            </div>
            {/* Subtle glow behind PDF viewer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
          </div>
        </div>
      </div>
    </main>
  );
}
