import React from "react";
import { type ProjectType, type ProjectCategory } from "../../types/projectType";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput, CustomLinkFields, BulletPointsEditor } from "./DevModeInputs";

interface ProjectsTabProps {
  projects: ProjectType[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectType[]>>;
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
}

export const ProjectsTab = ({
  projects,
  setProjects,
  updateTrans,
  getTrans,
}: ProjectsTabProps) => {
  const dragState = useDragAndDrop(projects, setProjects);

  const handleAdd = () => {
    const newId = `p${projects.length + 1}_${Date.now().toString().slice(-4)}`;
    const titleKey = `project.title.${newId}`;
    const descKey = `project.description.${newId}`;
    updateTrans(titleKey, "en", "New Translation Project");
    updateTrans(titleKey, "pt", "Novo Projeto de Tradução");
    updateTrans(descKey, "en", "New Project Description");
    updateTrans(descKey, "pt", "Descrição do Novo Projeto");

    setProjects([
      ...projects,
      {
        id: newId,
        title: titleKey,
        category: "freelance",
        description: descKey,
        genre: "Game Genre",
        role: "Translator & Editor",
        wordCount: "10k+ words",
        year: "2024",
        tags: ["EN > PTBR"],
        imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80",
        isFeatured: false,
        showInResume: ["general"],
        descKeys: [],
      },
    ]);
  };

  return (
    <DevModeTabPanel
      title="Manage Translation Projects"
      description="Add, edit, reorder, or feature your localization and translation projects."
      items={projects}
      onAdd={handleAdd}
      onDelete={(id) => setProjects(projects.filter((p) => p.id !== id))}
      addButtonLabel="Add Translation Project"
      emptyMessage="No projects found. Click 'Add Translation Project' to create one."
      dragState={dragState}
      renderCardHeader={(item) => {
        const title = getTrans(item.title, "en") || "New Project";
        return (
          <div className="flex items-center gap-2">
            <span className="font-bold">{title}</span>
            <span className="text-xs font-mono text-gray-500 font-normal">
              (ID: {item.id})
            </span>
          </div>
        );
      }}
      renderCardDetails={(item) => {
        const pIdx = projects.findIndex((x) => x.id === item.id);
        return (
          <>
            <TranslatedTextInput
              labelEn="Title (English)"
              labelPt="Title (Portuguese)"
              translationKey={item.title}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <TranslatedTextInput
              labelEn="Description (English)"
              labelPt="Description (Portuguese)"
              translationKey={item.description}
              updateTrans={updateTrans}
              getTrans={getTrans}
              isTextArea={true}
              rows={2}
            />

            {/* Translation Specific Fields: Role, Developer, Genre, Word Count, Year */}
            <div className="grid md:grid-cols-5 gap-4 bg-white/5 border border-white/10 p-4 rounded-xl">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  My Role (e.g. Translator / Editor)
                </label>
                <input
                  type="text"
                  value={item.role || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        role: e.target.value,
                      })
                    );
                  }}
                  placeholder="e.g. Translator & Editor"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Developer / Studio
                </label>
                <input
                  type="text"
                  value={item.developer || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        developer: e.target.value,
                      })
                    );
                  }}
                  placeholder="e.g. Bungie, Supercell"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Game Genre
                </label>
                <input
                  type="text"
                  value={item.genre || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        genre: e.target.value,
                      })
                    );
                  }}
                  placeholder="e.g. AAA Sci-Fi FPS"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Approx. Word Count
                </label>
                <input
                  type="text"
                  value={item.wordCount || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        wordCount: e.target.value,
                      })
                    );
                  }}
                  placeholder="e.g. 400k+ words"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Year / Period
                </label>
                <input
                  type="text"
                  value={item.year || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        year: e.target.value,
                      })
                    );
                  }}
                  placeholder="e.g. 2023"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            {/* Category, Tags, Image & Credit Image */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Category (inhouse, freelance, volunteer)
                </label>
                <input
                  type="text"
                  value={
                    Array.isArray(item.category)
                      ? item.category.join(", ")
                      : item.category
                  }
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        category: e.target.value
                          .split(",")
                          .map((t) => t.trim()) as ProjectCategory[],
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={item.tags.join(", ")}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        tags: e.target.value.split(",").map((t) => t.trim()),
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Project Banner Image URL
                </label>
                <input
                  type="text"
                  value={item.imageUrl}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        imageUrl: e.target.value,
                      })
                    );
                  }}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credit / Proof Screenshot URL (Optional)
                </label>
                <input
                  type="text"
                  value={item.creditImageUrl || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        creditImageUrl: e.target.value || undefined,
                      })
                    );
                  }}
                  placeholder="e.g. https://... or /assets/credits/destiny2.jpg"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">
                  Credit MobyGames / Proof URL (Optional)
                </label>
                <input
                  type="text"
                  value={item.mobyGamesUrl || item.creditUrl || ""}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        mobyGamesUrl: e.target.value || undefined,
                      })
                    );
                  }}
                  placeholder="e.g. https://www.mobygames.com/person/1420566/diogo-de-souza-medeiros/"
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-accent uppercase tracking-wider mb-1 flex items-center gap-1.5">
                🎮 Steam / Store URL
              </label>
              <input
                type="text"
                value={item.steamUrl || item.projectUrl || ""}
                onChange={(e) => {
                  setProjects(
                    updateItemAtIndex(projects, pIdx, {
                      steamUrl: e.target.value || undefined,
                      projectUrl: e.target.value || undefined,
                    })
                  );
                }}
                placeholder="e.g. https://store.steampowered.com/app/1086940/..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-accent focus:outline-none"
              />
            </div>

            <CustomLinkFields
              item={item}
              items={projects}
              setItems={setProjects}
              updateTrans={updateTrans}
              getTrans={getTrans}
              urlLabel="External Project Link (Optional)"
              urlPlaceholder="e.g. https://diogomedeiros.carrd.co"
              textKeyPlaceholder="resume.project.custom.link"
              defaultTextEn="View Game on Steam"
              defaultTextPt="Ver jogo na Steam"
            />

            <div className="flex flex-wrap gap-6 border-t border-white/5 pt-3">
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={item.isWip || false}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        isWip: e.target.checked,
                      })
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                />
                Live Service Game
              </label>

              <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={item.isFeatured}
                  onChange={(e) => {
                    setProjects(
                      updateItemAtIndex(projects, pIdx, {
                        isFeatured: e.target.checked,
                      })
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent"
                />
                Featured Highlight (Home Page Card)
              </label>
            </div>

            {item.showInResume && item.showInResume.length > 0 && (
              <BulletPointsEditor
                item={item}
                items={projects}
                setItems={setProjects}
                updateTrans={updateTrans}
                getTrans={getTrans}
                bulletKeyPrefix={`${item.title}.bullet`}
                label="CV Bullet Points"
              />
            )}
          </>
        );
      }}
    />
  );
};
