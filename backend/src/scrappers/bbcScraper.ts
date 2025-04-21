import { SourceScraper, CollectedNotice } from './types';
import { fetchRssFeed, parseRssItems } from '@/src/utils';

export const bbcScraper: SourceScraper = {
  name: 'BBC News',

  async fetchNews(keyword: string): Promise<CollectedNotice[]> {
    const $ = await fetchRssFeed('https://feeds.bbci.co.uk/news/rss.xml');
    return parseRssItems($, keyword);
  },
};