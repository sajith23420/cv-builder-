import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { CVData } from '@/store/useCVStore';

const THEME_ACCENT = '#475569'; // Slate Blue/Gray
const THEME_ACCENT_LIGHT = '#cbd5e1';
const THEME_DARK = '#0f172a';
const THEME_WHITE = '#ffffff';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#334155',
    backgroundColor: THEME_WHITE,
  },
  sidebar: {
    width: '32%',
    backgroundColor: THEME_ACCENT,
    color: THEME_WHITE,
    padding: 25,
    paddingRight: 20,
    minHeight: '100%',
  },
  main: {
    width: '68%',
    padding: 30,
    paddingLeft: 25,
  },
  name: {
    fontSize: 26,
    color: THEME_WHITE,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 6,
    lineHeight: 1.1
  },
  title: {
    fontSize: 12,
    color: THEME_ACCENT_LIGHT,
    fontFamily: 'Helvetica-Oblique',
    marginBottom: 20,
    lineHeight: 1.2
  },
  sidebarSectionTitle: {
    fontSize: 12,
    color: THEME_WHITE,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: THEME_ACCENT_LIGHT,
    paddingBottom: 2
  },
  contactItem: {
    marginBottom: 6,
    fontSize: 9,
    color: THEME_ACCENT_LIGHT
  },
  sidebarLink: {
    color: THEME_ACCENT_LIGHT,
    textDecoration: 'none'
  },
  skillGroup: {
    marginBottom: 10
  },
  skillLabel: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    marginBottom: 2,
    color: THEME_WHITE
  },
  skillText: {
    fontSize: 9,
    color: THEME_ACCENT_LIGHT,
    lineHeight: 1.3
  },
  sectionTitle: {
    fontSize: 14,
    color: THEME_ACCENT,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15
  },
  itemBlock: { marginBottom: 12 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 2 },
  itemTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: THEME_DARK },
  itemCompany: { fontSize: 10, fontFamily: 'Helvetica-Oblique', color: THEME_ACCENT },
  itemDates: { fontSize: 9, color: THEME_ACCENT },
  bulletList: { paddingLeft: 10 },
  bulletItem: { flexDirection: 'row', marginBottom: 2 },
  bulletPoint: { width: 10, fontFamily: 'Helvetica-Bold' },
  bulletText: { flex: 1 },
});

// Styles for the HTML parser inside PDF
const htmlStyles = {
  p: { margin: 0, padding: 0, marginBottom: 4, textAlign: 'justify', fontSize: 10, lineHeight: 1.5, color: '#334155' },
  ul: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 10, lineHeight: 1.5, color: '#334155' },
  ol: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 10, lineHeight: 1.5, color: '#334155' },
  li: { margin: 0, padding: 0, marginBottom: 2 },
  strong: { fontFamily: 'Helvetica-Bold', color: THEME_DARK },
  em: { fontFamily: 'Helvetica-Oblique' },
};

