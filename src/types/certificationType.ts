export type CertificationCategory = "idiomas" | "geral";

export interface CertificationType {
  id: string;
  titleKey: string;
  orgKey: string;
  year: string;
  showInResume: string[];
  category: CertificationCategory;
  hours?: string;
  credentialUrl?: string;
  credentialUrlPt?: string;
  showOnHome?: boolean;
  sectionHighlight?: boolean;
}
