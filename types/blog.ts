export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface BlogComment {
  id: string;
  postSlug: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
  approved: boolean;
}