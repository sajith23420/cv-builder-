import React from 'react';

/* ─── Shared dummy data used across all thumbnails ─── */
const D = {
  name: 'Alex Carter',
  title: 'Senior Full Stack Engineer',
  email: 'alex.carter@protonmail.com',
  phone: '+1 (415) 928-7430',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alexcarter-dev',
  github: 'github.com/alexcarter',
  summary:
    'Results-driven Senior Full Stack Engineer with 7+ years of experience architecting scalable web applications across fintech, SaaS, and e-commerce domains.',
  skills: 'TypeScript, React, Next.js, Node.js, Python, Go, PostgreSQL, Docker, AWS, Kubernetes',
  exp1Title: 'Senior Full Stack Engineer',
  exp1Company: 'Meridian Technologies',
  exp1Dates: 'Jan 2022 – Present',
  exp1Bullet1: 'Architected migration to microservices on AWS ECS, reducing deploy times by 70%',
  exp1Bullet2: 'Built real-time analytics dashboard with Next.js 14, serving 15K concurrent users',
  exp2Title: 'Full Stack Developer',
  exp2Company: 'NovaPay (Fintech)',
  exp2Dates: 'Mar 2020 – Dec 2021',
  exp2Bullet1: 'Developed payment dashboard handling $4M+ monthly transaction volume',
  exp2Bullet2: 'Engineered GraphQL API gateway, reducing over-fetching by 60%',
  projName: 'InvoiceFlow — AI Invoice Platform',
  projStack: 'Next.js, Prisma, Stripe, OpenAI',
  projBullet: 'GPT-4 auto-extraction reducing manual data entry by 85%',
  edu: 'B.S. Computer Science',
  university: 'UC Berkeley',
  eduYear: '2018',
};

/* ─── Reusable micro-text helpers ─── */
const Dot = ({ className = 'bg-slate-300' }: { className?: string }) => (
  <span className={`inline-block w-[2px] h-[2px] rounded-full mx-[2px] ${className}`} />
);

/* ═══════════════════════════════════════════════════════
   1. MODERN MINIMALIST
   - Centered header, blue accent, clean sans-serif
   ═══════════════════════════════════════════════════════ */
