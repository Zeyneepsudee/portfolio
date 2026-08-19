export interface ProfileData {
  name: string;
  title: string;
  greeting: string;
  description: string;
  tags: string[];
}

export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  iconName: string;
  color: string;
}

export interface SiteData {
  profile: ProfileData;
  contacts: ContactMethod[];
}