export const CreativeProfessional = ({ data }: { data: CVData }) => {
  const formatJobTitle = (title: string) => {
    if (!title) return null;
    return title.split(',').map(t => t.trim()).join(' • ');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>

        {/* SIDEBAR */}
        <View style={styles.sidebar} wrap={true}>
          <Text style={styles.name}>{data.personalInfo.fullName || 'YOUR NAME'}</Text>
          {data.personalInfo.title && <Text style={styles.title}>{formatJobTitle(data.personalInfo.title)}</Text>}
          
          <Text style={styles.sidebarSectionTitle}>Contact</Text>
          {data.personalInfo.email && <Text style={styles.contactItem}><Link style={styles.sidebarLink} src={`mailto:${data.personalInfo.email}`}>{data.personalInfo.email}</Link></Text>}
          {data.personalInfo.phone && <Text style={styles.contactItem}>{data.personalInfo.phone}</Text>}
          {data.personalInfo.location && <Text style={styles.contactItem}>{data.personalInfo.location}</Text>}
          {data.personalInfo.linkedin && <Text style={styles.contactItem}><Link style={styles.sidebarLink} src={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`}>{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</Link></Text>}
          {data.personalInfo.github && <Text style={styles.contactItem}><Link style={styles.sidebarLink} src={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`}>{data.personalInfo.github.replace(/^https?:\/\//, '')}</Link></Text>}

          {data.visibleSections?.skills !== false && (data.technicalSkills.programming.length > 0 || data.technicalSkills.databaseSQL.length > 0 || data.technicalSkills.apiIntegrationTesting.length > 0 || data.technicalSkills.systemTestingQA.length > 0 || data.technicalSkills.tools.length > 0 || data.technicalSkills.consultingBusiness.length > 0) && (
            <>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {data.technicalSkills.programming.length > 0 && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillLabel}>Programming</Text>
                  <Text style={styles.skillText}>{data.technicalSkills.programming.join(', ')}</Text>
                </View>
              )}
              {data.technicalSkills.databaseSQL.length > 0 && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillLabel}>Database & SQL</Text>
                  <Text style={styles.skillText}>{data.technicalSkills.databaseSQL.join(', ')}</Text>
                </View>
              )}
              {data.technicalSkills.apiIntegrationTesting.length > 0 && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillLabel}>API & Testing</Text>
                  <Text style={styles.skillText}>{data.technicalSkills.apiIntegrationTesting.join(', ')}</Text>
                </View>
              )}
              {data.technicalSkills.tools.length > 0 && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillLabel}>Tools</Text>
                  <Text style={styles.skillText}>{data.technicalSkills.tools.join(', ')}</Text>
                </View>
              )}
              {data.technicalSkills.consultingBusiness.length > 0 && (
                <View style={styles.skillGroup}>
                  <Text style={styles.skillLabel}>Consulting & Business</Text>
                  <Text style={styles.skillText}>{data.technicalSkills.consultingBusiness.join(', ')}</Text>
                </View>
              )}
            </>
          )}

          {data.visibleSections?.education !== false && data.education.length > 0 && (
            <>
              <Text style={styles.sidebarSectionTitle}>Education</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={{ marginBottom: 10 }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, color: THEME_WHITE, marginBottom: 2 }}>{edu.degree}</Text>
                  <Text style={{ fontSize: 9, color: THEME_ACCENT_LIGHT, fontFamily: 'Helvetica-Oblique' }}>{edu.university}</Text>
                  <Text style={{ fontSize: 9, color: THEME_ACCENT_LIGHT, marginTop: 2 }}>{edu.expectedYear}</Text>
                </View>
              ))}
            </>
          )}

        </View>

        {/* MAIN CONTENT */}
        <View style={styles.main} wrap={true}>
          
          {/* PROFESSIONAL SUMMARY */}
          {data.visibleSections?.summary !== false && data.professionalSummaryHtml && data.professionalSummaryHtml !== '<p><br></p>' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Html stylesheet={htmlStyles}>{data.professionalSummaryHtml}</Html>
            </View>
          )}

          {/* PROFESSIONAL EXPERIENCE */}
          {data.visibleSections?.experience !== false && data.professionalExperience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Experience</Text>
              {data.professionalExperience.map((exp) => (
                <View key={exp.id} style={styles.itemBlock}>
                  <View style={styles.itemHeaderRow}>
                    <Text style={styles.itemTitle}>{exp.title}</Text>
                    <Text style={styles.itemDates}>{exp.dates}</Text>
                  </View>
                  <Text style={styles.itemCompany}>{exp.company}</Text>
                  {exp.descriptionHtml && exp.descriptionHtml !== '<p><br></p>' && (
                    <View style={{ marginTop: 6 }}>
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
                    <Text style={styles.itemTitle}>{proj.projectName}</Text>
                    <Text style={styles.itemDates}>{proj.dates}</Text>
                  </View>
                  {proj.techStack && <Text style={{ fontSize: 9, color: THEME_ACCENT, marginBottom: 4, fontFamily: 'Helvetica-Oblique' }}>{proj.techStack}</Text>}
                  {proj.descriptionHtml && proj.descriptionHtml !== '<p><br></p>' && (
                    <View style={{ marginTop: 2 }}>
                      <Html stylesheet={htmlStyles}>{proj.descriptionHtml}</Html>
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* CERTIFICATIONS & TRAINING */}
          {data.visibleSections?.certifications !== false && (data.certifications && data.certifications.length > 0) && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
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
              {data.references.map((ref) => (
                <View key={ref.id} style={{ marginBottom: 8 }}>
                  <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10, color: THEME_DARK }}>{ref.name}</Text>
                  <Text style={{ fontFamily: 'Helvetica-Oblique', fontSize: 9, color: THEME_ACCENT }}>
                    {ref.title}{ref.title && ref.organization ? ', ' : ''}{ref.organization}
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    {ref.phone && <Text style={{ fontSize: 9, color: '#475569', marginRight: 10 }}>{ref.phone}</Text>}
                    {ref.email && <Link style={{ fontSize: 9, color: THEME_ACCENT, textDecoration: 'none' }} src={`mailto:${ref.email}`}>{ref.email}</Link>}
                  </View>
                </View>
              ))}
            </View>
          )}

        </View>

      </Page>
    </Document>
  );
};