export const ModernThumbnail = () => (
  <div className="w-full h-full bg-white flex flex-col" style={{ padding: '10px 12px 8px' }}>
    {/* Header */}
    <div className="text-center mb-[5px]">
      <div className="text-[7px] font-bold uppercase tracking-wide text-blue-800 leading-none">{D.name}</div>
      <div className="text-[4.5px] font-semibold text-slate-800 mt-[2px]">{D.title}</div>
      <div className="text-[3px] text-slate-500 mt-[2px] flex items-center justify-center gap-[2px] flex-wrap">
        <span>{D.email}</span><Dot /><span>{D.phone}</span><Dot /><span>{D.location}</span>
      </div>
    </div>

    {/* Summary */}
    <div className="mb-[4px]">
      <div className="text-[4px] font-bold uppercase text-blue-800 border-b border-blue-800 pb-[1px] mb-[2px] tracking-wide">Professional Summary</div>
      <div className="text-[3px] text-slate-600 leading-[1.4]">{D.summary}</div>
    </div>

    {/* Skills */}
    <div className="mb-[4px]">
      <div className="text-[4px] font-bold uppercase text-blue-800 border-b border-blue-800 pb-[1px] mb-[2px] tracking-wide">Technical Skills</div>
      <div className="text-[3px] text-slate-600 leading-[1.3]">
        <span className="font-semibold text-slate-800">Programming: </span>{D.skills}
      </div>
    </div>

    {/* Experience */}
    <div className="mb-[4px]">
      <div className="text-[4px] font-bold uppercase text-blue-800 border-b border-blue-800 pb-[1px] mb-[2px] tracking-wide">Professional Experience</div>
      {/* Job 1 */}
      <div className="mb-[3px]">
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-slate-800">{D.exp1Title} <span className="font-normal italic">| {D.exp1Company}</span></div>
          <div className="text-[2.5px] font-semibold text-slate-500">{D.exp1Dates}</div>
        </div>
        <div className="text-[2.8px] text-slate-600 ml-[4px] mt-[1px] leading-[1.4]">• {D.exp1Bullet1}</div>
        <div className="text-[2.8px] text-slate-600 ml-[4px] leading-[1.4]">• {D.exp1Bullet2}</div>
      </div>
      {/* Job 2 */}
      <div>
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-slate-800">{D.exp2Title} <span className="font-normal italic">| {D.exp2Company}</span></div>
          <div className="text-[2.5px] font-semibold text-slate-500">{D.exp2Dates}</div>
        </div>
        <div className="text-[2.8px] text-slate-600 ml-[4px] mt-[1px] leading-[1.4]">• {D.exp2Bullet1}</div>
        <div className="text-[2.8px] text-slate-600 ml-[4px] leading-[1.4]">• {D.exp2Bullet2}</div>
      </div>
    </div>

    {/* Education */}
    <div>
      <div className="text-[4px] font-bold uppercase text-blue-800 border-b border-blue-800 pb-[1px] mb-[2px] tracking-wide">Education</div>
      <div className="flex justify-between items-baseline">
        <div className="text-[3.5px] font-bold text-slate-800">{D.edu}</div>
        <div className="text-[2.5px] text-slate-500">{D.eduYear}</div>
      </div>
      <div className="text-[3px] italic text-slate-600">{D.university}</div>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════
   2. EXECUTIVE TRADITIONAL
   - Serif style, black on white, horizontal rules
   ═══════════════════════════════════════════════════════ */
export const ExecutiveThumbnail = () => (
  <div className="w-full h-full bg-white flex flex-col font-serif" style={{ padding: '10px 14px 8px' }}>
    {/* Header */}
    <div className="text-center mb-[5px]">
      <div className="text-[7px] font-bold uppercase tracking-[0.5px] text-black leading-none">{D.name}</div>
      <div className="text-[4.5px] italic text-neutral-600 mt-[2px]">{D.title}</div>
      <div className="text-[3px] text-black mt-[2px] flex items-center justify-center gap-[2px]">
        <span>{D.email}</span><Dot className="bg-black" /><span>{D.phone}</span><Dot className="bg-black" /><span>{D.location}</span>
      </div>
    </div>

    {/* Summary */}
    <div className="mb-[4px]">
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px]">Professional Summary</div>
      <div className="text-[3px] text-neutral-700 leading-[1.4]">{D.summary}</div>
    </div>

    {/* Experience */}
    <div className="mb-[4px]">
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px]">Professional Experience</div>
      <div className="mb-[3px]">
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-black">{D.exp1Title} <span className="font-normal italic">— {D.exp1Company}</span></div>
          <div className="text-[2.5px] text-black">{D.exp1Dates}</div>
        </div>
        <div className="text-[2.8px] text-neutral-700 ml-[4px] mt-[1px] leading-[1.4]">• {D.exp1Bullet1}</div>
        <div className="text-[2.8px] text-neutral-700 ml-[4px] leading-[1.4]">• {D.exp1Bullet2}</div>
      </div>
      <div>
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-black">{D.exp2Title} <span className="font-normal italic">— {D.exp2Company}</span></div>
          <div className="text-[2.5px] text-black">{D.exp2Dates}</div>
        </div>
        <div className="text-[2.8px] text-neutral-700 ml-[4px] mt-[1px] leading-[1.4]">• {D.exp2Bullet1}</div>
        <div className="text-[2.8px] text-neutral-700 ml-[4px] leading-[1.4]">• {D.exp2Bullet2}</div>
      </div>
    </div>

    {/* Skills */}
    <div className="mb-[4px]">
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px]">Core Competencies & Skills</div>
      <div className="text-[3px] text-neutral-700 leading-[1.3]">
        <span className="font-bold text-black">Programming: </span>{D.skills}
      </div>
    </div>

    {/* Education */}
    <div>
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px]">Education</div>
      <div className="flex justify-between items-baseline">
        <div className="text-[3.5px] font-bold text-black">{D.edu}</div>
        <div className="text-[2.5px] text-black">{D.eduYear}</div>
      </div>
      <div className="text-[3px] italic text-neutral-700">{D.university}</div>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════
   3. CREATIVE PROFESSIONAL
   - Two-column layout: slate sidebar + white main
   ═══════════════════════════════════════════════════════ */
