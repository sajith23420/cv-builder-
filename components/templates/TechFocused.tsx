import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import Html from 'react-pdf-html';
import { CVData } from '@/store/useCVStore';

const THEME_ACCENT = '#2563eb'; // Royal Blue
const THEME_DARK = '#1e293b';
const THEME_GRAY = '#64748b';
const THEME_LIGHT_BG = '#f8fafc';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: '#334155',
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: THEME_DARK,
    paddingBottom: 15
  },
  headerLeft: {
    flex: 1
  },
  headerRight: {
    width: 200,
    textAlign: 'right'
  },
  name: {
    fontSize: 28,
    color: THEME_DARK,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    marginBottom: 4,
    lineHeight: 1
  },
  title: {
    fontSize: 14,
    color: THEME_ACCENT,
    fontFamily: 'Courier-Bold', // Monospaced accent
    marginBottom: 8
  },
  contactItem: {
    fontSize: 9,
    color: THEME_GRAY,
    marginBottom: 3,
    fontFamily: 'Courier' // Monospaced links
  },
  link: {
    color: THEME_ACCENT,
    textDecoration: 'none'
  },
  section: { marginTop: 15 },
  sectionTitleBox: {
    backgroundColor: THEME_DARK,
    padding: 4,
    paddingLeft: 8,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 11,
    color: '#ffffff',
    fontFamily: 'Courier-Bold',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  techSkillBadge: {
    backgroundColor: THEME_LIGHT_BG,
    padding: '3 6',
    marginRight: 6,
    marginBottom: 6,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '#e2e8f0'
  },
  techSkillText: {
    fontFamily: 'Courier',
    fontSize: 9,
    color: THEME_DARK
  },
  skillCategoryBox: {
    marginBottom: 8
  },
  skillCategoryTitle: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: THEME_DARK,
    marginBottom: 4
  },
  skillFlexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  itemBlock: { marginBottom: 12 },
  itemHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  itemTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: THEME_DARK },
  itemCompany: { fontSize: 10, fontFamily: 'Helvetica', color: THEME_GRAY },
  itemDates: { fontSize: 10, fontFamily: 'Courier', color: THEME_ACCENT }, // Monospaced dates
  educationRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
});

// Styles for the HTML parser inside PDF
const htmlStyles = {
  p: { margin: 0, padding: 0, marginBottom: 4, textAlign: 'justify', fontSize: 10, lineHeight: 1.5, color: '#334155' },
  ul: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 10, lineHeight: 1.5, color: '#334155' },
  ol: { margin: 0, padding: 0, marginLeft: 12, marginBottom: 4, fontSize: 10, lineHeight: 1.5, color: '#334155' },
  li: { margin: 0, padding: 0, marginBottom: 2 },
  strong: { fontFamily: 'Helvetica-Bold', color: THEME_DARK },
  em: { fontFamily: 'Helvetica-Oblique' },
  u: { textDecoration: 'underline' },
};

