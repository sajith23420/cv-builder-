"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useCVStore } from '@/store/useCVStore';
import { CheckCircle2 } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import {
  ModernThumbnail,
  CreativeThumbnail,
  TechThumbnail,
  DenseThumbnail,
  IvyThumbnail,
} from '@/components/TemplateThumbnails';

const templatesList = [
  {
    id: 'modern',
    name: 'Modern Minimalist',
    description: 'Clean sans-serif, single column, ample whitespace. Perfect for a sleek, modern look.',
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

const thumbnailMap: Record<string, React.FC> = {
  modern: ModernThumbnail,
  creative: CreativeThumbnail,
  tech: TechThumbnail,
  dense: DenseThumbnail,
  ivy: IvyThumbnail,
};

// Helper to render the mini-replica thumbnails
const TemplateThumbnail = ({ id }: { id: string }) => {
  const Component = thumbnailMap[id];
  return Component ? <Component /> : null;
};

export default function TemplatesGallery() {
  const router = useRouter();
  const { setSelectedTemplate, selectedTemplate } = useCVStore();

  const handleSelect = (id: string) => {
    setSelectedTemplate(id);
    router.push('/editor');
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <main className="flex-1 w-full flex flex-col font-sans pb-12 pt-8">
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight drop-shadow-sm">
            Choose your layout
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base font-light">
            All templates are strictly ATS-friendly and export as high-quality PDFs. Select a starting point below — you can swap layouts at any time in the editor.
          </p>
        </motion.div>

        {/* Grid Layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {templatesList.map((tpl) => {
            const isSelected = selectedTemplate === tpl.id;
            
            return (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                key={tpl.id}
                onClick={() => handleSelect(tpl.id)}
                className={`
                  group relative flex flex-col rounded-3xl cursor-pointer transition-all duration-300 ease-out overflow-hidden
                  backdrop-blur-xl border shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                  ${isSelected ? 'bg-white/10 border-blue-400 ring-2 ring-blue-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}
                `}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Thumbnail container */}
                <div className="w-full bg-slate-900/40 p-4 relative border-b border-white/10 z-10">
                  <div className="w-full aspect-[210/297] shadow-lg rounded border border-white/5 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500 bg-white">
                    <TemplateThumbnail id={tpl.id} />
                  </div>
                  
                  {/* Hover Overlay Button */}
                  <div className={`
                    absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center opacity-0 transition-opacity duration-300
                    ${isSelected ? '' : 'group-hover:opacity-100'}
                  `}>
                    <span className="px-6 py-2.5 bg-white text-slate-900 font-bold text-sm rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      Use Template
                    </span>
                  </div>

                  {/* Selected Badge */}
                  {isSelected && (
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                      <CheckCircle2 size={14} /> Selected
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 relative z-10">
                  <h3 className="text-lg font-bold text-white mb-2">{tpl.name}</h3>
                  <p className="text-sm text-slate-400 font-light leading-relaxed mb-4 flex-1">
                    {tpl.description}
                  </p>
                  
                  <div className={`flex items-center text-sm font-semibold transition-opacity duration-300 ${isSelected ? 'text-blue-400 opacity-100' : 'text-slate-300 opacity-0 group-hover:opacity-100'}`}>
                    {isSelected ? 'Currently Editing' : 'Select this layout'} →
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