export const CreativeThumbnail = () => (
  <div className="w-full h-full flex flex-row">
    {/* Sidebar */}
    <div className="flex flex-col bg-slate-600 text-white" style={{ width: '32%', padding: '8px 6px' }}>
      <div className="text-[5.5px] font-bold uppercase leading-tight mb-[1px]">{D.name}</div>
      <div className="text-[3px] italic text-slate-300 mb-[6px]">{D.title}</div>

      <div className="text-[3.5px] font-bold uppercase border-b border-slate-400 pb-[1px] mb-[3px]">Contact</div>
      <div className="text-[2.5px] text-slate-300 leading-[1.5] mb-[6px]">
        <div>{D.email}</div>
        <div>{D.phone}</div>
        <div>{D.location}</div>
        <div>{D.linkedin}</div>
      </div>

      <div className="text-[3.5px] font-bold uppercase border-b border-slate-400 pb-[1px] mb-[3px]">Skills</div>
      <div className="mb-[3px]">
        <div className="text-[2.8px] font-bold text-white">Programming</div>
        <div className="text-[2.5px] text-slate-300 leading-[1.4]">TypeScript, React, Next.js, Python, Go</div>
      </div>
      <div className="mb-[3px]">
        <div className="text-[2.8px] font-bold text-white">Databases</div>
        <div className="text-[2.5px] text-slate-300 leading-[1.4]">PostgreSQL, MongoDB, Redis</div>
      </div>
      <div className="mb-[3px]">
        <div className="text-[2.8px] font-bold text-white">Tools</div>
        <div className="text-[2.5px] text-slate-300 leading-[1.4]">Docker, AWS, Kubernetes, Vercel</div>
      </div>

      <div className="text-[3.5px] font-bold uppercase border-b border-slate-400 pb-[1px] mb-[3px] mt-[4px]">Education</div>
      <div className="text-[2.8px] font-bold text-white">{D.edu}</div>
      <div className="text-[2.5px] italic text-slate-300">{D.university}</div>
      <div className="text-[2.5px] text-slate-300">{D.eduYear}</div>
    </div>

    {/* Main Content */}
    <div className="flex-1 bg-white flex flex-col" style={{ padding: '8px 8px 8px 7px' }}>
      <div className="text-[4.5px] font-bold uppercase text-slate-600 mb-[3px]">Profile</div>
      <div className="text-[3px] text-slate-600 leading-[1.4] mb-[6px]">{D.summary}</div>

      <div className="text-[4.5px] font-bold uppercase text-slate-600 mb-[3px]">Experience</div>
      <div className="mb-[4px]">
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-slate-900">{D.exp1Title}</div>
          <div className="text-[2.5px] text-slate-500">{D.exp1Dates}</div>
        </div>
        <div className="text-[3px] italic text-slate-500">{D.exp1Company}</div>
        <div className="text-[2.8px] text-slate-600 ml-[3px] mt-[1px] leading-[1.4]">• {D.exp1Bullet1}</div>
        <div className="text-[2.8px] text-slate-600 ml-[3px] leading-[1.4]">• {D.exp1Bullet2}</div>
      </div>
      <div className="mb-[4px]">
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-slate-900">{D.exp2Title}</div>
          <div className="text-[2.5px] text-slate-500">{D.exp2Dates}</div>
        </div>
        <div className="text-[3px] italic text-slate-500">{D.exp2Company}</div>
        <div className="text-[2.8px] text-slate-600 ml-[3px] mt-[1px] leading-[1.4]">• {D.exp2Bullet1}</div>
        <div className="text-[2.8px] text-slate-600 ml-[3px] leading-[1.4]">• {D.exp2Bullet2}</div>
      </div>

      <div className="text-[4.5px] font-bold uppercase text-slate-600 mb-[3px]">Projects</div>
      <div>
        <div className="text-[3.5px] font-bold text-slate-900">{D.projName}</div>
        <div className="text-[2.5px] italic text-slate-500">{D.projStack}</div>
        <div className="text-[2.8px] text-slate-600 ml-[3px] mt-[1px] leading-[1.4]">• {D.projBullet}</div>
      </div>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════
   4. TECH FOCUSED
   - Monospace accents, dark section title boxes, indigo accent
   ═══════════════════════════════════════════════════════ */
export const TechThumbnail = () => (
  <div className="w-full h-full bg-white flex flex-col" style={{ padding: '10px 10px 8px' }}>
    {/* Header */}
    <div className="flex justify-between items-start border-b-2 border-slate-800 pb-[4px] mb-[5px]">
      <div>
        <div className="text-[7px] font-bold uppercase text-slate-800 leading-none">{D.name}</div>
        <div className="text-[4px] font-bold text-blue-600 font-mono mt-[2px]">&gt; {D.title}</div>
      </div>
      <div className="text-right text-[2.5px] text-slate-500 font-mono leading-[1.6]">
        <div>gh: {D.github}</div>
        <div>em: {D.email}</div>
        <div>ph: {D.phone}</div>
        <div>lo: {D.location}</div>
      </div>
    </div>

    {/* ~/profile */}
    <div className="mb-[4px]">
      <div className="bg-slate-800 px-[3px] py-[1px] mb-[2px]">
        <span className="text-[3.5px] font-bold text-white font-mono uppercase tracking-wider">~/profile</span>
      </div>
      <div className="text-[3px] text-slate-600 leading-[1.4]">{D.summary}</div>
    </div>

    {/* ~/skills */}
    <div className="mb-[4px]">
      <div className="bg-slate-800 px-[3px] py-[1px] mb-[2px]">
        <span className="text-[3.5px] font-bold text-white font-mono uppercase tracking-wider">~/skills</span>
      </div>
      <div className="flex flex-wrap gap-[2px]">
        {['TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'Go', 'PostgreSQL', 'Docker', 'AWS'].map(s => (
          <span key={s} className="text-[2.5px] font-mono text-slate-800 bg-slate-50 border border-slate-200 px-[2px] py-[0.5px] rounded-[1px]">{s}</span>
        ))}
      </div>
    </div>

    {/* ~/experience */}
    <div className="mb-[4px]">
      <div className="bg-slate-800 px-[3px] py-[1px] mb-[2px]">
        <span className="text-[3.5px] font-bold text-white font-mono uppercase tracking-wider">~/experience</span>
      </div>
      <div className="mb-[3px]">
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-slate-800">{D.exp1Title} <span className="font-normal text-slate-500">@ {D.exp1Company}</span></div>
          <div className="text-[2.5px] font-mono text-blue-600">[{D.exp1Dates}]</div>
        </div>
        <div className="text-[2.8px] text-slate-600 ml-[4px] mt-[1px] leading-[1.4]">• {D.exp1Bullet1}</div>
        <div className="text-[2.8px] text-slate-600 ml-[4px] leading-[1.4]">• {D.exp1Bullet2}</div>
      </div>
      <div>
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px] font-bold text-slate-800">{D.exp2Title} <span className="font-normal text-slate-500">@ {D.exp2Company}</span></div>
          <div className="text-[2.5px] font-mono text-blue-600">[{D.exp2Dates}]</div>
        </div>
        <div className="text-[2.8px] text-slate-600 ml-[4px] mt-[1px] leading-[1.4]">• {D.exp2Bullet1}</div>
      </div>
    </div>

    {/* ~/education */}
    <div>
      <div className="bg-slate-800 px-[3px] py-[1px] mb-[2px]">
        <span className="text-[3.5px] font-bold text-white font-mono uppercase tracking-wider">~/education</span>
      </div>
      <div className="flex justify-between items-baseline">
        <div className="text-[3.5px] font-bold text-slate-800">{D.edu}</div>
        <div className="text-[2.5px] font-mono text-blue-600">[{D.eduYear}]</div>
      </div>
      <div className="text-[3px] text-slate-500">{D.university}</div>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════
   5. DATA-DENSE
   - Compact layout, grey section header bars, smaller fonts
   ═══════════════════════════════════════════════════════ */
