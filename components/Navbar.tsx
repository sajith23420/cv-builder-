"use client";

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

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

      <div className="flex items-center gap-4">
        {pathname === '/templates' && (
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <ArrowLeft size={16} /> Back
          </button>
        )}
        
        {pathname === '/editor' && (
          <Link 
            href="/templates"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors font-semibold text-sm px-4 py-2 rounded-lg hover:bg-white/10"
          >
            <LayoutTemplate size={16} /> Change Template
          </Link>
        )}
      </div>
    </header>
  );
}
