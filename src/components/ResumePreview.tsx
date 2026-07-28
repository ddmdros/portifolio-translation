import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { SectionDiv } from "./SectionDiv";
import { GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { EDUCATION_DATA } from "../content/EducationData";
import { EXPERIENCE_DATA } from "../content/ExperienceData";

const ResumePreview = () => {
  const navigate = useNavigate();
  const { locale } = useIntl();
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
        {/* Card de Experiência */}
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

        {/* Card de Pós-Graduação */}
        <div onClick={() => navigate(`/${locale}/resume#education`)} className="group bg-card-bg border border-white/10 p-6 rounded-2xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full cursor-pointer">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  <FormattedMessage id={EDUCATION_DATA[0].instKey} />
                </h3>
                <span className="text-xs text-accent font-medium font-mono">
                  <FormattedMessage id={EDUCATION_DATA[0].dateKey} />
                </span>
              </div>
            </div>
            
            <div className="pl-[52px] space-y-1">
              <p className="text-sm text-gray-300 font-semibold">
                <FormattedMessage id={EDUCATION_DATA[0].titleKey} />
              </p>
            </div>
          </div>
        </div>

        {/* Card de Jornalismo (UFSC) */}
        <div onClick={() => navigate(`/${locale}/resume#education`)} className="group bg-card-bg border border-white/10 p-6 rounded-2xl hover:border-accent/40 transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full cursor-pointer">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg bg-accent/10 text-accent">
                <GraduationCap size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">
                  <FormattedMessage id={EDUCATION_DATA[1].instKey} />
                </h3>
                <span className="text-xs text-accent font-medium font-mono">
                  <FormattedMessage id={EDUCATION_DATA[1].dateKey} />
                </span>
              </div>
            </div>
            
            <div className="pl-[52px] space-y-1">
              <p className="text-sm text-gray-300 font-semibold">
                <FormattedMessage id={EDUCATION_DATA[1].titleKey} />
              </p>
              {EDUCATION_DATA[1].gpaKey && (
                <p className="text-xs text-gray-500 leading-relaxed">
                  <FormattedMessage id={EDUCATION_DATA[1].gpaKey} />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumePreview;
