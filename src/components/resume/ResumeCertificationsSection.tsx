import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Award, ExternalLink, Pin, Star } from "lucide-react";
import { CERTIFICATIONS_DATA } from "../../content/CertificationsData";

interface ResumeCertificationsSectionProps {
  locale: string;
}

const CATEGORY_LABELS: Record<string, { en: string; pt: string }> = {
  all: { en: "All", pt: "Todos" },
  idiomas: { en: "Languages", pt: "Idiomas" },
  translation: { en: "Translation", pt: "Tradução" },
};

export const ResumeCertificationsSection = ({
  locale,
}: ResumeCertificationsSectionProps) => {
  const [certFilter, setCertFilter] = useState<string>("all");

  const activeCategoriesInData = Array.from(
    new Set(CERTIFICATIONS_DATA.map((cert) => cert.category).filter(Boolean))
  );

  const availableTabs = [
    { id: "all", label: CATEGORY_LABELS["all"][locale === "pt" ? "pt" : "en"] },
    ...activeCategoriesInData.map((cat) => ({
      id: cat,
      label: CATEGORY_LABELS[cat]?.[locale === "pt" ? "pt" : "en"] || cat,
    })),
  ];

  const displayedCertifications =
    certFilter === "all"
      ? CERTIFICATIONS_DATA
      : CERTIFICATIONS_DATA.filter((cert) => cert.category === certFilter);

  const sortedCertifications = [...displayedCertifications].sort((a, b) => {
    const aHighlight = a.sectionHighlight ? 1 : 0;
    const bHighlight = b.sectionHighlight ? 1 : 0;
    return bHighlight - aHighlight;
  });

  const getCertUrl = (cert: typeof CERTIFICATIONS_DATA[0]) => {
    if (locale === "pt" && cert.credentialUrlPt) return cert.credentialUrlPt;
    return cert.credentialUrl;
  };

  return (
    <div
      id="certifications"
      className="bg-card-bg/50 backdrop-blur-sm border border-white/10 p-6 md:p-8 rounded-3xl space-y-6 scroll-mt-24"
    >
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-2">
        <Award className="text-accent" size={22} />
        <FormattedMessage
          id="resume.section.certifications"
          defaultMessage="Certifications"
        />
      </h2>

      {/* Render filter tabs only if more than 1 category exists */}
      {activeCategoriesInData.length > 1 && (
        <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-3">
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCertFilter(tab.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                certFilter === tab.id
                  ? "bg-accent border-accent text-black font-bold"
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
        {sortedCertifications.map((cert) => (
          <div
            key={cert.id}
            className={`flex gap-3 animate-fade-in p-3 rounded-xl transition-all ${
              cert.sectionHighlight
                ? "bg-amber-500/5 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.04)]"
                : "border border-white/5 bg-white/5"
            }`}
          >
            <div
              className={`shrink-0 p-2 h-fit rounded-lg ${
                cert.sectionHighlight ? "bg-amber-500/20 text-amber-400" : "bg-accent/10 text-accent"
              }`}
            >
              <Award size={18} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-white">
                  {getCertUrl(cert) ? (
                    <a
                      href={getCertUrl(cert)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 transition-colors ${
                        cert.sectionHighlight ? "hover:text-amber-400 text-amber-100" : "hover:text-accent"
                      }`}
                    >
                      <FormattedMessage id={cert.titleKey} defaultMessage={cert.titleKey} />
                      <ExternalLink
                        size={12}
                        className="shrink-0 opacity-70"
                      />
                    </a>
                  ) : (
                    <FormattedMessage id={cert.titleKey} defaultMessage={cert.titleKey} />
                  )}
                </h3>
                <div className="flex gap-1.5 shrink-0">
                  {cert.sectionHighlight && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/10 border border-amber-500/30 text-amber-400">
                      <Pin size={10} className="shrink-0" />
                      <FormattedMessage id="resume.cert.badge.pinned" defaultMessage="Pinned" />
                    </span>
                  )}
                  {cert.showOnHome && (
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-accent/10 border border-accent/30 text-accent">
                      <Star size={10} className="shrink-0" />
                      <FormattedMessage id="resume.cert.badge.featured" defaultMessage="Featured" />
                    </span>
                  )}
                </div>
              </div>
              <p className="text-xs text-gray-400 font-medium mt-1">
                <FormattedMessage id={cert.orgKey} defaultMessage={cert.orgKey} /> &bull; {cert.year}
                {cert.hours && ` \u2022 ${cert.hours}h`}
              </p>
            </div>
          </div>
        ))}

        {sortedCertifications.length === 0 && (
          <p className="text-xs text-gray-500 text-center py-4">
            No certifications found.
          </p>
        )}
      </div>
    </div>
  );
};
