import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { type CertificationType } from "../../types/certificationType";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { checkDuplicateCertification } from "../../utils/validationUtils";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput, CategoryFilter } from "./DevModeInputs";

interface CertsTabProps {
  certs: CertificationType[];
  setCerts: React.Dispatch<React.SetStateAction<CertificationType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
}

export const CertsTab = ({
  certs,
  setCerts,
  updateTrans,
  getTrans,
}: CertsTabProps) => {
  const [certFilter, setCertFilter] = useState<string>("all");
  const [showHighlights, setShowHighlights] = useState<boolean>(false);

  const dragState = useDragAndDrop(certs, setCerts);

  const homeCertsCount = certs.filter((c) => c.showOnHome).length;

  const existingOrgsEn = Array.from(
    new Set(certs.map((c) => getTrans(c.orgKey, "en")).filter(Boolean))
  ).sort();

  const existingOrgsPt = Array.from(
    new Set(certs.map((c) => getTrans(c.orgKey, "pt")).filter(Boolean))
  ).sort();

  const filteredCerts = certs.filter((cert) => {
    if (certFilter === "all") return true;
    if (certFilter === "featured") return cert.showOnHome;
    return cert.category === certFilter;
  });

  const handleAdd = () => {
    const newId = (certs.length + 1).toString();
    const titleKey = `resume.cert.custom${newId}.title`;
    const orgKey = `resume.cert.custom${newId}.org`;
    updateTrans(titleKey, "en", "New Certification Name");
    updateTrans(titleKey, "pt", "Nome da Nova Certificação");
    updateTrans(orgKey, "en", "Issuer Org");
    updateTrans(orgKey, "pt", "Org Emissora");

    const defaultCategory = ["idiomas", "geral"].includes(certFilter)
      ? (certFilter as CertificationType["category"])
      : "idiomas";

    const defaultShowOnHome = certFilter === "featured";

    setCerts([
      ...certs,
      {
        id: newId,
        titleKey,
        orgKey,
        year: new Date().getFullYear().toString(),
        showInResume: [],
        category: defaultCategory,
        credentialUrl: "",
        credentialUrlPt: "",
        showOnHome: defaultShowOnHome,
      },
    ]);
  };

  return (
    <DevModeTabPanel
      title="Manage Certifications"
      description={`Feature up to 5 certifications on the homepage (${homeCertsCount}/5 selected)`}
      items={filteredCerts}
      onAdd={handleAdd}
      onDelete={(id) => setCerts(certs.filter((x) => x.id !== id))}
      addButtonLabel="Add Certification"
      emptyMessage="No certifications found. Click 'Add Certification' to create one."
      dragState={dragState}
      cardExtraHeaderContent={(item) => (
        <div className="flex items-center gap-2">
          {item.sectionHighlight && (
            <span className="text-[10px] px-2 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded font-bold font-mono">
              Pinned
            </span>
          )}
          {item.showOnHome && (
            <span className="text-[10px] px-2 py-0.5 bg-accent/10 text-accent border border-accent/20 rounded font-bold font-mono">
              Home
            </span>
          )}
        </div>
      )}
      filterElement={
        <div className="space-y-6">
          {/* Dedicated Featured Section */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
            <button
              onClick={() => setShowHighlights(!showHighlights)}
              className="flex justify-between items-center w-full text-left font-bold text-accent text-sm cursor-pointer select-none focus:outline-none"
            >
              <span>Homepage Highlights (Featured Certifications) ({homeCertsCount}/5 selected)</span>
              <span className="text-xs font-normal text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-xl hover:text-white hover:bg-white/10 transition-all select-none">
                {showHighlights ? "Hide Config ▲" : "Show Config ▼"}
              </span>
            </button>

            {showHighlights && (
              <div className="space-y-4 animate-fade-in">
                <p className="text-xs text-gray-400">
                  Select exactly up to 5 certifications to feature on the homepage.
                </p>
                <div className="grid sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1 text-left">
                  {certs.map((c) => {
                    const isChecked = c.showOnHome || false;
                    const isDisabled = !isChecked && homeCertsCount >= 5;
                    const certTitle = getTrans(c.titleKey, "en") || getTrans(c.titleKey, "pt") || c.titleKey;
                    const certOrg = getTrans(c.orgKey, "en") || getTrans(c.orgKey, "pt") || c.orgKey;

                    return (
                      <label
                        key={c.id}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? "bg-accent/10 border-accent text-white"
                            : isDisabled
                              ? "bg-black/20 border-white/5 text-gray-500 cursor-not-allowed opacity-50"
                              : "bg-black/40 border-white/10 text-gray-300 hover:bg-black/60 hover:text-white"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={(e) => {
                            const cIdx = certs.findIndex((x) => x.id === c.id);
                            if (cIdx !== -1) {
                              setCerts(
                                updateItemAtIndex(certs, cIdx, {
                                  showOnHome: e.target.checked,
                                })
                              );
                            }
                          }}
                          className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent mt-0.5"
                        />
                        <div className="text-xs">
                          <span className="font-semibold block">{certTitle}</span>
                          <span className="text-[10px] text-gray-400">{certOrg} ({c.year})</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Certifications Filter Tabs in Editor */}
          <CategoryFilter
            categories={[
              { id: "all", label: "All" },
              { id: "idiomas", label: "Languages / Idiomas" },
              { id: "geral", label: "General / Geral" },
            ] as const}
            activeCategory={certFilter}
            setActiveCategory={setCertFilter}
          />
        </div>
      }
      renderCardHeader={(item) => {
        const title = getTrans(item.titleKey, "en") || getTrans(item.titleKey, "pt") || "New Certification";
        const org = getTrans(item.orgKey, "en") || getTrans(item.orgKey, "pt") || "";
        const isDuplicate = checkDuplicateCertification(item, certs, getTrans);
        return (
          <div className="flex flex-col gap-1 text-left">
            <div className="flex items-center gap-2">
              <span>{title}</span>
              {org && <span className="text-gray-400">({org})</span>}
              <span className="text-xs font-mono text-gray-500 font-normal">
                (ID: {item.id})
              </span>
            </div>
            {isDuplicate && (
              <div className="flex items-center gap-1.5 p-1 px-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-semibold">
                <AlertTriangle size={10} className="shrink-0" />
                Possible duplicate!
              </div>
            )}
          </div>
        );
      }}
      renderCardDetails={(item) => {
        const cIdx = certs.findIndex((x) => x.id === item.id);
        const categoryHighlightsCount = certs.filter(
          (c) => c.category === item.category && c.sectionHighlight
        ).length;
        const isHighlightDisabled = !item.sectionHighlight && categoryHighlightsCount >= 3;

        const isDuplicate = checkDuplicateCertification(item, certs, getTrans);

        return (
          <>
            {isDuplicate && (
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-semibold animate-pulse">
                <AlertTriangle size={12} className="shrink-0" />
                Possible duplicate certification detected! (Same URL or same name/org/year)
              </div>
            )}

            <TranslatedTextInput
              labelEn="Name (English)"
              labelPt="Name (Portuguese)"
              translationKey={item.titleKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Org (English)
                </label>
                <input
                  type="text"
                  list={`org-en-list-${item.id}`}
                  value={getTrans(item.orgKey, "en")}
                  onChange={(e) =>
                    updateTrans(item.orgKey, "en", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
                  placeholder="Type or select..."
                />
                <datalist id={`org-en-list-${item.id}`}>
                  {existingOrgsEn.map((org) => (
                    <option key={org} value={org} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Org (Portuguese)
                </label>
                <input
                  type="text"
                  list={`org-pt-list-${item.id}`}
                  value={getTrans(item.orgKey, "pt")}
                  onChange={(e) =>
                    updateTrans(item.orgKey, "pt", e.target.value)
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
                  placeholder="Escreva ou selecione..."
                />
                <datalist id={`org-pt-list-${item.id}`}>
                  {existingOrgsPt.map((org) => (
                    <option key={org} value={org} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  value={item.year}
                  onChange={(e) => {
                    setCerts(updateItemAtIndex(certs, cIdx, { year: e.target.value }));
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Hours (Optional)
                </label>
                <input
                  type="text"
                  value={item.hours || ""}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        hours: e.target.value || undefined,
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
                  placeholder="e.g. 40"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={item.category}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        category: e.target.value as CertificationType["category"],
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
                >
                  <option value="idiomas">Languages / Idiomas</option>
                  <option value="geral">General / Geral</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credential Link (English / Default)
                </label>
                <input
                  type="text"
                  value={item.credentialUrl || ""}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        credentialUrl: e.target.value || undefined,
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credential Link (Portuguese)
                </label>
                <input
                  type="text"
                  value={item.credentialUrlPt || ""}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        credentialUrlPt: e.target.value || undefined,
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Section Highlight (Pin to Top) */}
            <div className="border-t border-white/5 pt-3 mt-2 flex justify-between items-center">
              <label
                className={`flex items-center gap-1.5 text-xs font-semibold select-none cursor-pointer ${
                  isHighlightDisabled ? "text-gray-500 cursor-not-allowed opacity-50" : "text-amber-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.sectionHighlight || false}
                  disabled={isHighlightDisabled}
                  onChange={(e) => {
                    setCerts(
                      updateItemAtIndex(certs, cIdx, {
                        sectionHighlight: e.target.checked,
                      })
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-amber-500 focus:ring-amber-500 disabled:opacity-50"
                />
                Pin as Section Highlight (Max 3 per category)
              </label>
              {isHighlightDisabled && (
                <span className="text-[10px] text-amber-500/70 font-mono">
                  Limit of 3 reached
                </span>
              )}
            </div>
          </>
        );
      }}
    />
  );
};

