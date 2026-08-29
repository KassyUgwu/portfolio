export type SocialLink = {
  label: string;
  href: string;
};

export type Experience = {
  company: string;
  title: string;
  period: string;
  location?: string;
  href?: string;
  summary: string;
  points: string[];
  stack: string[];
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  problem?: string;
  role: string;
  period: string;
  stack: string[];
  featured: boolean;
  status?: string;
  image?: {
    src: string;
    alt: string;
  };
  links: ProjectLink[];
  highlights: string[];
  sections: ProjectSection[];
};
