export type ProjectCategory =
  | "all"
  | "inhouse"
  | "freelance"
  | "volunteer";

export interface ProjectType {
  id: string;
  title: string;
  category: ProjectCategory | ProjectCategory[];
  description: string;
  genre?: string;
  role?: string;
  developer?: string;
  wordCount?: string;
  year?: string;
  tags: string[];
  imageUrl: string;
  creditImageUrl?: string;
  steamUrl?: string;
  docsUrl?: string;
  githubUrl?: string;
  projectUrl?: string;
  isFeatured: boolean;
  isWip?: boolean;
  docId?: string;
  showInResume?: string[];
  descKeys?: string[];
  linkUrl?: string;
  linkTextKey?: string;
}


