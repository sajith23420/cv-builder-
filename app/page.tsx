"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Plus, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { useCVParser } from '@/hooks/useCVParser';
import { motion, Variants } from 'framer-motion';

const FloatingCV = () => (
  <motion.div 
    animate={{ y: [-15, 15, -15], rotate: [-2, 2, -2] }}
    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    className="relative w-[320px] h-[420px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(37,99,235,0.15)] p-6 hidden lg:flex flex-col gap-4 transform rotate-3"
  >
    {/* Floating Elements / Mock Resume content */}
    <div className="flex items-center gap-4 border-b border-white/10 pb-4">
      <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 opacity-80" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="w-3/4 h-3 rounded-full bg-white/20" />
        <div className="w-1/2 h-2 rounded-full bg-white/10" />
      </div>
    </div>
    
    <div className="w-full h-2 rounded-full bg-white/10 mt-2" />
    <div className="w-5/6 h-2 rounded-full bg-white/10" />
    <div className="w-4/6 h-2 rounded-full bg-white/10 mb-4" />
    
    <div className="flex gap-4">
      <div className="w-1/3 h-24 rounded-xl bg-white/5 border border-white/5" />
      <div className="flex-1 flex flex-col gap-3">
        <div className="w-full h-2 rounded-full bg-white/10" />
        <div className="w-full h-2 rounded-full bg-white/10" />
        <div className="w-4/5 h-2 rounded-full bg-white/10" />
      </div>
    </div>

    <div className="mt-auto grid grid-cols-2 gap-3">
      <div className="h-6 rounded-lg bg-blue-500/20 border border-blue-500/20" />
      <div className="h-6 rounded-lg bg-purple-500/20 border border-purple-500/20" />
      <div className="h-6 rounded-lg bg-red-500/20 border border-red-500/20" />
    </div>

    {/* Decorative glow behind the CV */}
    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-2xl opacity-20 -z-10" />
  </motion.div>
);

export default function LandingPage() {
  const router = useRouter();
  
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

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 80, damping: 20 } }
  };

  return (
    <main className="flex flex-col relative w-full h-full">

      <div className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 relative z-10 pb-20 pt-10">
        
        {/* Left Column: Text & CTA */}
        <div className="flex-1 flex flex-col w-full">
          <motion.div 
            variants={containerVariants} 
            initial="hidden" 
            animate="visible"
            className="flex flex-col gap-6"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md w-fit text-blue-300 text-xs sm:text-sm font-medium shadow-[0_0_15px_rgba(59,130,246,0.15)]">
              <Sparkles size={16} className="text-blue-400" />
              <span>AI-Powered & ATS-Optimized</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-white drop-shadow-sm">
              Craft Your Perfect <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-red-400">ATS-Friendly</span> CV <br className="hidden sm:block" />
              in Minutes
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl font-light">
              Unlock your career potential with our intelligent resume builder. Upload your existing CV or start from scratch with beautiful, premium templates.
            </motion.p>
            
            {/* CTA Cards */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 mt-8 w-full max-w-2xl">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleInputChange}
                className="hidden"
              />

              {/* Upload Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={status === 'parsing' ? undefined : triggerUpload}
                className={`
                  flex-1 flex flex-col p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden group
                  ${status === 'parsing' ? 'cursor-wait bg-white/5' : 'cursor-pointer bg-white/5 hover:bg-white/10'}
                `}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {status === 'parsing' ? (
                  <div className="flex flex-col items-center justify-center h-full gap-3 relative z-10 py-2">
                    <Loader2 className="animate-spin text-blue-400" size={32} />
                    <p className="text-white font-medium text-sm">AI is analyzing...</p>
                    <p className="text-slate-400 text-xs truncate w-full text-center px-4">{fileName}</p>
                  </div>
                ) : (
                  <div className="flex flex-col h-full relative z-10">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-5 shadow-inner border border-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
                      <Upload size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">Import Resume</h3>
                    <p className="text-slate-400 text-sm mb-6 flex-1 font-light">
                      Let AI extract details from your existing PDF or DOCX file instantly.
                    </p>
                    <div className="flex items-center gap-2 text-blue-400 font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
                      Upload File <ArrowRight size={16} />
                    </div>
                    {errorMessage && (
                      <p className="text-red-400 text-xs mt-3 font-medium">{errorMessage}</p>
                    )}
                  </div>
                )}
              </motion.div>

              {/* Start from Scratch Card */}
              <motion.div 
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartFromScratch}
                className="flex-1 flex flex-col p-6 rounded-2xl backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative overflow-hidden group cursor-pointer bg-white/5 hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex flex-col h-full relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center mb-5 shadow-inner border border-red-500/20 group-hover:bg-red-500/30 transition-colors">
                    <Plus size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Start from Scratch</h3>
                  <p className="text-slate-400 text-sm mb-6 flex-1 font-light">
                    Build a perfect resume step-by-step with our elegant, optimized templates.
                  </p>
                  <div className="flex items-center gap-2 text-red-400 font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
                    Browse Templates <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            </motion.div>

          </motion.div>
        </div>

        {/* Right Column: Floating Representation */}
        <div className="flex-1 flex justify-center lg:justify-end w-full lg:w-auto">
          <FloatingCV />
        </div>

      </div>
    </main>
  );
}
