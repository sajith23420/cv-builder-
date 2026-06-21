"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCVStore } from '@/store/useCVStore';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const templatesList = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean sans-serif, single column, ample whitespace. Perfect for a sleek, modern look.',
  },
  {
    id: 'executive',
    name: 'Executive Traditional',
    description: 'Serif headings, highly structured, classic look. Ideal for corporate and leadership roles.',
  },
  {
    id: 'creative',
    name: 'Creative Professional',
    description: 'Subtle slate blue accents, elegant two-column layout. Great for design and creative fields.',
  },
  {
    id: 'tech',
    name: 'Tech Focused',
    description: 'Monospaced elements, prominent GitHub links. Built specifically for developers and engineers.',
  },
  {
    id: 'dense',
    name: 'Data-Dense',
    description: 'Compact but readable layout for users with extensive experience. Fits more on a single page.',
  },
  {
    id: 'ivy',
    name: 'ATS Resume',
    description: 'Strict, traditional academic format with strong typography and centralized headers.',
  }
];

// Helper to render the CSS mini-mockups
const TemplateThumbnail = ({ id }: { id: string }) => {
  switch (id) {
    case 'modern':
      return (
        <div className="w-full h-full bg-white flex flex-col items-center p-4 gap-2">
          <div className="w-2/3 h-4 bg-blue-600/20 rounded"></div>
          <div className="w-1/3 h-2 bg-slate-200 rounded mb-2"></div>
          <div className="w-full h-1.5 bg-blue-600/40 rounded"></div>
          <div className="w-full h-1 bg-slate-100 rounded"></div>
          <div className="w-5/6 h-1 bg-slate-100 rounded"></div>
          <div className="w-full h-1.5 bg-blue-600/40 rounded mt-2"></div>
          <div className="w-full h-1 bg-slate-100 rounded"></div>
          <div className="w-4/5 h-1 bg-slate-100 rounded"></div>
        </div>
      );
    case 'executive':
      return (
        <div className="w-full h-full bg-stone-50 flex flex-col items-center p-4 gap-1.5">
          <div className="w-3/4 h-3 bg-stone-800/60 rounded-sm"></div>
          <div className="w-1/2 h-1.5 bg-stone-400/40 rounded-sm mb-2"></div>
          <div className="w-full h-[1px] bg-stone-800/40"></div>
          <div className="w-full flex justify-between mt-1">
            <div className="w-1/3 h-1.5 bg-stone-800/50 rounded-sm"></div>
            <div className="w-1/4 h-1.5 bg-stone-400/40 rounded-sm"></div>
          </div>
          <div className="w-full h-1 bg-stone-200 rounded-sm mt-1"></div>
          <div className="w-5/6 h-1 bg-stone-200 rounded-sm"></div>
          <div className="w-full h-[1px] bg-stone-800/40 mt-2"></div>
          <div className="w-full flex justify-between mt-1">
            <div className="w-1/4 h-1.5 bg-stone-800/50 rounded-sm"></div>
            <div className="w-1/5 h-1.5 bg-stone-400/40 rounded-sm"></div>
          </div>
        </div>
      );
    case 'creative':
      return (
        <div className="w-full h-full bg-white flex flex-row">
          <div className="w-1/3 h-full bg-slate-600 p-2 flex flex-col gap-1.5">
            <div className="w-full h-3 bg-white/80 rounded-sm mb-2"></div>
            <div className="w-3/4 h-1 bg-white/40 rounded-sm"></div>
            <div className="w-full h-1 bg-white/40 rounded-sm"></div>
            <div className="w-5/6 h-1 bg-white/40 rounded-sm"></div>
          </div>
          <div className="w-2/3 h-full p-3 flex flex-col gap-2">
            <div className="w-1/2 h-2 bg-slate-400 rounded-sm"></div>
            <div className="w-full h-1 bg-slate-100 rounded-sm"></div>
            <div className="w-5/6 h-1 bg-slate-100 rounded-sm"></div>
            <div className="w-1/2 h-2 bg-slate-400 rounded-sm mt-2"></div>
            <div className="w-full h-1 bg-slate-100 rounded-sm"></div>
          </div>
        </div>
      );
    case 'tech':
      return (
        <div className="w-full h-full bg-white flex flex-col p-4 gap-2 border-t-4 border-indigo-600">
          <div className="flex justify-between items-start border-b border-slate-200 pb-2">
            <div className="w-1/2 h-4 bg-slate-800 rounded-sm"></div>
            <div className="w-1/4 h-2 bg-indigo-500/50 rounded-sm"></div>
          </div>
          <div className="w-1/3 h-3 bg-slate-800 rounded-sm"></div>
          <div className="flex gap-1">
            <div className="w-8 h-2 bg-slate-100 border border-slate-200 rounded-sm"></div>
            <div className="w-12 h-2 bg-slate-100 border border-slate-200 rounded-sm"></div>
            <div className="w-10 h-2 bg-slate-100 border border-slate-200 rounded-sm"></div>
          </div>
          <div className="w-1/3 h-3 bg-slate-800 rounded-sm mt-1"></div>
          <div className="w-full h-1 bg-slate-100 rounded-sm"></div>
          <div className="w-full h-1 bg-slate-100 rounded-sm"></div>
        </div>
      );
    case 'dense':
      return (
        <div className="w-full h-full bg-white flex flex-col p-2 gap-1 border border-slate-100">
          <div className="w-1/2 h-3 bg-slate-700 rounded-sm mx-auto mb-1"></div>
          <div className="w-full h-[1px] bg-slate-200"></div>
          <div className="w-1/4 h-2 bg-slate-200 rounded-sm mt-1"></div>
          <div className="w-full h-0.5 bg-slate-100"></div>
          <div className="w-full h-0.5 bg-slate-100"></div>
          <div className="w-5/6 h-0.5 bg-slate-100"></div>
          <div className="w-1/4 h-2 bg-slate-200 rounded-sm mt-1"></div>
          <div className="flex justify-between">
            <div className="w-1/3 h-1.5 bg-slate-600 rounded-sm"></div>
            <div className="w-1/4 h-1 bg-slate-300 rounded-sm"></div>
          </div>
          <div className="w-full h-0.5 bg-slate-100"></div>
          <div className="flex justify-between mt-1">
            <div className="w-1/3 h-1.5 bg-slate-600 rounded-sm"></div>
            <div className="w-1/4 h-1 bg-slate-300 rounded-sm"></div>
          </div>
          <div className="w-full h-0.5 bg-slate-100"></div>
        </div>
      );
    case 'ivy':
      return (
        <div className="w-full h-full bg-white flex flex-col items-center p-4 gap-1.5 border border-slate-100">
          <div className="w-3/4 h-4 bg-black rounded-sm mb-1"></div>
          <div className="w-1/2 h-1 bg-slate-300 rounded-sm mb-3"></div>
          <div className="w-1/4 h-2 bg-black rounded-sm border-b-2 border-black pb-1 mb-1"></div>
          <div className="w-full flex justify-between">
            <div className="w-1/3 h-1.5 bg-black rounded-sm"></div>
            <div className="w-1/5 h-1.5 bg-slate-600 rounded-sm"></div>
          </div>
          <div className="w-1/4 h-1 bg-slate-500 rounded-sm"></div>
          <div className="w-full h-1 bg-slate-200 rounded-sm mt-1"></div>
          <div className="w-full h-1 bg-slate-200 rounded-sm"></div>
          <div className="w-1/4 h-2 bg-black rounded-sm border-b-2 border-black pb-1 mt-2 mb-1"></div>
          <div className="w-full flex justify-between">
            <div className="w-2/5 h-1.5 bg-black rounded-sm"></div>
            <div className="w-1/5 h-1.5 bg-slate-600 rounded-sm"></div>
          </div>
          <div className="w-full h-1 bg-slate-200 rounded-sm mt-1"></div>
        </div>
      );
    default:
      return null;
  }
};

