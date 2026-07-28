

interface ProfileCustomTextsProps {
  activeProfile: string;
  getTrans: (key: string, lang: "en" | "pt") => string;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
}

interface ProfileFieldProps {
  label: string;
  field: string;
  activeProfile: string;
  isTextArea?: boolean;
  placeholderEn: string;
  placeholderPt: string;
  getTrans: (key: string, lang: "en" | "pt") => string;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
}

const ProfileField = ({
  label,
  field,
  activeProfile,
  isTextArea = false,
  placeholderEn,
  placeholderPt,
  getTrans,
  updateTrans,
}: ProfileFieldProps) => {
  const translationKey = `resume.profile.${activeProfile}.${field}`;
  const commonClasses =
    "w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none";

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-bold text-gray-300">{label}</h4>
      <div>
        <label className="block text-[10px] text-gray-400 mb-1">English</label>
        {isTextArea ? (
          <textarea
            value={getTrans(translationKey, "en")}
            onChange={(e) => updateTrans(translationKey, "en", e.target.value)}
            className={`${commonClasses} h-20 resize-none`}
            placeholder={placeholderEn}
          />
        ) : (
          <input
            type="text"
            value={getTrans(translationKey, "en")}
            onChange={(e) => updateTrans(translationKey, "en", e.target.value)}
            className={commonClasses}
            placeholder={placeholderEn}
          />
        )}
      </div>
      <div>
        <label className="block text-[10px] text-gray-400 mb-1">Portuguese</label>
        {isTextArea ? (
          <textarea
            value={getTrans(translationKey, "pt")}
            onChange={(e) => updateTrans(translationKey, "pt", e.target.value)}
            className={`${commonClasses} h-20 resize-none`}
            placeholder={placeholderPt}
          />
        ) : (
          <input
            type="text"
            value={getTrans(translationKey, "pt")}
            onChange={(e) => updateTrans(translationKey, "pt", e.target.value)}
            className={commonClasses}
            placeholder={placeholderPt}
          />
        )}
      </div>
    </div>
  );
};

export const ProfileCustomTexts = ({
  activeProfile,
  getTrans,
  updateTrans,
}: ProfileCustomTextsProps) => {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-bold text-accent text-left">Profile Custom Texts</h3>
      <p className="text-xs text-gray-400 text-left">
        Customize the job title and professional description for this CV profile (used in PDF rendering).
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        <ProfileField
          label="Job Title / Header"
          field="header"
          activeProfile={activeProfile}
          placeholderEn="e.g. Game & Literary Translator / Localizer"
          placeholderPt="Ex: Tradutor e Localizador de Jogos e Literaturas"
          getTrans={getTrans}
          updateTrans={updateTrans}
        />

        <ProfileField
          label="Profile Description / Resumo Profissional"
          field="description"
          activeProfile={activeProfile}
          isTextArea={true}
          placeholderEn={getTrans("portifolio.description", "en") || "Enter profile summary..."}
          placeholderPt={getTrans("portifolio.description", "pt") || "Escreva o resumo do perfil..."}
          getTrans={getTrans}
          updateTrans={updateTrans}
        />
      </div>
    </div>
  );
};
