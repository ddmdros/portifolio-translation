/**
 * CONFIGURAÇÃO GLOBAL DO PERFIL E DOS LINKS DO PORTFÓLIO E CURRÍCULO (CV)
 * Estes campos definem os links externos, contatos e identidades do CV e do portfólio.
 */
export const PROFILE_CONFIG = {
  // Nome completo exibido no portfólio e currículo
  name: "Diogo Medeiros",
  
  // Email de contato principal para mensagens do portfólio
  emailContact: "diogomedeirostranslation@gmail.com",
  
  // Email exibido no cabeçalho do Currículo (PDF e site)
  emailResume: "diogomedeirostranslation@gmail.com",
  
  // URL completa do perfil do GitHub
  githubUrl: "https://github.com/ddmdros",
  
  // URL completa do perfil do MobyGames
  mobyGamesUrl: "https://www.mobygames.com/person/1420566/diogo-de-souza-medeiros/",
  
  // Nome de usuário do GitHub (ex: ddmdros)
  githubUser: "ddmdros",
  
  // URL completa do perfil do LinkedIn
  linkedinUrl: "https://www.linkedin.com/in/diogo-medeiros/",
  
  // Nome de usuário do LinkedIn (ex: diogo-medeiros)
  linkedinUser: "diogo-medeiros",
  
  // URL de produção do portfólio online (usado nos links de rodapé do PDF do CV)
  portfolioUrl: "https://portifolio-translation.vercel.app",
  
  // Link do perfil público do Google Skills
  googleSkillsProfile: "https://www.skills.google/public_profiles/34ba9945-3ca3-4701-9312-d811fca01bf7",
  
  // Perfis de currículo liberados para download público no portfólio
  availableCvDownloads: ["general"],
  
  // Links de rodapé das seções do currículo
  cvProjectsMoreUrl: "",
  cvProjectsMoreTextKey: "More Projects",
  cvProjectsMoreLinkKey: "https://diogomedeiros.carrd.co",
  cvCertsMoreUrl: "",
  cvCertsMoreTextKey: "More Certifications",
  cvCertsMoreLinkKey: "https://diogomedeiros.carrd.co"
};

export type ProfileConfigType = typeof PROFILE_CONFIG;
