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
