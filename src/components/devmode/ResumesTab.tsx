import React, { useState } from "react";
import { type CertificationType } from "../../types/certificationType";
import { type ProjectType } from "../../types/projectType";
import { type EducationType } from "../../content/EducationData";
import { type ExperienceType } from "../../content/ExperienceData";
import { type SkillType } from "../../content/SkillsData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { FileText } from "lucide-react";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";

import { PROFILE_CONFIG } from "../../config/profile";

// Extracted Sub-components
import { ProfileDownloadPnl } from "./resumes/ProfileDownloadPnl";
import { ProfilePublishToggle } from "./resumes/ProfilePublishToggle";
import { ProfileCustomTexts } from "./resumes/ProfileCustomTexts";
import { ResumeColumn } from "./resumes/ResumeColumn";
import { CategoryFilter } from "./DevModeInputs";

interface ResumesTabProps {
  certs: CertificationType[];
  setCerts: React.Dispatch<React.SetStateAction<CertificationType[]>>;
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  edu: EducationType[];
  setEdu: React.Dispatch<React.SetStateAction<EducationType[]>>;
  exp: ExperienceType[];
  setExp: React.Dispatch<React.SetStateAction<ExperienceType[]>>;
  skills: SkillType[];
  setSkills: React.Dispatch<React.SetStateAction<SkillType[]>>;
  getTrans: (key: string, lang: "en" | "pt") => string;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  PROFILES: readonly { readonly id: string; readonly label: string }[];
  toggleProfile: (arr: string[] | undefined, profileId: string) => string[];
  profileConfig: typeof PROFILE_CONFIG;
  setProfileConfig: React.Dispatch<React.SetStateAction<typeof PROFILE_CONFIG>>;
}

