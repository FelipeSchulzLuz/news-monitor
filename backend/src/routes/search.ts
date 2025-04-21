import { Router } from 'express';
import { runScrapersForKeyword } from '../scrappers';
import { formatSource } from '@/src/utils/format';

const router = Router();

/**
 * POST /search
 * Pesquisa notícias usando scrapers e retorna resultado com padrão igual à rota /notices
 */
router.post('/', async (req, res, next) => {
  const { keyword } = req.body as { keyword?: string };

  if (!keyword?.trim()) {
    res.status(400).json({ error: 'Informe a keyword.' });
    return;
  }

  try {
    const scraped = await runScrapersForKeyword(keyword.trim());

    const items = scraped.map(n => ({
      title:       n.title,
      url:         n.url,
      source:      formatSource(n.url),
      publishedAt: n.publishedAt.toISOString(),
      content:     n.content,
      description: n.description,
      image:       n.image,
    }));

    const count = items.length;

    res.json({
      count,
      items,
      page: 1,
      pageSize: count,
      totalPages: 1,
    });
  } catch (err) {
    next(err);
  }
});

export default router;