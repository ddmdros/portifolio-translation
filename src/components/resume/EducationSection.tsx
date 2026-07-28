import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { GraduationCap, Award, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { EDUCATION_DATA } from "../../content/EducationData";
import { CERTIFICATIONS_DATA } from "../../content/CertificationsData";

export const EducationSection = () => {
  const { locale } = useIntl();
  const [expandedEdus, setExpandedEdus] = useState<Record<string, boolean>>({});
  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpandedEdus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleLevel = (levelId: string) => {
    setExpandedLevels((prev) => ({ ...prev, [levelId]: !prev[levelId] }));
  };

  return (
    <div id="education" className="space-y-8 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
        <GraduationCap className="text-accent" size={24} />
        <FormattedMessage
          id="resume.section.education"
          defaultMessage="Education"
        />
      </h2>

      <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-10 relative">
        {EDUCATION_DATA.filter((edu) => edu.showInPortfolio !== false).map((edu) => {
          let globalCompletion = 0;
          let totalCourses = 0;
          let totalCompletion = 0;
          if (edu.levels) {
            if (edu.id === "1") {
              const completedLevels = edu.levels.filter((lvl) =>
                lvl.courses.every((c) => c.completion === 100)
              ).length;
              globalCompletion = Math.round((completedLevels / edu.levels.length) * 100);
            } else {
              edu.levels.forEach((lvl) => {
                totalCourses += lvl.courses.length;
                totalCompletion += lvl.courses.reduce((sum, c) => sum + c.completion, 0);
              });
              globalCompletion = totalCourses > 0 ? Math.round(totalCompletion / totalCourses) : 0;
            }
          }

          return (
            <div key={edu.id} className="relative">
            <div className="absolute -left-7.5 top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center">
              {(edu.id === "1" ||
                edu.dateKey.toLowerCase().includes("present")) && (
                <span className="absolute w-full h-full rounded-full bg-accent/30 animate-pulse-ring pointer-events-none" />
              )}
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-accent font-semibold">
                <FormattedMessage id={edu.dateKey} />
              </span>
              {(() => {
                const targetLinkUrl = edu.linkUrl
                  ? (edu.linkUrl.includes("portifolio-tawny-xi-55.vercel.app")
                      ? `https://portifolio-tawny-xi-55.vercel.app/${locale === "pt" ? "pt" : "en"}`
                      : edu.linkUrl)
                  : undefined;

                return (
                  <>
                    <h3 className="text-xl font-bold text-white">
                      {targetLinkUrl ? (
                        <a
                          href={targetLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 hover:text-accent transition-colors group cursor-pointer"
                        >
                          <span><FormattedMessage id={edu.titleKey} /></span>
                          <ExternalLink size={16} className="text-accent opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </a>
                      ) : (
                        <FormattedMessage id={edu.titleKey} />
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">
                      <FormattedMessage id={edu.instKey} />
                    </p>
                    {edu.gpaKey && (
                      <p className="text-xs font-medium text-gray-500 font-mono pt-1">
                        <FormattedMessage id={edu.gpaKey} />
                      </p>
                    )}
                    {targetLinkUrl && (
                      <div className="pt-2">
                        <a
                          href={targetLinkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline bg-accent/10 px-3 py-1.5 rounded-lg border border-accent/20 transition-all hover:bg-accent/20"
                        >
                          <span>
                            <FormattedMessage
                              id={edu.linkTextKey || "resume.link.se.portfolio"}
                              defaultMessage="Software Engineering Portfolio"
                            />
                          </span>
                          <ExternalLink size={12} />
                        </a>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
            
              {/* Collapsible Syllabus Dropdown */}
              {edu.levels && edu.levels.length > 0 && (
                <div className="mt-4 border border-white/10 rounded-2xl bg-card-bg/30 overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => toggleExpand(edu.id)}
                    className="w-full flex flex-col md:flex-row md:items-center justify-between p-4 gap-4 hover:bg-white/5 transition-all text-left cursor-pointer"
                  >
                    <div className="flex-1 space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold text-gray-400">
                        <span>
                          {edu.id === "1"
                            ? (locale === "pt" ? "Progresso da Graduação" : "Graduation Progress")
                            : (locale === "pt" ? "Progresso da Carreira" : "Career Progress")
                          }
                        </span>
                        <span className="text-accent font-mono font-bold">
                          {globalCompletion}%
                        </span>
                      </div>
                      
                      {/* Visual Progress Bar */}
                      <div className="h-2 w-full bg-accent-subtle rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(52,211,153,0.3)]"
                          style={{ width: `${globalCompletion}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5 text-xs text-accent font-semibold shrink-0">
                      <span>
                        {expandedEdus[edu.id]
                          ? (locale === "pt" ? "Ocultar Grade" : "Hide Syllabus")
                          : (locale === "pt" ? "Ver Grade Curricular" : "View Syllabus")}
                      </span>
                      {expandedEdus[edu.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedEdus[edu.id] && (
                    <div className="p-4 pt-1 border-t border-white/5 space-y-5 animate-fade-in bg-black/10">
                      {edu.levels.map((level) => {
                        const levelCompletion = level.courses.reduce((sum, c) => sum + c.completion, 0) / level.courses.length;
                        const isLevelCompleted = level.courses.every((c) => c.completion === 100);
                        const isLevelInProgress = !isLevelCompleted && (
                          level.titlePt.includes("(Atual)") ||
                          level.titleEn.includes("(Current)") ||
                          (levelCompletion > 0 && levelCompletion < 100)
                        );
                        
                        const isLevelExpanded = expandedLevels[level.id] !== undefined
                          ? expandedLevels[level.id]
                          : isLevelInProgress;

                        const coursesWithGrades = level.courses.filter((c) => c.grade !== undefined);
                        const avgGrade = coursesWithGrades.length > 0
                          ? Math.round(coursesWithGrades.reduce((sum, c) => sum + (c.grade || 0), 0) / coursesWithGrades.length)
                          : null;

                        return (
                          <div key={level.id} className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                            isLevelCompleted
                              ? "border-emerald-500/20 bg-emerald-500/[0.02]"
                              : isLevelInProgress
                                ? "border-amber-500/25 bg-amber-500/[0.02]"
                                : "border-white/5 bg-black/10"
                          }`}>
                            <button
                              onClick={() => toggleLevel(level.id)}
                              className={`w-full flex items-center justify-between p-3.5 transition-all text-left cursor-pointer ${
                                isLevelCompleted
                                  ? "hover:bg-emerald-500/[0.05]"
                                  : isLevelInProgress
                                    ? "hover:bg-amber-500/[0.05]"
                                    : "hover:bg-white/5"
                              }`}
                            >
                              <div className="space-y-0.5">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className={`text-xs font-bold uppercase tracking-wider ${
                                    isLevelCompleted
                                      ? "text-emerald-400"
                                      : isLevelInProgress
                                        ? "text-amber-400"
                                        : "text-gray-400"
                                  }`}>
                                    {locale === "pt" ? level.titlePt : level.titleEn}
                                  </h4>
                                  {isLevelCompleted && avgGrade !== null && (
                                    <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded tracking-wider uppercase">
                                      {locale === "pt" ? `Média: ${avgGrade}` : `Avg: ${avgGrade}`}
                                    </span>
                                  )}
                                  {isLevelInProgress && (
                                    <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-1.5 py-0.5 rounded tracking-wider uppercase">
                                      {locale === "pt" ? "Em andamento" : "In Progress"}
                                    </span>
                                  )}
                                </div>
                                {(level.descPt || level.descEn) && (
                                  <span className={`text-[10px] block leading-tight ${
                                    isLevelCompleted
                                      ? "text-emerald-500/70"
                                      : isLevelInProgress
                                        ? "text-amber-500/70"
                                        : "text-gray-500"
                                  }`}>
                                    {locale === "pt" ? level.descPt : level.descEn}
                                  </span>
                                )}
                              </div>
                              <div className={
                                isLevelCompleted
                                  ? "text-emerald-500/60"
                                  : isLevelInProgress
                                    ? "text-amber-500/60"
                                    : "text-gray-500"
                              }>
                                {isLevelExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                              </div>
                            </button>

                            {isLevelExpanded && (
                              <div className="p-3.5 pt-1.5 pl-4 border-t border-white/5 space-y-2.5 bg-black/5">
                                {level.courses.map((course) => {
                                  const isCompleted = course.completion === 100;
                                  const isCurrent = !isCompleted && (
                                    course.isCurrent ||
                                    (course.completion > 0 && course.completion < 100) ||
                                    isLevelInProgress
                                  );
                                  const isNotStarted = !isCompleted && !isCurrent;
                                  const courseCert = CERTIFICATIONS_DATA.find(c => c.id === course.certificateId);
                                  const certUrl = courseCert
                                    ? (locale === "pt" && courseCert.credentialUrlPt
                                        ? courseCert.credentialUrlPt
                                        : courseCert.credentialUrl)
                                    : undefined;
                                  
                                  const gradeText = course.grade ? ` • ${locale === "pt" ? "Nota" : "Grade"}: ${course.grade}` : "";

                                  return (
                                    <div
                                      key={course.id}
                                      className={`flex items-start justify-between gap-3 text-xs py-1 transition-all ${
                                        isNotStarted ? "opacity-35 text-gray-500" : "text-gray-300"
                                      }`}
                                    >
                                      <div className="space-y-0.5 min-w-0">
                                        <span className="font-semibold block text-white leading-tight">
                                          {locale === "pt" ? course.titlePt : course.titleEn}
                                        </span>
                                        {(course.subtitlePt || course.subtitleEn) && (
                                          <span className="text-[10px] text-gray-500 block leading-tight">
                                            {locale === "pt" ? course.subtitlePt : course.subtitleEn}
                                          </span>
                                        )}
                                        {course.isEmphasis && (
                                          <span className="text-[10px] text-accent/90 font-medium block mt-1 leading-normal max-w-lg">
                                            {locale === "pt"
                                              ? "* Esta é uma etapa de ênfase a ser escolhida no último bloco do curso (opções: Engenharia de Software Aplicada, Inteligência Artificial, Dados, Cibersegurança ou Cloud Computing)."
                                              : "* This is a graduation emphasis track to be selected in the final block of the program (options: Applied Software Engineering, Artificial Intelligence, Data, Cybersecurity, or Cloud Computing)."
                                            }
                                          </span>
                                        )}
                                      </div>
                                      
                                      <div className="flex items-center gap-2 shrink-0">
                                        {isCompleted ? (
                                          certUrl ? (
                                            <a
                                              href={certUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 transition-all"
                                            >
                                              <Award size={11} className="shrink-0" />
                                              <span>
                                                {locale === "pt" ? "Concluído" : "Completed"}{gradeText}
                                              </span>
                                              <ExternalLink size={8} className="shrink-0 opacity-70" />
                                            </a>
                                          ) : (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400">
                                              <Award size={11} className="shrink-0" />
                                              <span>
                                                {locale === "pt" ? "Concluído" : "Completed"}{gradeText}
                                              </span>
                                            </span>
                                          )
                                        ) : isCurrent ? (
                                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] font-semibold text-amber-400 whitespace-nowrap">
                                            {locale === "pt" && course.expectedDatePt
                                              ? course.expectedDatePt
                                              : course.expectedDateEn
                                                ? course.expectedDateEn
                                                : (locale === "pt" ? "Em andamento" : "In Progress")
                                            }
                                          </span>
                                        ) : (
                                          <span className="px-2.5 py-0.5 rounded bg-white/5 border border-transparent text-[10px] font-medium text-gray-500 whitespace-nowrap">
                                            {locale === "pt" && course.expectedDatePt
                                              ? course.expectedDatePt
                                              : course.expectedDateEn
                                                ? course.expectedDateEn
                                                : (locale === "pt" ? "Não concluído" : "Not Completed")
                                          }
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