export const ResumesTab = ({
  certs,
  setCerts,
  projects,
  setProjects,
  edu,
  setEdu,
  exp,
  setExp,
  skills,
  setSkills,
  getTrans,
  updateTrans,
  PROFILES,
  toggleProfile,
  profileConfig,
  setProfileConfig,
}: ResumesTabProps) => {
  const [activeProfile, setActiveProfile] = useState<string>("general");
  const [certFilter, setCertFilter] = useState<string>("all");

  // Drag-and-drop state via hook for each list
  const dragProj = useDragAndDrop(projects, setProjects);
  const dragCert = useDragAndDrop(certs, setCerts);
  const dragEdu = useDragAndDrop(edu, setEdu);
  const dragExp = useDragAndDrop(exp, setExp);
  const dragSkills = useDragAndDrop(skills, setSkills);

  const certFilterElement = (
    <CategoryFilter
      categories={[
        { id: "all", label: "All" },
        { id: "idiomas", label: "Languages / Idiomas" },
        { id: "geral", label: "General" },
      ] as const}
      activeCategory={certFilter}
      setActiveCategory={setCertFilter}
      small={true}
    />
  );

  const handleToggle = <T extends { id: string; showInResume?: string[] }>(
    item: T,
    items: T[],
    setItems: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    const idx = items.findIndex((x) => x.id === item.id);
    if (idx !== -1) {
      setItems(
        updateItemAtIndex(items, idx, {
          showInResume: toggleProfile(item.showInResume, activeProfile),
        } as Partial<T>)
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="pb-4 border-b border-white/5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <FileText className="text-accent" size={20} />
          Curriculums & CV Profiles Manager
        </h2>
        <p className="text-xs text-gray-400 mt-1">
          Select a profile below to customize which projects, certifications, experiences, educations, and skills are included in it.
        </p>
      </div>

      {/* Profile Selection Pills */}
      <div className="flex flex-wrap gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
        {PROFILES.map((profile) => (
          <button
            key={profile.id}
            onClick={() => setActiveProfile(profile.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer select-none ${
              activeProfile === profile.id
                ? "bg-accent/10 border-accent/30 text-accent font-bold shadow-[0_0_12px_rgba(var(--accent-rgb),0.1)]"
                : "bg-transparent border-transparent text-gray-400 hover:text-white"
            }`}
          >
            {profile.label}
          </button>
        ))}
      </div>

      {/* Download Profile PDFs (available when running locally and built) */}
      <ProfileDownloadPnl activeProfile={activeProfile} profiles={PROFILES} />

      {/* Public Download Toggle */}
      <ProfilePublishToggle
        activeProfile={activeProfile}
        profileConfig={profileConfig}
        setProfileConfig={setProfileConfig}
      />

      {/* Profile Metadata Editor (Header, Goal, Description) */}
      <ProfileCustomTexts
        activeProfile={activeProfile}
        getTrans={getTrans}
        updateTrans={updateTrans}
      />

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Projects Column */}
        <ResumeColumn
          title="Projects"
          items={projects}
          checkedCount={projects.filter((p) => p.showInResume?.includes(activeProfile)).length}
          emptyMessage="No projects found."
          dragState={dragProj}
          isChecked={(proj) => proj.showInResume?.includes(activeProfile) || false}
          onToggle={(proj) => handleToggle(proj, projects, setProjects)}
          renderItemContent={(proj) => {
            const title = getTrans(proj.title, "en") || getTrans(proj.title, "pt") || proj.title;
            return <span className="line-clamp-2 leading-tight select-none">{title}</span>;
          }}
        />

        {/* Certifications Column */}
        <ResumeColumn
          title="Certifications"
          items={certs.filter((c) => certFilter === "all" || c.category === certFilter)}
          checkedCount={certs.filter((c) => c.showInResume?.includes(activeProfile)).length}
          emptyMessage="No matching certifications found."
          dragState={dragCert}
          filterElement={certFilterElement}
          isChecked={(cert) => cert.showInResume?.includes(activeProfile) || false}
          onToggle={(cert) => handleToggle(cert, certs, setCerts)}
          renderItemContent={(cert) => {
            const title = getTrans(cert.titleKey, "en") || getTrans(cert.titleKey, "pt") || cert.titleKey;
            const org = getTrans(cert.orgKey, "en") || getTrans(cert.orgKey, "pt") || cert.orgKey;
            return (
              <div className="leading-tight select-none">
                <span className="line-clamp-2 block font-semibold">{title}</span>
                <span className="text-[10px] text-gray-500">{org}</span>
              </div>
            );
          }}
        />

        {/* Experience Column */}
        <ResumeColumn
          title="Experience"
          items={exp}
          checkedCount={exp.filter((e) => e.showInResume?.includes(activeProfile)).length}
          emptyMessage="No experience found."
          dragState={dragExp}
          isChecked={(item) => item.showInResume?.includes(activeProfile) || false}
          onToggle={(item) => handleToggle(item, exp, setExp)}
          renderItemContent={(item) => {
            const title = getTrans(item.titleKey, "en") || getTrans(item.titleKey, "pt") || item.titleKey;
            const company = getTrans(item.companyKey, "en") || getTrans(item.companyKey, "pt") || item.companyKey;
            return (
              <div className="leading-tight select-none">
                <span className="line-clamp-2 block font-semibold">{title}</span>
                <span className="text-[10px] text-gray-500">{company}</span>
              </div>
            );
          }}
        />

        {/* Education Column */}
        <ResumeColumn
          title="Education"
          items={edu}
          checkedCount={edu.filter((e) => e.showInResume?.includes(activeProfile)).length}
          emptyMessage="No education found."
          dragState={dragEdu}
          isChecked={(item) => item.showInResume?.includes(activeProfile) || false}
          onToggle={(item) => handleToggle(item, edu, setEdu)}
          renderItemContent={(item) => {
            const title = getTrans(item.titleKey, "en") || getTrans(item.titleKey, "pt") || item.titleKey;
            const inst = getTrans(item.instKey, "en") || getTrans(item.instKey, "pt") || item.instKey;
            return (
              <div className="leading-tight select-none">
                <span className="line-clamp-2 block font-semibold">{title}</span>
                <span className="text-[10px] text-gray-500">{inst}</span>
              </div>
            );
          }}
        />

        {/* Skills Column */}
        <ResumeColumn
          title="Skills"
          items={skills}
          checkedCount={skills.filter((s) => s.showInResume?.includes(activeProfile)).length}
          emptyMessage="No skills found."
          dragState={dragSkills}
          isChecked={(skill) => skill.showInResume?.includes(activeProfile) || false}
          onToggle={(skill) => handleToggle(skill, skills, setSkills)}
          renderItemContent={(skill) => {
            const category = getTrans(skill.categoryKey, "en") || skill.categoryKey;
            return (
              <div className="leading-tight select-none">
                <span className="block font-semibold">{skill.name}</span>
                <span className="text-[9px] text-gray-500">{category.replace("about.stacks.", "")}</span>
              </div>
            );
          }}
        />
      </div>
    </div>
  );
};
