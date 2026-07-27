import { useState } from "react";
import { KeywordTag } from "./KeywordTag";
import { type ProjectCategory } from "../types/projectType";
import { FormattedMessage } from "react-intl";
import { ExternalLink, Award, FileText, Calendar, Layers, Building2, X } from "lucide-react";

interface ProjectItemProps {
  category: ProjectCategory | ProjectCategory[];
  title: string;
  description: string;
  genre?: string;
  role?: string;
  developer?: string;
  wordCount?: string;
  year?: string;
  tags: string[];
  imageUrl: string;
  creditImageUrl?: string;
  steamUrl?: string;
  projectUrl?: string;
  isFeatured?: boolean;
  isWip?: boolean;
}

const ProjectItem = ({
  category,
  title,
  description,
  genre,
  role,
  developer,
  wordCount,
  year,
  tags,
  imageUrl,
  creditImageUrl,
  steamUrl,
  projectUrl,
  isFeatured = false,
  isWip = false,
}: ProjectItemProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showCreditModal, setShowCreditModal] = useState(false);

  const imageElement = (
    <div className="relative overflow-hidden bg-white/5 w-full h-full aspect-video flex items-center justify-center">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
      )}
      
      {/* Blurred background copy for ambient glow */}
      <img
        src={imageUrl}
        className={`absolute inset-0 w-full h-full object-cover blur-xl opacity-35 scale-110 select-none pointer-events-none transition-all duration-700 ${
          imageLoaded ? "opacity-35" : "opacity-0"
        }`}
        alt=""
      />

      {/* Foreground image */}
      <img
        src={imageUrl}
        onLoad={() => setImageLoaded(true)}
        className={`relative z-10 h-full max-w-full object-cover group-hover:scale-105 transition-all duration-700 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        alt={title}
      />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" />
      
      {/* Badges Overlay */}
      <div className="absolute top-3 left-3 z-20 flex flex-wrap gap-2">
        {isFeatured && (
          <span className="bg-accent/25 backdrop-blur-md text-accent border border-accent/30 px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5 shadow-lg shadow-accent/5">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <FormattedMessage id="project.badge.featured" defaultMessage="Featured" />
          </span>
        )}
        {isWip && (
          <span className="bg-amber-500/25 backdrop-blur-md text-amber-400 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1.5">
            <FormattedMessage id="project.badge.wip" defaultMessage="Live Service" />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={`group bg-card-bg border rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full ${
        isFeatured 
          ? "border-accent/30 hover:border-accent/60 shadow-lg shadow-accent/5" 
          : "border-white/10 hover:border-white/20"
      }`}
    >
      <div className="w-full relative">{imageElement}</div>

      <div className="p-6 flex flex-col grow space-y-4">
        {/* Category tags */}
        <div className="flex flex-wrap gap-2">
          {Array.isArray(category) ? (
            category.map((cat) => <KeywordTag key={cat} label={cat} />)
          ) : (
            <KeywordTag label={category} />
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white tracking-tight">
            <FormattedMessage id={title} defaultMessage={title} />
          </h3>
          <p className="text-gray-400 text-sm mt-2 leading-relaxed">
            <FormattedMessage id={description} defaultMessage={description} />
          </p>
        </div>

        {/* Translation Project Metadata Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs bg-white/5 border border-white/10 rounded-xl p-3 text-gray-300">
          {role && (
            <div className="flex items-center gap-1.5 col-span-2">
              <Award size={14} className="text-accent shrink-0" />
              <span className="font-semibold text-white">{role}</span>
            </div>
          )}
          {developer && (
            <div className="flex items-center gap-1.5">
              <Building2 size={14} className="text-accent shrink-0" />
              <span className="font-semibold text-gray-200">{developer}</span>
            </div>
          )}
          {genre && (
            <div className="flex items-center gap-1.5">
              <Layers size={14} className="text-gray-400 shrink-0" />
              <span>{genre}</span>
            </div>
          )}
          {wordCount && (
            <div className="flex items-center gap-1.5">
              <FileText size={14} className="text-gray-400 shrink-0" />
              <span>{wordCount}</span>
            </div>
          )}
          {year && (
            <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-gray-400 shrink-0" />
              <span>{year}</span>
            </div>
          )}
        </div>

        <div className="pt-2 flex flex-col gap-3 mt-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <KeywordTag key={tag} label={tag} />
            ))}
          </div>

          {/* Action buttons */}
          {(creditImageUrl || steamUrl || projectUrl) && (
            <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-white/5 text-xs font-semibold">
              {creditImageUrl && (
                <button
                  onClick={() => setShowCreditModal(true)}
                  className="flex items-center gap-1.5 text-accent hover:underline cursor-pointer"
                >
                  <Award size={14} />
                  <span>View Credit Proof</span>
                </button>
              )}

              {(steamUrl || projectUrl) && (
                <a
                  href={steamUrl || projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors"
                >
                  <ExternalLink size={14} />
                  <FormattedMessage id="projects.external.link" defaultMessage="View Game on Steam" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Credit Proof Modal */}
      {showCreditModal && creditImageUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
          <div className="relative max-w-3xl w-full bg-card-bg border border-white/20 rounded-2xl overflow-hidden p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Award size={18} className="text-accent" />
                Credit Proof / Screenshot
              </h4>
              <button
                onClick={() => setShowCreditModal(false)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto rounded-xl border border-white/10">
              <img
                src={creditImageUrl}
                alt="Credit Proof"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectItem;
