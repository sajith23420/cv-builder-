"use client";

import React, { useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, LayoutTemplate, Download, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useCVStore } from '@/store/useCVStore';
import { generateWordDocument } from '@/utils/generateWord';
import { parseCVFile, mapParsedDataToCVData } from '@/utils/cvParser';

const PDFExportWrapper = dynamic(
  () => import('@/components/PDFExportWrapper'),
  { ssr: false }
);

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { cvData, loadImportedData } = useCVStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isUploading, setIsUploading] = useState(false);

  const handleDownloadWord = async () => {
    try {
      await generateWordDocument(cvData);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document.");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const parsed = await parseCVFile(file);
      const importedData = mapParsedDataToCVData(parsed);
      loadImportedData(importedData);
    } catch (err) {
      console.error('CV parsing failed:', err);
      alert('Failed to parse CV. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <header className="w-full px-6 lg:px-12 py-4 flex items-center justify-between relative z-40 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
          <span className="text-white font-bold text-xl tracking-tighter">CV</span>
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 hidden sm:block">
          NextGen Builder
        </span>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        {pathname === '/templates' && (
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        
        {pathname === '/editor' && (
          <>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".pdf,.docx,.doc" 
              onChange={handleFileChange} 
            />
            
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-sm font-semibold text-slate-300 bg-white/5 hover:bg-white/10 rounded-lg transition-all border border-white/10"
            >
              {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
              <span className="hidden sm:inline">{isUploading ? 'Parsing...' : 'Import CV'}</span>
            </button>

            <button
              onClick={handleDownloadWord}
              className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 text-sm font-semibold text-white bg-blue-600/80 hover:bg-blue-600 rounded-lg transition-all border border-blue-500/50"
            >
              <Download size={16} />
              <span className="hidden sm:inline">DOCX</span>
            </button>

            <div className="hidden sm:block">
              <PDFExportWrapper mode="button" />
            </div>

            <Link 
              href="/templates"
              className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-semibold text-sm px-3 py-2 sm:px-4 sm:py-2 rounded-lg hover:bg-white/10"
            >
              <LayoutTemplate size={16} /> <span className="hidden lg:inline">Change Template</span>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
