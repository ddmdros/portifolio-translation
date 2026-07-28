export interface EducationCourse {
  id: string;
  titleEn: string;
  titlePt: string;
  subtitleEn?: string;
  subtitlePt?: string;
  completion: number;
  certificateId?: string;
  grade?: number;
  expectedDateEn?: string;
  expectedDatePt?: string;
  isEmphasis?: boolean;
  isCurrent?: boolean;
}

export interface EducationLevel {
  id: string;
  titleEn: string;
  titlePt: string;
  descEn?: string;
  descPt?: string;
  courses: EducationCourse[];
}

export interface EducationType {
  id: string;
  titleKey: string;
  instKey: string;
  dateKey: string;
  gpaKey?: string;
  showInResume: string[];
  showInPortfolio?: boolean;
  certificationIds?: string[];
  levels?: EducationLevel[];
  linkUrl?: string;
  linkTextKey?: string;
}

export const EDUCATION_DATA: EducationType[] = [
  {
    "id": "edu-postgrad",
    "titleKey": "resume.edu.postgrad.title",
    "instKey": "resume.edu.postgrad.inst",
    "dateKey": "resume.edu.postgrad.date",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "edu-journalism",
    "titleKey": "resume.edu.journalism.title",
    "instKey": "resume.edu.journalism.inst",
    "dateKey": "resume.edu.journalism.date",
    "gpaKey": "resume.edu.journalism.gpa",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "edu-se",
    "titleKey": "resume.edu.se.title",
    "instKey": "resume.edu.se.inst",
    "dateKey": "resume.edu.se.date",
    "showInResume": [
      "general"
    ]
  },
  {
    "id": "edu-gamedev",
    "titleKey": "resume.edu.gamedev.title",
    "instKey": "resume.edu.gamedev.inst",
    "dateKey": "resume.edu.gamedev.date",
    "showInResume": [
      "general"
    ]
  }
];