export default function TemplatesGallery() {
  const router = useRouter();
  const { setSelectedTemplate, selectedTemplate } = useCVStore();

  const handleSelect = (id: string) => {
    setSelectedTemplate(id);
    router.push('/editor');
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-red-200 selection:text-red-900 pb-12">
      <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex items-center shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => router.push('/')}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>
        <div className="flex-1 flex justify-center">
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">Select Template</h1>
        </div>
        <div className="w-24"></div> {/* spacer */}
      </header>

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pt-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Choose your layout</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            All templates are strictly ATS-friendly and export as high-quality PDFs. Select a starting point below — you can swap layouts at any time in the editor.
          </p>
        </div>

        {/* 3x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templatesList.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            
            return (
              <div
                key={tpl.id}
                onClick={() => handleSelect(tpl.id)}
                className={`
                  group relative flex flex-col bg-white rounded-2xl cursor-pointer transition-all duration-300 ease-out
                  ${isSelected ? 'ring-2 ring-red-500 shadow-md' : 'border border-slate-200 hover:border-red-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1'}
                `}
              >
                {/* Thumbnail container */}
                <div className="w-full h-48 sm:h-56 bg-slate-100 rounded-t-2xl p-4 overflow-hidden relative border-b border-slate-100">
                  <div className="w-full h-full shadow-sm rounded border border-slate-200/60 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                    <TemplateThumbnail id={tpl.id} />
                  </div>
                  
                  {/* Hover Overlay Button */}
                  <div className={`
                    absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 transition-opacity duration-300 rounded-t-2xl
                    ${isSelected ? '' : 'group-hover:opacity-100'}
                  `}>
                    <span className="px-6 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Use Template
                    </span>
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                      <CheckCircle2 size={14} /> Selected
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{tpl.name}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">
                    {tpl.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isSelected ? 'Currently Editing' : 'Select this layout'} →
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
