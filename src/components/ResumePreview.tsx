import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { SectionDiv } from "./SectionDiv";
import { GraduationCap, Briefcase, ArrowRight, Sparkles } from "lucide-react";
import { EDUCATION_DATA } from "../content/EducationData";
import { EXPERIENCE_DATA } from "../content/ExperienceData";
import { PROJECTS_DATA } from "../content/ProjectsData";

const ResumePreview = () => {
  const navigate = useNavigate();
  const { locale } = useIntl();
  const creditedGamesCount = PROJECTS_DATA.filter(
    (p) => p.mobyGamesUrl || p.creditImageUrl
  ).length;

  return (
    <section className="py-20 border-t border-white/5">
      <SectionDiv sectionNumber="03" sectionTitleId="section.title.3" />

      {/* Cabeçalho da seção alinhado com o padrão das páginas internas */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-text-h tracking-tight max-w-xl">
          <FormattedMessage id="home.resume.preview.title" />
        </h2>
        <Link
          to={`/${locale}/resume`}
          className="self-start md:self-center inline-flex items-center gap-2 bg-accent-subtle border border-accent text-accent hover:bg-accent hover:text-black font-bold py-2.5 px-5 rounded-xl transition-all cursor-pointer whitespace-nowrap"
        >
          <FormattedMessage id="home.resume.preview.button" defaultMessage="View Full Resume" />
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Grid de Destaques em largura total */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Card 1: Experiência */}
        <div onClick={() => navigate(`/${locale}/resume#experience`)} className="group bg-card-bg border border-white/10 p-6 rounded-2xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full cursor-pointer">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                <Briefcase size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  <FormattedMessage id={EXPERIENCE_DATA[0].companyKey} />
                </h3>
                <span className="text-xs text-accent font-medium font-mono">
                  <FormattedMessage id={EXPERIENCE_DATA[0].dateKey} />
                </span>
              </div>
            </div>
            
            <div className="pl-[52px] space-y-1">
              <p className="text-sm text-gray-300 font-semibold">
                <FormattedMessage id={EXPERIENCE_DATA[0].titleKey} />
              </p>
              <p className="text-xs text-gray-500 leading-relaxed">
                <FormattedMessage id={EXPERIENCE_DATA[0].descKeys[0]} />
              </p>
            </div>
          </div>
        </div>

        {/* Card 2: Formação Acadêmica Agregada (Pós + Jornalismo) */}
        <div onClick={() => navigate(`/${locale}/resume#education`)} className="group bg-card-bg border border-white/10 p-6 rounded-2xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full cursor-pointer">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  <FormattedMessage id="resume.section.education" defaultMessage="Education" />
                </h3>
                <span className="text-xs text-accent font-medium font-mono">
                  Estácio de Sá & UFSC
                </span>
              </div>
            </div>
            
            <div className="pl-[52px] space-y-3">
              <div className="border-l border-accent/30 pl-3 space-y-0.5">
                <p className="text-sm font-semibold text-gray-200">
                  <FormattedMessage id={EDUCATION_DATA[0].titleKey} />
                </p>
                <p className="text-xs text-gray-400">
                  Estácio de Sá &bull; <FormattedMessage id={EDUCATION_DATA[0].dateKey} />
                </p>
              </div>

              <div className="border-l border-white/10 pl-3 space-y-0.5">
                <p className="text-sm font-semibold text-gray-200">
                  <FormattedMessage id={EDUCATION_DATA[1].titleKey} />
                </p>
                <p className="text-xs text-gray-400">
                  UFSC &bull; <FormattedMessage id={EDUCATION_DATA[1].dateKey} />
                </p>
                {EDUCATION_DATA[1].gpaKey && (
                  <p className="text-[11px] text-gray-500">
                    <FormattedMessage id={EDUCATION_DATA[1].gpaKey} />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Impacto e Métricas (Jogos Creditados + Palavras) */}
        <div onClick={() => navigate(`/${locale}/projects`)} className="group bg-card-bg border border-white/10 p-6 rounded-2xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full cursor-pointer">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  <FormattedMessage id="home.resume.preview.stats.title" defaultMessage="Metrics & Impact" />
                </h3>
                <span className="text-xs text-accent font-medium font-mono">
                  <FormattedMessage id="home.resume.preview.stats.subtitle" defaultMessage="Portfolio Highlights" />
                </span>
              </div>
            </div>
            
            <div className="pl-[52px] space-y-3">
              <div className="border-l border-accent/30 pl-3 space-y-0.5">
                <p className="text-base font-bold text-white">
                  <FormattedMessage
                    id="home.resume.preview.stats.credited"
                    values={{ count: creditedGamesCount }}
                    defaultMessage="{count} Credited Games"
                  />
                </p>
                <p className="text-xs text-gray-400">
                  Destiny 2, Skygard Arena & mais
                </p>
              </div>

              <div className="border-l border-white/10 pl-3 space-y-0.5">
                <p className="text-base font-bold text-white">
                  <FormattedMessage
                    id="home.resume.preview.stats.words"
                    defaultMessage="Over 1 million words localized"
                  />
                </p>
                <p className="text-xs text-gray-400">
                  Jogos AAA, mobile & quadrinhos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePreview;
