"use client";

import dynamic from 'next/dynamic';
import CVForm from '@/components/CVForm';
import { useCVStore } from '@/store/useCVStore';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';


// Strictly dynamically import PDFExportWrapper with ssr: false
const PDFExportWrapper = dynamic(
  () => import('@/components/PDFExportWrapper'),
  { ssr: false }
);

export default function Home() {
  const { cvData } = useCVStore();
  const [mounted, setMounted] = useState(false);

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
    <main className="h-screen bg-slate-50 flex flex-col overflow-hidden font-sans selection:bg-red-200 selection:text-red-900">
      
      {/* GLOBAL HEADER */}
      <header className="w-full bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between z-20 shadow-sm relative shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-red-600 rounded-xl flex items-center justify-center shadow-inner">
            <span className="text-white font-bold text-lg">CV</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-800 tracking-tight hidden sm:block">Modern CV Builder</h1>
        </div>
        <div className="flex-1 flex justify-center px-4">
        </div>
        <div className="w-12 sm:w-48"></div> {/* spacer for centering */}
      </header>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT SIDE: SCROLLABLE FORM */}
        <div className="w-full lg:w-1/2 h-full overflow-y-auto border-r border-slate-200 custom-scrollbar bg-slate-50/50 backdrop-blur-sm">
          <div className="p-4 md:p-8 lg:px-12 pt-8">
            <CVForm pdfDownloadButton={<PDFExportWrapper mode="button" data={cvData} />} />
          </div>
        </div>
        
        {/* RIGHT SIDE: STICKY PDF PREVIEW */}
        <div className="w-full lg:w-1/2 h-full bg-slate-900 hidden lg:flex flex-col relative">
          <div className="absolute inset-0 p-8 pt-6">
            <div className="w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/10 flex items-center justify-center relative z-10">
              <PDFExportWrapper mode="viewer" data={cvData} />
            </div>
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
          </div>
        </div>
        
        <div className="lg:hidden p-4 bg-slate-900 text-white text-center text-sm font-medium z-50 fixed bottom-0 w-full shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          PDF preview is hidden on small screens. Use a larger screen to view your CV in real-time.
        </div>
      </div>
    </main>
  );
}
