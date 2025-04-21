import Parser from 'rss-parser';
import { SourceScraper, CollectedNotice } from './types';

const parser = new Parser();

export const googleNewsScraper: SourceScraper = {
  name: 'Google News RSS',

  async fetchNews(keyword: string): Promise<CollectedNotice[]> {
    const noticias: CollectedNotice[] = [];
    const feedUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(keyword)}&hl=pt-BR&gl=BR&ceid=BR:pt-419`;

    try {
      const feed = await parser.parseURL(feedUrl);
      feed.items.forEach(item => {
        if (item.title && item.link && item.pubDate) {
          const source = item.source?.title || 'Google News';
          const description = item.contentSnippet || item.description || '';
          const content = item.content || '';
          const image = item.enclosure?.url || null;
          
          noticias.push({
            title: item.title,
            url: item.link,
            publishedAt: new Date(item.pubDate),
            source,
            description,
            content,
            image
          });
        }
      });
    } catch (err) {
      console.error(`❌ Erro ao buscar RSS do Google News:`, err);
    }

    return noticias;
  },
};