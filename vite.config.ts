/* eslint-disable @typescript-eslint/no-explicit-any */
import { defineConfig, type ViteDevServer } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    {
      name: 'dev-server-middleware',
      configureServer(server: ViteDevServer) {
        server.middlewares.use((req: any, res: any, next: any) => {
          if (req.url === '/api/save-content' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk: any) => {
              body += chunk;
            });
            req.on('end', () => {
              try {
                const payload = JSON.parse(body);
                const { projects, certifications, education, experience, skills, profileConfig, en, ptbr, generatePdfs = true } = payload;

                // Write profile.ts
                if (profileConfig) {
                  const profileContent = `/**\n * CONFIGURAÇÃO GLOBAL DO PERFIL E DOS LINKS DO PORTFÓLIO E CURRÍCULO (CV)\n * Estes campos definem os links externos, contatos e identidades do CV e do portfólio.\n */\nexport const PROFILE_CONFIG = {\n  // Nome completo exibido no portfólio e currículo\n  name: ${JSON.stringify(profileConfig.name)},\n  \n  // Email de contato principal para mensagens do portfólio\n  emailContact: ${JSON.stringify(profileConfig.emailContact)},\n  \n  // Email exibido no cabeçalho do Currículo (PDF e site)\n  emailResume: ${JSON.stringify(profileConfig.emailResume)},\n  \n  // URL completa do perfil do GitHub\n  githubUrl: ${JSON.stringify(profileConfig.githubUrl)},\n  \n  // URL completa do perfil do MobyGames\n  mobyGamesUrl: ${JSON.stringify(profileConfig.mobyGamesUrl || "https://www.mobygames.com/person/1420566/diogo-de-souza-medeiros/")},\n  \n  // Nome de usuário do GitHub (ex: ddmdros)\n  githubUser: ${JSON.stringify(profileConfig.githubUser)},\n  \n  // URL completa do perfil do LinkedIn\n  linkedinUrl: ${JSON.stringify(profileConfig.linkedinUrl)},\n  \n  // Nome de usuário do LinkedIn (ex: diogo-medeiros)\n  linkedinUser: ${JSON.stringify(profileConfig.linkedinUser)},\n  \n  // URL de produção do portfólio online (usado nos links de rodapé do PDF do CV)\n  portfolioUrl: ${JSON.stringify(profileConfig.portfolioUrl)},\n  \n  // Link do perfil público do Google Skills\n  googleSkillsProfile: ${JSON.stringify(profileConfig.googleSkillsProfile)},\n  \n  // Perfis de currículo liberados para download público no portfólio\n  availableCvDownloads: ${JSON.stringify(profileConfig.availableCvDownloads || ["general"])},\n  \n  // Links de rodapé das seções do currículo\n  cvProjectsMoreUrl: ${JSON.stringify(profileConfig.cvProjectsMoreUrl || "")},\n  cvProjectsMoreTextKey: ${JSON.stringify(profileConfig.cvProjectsMoreTextKey || "resume.project.more")},\n  cvProjectsMoreLinkKey: ${JSON.stringify(profileConfig.cvProjectsMoreLinkKey || "resume.project.more.link")},\n  cvCertsMoreUrl: ${JSON.stringify(profileConfig.cvCertsMoreUrl || "")},\n  cvCertsMoreTextKey: ${JSON.stringify(profileConfig.cvCertsMoreTextKey || "resume.cert.more")},\n  cvCertsMoreLinkKey: ${JSON.stringify(profileConfig.cvCertsMoreLinkKey || "resume.cert.more.link")}\n};\n\nexport type ProfileConfigType = typeof PROFILE_CONFIG;\n`;
                  fs.writeFileSync(path.resolve(__dirname, 'src/config/profile.ts'), profileContent);
                }

                // Write ProjectsData
                const projectsContent = `import { type ProjectType } from "../types/projectType";\n\nexport const PROJECTS_DATA: ProjectType[] = ${JSON.stringify(projects, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/ProjectsData.ts'), projectsContent);

                // Write CertificationsData
                const certsContent = `import { type CertificationType } from "../types/certificationType";\n\nexport const CERTIFICATIONS_DATA: CertificationType[] = ${JSON.stringify(certifications, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/CertificationsData.ts'), certsContent);

                // Write EducationData
                const eduContent = `export interface EducationCourse {\n  id: string;\n  titleEn: string;\n  titlePt: string;\n  subtitleEn?: string;\n  subtitlePt?: string;\n  completion: number;\n  certificateId?: string;\n  grade?: number;\n  expectedDateEn?: string;\n  expectedDatePt?: string;\n  isEmphasis?: boolean;\n  isCurrent?: boolean;\n}\n\nexport interface EducationLevel {\n  id: string;\n  titleEn: string;\n  titlePt: string;\n  descEn?: string;\n  descPt?: string;\n  courses: EducationCourse[];\n}\n\nexport interface EducationType {\n  id: string;\n  titleKey: string;\n  instKey: string;\n  dateKey: string;\n  gpaKey?: string;\n  showInResume: string[];\n  showInPortfolio?: boolean;\n  certificationIds?: string[];\n  levels?: EducationLevel[];\n  linkUrl?: string;\n  linkTextKey?: string;\n}\n\nexport const EDUCATION_DATA: EducationType[] = ${JSON.stringify(education, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/EducationData.ts'), eduContent);

                // Write ExperienceData
                const expContent = `export interface ExperienceType {\n  id: string;\n  titleKey: string;\n  companyKey: string;\n  dateKey: string;\n  descKeys: string[];\n  showInResume: string[];\n  portfolioUrlKey?: string;\n  linkUrl?: string;\n  linkTextKey?: string;\n}\n\nexport const EXPERIENCE_DATA: ExperienceType[] = ${JSON.stringify(experience, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/ExperienceData.ts'), expContent);

                // Write SkillsData
                const skillsContent = `export interface SkillType {\n  id: string;\n  categoryKey: string;\n  name: string;\n  showInResume: string[];\n  resumeDetailsKey?: string;\n  credentialUrl?: string;\n  certTextKey?: string;\n}\n\nexport const SKILLS_DATA: SkillType[] = ${JSON.stringify(skills, null, 2)};\n`;
                fs.writeFileSync(path.resolve(__dirname, 'src/content/SkillsData.ts'), skillsContent);

                // Auto-update resume.updated timestamp with current date and time
                const now = new Date();
                const monthNamesPt = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
                const monthNamesEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const day = now.getDate();
                const year = now.getFullYear();
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');

                if (ptbr) {
                  ptbr['resume.updated'] = `Atualizado em: ${day} de ${monthNamesPt[now.getMonth()]} de ${year} às ${hours}:${minutes}`;
                }
                if (en) {
                  en['resume.updated'] = `Updated to: ${monthNamesEn[now.getMonth()]} ${day}, ${year} at ${hours}:${minutes}`;
                }

                // Write translations
                fs.writeFileSync(path.resolve(__dirname, 'src/i18n/messages/en.json'), JSON.stringify(en, null, 2) + '\n');
                fs.writeFileSync(path.resolve(__dirname, 'src/i18n/messages/ptbr.json'), JSON.stringify(ptbr, null, 2) + '\n');

                if (generatePdfs) {
                  console.log('Successfully saved content files. Rebuilding PDF resumes...');
                  // Trigger PDF rebuild
                  execSync('node scripts/generate_pdfs.cjs', { stdio: 'inherit' });
                } else {
                  console.log('Successfully saved content files. Skipping PDF rebuild as requested (fast mode).');
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: true, pdfGenerated: generatePdfs }));
              } catch (err: any) {
                console.error('Error in /api/save-content:', err);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, error: err.message }));
              }
            });
            return;
          }
          next();
        });
      }
    }
  ]
})
