import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { CVData } from '@/store/useCVStore';

const THEME_BLUE = '#1e40af';
const THEME_DARK = '#0f172a';
const THEME_GRAY = '#475569';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center'
  },
  name: {
    fontSize: 26,
    color: THEME_BLUE,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 6,
    lineHeight: 1
  },
  title: {
    fontSize: 13,
    color: THEME_DARK,
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
    marginBottom: 10
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 10,
    color: THEME_GRAY
  },
  link: {
    color: THEME_BLUE,
    textDecoration: 'underline'
  },
  section: { marginTop: 15 },
  sectionTitle: {
    fontSize: 12,
    color: THEME_BLUE,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: THEME_BLUE,
    paddingBottom: 3,
    marginBottom: 8
  },
  skillRow: { flexDirection: 'row', marginBottom: 3 },
  skillLabel: { width: 120, fontFamily: 'Helvetica-Bold', color: THEME_DARK },
  skillValue: { flex: 1 },
  itemBlock: { marginBottom: 10 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  itemTitle: { fontSize: 11, fontFamily: 'Helvetica-Bold', color: THEME_DARK },
  itemCompany: { fontFamily: 'Helvetica-Oblique', color: THEME_DARK },
  itemDates: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: THEME_GRAY },
  educationRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  bulletList: { paddingLeft: 10 },
  bulletItem: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { width: 10, fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1 },
  referenceBlock: { marginBottom: 12, width: '48%' },
  referenceName: { fontFamily: 'Helvetica-Bold', color: THEME_BLUE, fontSize: 11 },
  referenceTitleOrg: { fontFamily: 'Helvetica-Oblique', color: THEME_DARK, marginBottom: 2 },
  referenceContact: { color: THEME_GRAY }
});

// Styles for the HTML parser inside PDF
const htmlStyles = {
  p: { margin: 0, padding: 0, marginBottom: 4, textAlign: 'justify', fontSize: 11, lineHeight: 1.5 },
  ul: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 11, lineHeight: 1.5 },
  ol: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 11, lineHeight: 1.5 },
  li: { margin: 0, padding: 0, marginBottom: 2 },
  strong: { fontFamily: 'Helvetica-Bold' },
  em: { fontFamily: 'Helvetica-Oblique' },
  u: { textDecoration: 'underline' },
};

export const ModernCV = ({ data }: { data: CVData }) => {
  const formatJobTitle = (title: string) => {
    if (!title) return null;
    return title.split(',').map(t => t.trim()).join(' • ');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName || 'YOUR NAME'}</Text>
          {data.personalInfo.title && <Text style={styles.title}>{formatJobTitle(data.personalInfo.title)}</Text>}
          <View style={styles.contactRow}>
            {[
              data.personalInfo.email && <Link style={styles.link} src={`mailto:${data.personalInfo.email}`}>{data.personalInfo.email}</Link>,
              data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>,
              data.personalInfo.location && <Text>{data.personalInfo.location}</Text>,
              data.personalInfo.linkedin && <Link style={styles.link} src={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`}>{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</Link>,
              data.personalInfo.github && <Link style={styles.link} src={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`}>{data.personalInfo.github.replace(/^https?:\/\//, '')}</Link>
            ].filter(Boolean).map((item, index) => (
              <React.Fragment key={index}>
                {index !== 0 && <Text style={{ marginHorizontal: 6 }}>|</Text>}
                {item}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* PROFESSIONAL SUMMARY */}
        {data.professionalSummaryHtml && data.professionalSummaryHtml !== '<p><br></p>' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Html stylesheet={htmlStyles}>{data.professionalSummaryHtml}</Html>
          </View>
        )}

        {/* TECHNICAL SKILLS */}
        {(data.technicalSkills.programming.length > 0 || data.technicalSkills.databaseSQL.length > 0 || data.technicalSkills.apiIntegrationTesting.length > 0 || data.technicalSkills.systemTestingQA.length > 0 || data.technicalSkills.tools.length > 0 || data.technicalSkills.consultingBusiness.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            {data.technicalSkills.programming.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Programming:</Text><Text style={styles.skillValue}>{data.technicalSkills.programming.join(', ')}</Text></View>}
            {data.technicalSkills.databaseSQL.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Database & SQL:</Text><Text style={styles.skillValue}>{data.technicalSkills.databaseSQL.join(', ')}</Text></View>}
            {data.technicalSkills.apiIntegrationTesting.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>API & Testing:</Text><Text style={styles.skillValue}>{data.technicalSkills.apiIntegrationTesting.join(', ')}</Text></View>}
            {data.technicalSkills.systemTestingQA.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>System Testing & QA:</Text><Text style={styles.skillValue}>{data.technicalSkills.systemTestingQA.join(', ')}</Text></View>}
            {data.technicalSkills.tools.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Tools:</Text><Text style={styles.skillValue}>{data.technicalSkills.tools.join(', ')}</Text></View>}
            {data.technicalSkills.consultingBusiness.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Consulting & Business:</Text><Text style={styles.skillValue}>{data.technicalSkills.consultingBusiness.join(', ')}</Text></View>}
          </View>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {data.professionalExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.professionalExperience.map((exp) => (
              <View key={exp.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{exp.title} <Text style={styles.itemCompany}>| {exp.company}</Text></Text>
                  <Text style={styles.itemDates}>{exp.dates}</Text>
                </View>
                {exp.descriptionHtml && exp.descriptionHtml !== '<p><br></p>' && (
                  <View style={{ marginTop: 4 }}>
                    <Html stylesheet={htmlStyles}>{exp.descriptionHtml}</Html>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* PROJECT EXPERIENCE */}
        {data.projectExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Project Experience</Text>
            {data.projectExperience.map((proj) => (
              <View key={proj.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{proj.projectName}</Text>
                  <Text style={styles.itemDates}>{proj.dates}</Text>
                </View>
                {proj.techStack && <Text style={{ fontSize: 9, color: THEME_DARK, marginBottom: 2, fontFamily: 'Helvetica-Oblique' }}>Tech Stack: {proj.techStack}</Text>}
                {proj.descriptionHtml && proj.descriptionHtml !== '<p><br></p>' && (
                  <View style={{ marginTop: 4 }}>
                    <Html stylesheet={htmlStyles}>{proj.descriptionHtml}</Html>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* EDUCATION */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDates}>{edu.expectedYear}</Text>
                </View>
                <Text style={styles.itemCompany}>{edu.university}</Text>
                {edu.relevantAreas && <Text style={{ marginTop: 2, color: THEME_GRAY }}>Relevant Areas: {edu.relevantAreas}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* CERTIFICATIONS & TRAINING */}
        {(data.certifications && data.certifications.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications & Training</Text>
            <View style={styles.bulletList}>
              {data.certifications.map((cert, index) => (
                <View key={index} style={styles.bulletItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{cert}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* REFERENCES */}
        {(data.references && data.references.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              {data.references.map((ref) => (
                <View key={ref.id} style={styles.referenceBlock}>
                  <Text style={styles.referenceName}>{ref.name}</Text>
                  <Text style={styles.referenceTitleOrg}>
                    {ref.title}{ref.title && ref.organization ? ', ' : ''}{ref.organization}
                  </Text>
                  {ref.phone && <Text style={styles.referenceContact}>{ref.phone}</Text>}
                  {ref.email && <Link style={styles.link} src={`mailto:${ref.email}`}>{ref.email}</Link>}
                </View>
              ))}
            </View>
          </View>
        )}

      </Page>
    </Document>
  );
};
