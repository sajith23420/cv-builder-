import type { CVData } from '@/store/useCVStore';

/**
 * Represents the "flat" shape of data we'd receive from a parsing API
 * (e.g., OpenAI JSON mode, or a custom CV-parsing backend).
 *
 * Every field is optional because a real parser may only extract a subset.
 */
export interface ParsedCVData {
  // Personal
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;

  // Summary
  summary?: string;

  // Skills (comma-separated strings)
  technicalSkills?: string;
  programmingLanguages?: string;
  databases?: string;
  apiTesting?: string;
  systemTesting?: string;
  tools?: string;
  consultingBusiness?: string;

  // Experience
  experience?: Array<{
    title?: string;
    company?: string;
    dates?: string;
    description?: string;
  }>;

  // Projects
  projects?: Array<{
    name?: string;
    techStack?: string;
    dates?: string;
    description?: string;
  }>;

  // Education
  education?: Array<{
    degree?: string;
    university?: string;
    year?: string;
    relevantAreas?: string;
  }>;

  // Certifications (comma-separated or array)
  certifications?: string | string[];

  // References
  references?: Array<{
    name?: string;
    title?: string;
    organization?: string;
    phone?: string;
    email?: string;
  }>;
}

// ---------------------------------------------------------------------------
// Mapper: ParsedCVData → CVData (for the store)
// ---------------------------------------------------------------------------

function splitToArray(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Converts a flat `ParsedCVData` object (from the Gemini API) into the
 * app's `CVData` shape so it can be loaded straight into the Zustand store.
 */
export function mapParsedDataToCVData(parsed: ParsedCVData): CVData {
  return {
    visibleSections: {
      summary: true,
      skills: true,
      experience: true,
      projects: true,
      education: true,
      certifications: true,
      references: true,
    },
    personalInfo: {
      fullName: parsed.name ?? '',
      title: parsed.title ?? '',
      email: parsed.email ?? '',
      phone: parsed.phone ?? '',
      location: parsed.location ?? '',
      linkedin: parsed.linkedin ?? '',
      github: parsed.github ?? '',
    },

    professionalSummaryHtml: parsed.summary
      ? `<p>${parsed.summary}</p>`
      : '',

    technicalSkills: {
      programming: splitToArray(parsed.programmingLanguages || parsed.technicalSkills),
      databaseSQL: splitToArray(parsed.databases),
      apiIntegrationTesting: splitToArray(parsed.apiTesting),
      systemTestingQA: splitToArray(parsed.systemTesting),
      tools: splitToArray(parsed.tools),
      consultingBusiness: splitToArray(parsed.consultingBusiness),
    },

    professionalExperience: (parsed.experience ?? []).map((exp) => ({
      id: crypto.randomUUID(),
      title: exp.title ?? '',
      company: exp.company ?? '',
      dates: exp.dates ?? '',
      descriptionHtml: exp.description ?? '',
    })),

    projectExperience: (parsed.projects ?? []).map((proj) => ({
      id: crypto.randomUUID(),
      projectName: proj.name ?? '',
      techStack: proj.techStack ?? '',
      dates: proj.dates ?? '',
      descriptionHtml: proj.description ?? '',
    })),

    education: (parsed.education ?? []).map((edu) => ({
      id: crypto.randomUUID(),
      degree: edu.degree ?? '',
      university: edu.university ?? '',
      expectedYear: edu.year ?? '',
      relevantAreas: edu.relevantAreas ?? '',
    })),

    certifications: Array.isArray(parsed.certifications)
      ? parsed.certifications
      : splitToArray(parsed.certifications),

    references: (parsed.references ?? []).map((ref) => ({
      id: crypto.randomUUID(),
      name: ref.name ?? '',
      title: ref.title ?? '',
      organization: ref.organization ?? '',
      phone: ref.phone ?? '',
      email: ref.email ?? '',
    })),
  };
}

// ---------------------------------------------------------------------------
// Parse a CV file via the backend API (/api/parse-cv)
// ---------------------------------------------------------------------------

/**
 * Sends a CV file to the backend for parsing via Gemini AI.
 *
 * Flow:
 *   1. Frontend sends the file as FormData to /api/parse-cv
 *   2. Backend extracts text with pdf-parse
 *   3. Backend sends text to Gemini AI for structured extraction
 *   4. Returns a ParsedCVData JSON object
 *
 * Currently supports PDF files. DOCX support can be added by
 * integrating `mammoth` in the API route.
 */
export async function parseCVFile(file: File): Promise<ParsedCVData> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/parse-cv', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    // Try to extract a meaningful error message from the API
    let errorMessage = 'Failed to parse CV';
    try {
      const errorBody = await response.json();
      if (errorBody?.error) {
        errorMessage = errorBody.error;
      }
    } catch {
      // If we can't parse the error body, use the status text
      errorMessage = `Server error (${response.status}): ${response.statusText}`;
    }
    throw new Error(errorMessage);
  }

  const parsed: ParsedCVData = await response.json();
  return parsed;
}
