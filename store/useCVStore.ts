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

export interface VisibleSections {
  summary: boolean;
  skills: boolean;
  experience: boolean;
  projects: boolean;
  education: boolean;
  certifications: boolean;
  references: boolean;
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
  visibleSections: VisibleSections;
}

interface CVStore {
  cvData: CVData;
  selectedTemplate: string;
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
  setSelectedTemplate: (templateId: string) => void;
  toggleSectionVisibility: (section: keyof VisibleSections) => void;
}

const initialData: CVData = {
  personalInfo: {
    fullName: 'Alex Carter',
    title: 'Senior Full Stack Engineer',
    email: 'alex.carter@protonmail.com',
    phone: '+1 (415) 928-7430',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alexcarter-dev',
    github: 'github.com/alexcarter',
  },
  professionalSummaryHtml:
    '<p>Results-driven <strong>Senior Full Stack Engineer</strong> with <strong>7+ years</strong> of experience architecting and delivering scalable web applications across fintech, SaaS, and e-commerce domains. Proven expertise in modern JavaScript/TypeScript ecosystems, cloud-native infrastructure, and cross-functional team leadership. Passionate about clean code, developer experience, and building products that serve millions of users.</p>',
  technicalSkills: {
    programming: ['TypeScript', 'JavaScript (ES2024)', 'Python', 'Go', 'Rust', 'SQL', 'GraphQL', 'HTML5 / CSS3'],
    databaseSQL: ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB', 'Prisma ORM', 'Drizzle ORM'],
    apiIntegrationTesting: ['REST', 'GraphQL', 'gRPC', 'tRPC', 'WebSockets', 'Stripe API', 'Twilio', 'OpenAI API'],
    systemTestingQA: ['Jest', 'Vitest', 'Playwright', 'Cypress', 'React Testing Library', 'k6 Load Testing'],
    tools: ['Docker', 'Kubernetes', 'AWS (ECS, Lambda, S3, CloudFront)', 'Vercel', 'GitHub Actions', 'Terraform', 'Datadog'],
    consultingBusiness: ['Agile / Scrum', 'Technical Architecture Reviews', 'Stakeholder Communication', 'Mentorship & Code Reviews'],
  },
  professionalExperience: [
    {
      id: 'exp-1',
      title: 'Senior Full Stack Engineer',
      company: 'Meridian Technologies — San Francisco, CA',
      dates: 'Jan 2022 – Present',
      descriptionHtml:
        '<ul>' +
        '<li>Architected and led the migration of a monolithic Node.js application to a <strong>microservices architecture</strong> on AWS ECS, reducing deployment times by 70% and improving system uptime to 99.97%.</li>' +
        '<li>Built a real-time analytics dashboard using <strong>Next.js 14, Server Components, and WebSockets</strong>, processing 2M+ daily events and serving 15K concurrent users.</li>' +
        '<li>Designed and implemented a robust <strong>CI/CD pipeline</strong> using GitHub Actions and Terraform, enabling zero-downtime blue-green deployments across staging and production environments.</li>' +
        '<li>Mentored a team of 5 junior engineers through weekly pairing sessions, resulting in a 40% reduction in PR review turnaround time.</li>' +
        '</ul>',
    },
    {
      id: 'exp-2',
      title: 'Full Stack Developer',
      company: 'NovaPay (Series B Fintech Startup) — New York, NY',
      dates: 'Mar 2020 – Dec 2021',
      descriptionHtml:
        '<ul>' +
        '<li>Developed the customer-facing <strong>payment dashboard</strong> using React, TypeScript, and Tailwind CSS, handling $4M+ in monthly transaction volume with PCI-DSS compliance.</li>' +
        '<li>Engineered a <strong>GraphQL API gateway</strong> with Apollo Server and DataLoader, reducing over-fetching by 60% and improving mobile app load times by 35%.</li>' +
        '<li>Implemented <strong>event-driven architecture</strong> with AWS SQS and Lambda to process asynchronous payment webhooks, achieving sub-200ms processing latency at scale.</li>' +
        '</ul>',
    },
    {
      id: 'exp-3',
      title: 'Frontend Developer',
      company: 'PixelForge Agency — Austin, TX',
      dates: 'Jun 2018 – Feb 2020',
      descriptionHtml:
        '<ul>' +
        '<li>Delivered 12+ high-fidelity, responsive web applications for enterprise clients in healthcare and retail, using <strong>React, Vue.js, and SCSS</strong>.</li>' +
        '<li>Introduced <strong>component-driven development</strong> with Storybook, reducing UI bug reports by 45% and accelerating design-to-dev handoff.</li>' +
        '<li>Optimized Core Web Vitals (LCP, CLS, FID) across client projects, achieving an average <strong>Lighthouse performance score of 95+</strong>.</li>' +
        '</ul>',
    },
  ],
  projectExperience: [
    {
      id: 'proj-1',
      projectName: 'InvoiceFlow — AI-Powered Invoice Management Platform',
      techStack: 'Next.js 14, TypeScript, Prisma, PostgreSQL, Stripe, OpenAI API, Vercel',
      dates: '2023 – Present',
      descriptionHtml:
        '<ul>' +
        '<li>Built a full-stack SaaS platform that uses <strong>GPT-4 to auto-extract line items</strong> from uploaded invoices (PDF/image), reducing manual data entry time by 85%.</li>' +
        '<li>Integrated <strong>Stripe Billing</strong> with usage-based metering for a freemium model, scaling to 2,000+ active users within 6 months of launch.</li>' +
        '<li>Implemented <strong>role-based access control (RBAC)</strong> and team workspaces with real-time collaboration via WebSocket channels.</li>' +
        '</ul>',
    },
    {
      id: 'proj-2',
      projectName: 'DevPulse — Developer Productivity Analytics CLI',
      techStack: 'Go, Cobra CLI, GitHub REST API, SQLite, Docker',
      dates: '2022',
      descriptionHtml:
        '<ul>' +
        '<li>Created an open-source CLI tool that aggregates <strong>GitHub commit patterns, PR review velocity, and code churn metrics</strong> into actionable weekly reports.</li>' +
        '<li>Achieved <strong>1,200+ GitHub stars</strong> and 50+ community contributors within the first year; published to Homebrew and Docker Hub.</li>' +
        '<li>Designed a plugin architecture enabling custom metric providers, adopted by 3 mid-size engineering teams for sprint retrospectives.</li>' +
        '</ul>',
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Science in Computer Science',
      university: 'University of California, Berkeley',
      expectedYear: '2018',
      relevantAreas: 'Data Structures & Algorithms, Distributed Systems, Machine Learning, Software Engineering',
    },
  ],
  certifications: [
    'AWS Certified Solutions Architect – Associate (2023)',
    'Google Cloud Professional Cloud Developer (2022)',
    'Meta Front-End Developer Professional Certificate (2021)',
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Dr. Evelyn Shaw',
      title: 'VP of Engineering',
      organization: 'Meridian Technologies',
      phone: '+1 (415) 555-0192',
      email: 'e.shaw@meridiantech.io',
    },
    {
      id: 'ref-2',
      name: 'Marcus Liu',
      title: 'CTO & Co-Founder',
      organization: 'NovaPay',
      phone: '+1 (212) 555-0347',
      email: 'marcus@novapay.com',
    },
  ],
  visibleSections: {
    summary: true,
    skills: true,
    experience: true,
    projects: true,
    education: true,
    certifications: true,
    references: true,
  },
};

export const useCVStore = create<CVStore>()(
  persist(
    (set) => ({
      cvData: initialData,
      selectedTemplate: 'modern',
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
      setSelectedTemplate: (templateId) => set({ selectedTemplate: templateId }),
      toggleSectionVisibility: (section) =>
        set((state) => ({
          cvData: {
            ...state.cvData,
            visibleSections: {
              ...state.cvData.visibleSections,
              [section]: !state.cvData.visibleSections[section],
            },
          },
        })),
    }),
    { name: 'cv-builder-storage-v5' }
  )
);
