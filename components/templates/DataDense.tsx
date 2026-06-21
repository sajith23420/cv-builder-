import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { CVData } from '@/store/useCVStore';

const THEME_DARK = '#111827';
const THEME_GRAY = '#4b5563';

const styles = StyleSheet.create({
  page: {
    padding: 24, // Very tight margins
    fontFamily: 'Helvetica',
    fontSize: 9, // Smaller base font
    color: '#374151',
    lineHeight: 1.3,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#d1d5db',
    paddingBottom: 6
  },
  name: {
    fontSize: 20,
    color: THEME_DARK,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    lineHeight: 1
  },
  title: {
    fontSize: 11,
    color: THEME_GRAY,
    fontFamily: 'Helvetica-Bold',
    marginTop: 2,
    marginBottom: 4
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    fontSize: 8.5,
    color: THEME_GRAY
  },
  link: {
    color: THEME_DARK,
    textDecoration: 'none'
  },
  section: { marginTop: 8 },
  sectionTitle: {
    fontSize: 10,
    color: THEME_DARK,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingBottom: 2,
    marginBottom: 4,
    backgroundColor: '#f3f4f6',
    paddingLeft: 4,
    paddingTop: 2
  },
  skillRow: { flexDirection: 'row', marginBottom: 1.5 },
  skillLabel: { width: 100, fontFamily: 'Helvetica-Bold', color: THEME_DARK, fontSize: 8.5 },
  skillValue: { flex: 1, fontSize: 8.5 },
  itemBlock: { marginBottom: 6 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  itemTitle: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: THEME_DARK },
  itemCompany: { fontFamily: 'Helvetica-Oblique', color: THEME_DARK },
  itemDates: { fontSize: 8.5, fontFamily: 'Helvetica-Bold', color: THEME_GRAY },
});

// Styles for the HTML parser inside PDF
const htmlStyles = {
  p: { margin: 0, padding: 0, marginBottom: 2, textAlign: 'justify', fontSize: 8.5, lineHeight: 1.3 },
  ul: { margin: 0, padding: 0, marginLeft: 10, marginBottom: 2, fontSize: 8.5, lineHeight: 1.3 },
  ol: { margin: 0, padding: 0, marginLeft: 10, marginBottom: 2, fontSize: 8.5, lineHeight: 1.3 },
  li: { margin: 0, padding: 0, marginBottom: 1 },
  strong: { fontFamily: 'Helvetica-Bold' },
  em: { fontFamily: 'Helvetica-Oblique' },
  u: { textDecoration: 'underline' },
};

export const DataDense = ({ data }: { data: CVData }) => {
  const formatJobTitle = (title: string) => {
    if (!title) return null;
    return title.split(',').map(t => t.trim()).join(' | ');
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
                {index !== 0 && <Text style={{ marginHorizontal: 4 }}>|</Text>}
                {item}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* PROFESSIONAL SUMMARY */}
        {data.professionalSummaryHtml && data.professionalSummaryHtml !== '<p><br></p>' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Html stylesheet={htmlStyles}>{data.professionalSummaryHtml}</Html>
          </View>
        )}

        {/* TECHNICAL SKILLS */}
        {(data.technicalSkills.programming.length > 0 || data.technicalSkills.databaseSQL.length > 0 || data.technicalSkills.apiIntegrationTesting.length > 0 || data.technicalSkills.systemTestingQA.length > 0 || data.technicalSkills.tools.length > 0 || data.technicalSkills.consultingBusiness.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.technicalSkills.programming.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Programming:</Text><Text style={styles.skillValue}>{data.technicalSkills.programming.join(', ')}</Text></View>}
            {data.technicalSkills.databaseSQL.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Database/SQL:</Text><Text style={styles.skillValue}>{data.technicalSkills.databaseSQL.join(', ')}</Text></View>}
            {data.technicalSkills.apiIntegrationTesting.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>API/Testing:</Text><Text style={styles.skillValue}>{data.technicalSkills.apiIntegrationTesting.join(', ')}</Text></View>}
            {data.technicalSkills.systemTestingQA.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>System/QA:</Text><Text style={styles.skillValue}>{data.technicalSkills.systemTestingQA.join(', ')}</Text></View>}
            {data.technicalSkills.tools.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Tools:</Text><Text style={styles.skillValue}>{data.technicalSkills.tools.join(', ')}</Text></View>}
            {data.technicalSkills.consultingBusiness.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Business:</Text><Text style={styles.skillValue}>{data.technicalSkills.consultingBusiness.join(', ')}</Text></View>}
          </View>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {data.professionalExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.professionalExperience.map((exp) => (
              <View key={exp.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{exp.title} <Text style={styles.itemCompany}>| {exp.company}</Text></Text>
                  <Text style={styles.itemDates}>{exp.dates}</Text>
                </View>
                {exp.descriptionHtml && exp.descriptionHtml !== '<p><br></p>' && (
                  <View style={{ marginTop: 2 }}>
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
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projectExperience.map((proj) => (
              <View key={proj.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{proj.projectName}</Text>
                  <Text style={styles.itemDates}>{proj.dates}</Text>
                </View>
                {proj.techStack && <Text style={{ fontSize: 8, color: THEME_GRAY, marginBottom: 1, fontFamily: 'Helvetica-Oblique' }}>Stack: {proj.techStack}</Text>}
                {proj.descriptionHtml && proj.descriptionHtml !== '<p><br></p>' && (
                  <View style={{ marginTop: 1 }}>
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
                  <Text style={styles.itemTitle}>{edu.degree} - {edu.university}</Text>
                  <Text style={styles.itemDates}>{edu.expectedYear}</Text>
                </View>
                {edu.relevantAreas && <Text style={{ marginTop: 1, color: THEME_GRAY, fontSize: 8.5 }}>Relevant: {edu.relevantAreas}</Text>}
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
};
