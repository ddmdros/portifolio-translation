export interface ExperienceType {
  id: string;
  titleKey: string;
  companyKey: string;
  dateKey: string;
  descKeys: string[];
  showInResume: string[];
  portfolioUrlKey?: string;
  linkUrl?: string;
  linkTextKey?: string;
}

export const EXPERIENCE_DATA: ExperienceType[] = [
  {
    "id": "exp-keywords",
    "titleKey": "resume.exp.keywords.title",
    "companyKey": "resume.exp.keywords.company",
    "dateKey": "resume.exp.keywords.date",
    "descKeys": [
      "resume.exp.keywords.desc1",
      "resume.exp.keywords.desc2",
      "resume.exp.keywords.desc3"
    ],
    "showInResume": [
      "general"
    ],
    "linkUrl": "https://portifolio-translation.vercel.app/",
    "linkTextKey": "resume.link.portfolio"
  },
  {
    "id": "exp-independent",
    "titleKey": "resume.exp.independent.title",
    "companyKey": "resume.exp.independent.company",
    "dateKey": "resume.exp.independent.date",
    "descKeys": [
      "resume.exp.independent.desc1"
    ],
    "showInResume": [
      "general"
    ],
    "portfolioUrlKey": "resume.link.portfolio"
  },
  {
    "id": "exp-webtoon",
    "titleKey": "resume.exp.webtoon.title",
    "companyKey": "resume.exp.webtoon.company",
    "dateKey": "resume.exp.webtoon.date",
    "descKeys": [
      "resume.exp.webtoon.desc1"
    ],
    "showInResume": [
      "general"
    ]
  }
];
