import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PersonalInfo {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}

export interface TechnicalSkills {
  programming: string[];
  databaseSQL: string[];
  apiIntegrationTesting: string[];
  systemTestingQA: string[];
  tools: string[];
  consultingBusiness: string[];
}

export interface ProfessionalExperience {
  id: string;
  title: string;
  company: string;
  dates: string;
  descriptionHtml: string;
}

export interface ProjectExperience {
  id: string;
  projectName: string;
  techStack: string;
  dates: string;
  descriptionHtml: string;
}

export interface Education {
  id: string;
  degree: string;
  university: string;
  expectedYear: string;
  relevantAreas: string;
}

export interface Reference {
  id: string;
  name: string;
  title: string;
  organization: string;
  phone: string;
  email: string;
}

export interface CVData {
  personalInfo: PersonalInfo;
  professionalSummaryHtml: string;
  technicalSkills: TechnicalSkills;
  professionalExperience: ProfessionalExperience[];
  projectExperience: ProjectExperience[];
  education: Education[];
  certifications: string[];
  references: Reference[];
}

interface CVStore {
  cvData: CVData;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;
  setProfessionalSummaryHtml: (html: string) => void;
  setTechnicalSkills: (skills: Partial<TechnicalSkills>) => void;
  
  addProfessionalExperience: (exp: ProfessionalExperience) => void;
  updateProfessionalExperience: (id: string, exp: Partial<ProfessionalExperience>) => void;
  removeProfessionalExperience: (id: string) => void;

  addProjectExperience: (proj: ProjectExperience) => void;
  updateProjectExperience: (id: string, proj: Partial<ProjectExperience>) => void;
  removeProjectExperience: (id: string) => void;

  addEducation: (edu: Education) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  setCertifications: (certs: string[]) => void;

  addReference: (ref: Reference) => void;
  updateReference: (id: string, ref: Partial<Reference>) => void;
  removeReference: (id: string) => void;

  loadImportedData: (data: CVData) => void;
}

const initialData: CVData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
  },
  professionalSummaryHtml: '',
  technicalSkills: {
    programming: [],
    databaseSQL: [],
    apiIntegrationTesting: [],
    systemTestingQA: [],
    tools: [],
    consultingBusiness: [],
  },
  professionalExperience: [],
  projectExperience: [],
  education: [],
  certifications: [],
  references: [],
};

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cvData: initialData,
      setPersonalInfo: (info) =>
        set((state) => ({ cvData: { ...state.cvData, personalInfo: { ...state.cvData.personalInfo, ...info } } })),
      setProfessionalSummaryHtml: (html) =>
        set((state) => ({ cvData: { ...state.cvData, professionalSummaryHtml: html } })),
      setTechnicalSkills: (skills) =>
        set((state) => ({ cvData: { ...state.cvData, technicalSkills: { ...state.cvData.technicalSkills, ...skills } } })),

      addProfessionalExperience: (exp) =>
        set((state) => ({ cvData: { ...state.cvData, professionalExperience: [...state.cvData.professionalExperience, exp] } })),
      updateProfessionalExperience: (id, exp) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            professionalExperience: state.cvData.professionalExperience.map((e) => (e.id === id ? { ...e, ...exp } : e)),
          },
        })),
      removeProfessionalExperience: (id) =>
        set((state) => ({
          cvData: { ...state.cvData, professionalExperience: state.cvData.professionalExperience.filter((e) => e.id !== id) },
        })),

      addProjectExperience: (proj) =>
        set((state) => ({ cvData: { ...state.cvData, projectExperience: [...state.cvData.projectExperience, proj] } })),
      updateProjectExperience: (id, proj) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            projectExperience: state.cvData.projectExperience.map((e) => (e.id === id ? { ...e, ...proj } : e)),
          },
        })),
      removeProjectExperience: (id) =>
        set((state) => ({
          cvData: { ...state.cvData, projectExperience: state.cvData.projectExperience.filter((e) => e.id !== id) },
        })),

      addEducation: (edu) =>
        set((state) => ({ cvData: { ...state.cvData, education: [...state.cvData.education, edu] } })),
      updateEducation: (id, edu) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            education: state.cvData.education.map((e) => (e.id === id ? { ...e, ...edu } : e)),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          cvData: { ...state.cvData, education: state.cvData.education.filter((e) => e.id !== id) },
        })),

      setCertifications: (certs) =>
        set((state) => ({ cvData: { ...state.cvData, certifications: certs } })),

      addReference: (ref) =>
        set((state) => ({ cvData: { ...state.cvData, references: [...state.cvData.references, ref] } })),
      updateReference: (id, ref) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            references: state.cvData.references.map((r) => (r.id === id ? { ...r, ...ref } : r)),
          },
        })),
      removeReference: (id) =>
        set((state) => ({
          cvData: { ...state.cvData, references: state.cvData.references.filter((r) => r.id !== id) },
        })),

      loadImportedData: (data) => set({ cvData: { ...initialData, ...data } }),
    }),
    { name: 'modern-cv-storage-rich' }
  )
);
