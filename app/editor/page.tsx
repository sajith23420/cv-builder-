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

export default function EditorPage() {
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
    <main className="h-[calc(100vh-80px)] flex flex-col overflow-hidden font-sans selection:bg-blue-500/30 selection:text-white">
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* LEFT SIDE: SCROLLABLE FORM */}
        <div className="w-full lg:w-[45%] xl:w-[40%] h-full overflow-y-auto border-r border-white/10 custom-scrollbar bg-white/5 backdrop-blur-md">
          <div className="p-4 md:p-8 lg:px-12 pt-8">
            <CVForm pdfDownloadButton={<PDFExportWrapper mode="button" />} />
          </div>
        </div>
        
        {/* RIGHT SIDE: STICKY PDF PREVIEW */}
        <div className="flex-1 h-full hidden lg:flex flex-col relative bg-transparent">
          <div className="absolute inset-0 p-8 pt-6 flex items-center justify-center">
            {/* Elegant framing for the PDF preview */}
            <div className="w-full max-w-4xl h-full bg-slate-900/50 backdrop-blur-2xl rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden border border-white/10 flex items-center justify-center relative z-10">
              <PDFExportWrapper mode="viewer" />
            </div>
            {/* Subtle glow behind PDF viewer */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
          </div>
        </div>
        
        <div className="lg:hidden p-4 bg-black/80 backdrop-blur-md text-white text-center text-sm font-medium z-50 fixed bottom-0 w-full border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
          PDF preview is hidden on small screens. Use a larger screen to view your CV in real-time.
        </div>
      </div>
    </main>
  );
}
