export type AccessType = 'open' | 'closed';

export interface BahaiApp {
  name: string;
  url: string;
  tags: string[];
  access: AccessType;
  languages?: string[];
  github?: string;
  description?: string;
  dateAdded?: string;
  resource?: boolean;
}
