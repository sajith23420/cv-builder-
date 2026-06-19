import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { CVData } from '@/store/useCVStore';

// Simple HTML to DOCX block parser for react-quill
function parseHtmlToDocxBlocks(html: string): Paragraph[] {
  if (!html || html === '<p><br></p>') return [];
  
  const blocks: Paragraph[] = [];
  const blockRegex = /<(p|li)[^>]*>(.*?)<\/\1>/gi;
  let match;
  
  while ((match = blockRegex.exec(html)) !== null) {
    const tag = match[1].toLowerCase();
    const innerHtml = match[2];
    
    const textRuns: TextRun[] = [];
    const parts = innerHtml.split(/(<[^>]+>)/g);
    
    let isBold = false;
    let isItalic = false;
    let isUnderline = false;
    
    for (const part of parts) {
      if (part.startsWith('<')) {
        const lowerPart = part.toLowerCase();
        if (lowerPart.includes('strong') || lowerPart.includes('b>')) isBold = !lowerPart.includes('</');
        if (lowerPart.includes('em') || lowerPart.includes('i>')) isItalic = !lowerPart.includes('</');
        if (lowerPart.includes('u>')) isUnderline = !lowerPart.includes('</');
      } else if (part) {
        const decodedText = part
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>');
          
        if (decodedText) {
            textRuns.push(new TextRun({
            text: decodedText,
            bold: isBold,
            italics: isItalic,
            underline: isUnderline ? {} : undefined,
            size: 20 // 10pt
            }));
        }
      }
    }
    
    if (textRuns.length > 0) {
      blocks.push(new Paragraph({
        children: textRuns,
        bullet: tag === 'li' ? { level: 0 } : undefined,
        spacing: { after: 120 }
      }));
    }
  }
  
  return blocks;
}

