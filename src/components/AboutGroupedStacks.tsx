import { FormattedMessage } from "react-intl";
import { SectionDiv } from "./SectionDiv";
import {
  Languages,
  Wrench,
  FileCode2,
  Globe,
  Sparkles,
  BookOpen,
} from "lucide-react";

const translationStackGroups = [
  {
    category: "about.stacks.languages",
    items: [
      { name: "English (C2)", icon: <Globe size={22} className="text-accent" /> },
      { name: "Portuguese (Native)", icon: <Languages size={22} className="text-accent" /> },
      { name: "French (Intermediate)", icon: <BookOpen size={22} className="text-accent" /> },
    ],
  },
  {
    category: "about.stacks.cat.tools",
    items: [
      { name: "memoQ", icon: <Wrench size={22} className="text-accent" /> },
      { name: "Phrase / Memsource", icon: <Sparkles size={22} className="text-accent" /> },
      { name: "SDL Trados", icon: <FileCode2 size={22} className="text-accent" /> },
      { name: "Wordfast", icon: <Wrench size={22} className="text-accent" /> },
    ],
  },
];

const AboutGroupedStacks = () => {
  return (
    <section className="py-12">
      <SectionDiv sectionNumber="01" sectionTitleId="section.title.1" />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold text-text-h leading-tight">
            <FormattedMessage id="about.title" />
          </h2>
          <p className="text-gray-400 leading-relaxed whitespace-pre-line text-base">
            <FormattedMessage id="about.description" />
          </p>
        </div>

        <div className="space-y-8">
          {translationStackGroups.map((group) => (
            <div key={group.category} className="bg-card-bg/40 border border-white/10 p-6 rounded-2xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
                <FormattedMessage id={group.category} />
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {group.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center justify-center p-3.5 bg-white/5 border border-white/10 rounded-xl hover:border-accent/40 transition-all hover:scale-102"
                  >
                    <div className="mb-2">{item.icon}</div>
                    <span className="text-xs text-gray-300 font-semibold text-center">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutGroupedStacks;
