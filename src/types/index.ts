export type TProject = {
  id: string;
  title: string;
  description: string;
  features: string[];
  tags: string[];
  thumbnail: string;
  liveSite: string;
  githubClient: string;
  githubBackend?: string | null;
  technologies: string[];
  createdAt: string;
  updatedAt: string;
};

export type TBlog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string | null;
  tags: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  createdAt: string;
  updatedAt: string;
};
