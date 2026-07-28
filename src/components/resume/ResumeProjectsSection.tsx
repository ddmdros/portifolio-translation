import { useState } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { FolderGit2, ExternalLink } from "lucide-react";
import { PROJECTS_DATA } from "../../content/ProjectsData";

interface ResumeProjectsSectionProps {
  locale: string;
}

export const ResumeProjectsSection = ({ locale }: ResumeProjectsSectionProps) => {
  const [showAllProjects, setShowAllProjects] = useState(false);

  const featuredProjects = PROJECTS_DATA.filter((p) => p.isFeatured);
  const otherProjects = PROJECTS_DATA.filter((p) => !p.isFeatured);
  const projectsToDisplay = showAllProjects
    ? [...featuredProjects, ...otherProjects]
    : featuredProjects;

  return (
    <div id="projects" className="space-y-8 scroll-mt-24">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3 border-b border-white/10 pb-4">
        <FolderGit2 className="text-accent" size={22} />
        <FormattedMessage
          id="resume.section.projects"
          defaultMessage="Featured Projects"
        />
      </h2>

      <div className="space-y-6">
        <div className="border-l-2 border-white/10 pl-6 ml-3 space-y-8 relative">
          {projectsToDisplay.map((proj) => (
            <div key={proj.id} className="relative animate-fade-in">
              <div className="absolute -left-7.75 top-1.5 w-4 h-4 bg-bg border-2 border-accent rounded-full flex items-center justify-center" />
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white">
                  <FormattedMessage id={proj.title} />
                </h3>
                <p className="text-sm text-gray-400">
                  {proj.category === "inhouse" ? (
                    <FormattedMessage id={proj.description} />
                  ) : proj.tags && proj.tags.length > 0 ? (
                    proj.tags.join(" • ")
                  ) : (
                    <FormattedMessage id={proj.description} />
                  )}
                </p>
                <ul className="list-disc list-inside text-gray-400 text-sm space-y-1 pl-1">
                  {proj.descKeys?.map((key) => (
                    <li key={key}>
                      <FormattedMessage id={key} />
                    </li>
                  ))}
                  {(proj.projectUrl || proj.githubUrl) && (
                    <li className="list-none pt-2">
                      <a
                        href={proj.projectUrl || proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-semibold"
                      >
                        <FormattedMessage
                          id="resume.project.starrCorp.link"
                          defaultMessage="Link here"
                        />
                        <ExternalLink size={12} />
                      </a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Toggles e CTAs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pl-9 mt-4">
          {!showAllProjects && otherProjects.length > 0 && (
            <button
              onClick={() => setShowAllProjects(true)}
              className="text-xs font-mono text-accent hover:underline cursor-pointer border border-accent/20 hover:border-accent bg-accent-subtle/5 px-4 py-2 rounded-xl transition-all"
            >
              <FormattedMessage
                id="resume.projects.seeMore"
                defaultMessage="See More Projects"
              />
            </button>
          )}
          <Link
            to={`/${locale}/projects`}
            className="text-xs font-mono text-gray-400 hover:text-accent inline-flex items-center gap-1.5 cursor-pointer hover:underline border border-transparent hover:border-white/10 px-4 py-2 rounded-xl transition-all"
          >
            <FormattedMessage
              id="projects.view.all.online"
              defaultMessage="View All Projects Online →"
            />
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
};
