export interface SkillType {
  id: string;
  categoryKey: string;
  name: string;
  showInResume: string[];
  resumeDetailsKey?: string;
  credentialUrl?: string;
  certTextKey?: string;
}

export const SKILLS_DATA: SkillType[] = [
  {
    "id": "lang-en",
    "categoryKey": "about.stacks.languages",
    "name": "English (C2 Proficient)",
    "showInResume": [
      "general"
    ],
    "credentialUrl": "https://www.efset.org/cert/iwWZUS"
  },
  {
    "id": "lang-pt",
    "categoryKey": "about.stacks.languages",
    "name": "Portuguese (Native)",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "lang-fr",
    "categoryKey": "about.stacks.languages",
    "name": "French (Intermediate)",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "cat-memoq",
    "categoryKey": "about.stacks.cat.tools",
    "name": "memoQ",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "cat-phrase",
    "categoryKey": "about.stacks.cat.tools",
    "name": "Phrase (former Memsource)",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "cat-trados",
    "categoryKey": "about.stacks.cat.tools",
    "name": "SDL Trados",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "cat-wordfast",
    "categoryKey": "about.stacks.cat.tools",
    "name": "Wordfast",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "soft-msoffice",
    "categoryKey": "about.stacks.other.software",
    "name": "MS Office",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "soft-ps",
    "categoryKey": "about.stacks.other.software",
    "name": "Adobe Photoshop",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "soft-ai",
    "categoryKey": "about.stacks.other.software",
    "name": "Adobe Illustrator",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "soft-id",
    "categoryKey": "about.stacks.other.software",
    "name": "Adobe InDesign",
    "showInResume": [
      "general"
    ]
  }
];
