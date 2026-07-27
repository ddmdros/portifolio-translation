import { useState } from "react";
import { Save, Check, AlertCircle } from "lucide-react";
import { PROJECTS_DATA } from "../content/ProjectsData";
import { CERTIFICATIONS_DATA } from "../content/CertificationsData";
import { EDUCATION_DATA } from "../content/EducationData";
import { EXPERIENCE_DATA } from "../content/ExperienceData";
import { SKILLS_DATA } from "../content/SkillsData";
import { PROFILE_CONFIG } from "../config/profile";
import enMessagesInit from "../i18n/messages/en.json";
import ptbrMessagesInit from "../i18n/messages/ptbr.json";
import { checkDuplicateCertification } from "../utils/validationUtils";

import { ProjectsTab } from "../components/devmode/ProjectsTab";
import { ResumesTab } from "../components/devmode/ResumesTab";
import { CertsTab } from "../components/devmode/CertsTab";
import { EduTab } from "../components/devmode/EduTab";
import { ExpTab } from "../components/devmode/ExpTab";
import { SkillsTab } from "../components/devmode/SkillsTab";
import { TranslationsTab } from "../components/devmode/TranslationsTab";
import { ProfileTab } from "../components/devmode/ProfileTab";

const PROFILES = [
  { id: "general", label: "Translation Linguist CV" },
] as const;