export const TechFocused = ({ data }: { data: CVData }) => {
  const formatJobTitle = (title: string) => {
    if (!title) return null;
    return title.split(',').map(t => t.trim()).join(' // ');
  };

  const renderSkillBadges = (skillsString: string[]) => {
    if (!skillsString || skillsString.length === 0) return null;
    // Assume it might be an array of strings like ["React, Node, TypeScript"]
    const skills = skillsString.join(',').split(',').map(s => s.trim()).filter(Boolean);
    return skills.map((skill, idx) => (
      <View key={idx} style={styles.techSkillBadge}>
        <Text style={styles.techSkillText}>{skill}</Text>
      </View>
    ));
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{data.personalInfo.fullName || 'YOUR_NAME'}</Text>
            {data.personalInfo.title && <Text style={styles.title}>&gt; {formatJobTitle(data.personalInfo.title)}</Text>}
          </View>
          <View style={styles.headerRight}>
            {data.personalInfo.github && <Text style={styles.contactItem}>gh: <Link style={styles.link} src={data.personalInfo.github.startsWith('http') ? data.personalInfo.github : `https://${data.personalInfo.github}`}>{data.personalInfo.github.replace(/^https?:\/\//, '')}</Link></Text>}
            {data.personalInfo.linkedin && <Text style={styles.contactItem}>in: <Link style={styles.link} src={data.personalInfo.linkedin.startsWith('http') ? data.personalInfo.linkedin : `https://${data.personalInfo.linkedin}`}>{data.personalInfo.linkedin.replace(/^https?:\/\//, '')}</Link></Text>}
            {data.personalInfo.email && <Text style={styles.contactItem}>em: <Link style={styles.link} src={`mailto:${data.personalInfo.email}`}>{data.personalInfo.email}</Link></Text>}
            {data.personalInfo.phone && <Text style={styles.contactItem}>ph: {data.personalInfo.phone}</Text>}
            {data.personalInfo.location && <Text style={styles.contactItem}>lo: {data.personalInfo.location}</Text>}
          </View>
        </View>

        {/* PROFESSIONAL SUMMARY */}
        {data.professionalSummaryHtml && data.professionalSummaryHtml !== '<p><br></p>' && (
          <View style={styles.section}>
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>~/profile</Text></View>
            <Html stylesheet={htmlStyles}>{data.professionalSummaryHtml}</Html>
          </View>
        )}

        {/* TECHNICAL SKILLS */}
        {(data.technicalSkills.programming.length > 0 || data.technicalSkills.databaseSQL.length > 0 || data.technicalSkills.apiIntegrationTesting.length > 0 || data.technicalSkills.systemTestingQA.length > 0 || data.technicalSkills.tools.length > 0) && (
          <View style={styles.section}>
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>~/skills</Text></View>
            
            {data.technicalSkills.programming.length > 0 && (
              <View style={styles.skillCategoryBox}>
                <Text style={styles.skillCategoryTitle}>Languages & Frameworks</Text>
                <View style={styles.skillFlexRow}>{renderSkillBadges(data.technicalSkills.programming)}</View>
              </View>
            )}
            {data.technicalSkills.databaseSQL.length > 0 && (
              <View style={styles.skillCategoryBox}>
                <Text style={styles.skillCategoryTitle}>Databases</Text>
                <View style={styles.skillFlexRow}>{renderSkillBadges(data.technicalSkills.databaseSQL)}</View>
              </View>
            )}
            {data.technicalSkills.tools.length > 0 && (
              <View style={styles.skillCategoryBox}>
                <Text style={styles.skillCategoryTitle}>Tools & Cloud</Text>
                <View style={styles.skillFlexRow}>{renderSkillBadges(data.technicalSkills.tools)}</View>
              </View>
            )}
          </View>
        )}

        {/* PROFESSIONAL EXPERIENCE */}
        {data.professionalExperience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>~/experience</Text></View>
            {data.professionalExperience.map((exp) => (
              <View key={exp.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{exp.title} <Text style={styles.itemCompany}>@ {exp.company}</Text></Text>
                  <Text style={styles.itemDates}>[{exp.dates}]</Text>
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
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>~/projects</Text></View>
            {data.projectExperience.map((proj) => (
              <View key={proj.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{proj.projectName}</Text>
                  <Text style={styles.itemDates}>[{proj.dates}]</Text>
                </View>
                {proj.techStack && (
                  <View style={[styles.skillFlexRow, { marginTop: 4, marginBottom: 4 }]}>
                    {renderSkillBadges([proj.techStack])}
                  </View>
                )}
                {proj.descriptionHtml && proj.descriptionHtml !== '<p><br></p>' && (
                  <View style={{ marginTop: 2 }}>
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
            <View style={styles.sectionTitleBox}><Text style={styles.sectionTitle}>~/education</Text></View>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.itemBlock}>
                <View style={styles.itemHeaderRow}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDates}>[{edu.expectedYear}]</Text>
                </View>
                <Text style={styles.itemCompany}>{edu.university}</Text>
                {edu.relevantAreas && <Text style={{ marginTop: 2, color: THEME_GRAY, fontFamily: 'Courier', fontSize: 9 }}>Relevant: {edu.relevantAreas}</Text>}
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
};