export const DenseThumbnail = () => (
  <div className="w-full h-full bg-white flex flex-col" style={{ padding: '7px 8px 6px' }}>
    {/* Header */}
    <div className="border-b border-slate-300 pb-[3px] mb-[3px]">
      <div className="text-[6px] font-bold uppercase text-slate-900 leading-none">{D.name}</div>
      <div className="text-[3.5px] font-semibold text-slate-600 mt-[1px]">{D.title}</div>
      <div className="text-[2.5px] text-slate-500 mt-[1px] flex items-center gap-[2px]">
        <span>{D.email}</span><Dot /><span>{D.phone}</span><Dot /><span>{D.location}</span><Dot /><span>{D.linkedin}</span>
      </div>
    </div>

    {/* Summary */}
    <div className="mb-[3px]">
      <div className="text-[3.5px] font-bold uppercase text-slate-900 bg-slate-100 border-b border-slate-200 pl-[2px] py-[0.5px] mb-[1.5px]">Summary</div>
      <div className="text-[2.5px] text-slate-600 leading-[1.3]">{D.summary}</div>
    </div>

    {/* Skills */}
    <div className="mb-[3px]">
      <div className="text-[3.5px] font-bold uppercase text-slate-900 bg-slate-100 border-b border-slate-200 pl-[2px] py-[0.5px] mb-[1.5px]">Skills</div>
      <div className="text-[2.5px] text-slate-600 leading-[1.3]">
        <span className="font-bold text-slate-800">Programming: </span>{D.skills}
      </div>
    </div>

    {/* Experience */}
    <div className="mb-[3px]">
      <div className="text-[3.5px] font-bold uppercase text-slate-900 bg-slate-100 border-b border-slate-200 pl-[2px] py-[0.5px] mb-[1.5px]">Experience</div>
      <div className="mb-[2px]">
        <div className="flex justify-between items-baseline">
          <div className="text-[3px] font-bold text-slate-900">{D.exp1Title} <span className="font-normal italic">| {D.exp1Company}</span></div>
          <div className="text-[2px] font-semibold text-slate-500">{D.exp1Dates}</div>
        </div>
        <div className="text-[2.3px] text-slate-600 ml-[3px] mt-[0.5px] leading-[1.3]">• {D.exp1Bullet1}</div>
        <div className="text-[2.3px] text-slate-600 ml-[3px] leading-[1.3]">• {D.exp1Bullet2}</div>
      </div>
      <div>
        <div className="flex justify-between items-baseline">
          <div className="text-[3px] font-bold text-slate-900">{D.exp2Title} <span className="font-normal italic">| {D.exp2Company}</span></div>
          <div className="text-[2px] font-semibold text-slate-500">{D.exp2Dates}</div>
        </div>
        <div className="text-[2.3px] text-slate-600 ml-[3px] mt-[0.5px] leading-[1.3]">• {D.exp2Bullet1}</div>
        <div className="text-[2.3px] text-slate-600 ml-[3px] leading-[1.3]">• {D.exp2Bullet2}</div>
      </div>
    </div>

    {/* Projects */}
    <div className="mb-[3px]">
      <div className="text-[3.5px] font-bold uppercase text-slate-900 bg-slate-100 border-b border-slate-200 pl-[2px] py-[0.5px] mb-[1.5px]">Projects</div>
      <div className="flex justify-between items-baseline">
        <div className="text-[3px] font-bold text-slate-900">{D.projName}</div>
      </div>
      <div className="text-[2.3px] italic text-slate-500">Stack: {D.projStack}</div>
      <div className="text-[2.3px] text-slate-600 ml-[3px] mt-[0.5px] leading-[1.3]">• {D.projBullet}</div>
    </div>

    {/* Education */}
    <div>
      <div className="text-[3.5px] font-bold uppercase text-slate-900 bg-slate-100 border-b border-slate-200 pl-[2px] py-[0.5px] mb-[1.5px]">Education</div>
      <div className="flex justify-between items-baseline">
        <div className="text-[3px] font-bold text-slate-900">{D.edu} - {D.university}</div>
        <div className="text-[2px] font-semibold text-slate-500">{D.eduYear}</div>
      </div>
    </div>
  </div>
);


