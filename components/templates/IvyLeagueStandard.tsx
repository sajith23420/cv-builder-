import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { CVData } from '@/store/useCVStore';

const THEME_DARK = '#000000';
const THEME_GRAY = '#333333';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    color: THEME_DARK,
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center'
  },
  name: {
    fontSize: 22,
    color: THEME_DARK,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    marginBottom: 4,
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    fontSize: 10,
    color: THEME_DARK,
    marginTop: 4,
  },
  link: {
    color: THEME_DARK,
    textDecoration: 'none'
  },
  section: { marginTop: 12, marginBottom: 4 },
  sectionTitle: {
    fontSize: 12,
    color: THEME_DARK,
    fontFamily: 'Times-Bold',
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: THEME_DARK,
    paddingBottom: 2,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  skillRow: { flexDirection: 'row', marginBottom: 2 },
  skillLabel: { width: 140, fontFamily: 'Times-Bold', color: THEME_DARK },
  skillValue: { flex: 1 },
  itemBlock: { marginBottom: 12 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  itemTitle: { fontSize: 11, fontFamily: 'Times-Bold', color: THEME_DARK },
  itemCompany: { fontSize: 11, fontFamily: 'Times-Italic', color: THEME_DARK },
  itemDates: { fontSize: 10, color: THEME_DARK },
  bulletList: { paddingLeft: 14 },
  bulletItem: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { width: 14, fontFamily: 'Times-Roman' },
  bulletText: { flex: 1 },
});

// Styles for the HTML parser inside PDF
const htmlStyles = {
  p: { margin: 0, padding: 0, marginBottom: 4, textAlign: 'justify', fontSize: 11, lineHeight: 1.4, fontFamily: 'Times-Roman' },
  ul: { margin: 0, padding: 0, marginLeft: 14, marginBottom: 4, fontSize: 11, lineHeight: 1.4, fontFamily: 'Times-Roman' },
  ol: { margin: 0, padding: 0, marginLeft: 14, marginBottom: 4, fontSize: 11, lineHeight: 1.4, fontFamily: 'Times-Roman' },
  li: { margin: 0, padding: 0, marginBottom: 2 },
  strong: { fontFamily: 'Times-Bold' },
  em: { fontFamily: 'Times-Italic' },
  u: { textDecoration: 'underline' },
};

export const IvyLeagueStandard = ({ data }: { data: CVData }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <View wrap={true}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.name}>{data.personalInfo.fullName || 'YOUR NAME'}</Text>
          <View style={styles.contactRow}>
            {[
              data.personalInfo.location && <Text>{data.personalInfo.location}</Text>,
              data.personalInfo.phone && <Text>{data.personalInfo.phone}</Text>,
              data.personalInfo.email && <Link style={styles.link} src={`mailto:${data.personalInfo.email}`}>{data.personalInfo.email}</Link>,
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

        {/* EDUCATION (Academic formats typically put Education first) */}
        {data.visibleSections?.education !== false && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{edu.university}</Text>
                  <Text style={styles.itemDates}>{edu.expectedYear}</Text>
                </View>
                <Text style={styles.itemCompany}>{edu.degree}</Text>
                {edu.relevantAreas && <Text style={{ marginTop: 2, color: THEME_GRAY, fontSize: 10 }}>Relevant Coursework: {edu.relevantAreas}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {data.visibleSections?.experience !== false && data.professionalExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.professionalExperience.map((exp) => (
              <View key={exp.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={styles.itemTitle}>{exp.company}</Text>
                    <Text style={{ marginHorizontal: 4 }}>—</Text>
                    <Text style={styles.itemCompany}>{exp.title}</Text>
                  </View>
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
        {data.visibleSections?.projects !== false && data.projectExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projectExperience.map((proj) => (
              <View key={proj.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text style={styles.itemTitle}>{proj.projectName}</Text>
                    {proj.techStack && (
                      <Text style={{ fontSize: 10, color: THEME_GRAY, fontFamily: 'Times-Italic', marginLeft: 6 }}>
                        ({proj.techStack})
                      </Text>
                    )}
                  </View>
                  <Text style={styles.itemDates}>{proj.dates}</Text>
                </View>
                {proj.descriptionHtml && proj.descriptionHtml !== '<p><br></p>' && (
                  <View style={{ marginTop: 2 }}>
                    <Html stylesheet={htmlStyles}>{proj.descriptionHtml}</Html>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* SKILLS */}
        {data.visibleSections?.skills !== false && (data.technicalSkills.programming.length > 0 || data.technicalSkills.databaseSQL.length > 0 || data.technicalSkills.apiIntegrationTesting.length > 0 || data.technicalSkills.systemTestingQA.length > 0 || data.technicalSkills.tools.length > 0 || data.technicalSkills.consultingBusiness.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills & Interests</Text>
            {data.technicalSkills.programming.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Programming:</Text><Text style={styles.skillValue}>{data.technicalSkills.programming.join(', ')}</Text></View>}
            {data.technicalSkills.databaseSQL.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Database/SQL:</Text><Text style={styles.skillValue}>{data.technicalSkills.databaseSQL.join(', ')}</Text></View>}
            {data.technicalSkills.apiIntegrationTesting.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>API/Testing:</Text><Text style={styles.skillValue}>{data.technicalSkills.apiIntegrationTesting.join(', ')}</Text></View>}
            {data.technicalSkills.systemTestingQA.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>System/QA:</Text><Text style={styles.skillValue}>{data.technicalSkills.systemTestingQA.join(', ')}</Text></View>}
            {data.technicalSkills.tools.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Tools:</Text><Text style={styles.skillValue}>{data.technicalSkills.tools.join(', ')}</Text></View>}
            {data.technicalSkills.consultingBusiness.length > 0 && <View style={styles.skillRow}><Text style={styles.skillLabel}>Business & Strategy:</Text><Text style={styles.skillValue}>{data.technicalSkills.consultingBusiness.join(', ')}</Text></View>}
          </View>
        )}

        {/* CERTIFICATIONS */}
        {data.visibleSections?.certifications !== false && (data.certifications && data.certifications.length > 0) && (
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
        {data.visibleSections?.references !== false && (data.references && data.references.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {data.references.map((ref) => (
                <View key={ref.id} style={{ width: '50%', marginBottom: 8 }}>
                  <Text style={styles.itemTitle}>{ref.name}</Text>
                  <Text style={{ fontSize: 10, fontFamily: 'Times-Italic', color: THEME_GRAY }}>
                    {ref.title}{ref.organization ? `, ${ref.organization}` : ''}
                  </Text>
                  {ref.email && <Text style={{ fontSize: 10, color: THEME_GRAY }}><Link style={styles.link} src={`mailto:${ref.email}`}>{ref.email}</Link></Text>}
                  {ref.phone && <Text style={{ fontSize: 10, color: THEME_GRAY }}>{ref.phone}</Text>}
                </View>
              ))}
            </View>
          </View>
        )}

        </View>
      </Page>
    </Document>
  );
};
