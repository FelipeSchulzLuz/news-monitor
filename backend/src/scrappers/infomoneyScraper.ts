import { SourceScraper, CollectedNotice } from './types';
import {fetchRssFeed, parseRssItems} from "@/src/utils";

export const infomoneyScraper: SourceScraper = {
  name: 'Infomoney',

  async fetchNews(keyword: string): Promise<CollectedNotice[]> {
    const $ = await fetchRssFeed('https://www.infomoney.com.br/feed/');
    return parseRssItems($, keyword);
  },
};