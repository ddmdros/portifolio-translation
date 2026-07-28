import React from "react";
import { type EducationType } from "../../content/EducationData";
import { updateItemAtIndex } from "../../utils/arrayUtils";
import { useDragAndDrop } from "../../hooks/useDragAndDrop";
import { DevModeTabPanel } from "./DevModeTabPanel";
import { TranslatedTextInput, CustomLinkFields } from "./DevModeInputs";

import { type CertificationType } from "../../types/certificationType";

interface EduTabProps {
  edu: EducationType[];
  setEdu: React.Dispatch<React.SetStateAction<EducationType[]>>;
  certs: CertificationType[];
  updateTrans: (key: string, lang: "en" | "pt", value: string) => void;
  getTrans: (key: string, lang: "en" | "pt") => string;
}

export const EduTab = ({
  edu,
  setEdu,
  certs,
  updateTrans,
  getTrans,
}: EduTabProps) => {
  const dragState = useDragAndDrop(edu, setEdu);

  const handleAdd = () => {
    const newId = `custom-edu-${Date.now()}`;
    const titleKey = `resume.edu.custom${newId}.title`;
    const instKey = `resume.edu.custom${newId}.inst`;
    const dateKey = `resume.edu.custom${newId}.date`;

    updateTrans(titleKey, "en", "New Degree Name");
    updateTrans(titleKey, "pt", "Novo Nome do Diploma/Curso");
    updateTrans(instKey, "en", "Institution Name");
    updateTrans(instKey, "pt", "Nome da Instituição");
    updateTrans(dateKey, "en", "Period (e.g. 2023 - 2026)");
    updateTrans(dateKey, "pt", "Período (Ex: 2023 - 2026)");

    setEdu([
      ...edu,
      {
        id: newId,
        titleKey,
        instKey,
        dateKey,
        showInResume: [],
        showInPortfolio: true,
      },
    ]);
  };

  return (
    <DevModeTabPanel
      title="Education History"
      description="Manage your schools, degrees, and study dates for the CV."
      items={edu}
      onAdd={handleAdd}
      onDelete={(id) => setEdu(edu.filter((x) => x.id !== id))}
      addButtonLabel="Add Education"
      emptyMessage="No education items found. Click 'Add Education' to create one."
      dragState={dragState}
      renderCardHeader={(item) => {
        const title = getTrans(item.titleKey, "en") || "New Education";
        return (
          <div className="flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs font-mono text-gray-500 font-normal">
              (ID: {item.id})
            </span>
          </div>
        );
      }}
      renderCardDetails={(item) => {
        const eIdx = edu.findIndex((x) => x.id === item.id);
        return (
          <>
            <TranslatedTextInput
              labelEn="Degree (English)"
              labelPt="Degree (Portuguese)"
              translationKey={item.titleKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <TranslatedTextInput
              labelEn="Institution (English)"
              labelPt="Institution (Portuguese)"
              translationKey={item.instKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <TranslatedTextInput
              labelEn="Date / Period (English)"
              labelPt="Date / Period (Portuguese)"
              translationKey={item.dateKey}
              updateTrans={updateTrans}
              getTrans={getTrans}
            />

            <div className="border-t border-white/5 pt-3 space-y-3">
              <span className="block text-xs font-semibold text-gray-400">
                GPA / Additional Info (Optional)
              </span>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={!!item.gpaKey}
                  onChange={(e) => {
                    if (e.target.checked) {
                      const gpaKey = `resume.edu.custom${item.id}.gpa`;
                      updateTrans(gpaKey, "en", "GPA: 9.0/10.0");
                      updateTrans(gpaKey, "pt", "Média: 9,0/10,0");
                      setEdu(updateItemAtIndex(edu, eIdx, { gpaKey }));
                    } else {
                      setEdu(
                        updateItemAtIndex(edu, eIdx, () => {
                          const rest = { ...item };
                          delete rest.gpaKey;
                          return rest;
                        })
                      );
                    }
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                  id={`gpa-check-${item.id}`}
                />
                <label
                  htmlFor={`gpa-check-${item.id}`}
                  className="text-xs text-gray-300 cursor-pointer select-none font-semibold"
                >
                  Enable GPA Info
                </label>
              </div>

              {item.gpaKey && (
                <div className="pl-4 border-l border-white/10 animate-fade-in">
                  <TranslatedTextInput
                    labelEn="GPA Info (English)"
                    labelPt="GPA Info (Portuguese)"
                    translationKey={item.gpaKey}
                    updateTrans={updateTrans}
                    getTrans={getTrans}
                  />
                </div>
              )}

              <CustomLinkFields
                item={item}
                items={edu}
                setItems={setEdu}
                updateTrans={updateTrans}
                getTrans={getTrans}
              />

              <div className="flex items-center gap-3 border-t border-white/5 pt-3">
                <input
                  type="checkbox"
                  checked={item.showInPortfolio !== false}
                  onChange={(e) => {
                    setEdu(
                      updateItemAtIndex(edu, eIdx, {
                        showInPortfolio: e.target.checked,
                      })
                    );
                  }}
                  className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent w-4 h-4 cursor-pointer"
                  id={`portfolio-check-${item.id}`}
                />
                <label
                  htmlFor={`portfolio-check-${item.id}`}
                  className="text-xs text-gray-300 cursor-pointer select-none font-semibold"
                >
                  Exibir no Portfólio (Linha do tempo)
                </label>
              </div>

              <div className="border-t border-white/5 pt-3 space-y-3">
                <span className="block text-xs font-semibold text-gray-400">
                  Linked Certifications (Optional)
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-black/20 p-3 rounded-lg border border-white/5 max-h-40 overflow-y-auto">
                  {certs.map((cert) => {
                    const certTitle = getTrans(cert.titleKey, "en") || getTrans(cert.titleKey, "pt") || cert.titleKey;
                    const isChecked = (item.certificationIds || []).includes(cert.id);
                    return (
                      <label
                        key={cert.id}
                        className="flex items-start gap-2.5 text-xs text-gray-300 hover:text-white cursor-pointer select-none py-1.5 px-2 rounded-md hover:bg-white/5 transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const currentIds = item.certificationIds || [];
                            const nextIds = e.target.checked
                              ? [...currentIds, cert.id]
                              : currentIds.filter((id) => id !== cert.id);
                            setEdu(
                              updateItemAtIndex(edu, eIdx, {
                                certificationIds: nextIds.length > 0 ? nextIds : undefined,
                              })
                            );
                          }}
                          className="rounded border-white/10 bg-black/40 text-accent focus:ring-accent w-4 h-4 mt-0.5 cursor-pointer"
                        />
                        <span>{certTitle}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {item.levels && item.levels.length > 0 && (
                <div className="border-t border-white/5 pt-3 space-y-4">
                  <span className="block text-xs font-semibold text-accent">
                    Syllabus Levels & Course Completion
                  </span>
                  
                  <div className="space-y-4 pl-3 border-l border-white/10">
                    {item.levels.map((level, lvlIdx) => (
                      <div key={level.id} className="space-y-3">
                        <div className="text-xs font-bold text-gray-300 border-b border-white/5 pb-1">
                          {level.titlePt || level.titleEn}
                        </div>

                        {level.id === "infnet-lvl-7" && (
                          <div className="bg-black/25 p-3 rounded-lg border border-white/5 space-y-2 mb-3">
                            <label className="block text-[10px] text-gray-400 font-semibold mb-1">
                              Select Graduation Emphasis (Batch updates all semesters)
                            </label>
                            <select
                              value={(() => {
                                let firstCourse = undefined;
                                for (const lvl of item.levels || []) {
                                  firstCourse = lvl.courses.find((c) => c.id === "infnet-emphasis-13");
                                  if (firstCourse) break;
                                }
                                if (firstCourse) {
                                  const match = firstCourse.titlePt.match(/^Ênfase:\s*(.*?)\s*-\s*/);
                                  if (match && match[1]) {
                                    const val = match[1];
                                    if (val === "Engenharia de Inteligência Artifical") {
                                      return "Engenharia de Inteligência Artificial";
                                    }
                                    return val;
                                  }
                                }
                                return "Engenharia de Software Aplicada";
                              })()}
                              onChange={(e) => {
                                const selectedEmphasisPt = e.target.value;
                                const emphasisMapping: Record<string, string> = {
                                  "Engenharia de Software Aplicada": "Applied Software Engineering",
                                  "Engenharia de Inteligência Artificial": "Artificial Intelligence Engineering",
                                  "Engenharia de Inteligência Artifical": "Artificial Intelligence Engineering",
                                  "Engenharia de Dados": "Data Engineering",
                                  "Engenharia de Cibersegurança": "Cybersecurity Engineering",
                                  "Engenharia de Cloud Computing": "Cloud Computing Engineering"
                                };
                                const selectedEmphasisEn = emphasisMapping[selectedEmphasisPt] || selectedEmphasisPt;
                                
                                const suffixMapping = [
                                  { id: "infnet-emphasis-13", pt: "Bloco 1", en: "Block 1" },
                                  { id: "infnet-emphasis-14", pt: "Projeto", en: "Project" },
                                  { id: "infnet-emphasis-15", pt: "Bloco 2", en: "Block 2" },
                                  { id: "infnet-emphasis-16", pt: "Projeto Final", en: "Final Project" },
                                ];

                                const newLevels = (item.levels || []).map((lvl) => {
                                  return {
                                    ...lvl,
                                    courses: lvl.courses.map((course) => {
                                      const suffix = suffixMapping.find(s => s.id === course.id);
                                      if (suffix) {
                                        return {
                                          ...course,
                                          titlePt: `Ênfase: ${selectedEmphasisPt} - ${suffix.pt}`,
                                          titleEn: `Emphasis: ${selectedEmphasisEn} - ${suffix.en}`,
                                        };
                                      }
                                      return course;
                                    })
                                  };
                                });
                                setEdu(updateItemAtIndex(edu, eIdx, { levels: newLevels }));
                              }}
                              className="w-full bg-black/40 border border-white/10 rounded px-2 py-1 text-xs text-white focus:border-accent focus:outline-none cursor-pointer"
                            >
                              <option value="Engenharia de Software Aplicada">Engenharia de Software Aplicada</option>
                              <option value="Engenharia de Inteligência Artificial">Engenharia de Inteligência Artificial</option>
                              <option value="Engenharia de Dados">Engenharia de Dados</option>
                              <option value="Engenharia de Cibersegurança">Engenharia de Cibersegurança</option>
                              <option value="Engenharia de Cloud Computing">Engenharia de Cloud Computing</option>
                            </select>
                          </div>
                        )}
                        
                        <div className="space-y-3 pl-3">
                          {level.courses.map((course, courseIdx) => {
                            const courseCertKey = course.certificateId || "";
                            return (
                              <div key={course.id} className="bg-black/25 p-3 rounded-lg border border-white/5 space-y-2">
                                <div className="flex justify-between items-center text-xs font-semibold text-white">
                                  <span>{course.titlePt || course.titleEn}</span>
                                  <span className="text-accent font-mono">{course.completion}%</span>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-3">
                                  {/* Completion Input */}
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">
                                      Completion Percentage (0-100)
                                    </label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={course.completion}
                                        onChange={(e) => {
                                          const value = parseInt(e.target.value) || 0;
                                          const newLevels = [...(item.levels || [])];
                                          newLevels[lvlIdx] = {
                                            ...newLevels[lvlIdx],
                                            courses: [...newLevels[lvlIdx].courses]
                                          };
                                          const currentCourse = newLevels[lvlIdx].courses[courseIdx];
                                          const nextCourse = {
                                            ...currentCourse,
                                            completion: value,
                                          };
                                          if (value < 100) {
                                            delete nextCourse.grade;
                                          }
                                          newLevels[lvlIdx].courses[courseIdx] = nextCourse;
                                          setEdu(updateItemAtIndex(edu, eIdx, { levels: newLevels }));
                                        }}
                                        className="w-full accent-accent cursor-pointer"
                                      />
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={course.completion}
                                        onChange={(e) => {
                                          const value = Math.max(0, Math.min(100, parseInt(e.target.value) || 0));
                                          const newLevels = [...(item.levels || [])];
                                          newLevels[lvlIdx] = {
                                            ...newLevels[lvlIdx],
                                            courses: [...newLevels[lvlIdx].courses]
                                          };
                                          const currentCourse = newLevels[lvlIdx].courses[courseIdx];
                                          const nextCourse = {
                                            ...currentCourse,
                                            completion: value,
                                          };
                                          if (value < 100) {
                                            delete nextCourse.grade;
                                          }
                                          newLevels[lvlIdx].courses[courseIdx] = nextCourse;
                                          setEdu(updateItemAtIndex(edu, eIdx, { levels: newLevels }));
                                        }}
                                        className="w-12 bg-black/40 border border-white/10 rounded px-1 text-center font-mono text-xs text-white"
                                      />
                                    </div>
                                  </div>
                                  
                                  {/* Certification Linkage */}
                                  <div>
                                    <label className="block text-[10px] text-gray-500 mb-1">
                                      Linked Certificate
                                    </label>
                                    <select
                                      value={courseCertKey}
                                      onChange={(e) => {
                                        const val = e.target.value || undefined;
                                        const newLevels = [...(item.levels || [])];
                                        newLevels[lvlIdx] = {
                                          ...newLevels[lvlIdx],
                                          courses: [...newLevels[lvlIdx].courses]
                                        };
                                        newLevels[lvlIdx].courses[courseIdx] = {
                                          ...newLevels[lvlIdx].courses[courseIdx],
                                          certificateId: val
                                        };
                                        
                                        // Also automatically add this certificate ID to the main certificationIds list of the education item if not already there
                                        let nextCertIds = [...(item.certificationIds || [])];
                                        if (val && !nextCertIds.includes(val)) {
                                          nextCertIds.push(val);
                                        }
                                        
                                        setEdu(updateItemAtIndex(edu, eIdx, { 
                                          levels: newLevels,
                                          certificationIds: nextCertIds.length > 0 ? nextCertIds : undefined
                                        }));
                                      }}
                                      className="w-full bg-black/40 border border-white/10 rounded-lg px-2 py-1 text-xs text-white focus:border-accent focus:outline-none"
                                    >
                                      <option value="">No Certificate Linked</option>
                                      {certs.map((c) => (
                                        <option key={c.id} value={c.id}>
                                          {getTrans(c.titleKey, "pt") || getTrans(c.titleKey, "en") || c.titleKey}
                                        </option>
                                      ))}
                                    </select>
                                  </div>
                                </div>

                                {/* Grade input (visible when completed) */}
                                {course.completion === 100 && (
                                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/5">
                                    <div>
                                      <label className="block text-[10px] text-gray-500 mb-1">
                                        Grade (Nota) (Optional)
                                      </label>
                                      <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        value={course.grade || ""}
                                        onChange={(e) => {
                                          const val = e.target.value ? parseInt(e.target.value) || 0 : undefined;
                                          const newLevels = [...(item.levels || [])];
                                          newLevels[lvlIdx] = {
                                            ...newLevels[lvlIdx],
                                            courses: [...newLevels[lvlIdx].courses]
                                          };
                                          newLevels[lvlIdx].courses[courseIdx] = {
                                            ...newLevels[lvlIdx].courses[courseIdx],
                                            grade: val
                                          };
                                          setEdu(updateItemAtIndex(edu, eIdx, { levels: newLevels }));
                                        }}
                                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-1 text-xs text-white focus:border-accent focus:outline-none"
                                        placeholder="e.g. 95"
                                      />
                                    </div>
                                  </div>
                                )}

                                {/* Expected date inputs (visible when not completed) */}
                                {course.completion < 100 && (
                                  <div className="grid grid-cols-2 gap-3 pt-1 border-t border-white/5">
                                    <div>
                                      <label className="block text-[10px] text-gray-500 mb-1">
                                        Expected Date (English)
                                      </label>
                                      <input
                                        type="text"
                                        value={course.expectedDateEn || ""}
                                        onChange={(e) => {
                                          const val = e.target.value || undefined;
                                          const newLevels = [...(item.levels || [])];
                                          newLevels[lvlIdx] = {
                                            ...newLevels[lvlIdx],
                                            courses: [...newLevels[lvlIdx].courses]
                                          };
                                          newLevels[lvlIdx].courses[courseIdx] = {
                                            ...newLevels[lvlIdx].courses[courseIdx],
                                            expectedDateEn: val
                                          };
                                          setEdu(updateItemAtIndex(edu, eIdx, { levels: newLevels }));
                                        }}
                                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-1 text-xs text-white focus:border-accent focus:outline-none"
                                        placeholder="e.g. Expected: 26T2"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] text-gray-500 mb-1">
                                        Previsão (Portuguese)
                                      </label>
                                      <input
                                        type="text"
                                        value={course.expectedDatePt || ""}
                                        onChange={(e) => {
                                          const val = e.target.value || undefined;
                                          const newLevels = [...(item.levels || [])];
                                          newLevels[lvlIdx] = {
                                            ...newLevels[lvlIdx],
                                            courses: [...newLevels[lvlIdx].courses]
                                          };
                                          newLevels[lvlIdx].courses[courseIdx] = {
                                            ...newLevels[lvlIdx].courses[courseIdx],
                                            expectedDatePt: val
                                          };
                                          setEdu(updateItemAtIndex(edu, eIdx, { levels: newLevels }));
                                        }}
                                        className="w-full bg-black/40 border border-white/10 rounded px-3 py-1 text-xs text-white focus:border-accent focus:outline-none"
                                        placeholder="e.g. Previsão: 26T2"
                                      />
                                    </div>
                                  </div>
                                )}


                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        );
      }}
    />
  );
};

