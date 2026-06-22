"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCVStore } from '@/store/useCVStore';
import { 
  User, FileText, Briefcase, 
  Code, GraduationCap, Plus, Trash2,
  ChevronDown, ChevronUp,
  Award, Users
} from 'lucide-react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-32 bg-black/20 border border-white/10 animate-pulse rounded-xl"></div> 
});

export default function CVForm() {
  const { 
    cvData, setPersonalInfo, setProfessionalSummaryHtml, setTechnicalSkills,
    addProfessionalExperience, updateProfessionalExperience, removeProfessionalExperience,
    addProjectExperience, updateProjectExperience, removeProjectExperience,
    addEducation, updateEducation, removeEducation,
    setCertifications,
    addReference, updateReference, removeReference,
    toggleSectionVisibility
  } = useCVStore();

  const [expandedSection, setExpandedSection] = useState<string | null>('personal');

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  }), []);



  const SectionHeader = ({ id, icon: Icon, title, sectionKey }: { id: string, icon: any, title: string, sectionKey?: keyof typeof cvData.visibleSections }) => {
    const isVisible = sectionKey ? cvData.visibleSections[sectionKey] : true;
    
    return (
      <div className={`w-full flex items-center justify-between p-5 bg-white/5 backdrop-blur-md border ${isVisible ? 'border-white/10 hover:border-blue-400/50 hover:bg-white/10 shadow-lg' : 'border-white/5 opacity-60'} rounded-2xl transition-all duration-300 group`}>
        <button 
          onClick={() => toggleSection(id)}
          className="flex-1 flex items-center gap-4 text-left"
        >
          <div className={`p-2.5 rounded-xl transition-colors ${expandedSection === id ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-300'}`}>
            <Icon size={20} />
          </div>
          <h3 className={`text-lg font-bold tracking-tight transition-colors ${isVisible ? 'text-white' : 'text-slate-500'}`}>{title}</h3>
        </button>
        
        <div className="flex items-center gap-3">
          {sectionKey && (
            <button 
              onClick={(e) => { e.stopPropagation(); toggleSectionVisibility(sectionKey); }}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${isVisible ? 'text-slate-400 bg-white/5 hover:bg-white/10' : 'text-blue-400 bg-blue-500/10 hover:bg-blue-500/20'}`}
            >
              {isVisible ? 'Hide' : 'Show'}
            </button>
          )}
          <button onClick={() => toggleSection(id)} className="p-1 focus:outline-none hover:bg-white/10 rounded-lg transition-colors">
            {expandedSection === id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
          </button>
        </div>
      </div>
    );
  };

  const inputClasses = "w-full px-4 py-2.5 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-slate-500 transition-all shadow-inner";
  const labelClasses = "block text-sm font-semibold text-slate-300 mb-1.5";
  const panelClasses = "p-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl mt-3 animate-in slide-in-from-top-2 duration-300";
  const itemCardClasses = "p-5 bg-black/20 border border-white/5 rounded-xl relative group shadow-inner";
  const quillClasses = "bg-black/20 border border-white/10 rounded-xl overflow-hidden [&_.ql-toolbar]:bg-white/5 [&_.ql-toolbar]:border-b [&_.ql-toolbar]:border-white/10 [&_.ql-toolbar_button]:text-slate-300 [&_.ql-container]:text-white [&_.ql-container]:text-base [&_.ql-container]:border-none shadow-inner";

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">

      {/* Personal Info Section */}
      <div className="space-y-4">
        <SectionHeader id="personal" icon={User} title="Your Personal Details" />
        {expandedSection === 'personal' && (
          <div className={`${panelClasses} grid grid-cols-1 md:grid-cols-2 gap-5`}>
            <div>
              <label className={labelClasses}>Enter your full name</label>
              <input type="text" value={cvData.personalInfo.fullName} onChange={(e) => setPersonalInfo({ fullName: e.target.value })} className={inputClasses} placeholder="e.g. Jane Doe" />
            </div>
            <div>
              <label className={labelClasses}>Enter your professional title</label>
              <input type="text" value={cvData.personalInfo.title} onChange={(e) => setPersonalInfo({ title: e.target.value })} className={inputClasses} placeholder="e.g. Senior Software Engineer" />
            </div>
            <div>
              <label className={labelClasses}>Enter your email address</label>
              <input type="email" value={cvData.personalInfo.email} onChange={(e) => setPersonalInfo({ email: e.target.value })} className={inputClasses} placeholder="e.g. you@example.com" />
            </div>
            <div>
              <label className={labelClasses}>Enter your phone number</label>
              <input type="text" value={cvData.personalInfo.phone} onChange={(e) => setPersonalInfo({ phone: e.target.value })} className={inputClasses} placeholder="e.g. +1 234 567 890" />
            </div>
            <div>
              <label className={labelClasses}>Enter your location</label>
              <input type="text" value={cvData.personalInfo.location} onChange={(e) => setPersonalInfo({ location: e.target.value })} className={inputClasses} placeholder="e.g. New York, NY" />
            </div>
            <div>
              <label className={labelClasses}>Enter your LinkedIn URL</label>
              <input type="text" value={cvData.personalInfo.linkedin} onChange={(e) => setPersonalInfo({ linkedin: e.target.value })} className={inputClasses} placeholder="e.g. linkedin.com/in/janedoe" />
            </div>
            <div className="md:col-span-2">
              <label className={labelClasses}>Enter your GitHub or Portfolio URL</label>
              <input type="text" value={cvData.personalInfo.github} onChange={(e) => setPersonalInfo({ github: e.target.value })} className={inputClasses} placeholder="e.g. github.com/janedoe" />
            </div>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <SectionHeader id="summary" icon={FileText} title="Your Professional Summary" sectionKey="summary" />
        {expandedSection === 'summary' && (
          <div className={panelClasses}>
            <label className={labelClasses}>Write your professional summary</label>
            <div className={quillClasses}>
              <ReactQuill 
                theme="snow" 
                value={cvData.professionalSummaryHtml} 
                onChange={setProfessionalSummaryHtml} 
                modules={quillModules}
              />
            </div>
          </div>
        )}
      </div>

      {/* Technical Skills Section */}
      <div className="space-y-4">
        <SectionHeader id="skills" icon={Code} title="Your Technical Skills" sectionKey="skills" />
        {expandedSection === 'skills' && (
          <div className={`${panelClasses} space-y-5`}>
            <p className="text-sm text-slate-400 mb-2 font-light">Separate your skills with commas.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className={labelClasses}>Programming Languages</label>
                <input type="text" value={cvData.technicalSkills.programming.join(', ')} onChange={(e) => setTechnicalSkills({ programming: e.target.value.split(',').map(s => s.trimStart()) })} className={inputClasses} placeholder="e.g. JavaScript, Python, Java" />
              </div>
              <div>
                <label className={labelClasses}>Databases & SQL</label>
                <input type="text" value={cvData.technicalSkills.databaseSQL.join(', ')} onChange={(e) => setTechnicalSkills({ databaseSQL: e.target.value.split(',').map(s => s.trimStart()) })} className={inputClasses} placeholder="e.g. PostgreSQL, MongoDB" />
              </div>
              <div>
                <label className={labelClasses}>API & Testing</label>
                <input type="text" value={cvData.technicalSkills.apiIntegrationTesting.join(', ')} onChange={(e) => setTechnicalSkills({ apiIntegrationTesting: e.target.value.split(',').map(s => s.trimStart()) })} className={inputClasses} placeholder="e.g. REST, GraphQL, Jest" />
              </div>
              <div>
                <label className={labelClasses}>System Testing & QA</label>
                <input type="text" value={cvData.technicalSkills.systemTestingQA.join(', ')} onChange={(e) => setTechnicalSkills({ systemTestingQA: e.target.value.split(',').map(s => s.trimStart()) })} className={inputClasses} placeholder="e.g. Selenium, Cypress" />
              </div>
              <div>
                <label className={labelClasses}>Tools</label>
                <input type="text" value={cvData.technicalSkills.tools.join(', ')} onChange={(e) => setTechnicalSkills({ tools: e.target.value.split(',').map(s => s.trimStart()) })} className={inputClasses} placeholder="e.g. Git, Docker, AWS" />
              </div>
              <div>
                <label className={labelClasses}>Consulting & Business</label>
                <input type="text" value={cvData.technicalSkills.consultingBusiness.join(', ')} onChange={(e) => setTechnicalSkills({ consultingBusiness: e.target.value.split(',').map(s => s.trimStart()) })} className={inputClasses} placeholder="e.g. Agile, Scrum, Leadership" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Professional Experience Section */}
      <div className="space-y-4">
        <SectionHeader id="experience" icon={Briefcase} title="Your Professional Experience" sectionKey="experience" />
        {expandedSection === 'experience' && (
          <div className={`${panelClasses} space-y-6`}>
            {cvData.professionalExperience.map((exp) => (
              <div key={exp.id} className={itemCardClasses}>
                <button onClick={() => removeProfessionalExperience(exp.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg shadow-sm border border-white/5">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                  <div>
                    <label className={labelClasses}>Your job title</label>
                    <input type="text" value={exp.title} onChange={(e) => updateProfessionalExperience(exp.id, { title: e.target.value })} className={inputClasses} placeholder="e.g. Software Engineer" />
                  </div>
                  <div>
                    <label className={labelClasses}>Your company</label>
                    <input type="text" value={exp.company} onChange={(e) => updateProfessionalExperience(exp.id, { company: e.target.value })} className={inputClasses} placeholder="e.g. Tech Corp Inc." />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Dates of employment</label>
                    <input type="text" value={exp.dates} onChange={(e) => updateProfessionalExperience(exp.id, { dates: e.target.value })} className={inputClasses} placeholder="e.g. Jan 2020 - Present" />
                  </div>
                </div>
                
                {/* Rich Text Editor for Description */}
                <div>
                  <label className={labelClasses}>Add your achievements (Use bullet points for ATS)</label>
                  <div className={quillClasses}>
                    <ReactQuill 
                      theme="snow" 
                      value={exp.descriptionHtml} 
                      onChange={(html) => updateProfessionalExperience(exp.id, { descriptionHtml: html })} 
                      modules={quillModules}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addProfessionalExperience({ id: crypto.randomUUID(), title: '', company: '', dates: '', descriptionHtml: '' })}
              className="w-full py-4 border-2 border-dashed border-white/20 text-slate-300 font-semibold rounded-xl hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={20} /> Add New Experience
            </button>
          </div>
        )}
      </div>

      {/* Project Experience Section */}
      <div className="space-y-4">
        <SectionHeader id="projects" icon={Code} title="Your Projects" sectionKey="projects" />
        {expandedSection === 'projects' && (
          <div className={`${panelClasses} space-y-6`}>
            {cvData.projectExperience.map((proj) => (
              <div key={proj.id} className={itemCardClasses}>
                <button onClick={() => removeProjectExperience(proj.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg shadow-sm border border-white/5">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                  <div>
                    <label className={labelClasses}>Your project name</label>
                    <input type="text" value={proj.projectName} onChange={(e) => updateProjectExperience(proj.id, { projectName: e.target.value })} className={inputClasses} placeholder="e.g. E-Commerce Platform" />
                  </div>
                  <div>
                    <label className={labelClasses}>Tech stack used</label>
                    <input type="text" value={proj.techStack} onChange={(e) => updateProjectExperience(proj.id, { techStack: e.target.value })} className={inputClasses} placeholder="e.g. React, Node.js, MongoDB" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Project dates</label>
                    <input type="text" value={proj.dates} onChange={(e) => updateProjectExperience(proj.id, { dates: e.target.value })} className={inputClasses} placeholder="e.g. Jan 2022 - Mar 2022" />
                  </div>
                </div>
                
                {/* Rich Text Editor */}
                <div>
                  <label className={labelClasses}>Add project details</label>
                  <div className={quillClasses}>
                    <ReactQuill 
                      theme="snow" 
                      value={proj.descriptionHtml} 
                      onChange={(html) => updateProjectExperience(proj.id, { descriptionHtml: html })} 
                      modules={quillModules}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addProjectExperience({ id: crypto.randomUUID(), projectName: '', techStack: '', dates: '', descriptionHtml: '' })}
              className="w-full py-4 border-2 border-dashed border-white/20 text-slate-300 font-semibold rounded-xl hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={20} /> Add New Project
            </button>
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <SectionHeader id="education" icon={GraduationCap} title="Your Education" sectionKey="education" />
        {expandedSection === 'education' && (
          <div className={`${panelClasses} space-y-6`}>
            {cvData.education.map((edu) => (
              <div key={edu.id} className={itemCardClasses}>
                <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg shadow-sm border border-white/5">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                  <div>
                    <label className={labelClasses}>Your degree</label>
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} className={inputClasses} placeholder="e.g. B.S. Computer Science" />
                  </div>
                  <div>
                    <label className={labelClasses}>Your university/institution</label>
                    <input type="text" value={edu.university} onChange={(e) => updateEducation(edu.id, { university: e.target.value })} className={inputClasses} placeholder="e.g. Tech University" />
                  </div>
                  <div>
                    <label className={labelClasses}>Expected/Graduation year</label>
                    <input type="text" value={edu.expectedYear} onChange={(e) => updateEducation(edu.id, { expectedYear: e.target.value })} className={inputClasses} placeholder="e.g. May 2024" />
                  </div>
                  <div>
                    <label className={labelClasses}>Relevant study areas (optional)</label>
                    <input type="text" value={edu.relevantAreas} onChange={(e) => updateEducation(edu.id, { relevantAreas: e.target.value })} className={inputClasses} placeholder="e.g. Machine Learning, Data Structures" />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addEducation({ id: crypto.randomUUID(), degree: '', university: '', expectedYear: '', relevantAreas: '' })}
              className="w-full py-4 border-2 border-dashed border-white/20 text-slate-300 font-semibold rounded-xl hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={20} /> Add New Education
            </button>
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div className="space-y-4">
        <SectionHeader id="certifications" icon={Award} title="Your Certifications" sectionKey="certifications" />
        {expandedSection === 'certifications' && (
          <div className={panelClasses}>
            <p className="text-sm text-slate-400 font-light mb-4">Add your certifications or training courses. Separate them with commas, or type them out.</p>
            <label className={labelClasses}>Certifications (comma separated)</label>
            <input 
              type="text" 
              value={cvData.certifications?.join(', ') || ''} 
              onChange={(e) => setCertifications(e.target.value.split(',').map(s => s.trimStart()).filter(s => s))} 
              className={inputClasses} 
              placeholder="e.g. AWS Certified Solutions Architect, PMP Certification" 
            />
          </div>
        )}
      </div>

      {/* References Section */}
      <div className="space-y-4">
        <SectionHeader id="references" icon={Users} title="Your References" sectionKey="references" />
        {expandedSection === 'references' && (
          <div className={`${panelClasses} space-y-6`}>
            {(cvData.references || []).map((ref) => (
              <div key={ref.id} className={itemCardClasses}>
                <button onClick={() => removeReference(ref.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400 transition-colors bg-white/5 hover:bg-white/10 p-2 rounded-lg shadow-sm border border-white/5">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                  <div>
                    <label className={labelClasses}>Reference Name</label>
                    <input type="text" value={ref.name} onChange={(e) => updateReference(ref.id, { name: e.target.value })} className={inputClasses} placeholder="e.g. John Smith" />
                  </div>
                  <div>
                    <label className={labelClasses}>Job Title</label>
                    <input type="text" value={ref.title} onChange={(e) => updateReference(ref.id, { title: e.target.value })} className={inputClasses} placeholder="e.g. Director of Engineering" />
                  </div>
                  <div>
                    <label className={labelClasses}>Organization</label>
                    <input type="text" value={ref.organization} onChange={(e) => updateReference(ref.id, { organization: e.target.value })} className={inputClasses} placeholder="e.g. Tech Corp Inc." />
                  </div>
                  <div>
                    <label className={labelClasses}>Phone Number</label>
                    <input type="text" value={ref.phone} onChange={(e) => updateReference(ref.id, { phone: e.target.value })} className={inputClasses} placeholder="e.g. +1 555-1234" />
                  </div>
                  <div className="md:col-span-2">
                    <label className={labelClasses}>Email Address</label>
                    <input type="email" value={ref.email} onChange={(e) => updateReference(ref.id, { email: e.target.value })} className={inputClasses} placeholder="e.g. john.smith@example.com" />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addReference({ id: crypto.randomUUID(), name: '', title: '', organization: '', phone: '', email: '' })}
              className="w-full py-4 border-2 border-dashed border-white/20 text-slate-300 font-semibold rounded-xl hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/5 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Plus size={20} /> Add New Reference
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