export const generateWordDocument = async (data: CVData) => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // HEADER
        new Paragraph({
          text: data.personalInfo.fullName.toUpperCase() || 'YOUR NAME',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        data.personalInfo.title ? new Paragraph({
          text: data.personalInfo.title,
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [new TextRun({ text: data.personalInfo.title, color: "DC2626", bold: true, size: 24 })]
        }) : new Paragraph({}),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({ 
              text: [
                data.personalInfo.location, 
                data.personalInfo.phone, 
                data.personalInfo.email, 
                data.personalInfo.linkedin, 
                data.personalInfo.github
              ].filter(Boolean).join('  |  '),
              size: 18,
              color: "475569"
            })
          ]
        }),

        // SUMMARY
        ...(data.professionalSummaryHtml && data.professionalSummaryHtml !== '<p><br></p>' ? [
          new Paragraph({
            text: "PROFESSIONAL SUMMARY",
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: "DC2626", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            spacing: { before: 400, after: 200 }
          }),
          ...parseHtmlToDocxBlocks(data.professionalSummaryHtml)
        ] : []),

        // TECHNICAL SKILLS
        ...((data.technicalSkills.programming.length > 0 || data.technicalSkills.databaseSQL.length > 0 || data.technicalSkills.apiIntegrationTesting.length > 0 || data.technicalSkills.systemTestingQA.length > 0 || data.technicalSkills.tools.length > 0 || data.technicalSkills.consultingBusiness.length > 0) ? [
          new Paragraph({
            text: "TECHNICAL SKILLS",
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: "DC2626", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            spacing: { before: 400, after: 200 }
          }),
          ...(data.technicalSkills.programming.length > 0 ? [new Paragraph({ children: [new TextRun({ text: "Programming: ", bold: true, size: 20 }), new TextRun({ text: data.technicalSkills.programming.join(', '), size: 20 })] })] : []),
          ...(data.technicalSkills.databaseSQL.length > 0 ? [new Paragraph({ children: [new TextRun({ text: "Database & SQL: ", bold: true, size: 20 }), new TextRun({ text: data.technicalSkills.databaseSQL.join(', '), size: 20 })] })] : []),
          ...(data.technicalSkills.apiIntegrationTesting.length > 0 ? [new Paragraph({ children: [new TextRun({ text: "API & Testing: ", bold: true, size: 20 }), new TextRun({ text: data.technicalSkills.apiIntegrationTesting.join(', '), size: 20 })] })] : []),
          ...(data.technicalSkills.systemTestingQA.length > 0 ? [new Paragraph({ children: [new TextRun({ text: "System Testing & QA: ", bold: true, size: 20 }), new TextRun({ text: data.technicalSkills.systemTestingQA.join(', '), size: 20 })] })] : []),
          ...(data.technicalSkills.tools.length > 0 ? [new Paragraph({ children: [new TextRun({ text: "Tools: ", bold: true, size: 20 }), new TextRun({ text: data.technicalSkills.tools.join(', '), size: 20 })] })] : []),
          ...(data.technicalSkills.consultingBusiness.length > 0 ? [new Paragraph({ children: [new TextRun({ text: "Consulting & Business: ", bold: true, size: 20 }), new TextRun({ text: data.technicalSkills.consultingBusiness.join(', '), size: 20 })] })] : [])
        ] : []),

        // EXPERIENCE
        ...(data.professionalExperience.length > 0 ? [
          new Paragraph({
            text: "PROFESSIONAL EXPERIENCE",
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: "DC2626", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            spacing: { before: 400, after: 200 }
          }),
          ...data.professionalExperience.flatMap(exp => [
            new Paragraph({
              spacing: { before: 200 },
              children: [
                new TextRun({ text: exp.title, bold: true, size: 22 }),
                new TextRun({ text: ` | ${exp.company}`, color: "DC2626", italics: true, size: 22 }),
              ]
            }),
            new Paragraph({
              children: [new TextRun({ text: exp.dates, bold: true, size: 18, color: "475569" })],
              spacing: { after: 100 }
            }),
            ...parseHtmlToDocxBlocks(exp.descriptionHtml)
          ])
        ] : []),

        // PROJECTS
        ...(data.projectExperience.length > 0 ? [
          new Paragraph({
            text: "PROJECT EXPERIENCE",
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: "DC2626", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            spacing: { before: 400, after: 200 }
          }),
          ...data.projectExperience.flatMap(proj => [
            new Paragraph({
              spacing: { before: 200 },
              children: [
                new TextRun({ text: proj.projectName, bold: true, size: 22 }),
              ]
            }),
            new Paragraph({
              children: [new TextRun({ text: proj.dates, bold: true, size: 18, color: "475569" })],
              spacing: { after: 100 }
            }),
            ...(proj.techStack ? [new Paragraph({ children: [new TextRun({ text: `Tech Stack: ${proj.techStack}`, italics: true, size: 18, color: "DC2626" })], spacing: { after: 100 }})] : []),
            ...parseHtmlToDocxBlocks(proj.descriptionHtml)
          ])
        ] : []),

        // EDUCATION
        ...(data.education.length > 0 ? [
          new Paragraph({
            text: "EDUCATION",
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: "DC2626", space: 1, style: BorderStyle.SINGLE, size: 6 } },
            spacing: { before: 400, after: 200 }
          }),
          ...data.education.flatMap(edu => [
            new Paragraph({
              spacing: { before: 200 },
              children: [
                new TextRun({ text: edu.degree, bold: true, size: 22 }),
              ]
            }),
            new Paragraph({
              children: [new TextRun({ text: edu.university, size: 20 })],
            }),
            new Paragraph({
              children: [new TextRun({ text: edu.expectedYear, bold: true, size: 18, color: "475569" })],
              spacing: { after: 100 }
            }),
            ...(edu.relevantAreas ? [new Paragraph({ children: [new TextRun({ text: `Relevant Areas: ${edu.relevantAreas}`, size: 20, color: "475569" })], spacing: { after: 100 }})] : []),
          ])
        ] : [])

      ]
    }]
  });

  const blob = await Packer.toBlob(doc);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'modern_cv.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
