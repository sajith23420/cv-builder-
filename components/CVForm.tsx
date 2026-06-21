"use client";

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useCVStore } from '@/store/useCVStore';
import { generateWordDocument } from '@/utils/generateWord';
import { 
  User, FileText, Briefcase, 
  Code, GraduationCap, Plus, Trash2,
  ChevronDown, ChevronUp, FileIcon,
  Award, Users
} from 'lucide-react';
import CVUploadSection from './CVUploadSection';
import 'react-quill-new/dist/quill.snow.css';

// Dynamically import ReactQuill
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false, 
  loading: () => <div className="h-32 bg-slate-100 animate-pulse rounded-lg border border-slate-200"></div> 
});

interface CVFormProps {
  pdfDownloadButton?: React.ReactNode;
}

export default function CVForm({ pdfDownloadButton }: CVFormProps) {
  const { 
    cvData, setPersonalInfo, setProfessionalSummaryHtml, setTechnicalSkills,
    addProfessionalExperience, updateProfessionalExperience, removeProfessionalExperience,
    addProjectExperience, updateProjectExperience, removeProjectExperience,
    addEducation, updateEducation, removeEducation,
    setCertifications,
    addReference, updateReference, removeReference
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

  const handleDownloadWord = async () => {
    try {
      await generateWordDocument(cvData);
    } catch (error) {
      console.error("Error generating Word document:", error);
      alert("Failed to generate Word document.");
    }
  };

  const SectionHeader = ({ id, icon: Icon, title }: { id: string, icon: any, title: string }) => (
    <button 
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-red-300 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${expandedSection === id ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      </div>
      {expandedSection === id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
    </button>
  );

  return (
    <div className="max-w-4xl mx-auto pb-12 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-slate-900 rounded-2xl shadow-xl text-white gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Your CV Builder</h1>
          <p className="text-slate-300 text-sm mt-1">Complete your details below to generate your ATS-friendly CV.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownloadWord}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            <FileIcon size={16} /> Download as Word
          </button>
          
          {pdfDownloadButton}
        </div>
      </div>

      {/* Start from Existing CV - Upload Section */}
      <CVUploadSection />

      {/* Personal Info Section */}
      <div className="space-y-4">
        <SectionHeader id="personal" icon={User} title="Your Personal Details" />
        {expandedSection === 'personal' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-5 animate-in slide-in-from-top-2 duration-200">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter your full name</label>
              <input type="text" value={cvData.personalInfo.fullName} onChange={(e) => setPersonalInfo({ fullName: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="e.g. Jane Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter your professional title</label>
              <input type="text" value={cvData.personalInfo.title} onChange={(e) => setPersonalInfo({ title: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="e.g. Senior Software Engineer" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter your email address</label>
              <input type="email" value={cvData.personalInfo.email} onChange={(e) => setPersonalInfo({ email: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="e.g. you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter your phone number</label>
              <input type="text" value={cvData.personalInfo.phone} onChange={(e) => setPersonalInfo({ phone: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="e.g. +1 234 567 890" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter your location</label>
              <input type="text" value={cvData.personalInfo.location} onChange={(e) => setPersonalInfo({ location: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="e.g. New York, NY" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter your LinkedIn URL</label>
              <input type="text" value={cvData.personalInfo.linkedin} onChange={(e) => setPersonalInfo({ linkedin: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="e.g. linkedin.com/in/janedoe" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Enter your GitHub or Portfolio URL</label>
              <input type="text" value={cvData.personalInfo.github} onChange={(e) => setPersonalInfo({ github: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all" placeholder="e.g. github.com/janedoe" />
            </div>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="space-y-4">
        <SectionHeader id="summary" icon={FileText} title="Your Professional Summary" />
        {expandedSection === 'summary' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm animate-in slide-in-from-top-2 duration-200">
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Write your professional summary</label>
            <div className="bg-slate-50 border border-slate-200 rounded-lg overflow-hidden [&_.ql-toolbar]:bg-white [&_.ql-container]:text-base">
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
        <SectionHeader id="skills" icon={Code} title="Your Technical Skills" />
        {expandedSection === 'skills' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-5 animate-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-slate-500 mb-2">Separate your skills with commas.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Programming Languages</label>
                <input type="text" value={cvData.technicalSkills.programming.join(', ')} onChange={(e) => setTechnicalSkills({ programming: e.target.value.split(',').map(s => s.trimStart()) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. JavaScript, Python, Java" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Databases & SQL</label>
                <input type="text" value={cvData.technicalSkills.databaseSQL.join(', ')} onChange={(e) => setTechnicalSkills({ databaseSQL: e.target.value.split(',').map(s => s.trimStart()) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. PostgreSQL, MongoDB" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">API & Testing</label>
                <input type="text" value={cvData.technicalSkills.apiIntegrationTesting.join(', ')} onChange={(e) => setTechnicalSkills({ apiIntegrationTesting: e.target.value.split(',').map(s => s.trimStart()) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. REST, GraphQL, Jest" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">System Testing & QA</label>
                <input type="text" value={cvData.technicalSkills.systemTestingQA.join(', ')} onChange={(e) => setTechnicalSkills({ systemTestingQA: e.target.value.split(',').map(s => s.trimStart()) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Selenium, Cypress" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tools</label>
                <input type="text" value={cvData.technicalSkills.tools.join(', ')} onChange={(e) => setTechnicalSkills({ tools: e.target.value.split(',').map(s => s.trimStart()) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Git, Docker, AWS" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Consulting & Business</label>
                <input type="text" value={cvData.technicalSkills.consultingBusiness.join(', ')} onChange={(e) => setTechnicalSkills({ consultingBusiness: e.target.value.split(',').map(s => s.trimStart()) })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Agile, Scrum, Leadership" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Professional Experience Section */}
      <div className="space-y-4">
        <SectionHeader id="experience" icon={Briefcase} title="Your Professional Experience" />
        {expandedSection === 'experience' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6 animate-in slide-in-from-top-2 duration-200">
            {cvData.professionalExperience.map((exp) => (
              <div key={exp.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative group">
                <button onClick={() => removeProfessionalExperience(exp.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors bg-white p-2 rounded-lg shadow-sm">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your job title</label>
                    <input type="text" value={exp.title} onChange={(e) => updateProfessionalExperience(exp.id, { title: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Software Engineer" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your company</label>
                    <input type="text" value={exp.company} onChange={(e) => updateProfessionalExperience(exp.id, { company: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Tech Corp Inc." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Dates of employment</label>
                    <input type="text" value={exp.dates} onChange={(e) => updateProfessionalExperience(exp.id, { dates: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Jan 2020 - Present" />
                  </div>
                </div>
                
                {/* Rich Text Editor for Description */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Add your achievements (Use bullet points for ATS)</label>
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden [&_.ql-toolbar]:bg-slate-50">
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
              className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-600 font-semibold rounded-xl hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add New Experience
            </button>
          </div>
        )}
      </div>

      {/* Project Experience Section */}
      <div className="space-y-4">
        <SectionHeader id="projects" icon={Code} title="Your Projects" />
        {expandedSection === 'projects' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6 animate-in slide-in-from-top-2 duration-200">
            {cvData.projectExperience.map((proj) => (
              <div key={proj.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative group">
                <button onClick={() => removeProjectExperience(proj.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors bg-white p-2 rounded-lg shadow-sm">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 pr-10">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your project name</label>
                    <input type="text" value={proj.projectName} onChange={(e) => updateProjectExperience(proj.id, { projectName: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. E-Commerce Platform" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Tech stack used</label>
                    <input type="text" value={proj.techStack} onChange={(e) => updateProjectExperience(proj.id, { techStack: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. React, Node.js, MongoDB" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Project dates</label>
                    <input type="text" value={proj.dates} onChange={(e) => updateProjectExperience(proj.id, { dates: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Jan 2022 - Mar 2022" />
                  </div>
                </div>
                
                {/* Rich Text Editor */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Add project details</label>
                  <div className="bg-white border border-slate-200 rounded-lg overflow-hidden [&_.ql-toolbar]:bg-slate-50">
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
              className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-600 font-semibold rounded-xl hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add New Project
            </button>
          </div>
        )}
      </div>

      {/* Education Section */}
      <div className="space-y-4">
        <SectionHeader id="education" icon={GraduationCap} title="Your Education" />
        {expandedSection === 'education' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6 animate-in slide-in-from-top-2 duration-200">
            {cvData.education.map((edu) => (
              <div key={edu.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative group">
                <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors bg-white p-2 rounded-lg shadow-sm">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your degree</label>
                    <input type="text" value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. B.S. Computer Science" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Your university/institution</label>
                    <input type="text" value={edu.university} onChange={(e) => updateEducation(edu.id, { university: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Tech University" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Expected/Graduation year</label>
                    <input type="text" value={edu.expectedYear} onChange={(e) => updateEducation(edu.id, { expectedYear: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. May 2024" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Relevant study areas (optional)</label>
                    <input type="text" value={edu.relevantAreas} onChange={(e) => updateEducation(edu.id, { relevantAreas: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Machine Learning, Data Structures" />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addEducation({ id: crypto.randomUUID(), degree: '', university: '', expectedYear: '', relevantAreas: '' })}
              className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-600 font-semibold rounded-xl hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add New Education
            </button>
          </div>
        )}
      </div>

      {/* Certifications Section */}
      <div className="space-y-4">
        <SectionHeader id="certifications" icon={Award} title="Your Certifications" />
        {expandedSection === 'certifications' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm animate-in slide-in-from-top-2 duration-200">
            <p className="text-sm text-slate-500 mb-4">Add your certifications or training courses. Separate them with commas, or type them out.</p>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Certifications (comma separated)</label>
            <input 
              type="text" 
              value={cvData.certifications?.join(', ') || ''} 
              onChange={(e) => setCertifications(e.target.value.split(',').map(s => s.trimStart()).filter(s => s))} 
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" 
              placeholder="e.g. AWS Certified Solutions Architect, PMP Certification" 
            />
          </div>
        )}
      </div>

      {/* References Section */}
      <div className="space-y-4">
        <SectionHeader id="references" icon={Users} title="Your References" />
        {expandedSection === 'references' && (
          <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm space-y-6 animate-in slide-in-from-top-2 duration-200">
            {(cvData.references || []).map((ref) => (
              <div key={ref.id} className="p-5 bg-slate-50 border border-slate-200 rounded-xl relative group">
                <button onClick={() => removeReference(ref.id)} className="absolute top-4 right-4 text-slate-400 hover:text-red-600 transition-colors bg-white p-2 rounded-lg shadow-sm">
                  <Trash2 size={16} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-10">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Reference Name</label>
                    <input type="text" value={ref.name} onChange={(e) => updateReference(ref.id, { name: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. John Smith" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Job Title</label>
                    <input type="text" value={ref.title} onChange={(e) => updateReference(ref.id, { title: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Director of Engineering" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Organization</label>
                    <input type="text" value={ref.organization} onChange={(e) => updateReference(ref.id, { organization: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. Tech Corp Inc." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                    <input type="text" value={ref.phone} onChange={(e) => updateReference(ref.id, { phone: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. +1 555-1234" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                    <input type="email" value={ref.email} onChange={(e) => updateReference(ref.id, { email: e.target.value })} className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="e.g. john.smith@example.com" />
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={() => addReference({ id: crypto.randomUUID(), name: '', title: '', organization: '', phone: '', email: '' })}
              className="w-full py-4 border-2 border-dashed border-slate-300 text-slate-600 font-semibold rounded-xl hover:border-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
            >
              <Plus size={20} /> Add New Reference
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
