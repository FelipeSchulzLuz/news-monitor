import { SourceScraper, CollectedNotice } from './types';
import prisma from '@/src/prisma/client';

import { googleNewsScraper } from './googleNewsScraper';
import { transparenciaScraper } from './transparenciaScraper';
import { agenciaBrasilScraper } from './agenciaBrasilScraper';
import { infomoneyScraper } from './infomoneyScraper';
import { bbcScraper } from './bbcScraper';
import { newsApiScraper } from './newsApiScraper';
import {formatSource} from "@/src/utils/format";

const scrapers: SourceScraper[] = [
  googleNewsScraper,
  transparenciaScraper,
  agenciaBrasilScraper,
  infomoneyScraper,
  bbcScraper,
  newsApiScraper,
];

export async function runScrapersForKeyword(
  keyword: string
): Promise<CollectedNotice[]> {
  console.log(`🚀 [runScrapers] starting search for: "${keyword}"`);
  const saved: CollectedNotice[] = [];

  for (const scraper of scrapers) {
    console.log(`🔎 [runScrapers] running scraper: ${scraper.name}`);
    let articles: CollectedNotice[] = [];

    try {
      articles = await scraper.fetchNews(keyword);
      console.log(`🔎 [runScrapers] ${scraper.name} returned ${articles.length} items`);
    } catch (err) {
      console.error(`❌ [runScrapers] error in ${scraper.name}:`, err);
      continue;
    }

    for (const article of articles) {
      try {
        const existing = await prisma.notice.findUnique({
          where: { url: article.url },
        });

        if (!existing) {
          const created = await prisma.notice.create({
            data: {
              title:       article.title,
              url:         article.url,
              publishedAt: article.publishedAt,
              source:      formatSource(scraper.name),
              keyword:     keyword,
              image:       article.image,
              description: article.description,
              content:     article.content,
            },
          });
          saved.push(created);
        }
      } catch (saveErr) {
        console.error(`❌ [runScrapers] failed to save article (${article.url}):`, saveErr);
      }
    }
  }

  console.log(`✅ [runScrapers] total new articles saved: ${saved.length}`);
  return saved;
}

export async function scrapeNoticiasForKeyword(
  keyword: string
): Promise<CollectedNotice[]> {
  let all: CollectedNotice[] = [];

  for (const scraper of scrapers) {
    console.log(`🔎 [scrapeOnly] running ${scraper.name}`);
    try {
      const articles = await scraper.fetchNews(keyword);
      console.log(`🔎 [scrapeOnly] ${scraper.name} → ${articles.length}`);
      all = all.concat(articles);
    } catch (err) {
      console.error(`❌ [scrapeOnly] error in ${scraper.name}:`, err);
    }
  }

  return all;
}