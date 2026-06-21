import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { CVData } from '@/store/useCVStore';

const THEME_DARK = '#000000';
const THEME_GRAY = '#333333';
const THEME_LIGHT_GRAY = '#666666';

const styles = StyleSheet.create({
  page: {
    padding: 35,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: THEME_DARK,
    lineHeight: 1.3,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 15,
    alignItems: 'center',
    textAlign: 'center'
  },
  name: {
    fontSize: 24,
    color: THEME_DARK,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    marginBottom: 4,
    lineHeight: 1
  },
  title: {
    fontSize: 14,
    color: THEME_GRAY,
    fontFamily: 'Times-Italic',
    marginBottom: 8
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 10,
    color: THEME_DARK
  },
  link: {
    color: THEME_DARK,
    textDecoration: 'none'
  },
  section: { marginTop: 15 },
  sectionTitle: {
    fontSize: 12,
    color: THEME_DARK,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: THEME_DARK,
    paddingBottom: 2,
    marginBottom: 8
  },
  skillRow: { flexDirection: 'row', marginBottom: 2 },
  skillLabel: { width: 130, fontFamily: 'Times-Bold', color: THEME_DARK },
  skillValue: { flex: 1 },
  itemBlock: { marginBottom: 10 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' },
  itemTitle: { fontSize: 12, fontFamily: 'Times-Bold', color: THEME_DARK },
  itemCompany: { fontFamily: 'Times-Italic', color: THEME_DARK },
  itemDates: { fontSize: 11, color: THEME_DARK },
  educationRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 2 },
  bulletList: { paddingLeft: 12 },
  bulletItem: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { width: 12, fontFamily: 'Times-Bold' },
  bulletText: { flex: 1 },
  referenceBlock: { marginBottom: 8, width: '48%' },
  referenceName: { fontFamily: 'Times-Bold', color: THEME_DARK, fontSize: 11 },
  referenceTitleOrg: { fontFamily: 'Times-Italic', color: THEME_DARK, marginBottom: 1 },
  referenceContact: { color: THEME_LIGHT_GRAY, fontSize: 10 }
});

// Styles for the HTML parser inside PDF
const htmlStyles = {
  p: { margin: 0, padding: 0, marginBottom: 4, textAlign: 'justify', fontSize: 11, lineHeight: 1.4, fontFamily: 'Times-Roman' },
  ul: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 11, lineHeight: 1.4, fontFamily: 'Times-Roman' },
  ol: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 11, lineHeight: 1.4, fontFamily: 'Times-Roman' },
  li: { margin: 0, padding: 0, marginBottom: 2 },
  strong: { fontFamily: 'Times-Bold' },
  em: { fontFamily: 'Times-Italic' },
  u: { textDecoration: 'underline' },
};

export const ExecutiveTraditional = ({ data }: { data: CVData }) => {
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
                {index !== 0 && <Text style={{ marginHorizontal: 8 }}>|</Text>}
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

        {/* PROFESSIONAL EXPERIENCE */}
        {data.professionalExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.professionalExperience.map((exp) => (
              <View key={exp.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{exp.title} <Text style={styles.itemCompany}>— {exp.company}</Text></Text>
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
            <Text style={styles.sectionTitle}>Select Projects</Text>
            {data.projectExperience.map((proj) => (
              <View key={proj.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{proj.projectName}</Text>
                  <Text style={styles.itemDates}>{proj.dates}</Text>
                </View>
                {proj.techStack && <Text style={{ fontSize: 10, color: THEME_LIGHT_GRAY, marginBottom: 2, fontFamily: 'Times-Italic' }}>Technologies: {proj.techStack}</Text>}
                {proj.descriptionHtml && proj.descriptionHtml !== '<p><br></p>' && (
                  <View style={{ marginTop: 2 }}>
                    <Html stylesheet={htmlStyles}>{proj.descriptionHtml}</Html>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* TECHNICAL SKILLS */}
        {(data.technicalSkills.programming.length > 0 || data.technicalSkills.databaseSQL.length > 0 || data.technicalSkills.apiIntegrationTesting.length > 0 || data.technicalSkills.systemTestingQA.length > 0 || data.technicalSkills.tools.length > 0 || data.technicalSkills.consultingBusiness.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Core Competencies & Skills</Text>
            {data.technicalSkills.programming.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Programming:</Text><Text style={styles.skillValue}>{data.technicalSkills.programming.join(', ')}</Text></View>}
            {data.technicalSkills.databaseSQL.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Database & SQL:</Text><Text style={styles.skillValue}>{data.technicalSkills.databaseSQL.join(', ')}</Text></View>}
            {data.technicalSkills.apiIntegrationTesting.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>API & Testing:</Text><Text style={styles.skillValue}>{data.technicalSkills.apiIntegrationTesting.join(', ')}</Text></View>}
            {data.technicalSkills.systemTestingQA.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>System Testing & QA:</Text><Text style={styles.skillValue}>{data.technicalSkills.systemTestingQA.join(', ')}</Text></View>}
            {data.technicalSkills.tools.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Tools:</Text><Text style={styles.skillValue}>{data.technicalSkills.tools.join(', ')}</Text></View>}
            {data.technicalSkills.consultingBusiness.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Consulting & Business:</Text><Text style={styles.skillValue}>{data.technicalSkills.consultingBusiness.join(', ')}</Text></View>}
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
                {edu.relevantAreas && <Text style={{ marginTop: 2, color: THEME_LIGHT_GRAY }}>Relevant Areas: {edu.relevantAreas}</Text>}
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
