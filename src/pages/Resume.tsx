import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { Download, Code } from "lucide-react";
import { SKILLS_DATA } from "../content/SkillsData";
import { ExperienceSection } from "../components/resume/ExperienceSection";
import { EducationSection } from "../components/resume/EducationSection";
import { ResumeProjectsSection } from "../components/resume/ResumeProjectsSection";
import { ResumeCertificationsSection } from "../components/resume/ResumeCertificationsSection";
import { PROFILE_CONFIG } from "../config/profile";

const PROFILE_LABELS: Record<string, { en: string; pt: string }> = {
  general: { en: "Translation Resume", pt: "Currículo de Tradução" },
};

const SCROLL_DELAY_MS = 100;

export const Resume = () => {
  const { hash } = useLocation();
  const { locale } = useIntl();

  const availableProfiles = PROFILE_CONFIG.availableCvDownloads || ["general"];
  const [selectedDownloadProfile, setSelectedDownloadProfile] = useState(availableProfiles[0] || "general");

  useEffect(() => {
    if (hash) {
      const targetId = hash.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const scrollTimeout = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, SCROLL_DELAY_MS);
        return () => clearTimeout(scrollTimeout);
      }
    }
  }, [hash]);

  const categories = Array.from(
    new Set(SKILLS_DATA.map((s) => s.categoryKey)),
  );
  const skillsList = categories.map((cat) => ({
    category: cat,
    items: SKILLS_DATA
      .filter((s) => s.categoryKey === cat)
      .map((s) => s.name),
  }));

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in-up">
      {/* Cabeçalho */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-accent text-xs tracking-widest uppercase">
            Curriculum Vitae
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
            <FormattedMessage id="resume.title" />
          </h1>
        </div>

        {/* Botão de Download com seletor opcional de perfil */}
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-end gap-3 self-center">
          {availableProfiles.length > 1 && (
            <div className="flex flex-col text-left">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">
                {locale === "pt" ? "Versão do Currículo" : "Resume Version"}
              </label>
              <select
                value={selectedDownloadProfile}
                onChange={(e) => setSelectedDownloadProfile(e.target.value)}
                className="bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-accent cursor-pointer min-w-[150px]"
              >
                {availableProfiles.map((pId) => (
                  <option key={pId} value={pId} className="bg-bg text-text">
                    {PROFILE_LABELS[pId]?.[locale === "pt" ? "pt" : "en"] || pId}
                  </option>
                ))}
              </select>
            </div>
          )}

          <a
            href={
              selectedDownloadProfile === "general"
                ? `/assets/resume_${locale === "pt" ? "pt" : "en"}.pdf`
                : `/assets/resume_${selectedDownloadProfile}_${locale === "pt" ? "pt" : "en"}.pdf`
            }
            download={
              locale === "pt"
                ? `Curriculo_Diogo_Medeiros${selectedDownloadProfile === "general" ? "" : "_" + selectedDownloadProfile}.pdf`
                : `Resume_Diogo_Medeiros${selectedDownloadProfile === "general" ? "" : "_" + selectedDownloadProfile}.pdf`
            }
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-accent border border-accent text-accent-text hover:bg-accent-hover font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer btn-shimmer select-none"
          >
            <Download size={18} />
            <FormattedMessage
              id="resume.download"
              defaultMessage="Download CV (PDF)"
            />
          </a>
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid lg:grid-cols-12 gap-12">
        {/* Lado Esquerdo (Timeline): Experiência, Educação, Projetos */}
        <div className="lg:col-span-8 space-y-12">
          <ExperienceSection />
          <EducationSection />
          <ResumeProjectsSection locale={locale} />
        </div>

        {/* Lado Direito: Habilidades, Certificações */}
        <div className="lg:col-span-4 space-y-8">
          {/* Habilidades */}
          <div className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Code className="text-accent" size={22} />
              <FormattedMessage
                id="resume.section.skills"
                defaultMessage="Skills"
              />
            </h2>

            {skillsList.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                  <FormattedMessage id={skillGroup.category} />
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:border-accent/40 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <ResumeCertificationsSection locale={locale} />
        </div>
      </div>
    </main>
  );
};

