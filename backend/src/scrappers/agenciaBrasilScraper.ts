import { SourceScraper, CollectedNotice } from './types';
import {fetchRssFeed, parseRssItems} from "@/src/utils";


export const agenciaBrasilScraper: SourceScraper = {
  name: 'Agência Brasil',

  async fetchNews(keyword: string): Promise<CollectedNotice[]> {
    const $ = await fetchRssFeed('https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml');
    return parseRssItems($, keyword);
  },
};