/* ═══════════════════════════════════════════════════════
   6. IVY LEAGUE / ATS RESUME
   - Centered serif, Education first, strong rules, letterSpacing
   ═══════════════════════════════════════════════════════ */
export const IvyThumbnail = () => (
  <div className="w-full h-full bg-white flex flex-col font-serif" style={{ padding: '12px 14px 8px' }}>
    {/* Header */}
    <div className="text-center mb-[6px]">
      <div className="text-[6.5px] font-bold uppercase tracking-[0.5px] text-black leading-none">{D.name}</div>
      <div className="text-[3px] text-black mt-[3px] flex items-center justify-center gap-[2px]">
        <span>{D.location}</span><Dot className="bg-black" /><span>{D.phone}</span><Dot className="bg-black" /><span>{D.email}</span><Dot className="bg-black" /><span>{D.linkedin}</span>
      </div>
    </div>

    {/* Education (first in Ivy format) */}
    <div className="mb-[5px]">
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px] tracking-[0.3px]">Education</div>
      <div className="flex justify-between items-baseline">
        <div className="text-[3.5px] font-bold text-black">{D.university}</div>
        <div className="text-[2.5px] text-black">{D.eduYear}</div>
      </div>
      <div className="text-[3px] italic text-black">{D.edu}</div>
      <div className="text-[2.5px] text-neutral-600 mt-[0.5px]">Relevant Coursework: Data Structures, Distributed Systems, Machine Learning</div>
    </div>

    {/* Experience */}
    <div className="mb-[5px]">
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px] tracking-[0.3px]">Experience</div>
      <div className="mb-[3px]">
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px]">
            <span className="font-bold text-black">{D.exp1Company}</span>
            <span className="text-black mx-[2px]">—</span>
            <span className="italic text-black">{D.exp1Title}</span>
          </div>
          <div className="text-[2.5px] text-black">{D.exp1Dates}</div>
        </div>
        <div className="text-[2.8px] text-black ml-[5px] mt-[1px] leading-[1.4]">• {D.exp1Bullet1}</div>
        <div className="text-[2.8px] text-black ml-[5px] leading-[1.4]">• {D.exp1Bullet2}</div>
      </div>
      <div>
        <div className="flex justify-between items-baseline">
          <div className="text-[3.5px]">
            <span className="font-bold text-black">{D.exp2Company}</span>
            <span className="text-black mx-[2px]">—</span>
            <span className="italic text-black">{D.exp2Title}</span>
          </div>
          <div className="text-[2.5px] text-black">{D.exp2Dates}</div>
        </div>
        <div className="text-[2.8px] text-black ml-[5px] mt-[1px] leading-[1.4]">• {D.exp2Bullet1}</div>
        <div className="text-[2.8px] text-black ml-[5px] leading-[1.4]">• {D.exp2Bullet2}</div>
      </div>
    </div>

    {/* Projects */}
    <div className="mb-[5px]">
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px] tracking-[0.3px]">Projects</div>
      <div className="flex justify-between items-baseline">
        <div className="text-[3.5px]">
          <span className="font-bold text-black">{D.projName}</span>
          <span className="text-[2.5px] italic text-neutral-600 ml-[2px]">({D.projStack})</span>
        </div>
      </div>
      <div className="text-[2.8px] text-black ml-[5px] mt-[1px] leading-[1.4]">• {D.projBullet}</div>
    </div>

    {/* Skills */}
    <div>
      <div className="text-[4px] font-bold uppercase text-black border-b border-black pb-[1px] mb-[2px] tracking-[0.3px]">Skills & Interests</div>
      <div className="text-[3px] text-black leading-[1.3]">
        <span className="font-bold">Programming: </span>{D.skills}
      </div>
    </div>
  </div>
);
