import axios from 'axios';
import * as cheerio from 'cheerio';
import {CollectedNotice} from "@/src/scrappers/types";

export async function fetchRssFeed(feedUrl: string) {
  const { data } = await axios.get(feedUrl);
  return cheerio.load(data, { xmlMode: true });
}

export function parseRssItems(
  $: cheerio.CheerioAPI,
  keyword: string
): CollectedNotice[] {
  const notices: CollectedNotice[] = [];

  $('item').each((_, item) => {
    const title = $(item).find('title').text();
    const url = $(item).find('link').text();
    const publishedAt = new Date($(item).find('pubDate').text());
    const content = $(item).find('content\\:encoded').text();
    const description = $(item).find('description').text();
    const image = $(item).find('media\\:thumbnail').attr('url');
    const source = $(item).find('source').text();

    if (
      title.toLowerCase().includes(keyword.toLowerCase()) ||
      description.toLowerCase().includes(keyword.toLowerCase())
    ) {
      notices.push({ title, url, publishedAt, content, description, image, source });
    }
  });

  return notices;
}