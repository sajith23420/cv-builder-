import { NextResponse } from 'next/server';
import { PDFParse } from 'pdf-parse';
import Groq from 'groq-sdk';

// ---------------------------------------------------------------------------
// Groq client — uses server-only env var GROQ_API_KEY
// ---------------------------------------------------------------------------
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ---------------------------------------------------------------------------
// System prompt that instructs Groq to return structured CV JSON
// ---------------------------------------------------------------------------
const SYSTEM_PROMPT = `You are a professional CV/Resume parser. Analyze the raw text from a CV document and extract all relevant information into a structured JSON object.

You MUST return ONLY a valid JSON object — no markdown fences, no explanation, no extra text.

The JSON object must follow this exact TypeScript interface:

interface ParsedCVData {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  linkedin?: string;
  github?: string;
  summary?: string;
  programmingLanguages?: string;
  databases?: string;
  apiTesting?: string;
  systemTesting?: string;
  tools?: string;
  consultingBusiness?: string;
  experience?: Array<{
    title?: string;
    company?: string;
    dates?: string;
    description?: string;
  }>;
  projects?: Array<{
    name?: string;
    techStack?: string;
    dates?: string;
    description?: string;
  }>;
  education?: Array<{
    degree?: string;
    university?: string;
    year?: string;
    relevantAreas?: string;
  }>;
  certifications?: string[];
}

Important rules:
1. For experience and project descriptions, format each bullet point as an HTML list: <ul><li>Point 1</li><li>Point 2</li></ul>
2. For skills, return comma-separated strings grouped into the correct category.
3. If a section is not found in the CV text, omit that key entirely — do NOT include null or empty values.
4. Return ONLY the JSON object. No markdown code fences. No explanatory text.`;

// ---------------------------------------------------------------------------
// POST handler — receives FormData with a "file" field
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ error: 'No file provided. Please upload a PDF file.' }, { status: 400 });
    }

    const fileName = (file as File).name?.toLowerCase() ?? '';
    const isPdf = file.type === 'application/pdf' || fileName.endsWith('.pdf');

    if (!isPdf) {
      return NextResponse.json({ error: 'Only PDF files are supported.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let extractedText = '';
    try {
      const parser = new PDFParse({ data: buffer });
      const result = await parser.getText();
      extractedText = result.text;
      await parser.destroy();
    } catch (error) {
      console.error('PDF Parse Error:', error);
      return NextResponse.json({ error: 'Failed to read PDF file. It might be corrupted.' }, { status: 422 });
    }

    if (!extractedText || extractedText.trim().length < 20) {
      return NextResponse.json({ error: 'Could not extract meaningful text from the PDF.' }, { status: 422 });
    }

    // Call Groq API with the updated, currently supported model
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Parse this CV text into JSON:\n\n${extractedText}` }
      ],
      model: 'llama-3.3-70b-versatile', // UPDATED: Changed from deprecated 'llama3-70b-8192' to the new versatile model
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    const responseText = chatCompletion.choices[0]?.message?.content || '{}';

    let parsedCV: Record<string, unknown>;
    try {
      parsedCV = JSON.parse(responseText);
    } catch (jsonError) {
      console.error('Failed to parse Groq response as JSON:', responseText);
      return NextResponse.json({ error: 'AI returned an invalid response. Please try again.' }, { status: 502 });
    }

    return NextResponse.json(parsedCV);

  } catch (error) {
    console.error('API Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Custom error message if API key is missing
    if (message.includes('API key') || message.includes('apiKey')) {
      return NextResponse.json({ error: 'Groq API key is not configured. Please set GROQ_API_KEY in .env.local.' }, { status: 500 });
    }

    return NextResponse.json({ error: `Server error: ${message}` }, { status: 500 });
  }
}