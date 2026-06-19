"use client";

import React, { useEffect, useState } from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { ModernCV } from '@/components/templates/ModernCV';
import { FileText as FilePdfIcon, Loader2 } from 'lucide-react';
import { CVData } from '@/store/useCVStore';

interface Props {
  mode: 'button' | 'viewer';
  data: CVData;
}

export default function PDFExportWrapper({ mode, data }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    if (mode === 'button') {
      return (
        <button disabled className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-400 rounded-lg shadow-sm cursor-not-allowed">
          <FilePdfIcon size={16} /> Loading PDF...
        </button>
      );
    }
    return (
      <div className="flex flex-col items-center justify-center h-full text-slate-300 space-y-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="text-lg font-medium">Loading your CV preview...</p>
      </div>
    );
  }

  if (mode === 'button') {
    return (
      <PDFDownloadLink document={<ModernCV data={data} />} fileName="modern_cv.pdf">
        {({ loading }) => (
          <button 
            disabled={loading}
            className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm transition-colors ${loading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
          >
            <FilePdfIcon size={16} /> {loading ? 'Preparing PDF...' : 'Download as PDF'}
          </button>
        )}
      </PDFDownloadLink>
    );
  }

  return (
    <PDFViewer className="w-full h-full border-none" showToolbar={true}>
      <ModernCV data={data} />
    </PDFViewer>
  );
}
