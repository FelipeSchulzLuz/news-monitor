import axios from 'axios';
import { SourceScraper, CollectedNotice } from './types';

const API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export const newsApiScraper: SourceScraper = {
  name: 'NewsAPI.org',

  async fetchNews(keyword: string): Promise<CollectedNotice[]> {
    if (!API_KEY) throw new Error('NEWS_API_KEY não definida no .env');
    if (!keyword || keyword.length < 3) return [];

    const encodedKeyword = `"${keyword}"`;
    const { data } = await axios.get(NEWS_API_URL, {
      params: {
        q: encodedKeyword,
        searchIn: 'title,description',
        apiKey: API_KEY,
        language: 'pt',
        sortBy: 'relevancy',
        pageSize: 50,
      },
    });

    if (data.status !== 'ok') {
      throw new Error(`Erro NewsAPI: ${data.message}`);
    }

    return data.articles
      .filter((article: any) =>
        article.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        article.description?.toLowerCase().includes(keyword.toLowerCase())
      )
      .map((article: any) => ({
        title: article.title,
        url: article.url,
        publishedAt: new Date(article.publishedAt),
        source: article.source?.name || 'NewsAPI.org',
        image: article.urlToImage || null,
        description: article.description || null,
        content: article.content || null,
      }))
  },
};