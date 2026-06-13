export type AccessType = 'open' | 'closed';

export interface BahaiApp {
  name: string;
  url: string;
  tags: string[];
  access: AccessType;
  github?: string;
  description?: string;
  dateAdded?: string;
  resource?: boolean; // true = website/resource, false/undefined = app
}
