export interface CollectedNotice {
  title: string;
  url: string;
  publishedAt: Date;
  source?: string;
  image?: string | null;
  description?: string | null;
  content?: string | null;
}

export interface SourceScraper {
  name: string;
  fetchNews: (keyword: string) => Promise<CollectedNotice[]>;
}