export const DevMode = () => {
  const isLocalhost =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");
  const [activeTab, setActiveTab] = useState<
    "projects" | "resumes" | "certs" | "edu" | "exp" | "skills" | "trans" | "profile"
  >("projects");

  // Local State
  const [projects, setProjects] = useState(PROJECTS_DATA);
  const [certs, setCerts] = useState(CERTIFICATIONS_DATA);
  const [edu, setEdu] = useState(EDUCATION_DATA);
  const [exp, setExp] = useState(EXPERIENCE_DATA);
  const [skills, setSkills] = useState(SKILLS_DATA);
  const [profileConfig, setProfileConfig] = useState(PROFILE_CONFIG);
  const [enMessages, setEnMessages] =
    useState<Record<string, string>>(enMessagesInit);
  const [ptbrMessages, setPtbrMessages] =
    useState<Record<string, string>>(ptbrMessagesInit);

  // Status State
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  if (!isLocalhost) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h1 className="text-3xl font-bold text-red-500 mb-2">Access Denied</h1>
        <p className="text-gray-400">
          The Dev Mode is only accessible when running the portfolio locally
          on localhost.
        </p>
      </div>
    );
  }

  // Helper to toggle profile ID in showInResume array
  const toggleProfile = (
    arr: string[] | undefined,
    profileId: string,
  ): string[] => {
    const current = arr || [];
    if (current.includes(profileId)) {
      return current.filter((x) => x !== profileId);
    } else {
      return [...current, profileId];
    }
  };

  // Translation helpers
  const getTrans = (key: string, lang: "en" | "pt") => {
    const dict = lang === "en" ? enMessages : ptbrMessages;
    return dict[key] || "";
  };

  const updateTrans = (key: string, lang: "en" | "pt", value: string) => {
    if (lang === "en") {
      setEnMessages((prev) => ({ ...prev, [key]: value }));
    } else {
      setPtbrMessages((prev) => ({ ...prev, [key]: value }));
    }
  };

  // Save changes handler
  const handleSave = async (generatePdfs: boolean) => {
    // Check for duplicate certifications first
    const hasDuplicate = certs.some((cert) =>
      checkDuplicateCertification(cert, certs, getTrans)
    );

    if (hasDuplicate) {
      setSaveStatus({
        type: "error",
        message: "Duplicate certification detected! Please ensure credential URLs, or name, organization and year combinations are unique before saving.",
      });
      return;
    }

    setIsSaving(true);
    setSaveStatus(null);
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projects,
          certifications: certs,
          education: edu,
          experience: exp,
          skills,
          profileConfig,
          en: enMessages,
          ptbr: ptbrMessages,
          generatePdfs,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSaveStatus({
          type: "success",
          message: generatePdfs
            ? "Changes saved and PDF CVs for all 6 profiles generated successfully!"
            : "Changes saved successfully (fast mode, PDFs not rebuilt)!",
        });
      } else {
        setSaveStatus({
          type: "error",
          message: result.error || "Failed to save changes.",
        });
      }
    } catch (err: unknown) {
      console.error(err);
      const message =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setSaveStatus({
        type: "error",
        message: message,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 relative animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
        <div>
          <span className="font-mono text-accent text-xs tracking-widest uppercase">
            Development Tool
          </span>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Local Portfolio & CV Mode
          </h1>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-white/5 pb-4">
        {(
          [
            { id: "projects", label: "Projects" },
            { id: "resumes", label: "CV Profiles" },
            { id: "certs", label: "Certifications" },
            { id: "edu", label: "Education" },
            { id: "exp", label: "Experience" },
            { id: "skills", label: "Skills & Languages" },
            { id: "trans", label: "Global Translations" },
            { id: "profile", label: "Profile Links" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-semibold rounded-xl border transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-accent border-accent text-black font-bold"
                : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB PANELS */}
      <div className="bg-card-bg/30 border border-white/10 p-6 md:p-8 rounded-3xl min-h-125">
        {activeTab === "projects" && (
          <ProjectsTab
            projects={projects}
            setProjects={setProjects}
            updateTrans={updateTrans}
            getTrans={getTrans}
          />
        )}

        {activeTab === "resumes" && (
          <ResumesTab
            certs={certs}
            setCerts={setCerts}
            projects={projects}
            setProjects={setProjects}
            edu={edu}
            setEdu={setEdu}
            exp={exp}
            setExp={setExp}
            skills={skills}
            setSkills={setSkills}
            getTrans={getTrans}
            updateTrans={updateTrans}
            PROFILES={PROFILES}
            toggleProfile={toggleProfile}
            profileConfig={profileConfig}
            setProfileConfig={setProfileConfig}
          />
        )}

        {activeTab === "certs" && (
          <CertsTab
            certs={certs}
            setCerts={setCerts}
            updateTrans={updateTrans}
            getTrans={getTrans}
          />
        )}

        {activeTab === "edu" && (
          <EduTab
            edu={edu}
            setEdu={setEdu}
            certs={certs}
            updateTrans={updateTrans}
            getTrans={getTrans}
          />
        )}

        {activeTab === "exp" && (
          <ExpTab
            exp={exp}
            setExp={setExp}
            updateTrans={updateTrans}
            getTrans={getTrans}
          />
        )}

        {activeTab === "skills" && (
          <SkillsTab
            skills={skills}
            setSkills={setSkills}
            updateTrans={updateTrans}
            getTrans={getTrans}
          />
        )}

        {activeTab === "trans" && (
          <TranslationsTab
            enMessages={enMessages}
            ptbrMessages={ptbrMessages}
            updateTrans={updateTrans}
          />
        )}

        {activeTab === "profile" && (
          <ProfileTab
            profileConfig={profileConfig}
            setProfileConfig={setProfileConfig}
          />
        )}
      </div>

      {/* Save Status Banner */}
      {saveStatus && (
        <div
          className={`flex items-center gap-3 p-4 rounded-xl mt-6 ${
            saveStatus.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          }`}
        >
          {saveStatus.type === "success" ? (
            <Check size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="text-sm font-medium">{saveStatus.message}</span>
        </div>
      )}

      {/* Save Action Buttons at the Bottom */}
      <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-white/5">
        <button
          onClick={() => handleSave(false)}
          disabled={isSaving}
          className="flex items-center gap-2 border border-white/10 bg-white/5 text-gray-300 font-bold py-2.5 px-6 rounded-xl hover:bg-white/10 hover:text-white disabled:opacity-50 transition-all cursor-pointer select-none"
        >
          {isSaving ? (
            <span className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Save Content (Fast)
        </button>

        <button
          onClick={() => handleSave(true)}
          disabled={isSaving}
          className="flex items-center gap-2 bg-accent text-black font-bold py-2.5 px-6 rounded-xl hover:bg-accent/90 disabled:opacity-50 transition-all cursor-pointer select-none btn-shimmer"
        >
          {isSaving ? (
            <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Save size={18} />
          )}
          Save & Build PDFs
        </button>
      </div>
    </main>
  );
};

