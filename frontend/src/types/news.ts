
export interface NewsItem {
    title: string;
    url: string;
    publishedAt: string;
    source: string;
    image?: string | null;
    description?: string | null;
    content?: string | null;
}

/** Estrutura do body que a API devolve em /search */
export interface SearchResponse {
    error: string;
    count: number;
    items: NewsItem[];
}

/** Estrutura do body que a API devolve em /notices */
export interface NoticesResponse {
    count: number;
    items: NewsItem[];
}

/** Opções de ordenação que a UI oferece */
export type SortOption =
    | 'date_desc'
    | 'date_asc'
    | 'title_asc'
    | 'title_desc';
