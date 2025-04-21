import { Router, Request, Response, NextFunction } from 'express';
import prisma from '../prisma/client';
import { formatSource } from '@/src/utils/format';

const router = Router();

/**
 * GET /notices?keyword=...&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&page=1
 */
const getNoticesHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const rawKeyword = String(req.query.keyword ?? '').trim();
  const source     = String(req.query.source ?? '').trim();
  const startDate  = String(req.query.startDate ?? '').trim();
  const endDate    = String(req.query.endDate ?? '').trim();
  const page       = Math.max(1, parseInt(String(req.query.page ?? '1'), 10));
  const pageSize   = 15;

  if (!rawKeyword) {
    res.status(400).json({ error: 'Informe a keyword.' });
    return;
  }

  const where: any = {
    keyword: { contains: rawKeyword, mode: 'insensitive' },
  };

  if (source) where.source = source;

  if (startDate || endDate) {
    where.publishedAt = {};
    if (startDate) where.publishedAt.gte = new Date(startDate);
    if (endDate) where.publishedAt.lte = new Date(endDate);
  }

  try {
    const total = await prisma.notice.count({ where });
    const totalPages = Math.ceil(total / pageSize);

    if (page > totalPages && total > 0) {
      res.status(400).json({ error: 'Página fora do intervalo disponível.' });
      return;
    }

    const itemsRaw = await prisma.notice.findMany({
      where,
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { publishedAt: 'desc' },
    });

    const items = itemsRaw.map(n => ({
      title: n.title,
      url: n.url,
      source: n.url ? formatSource(n.url) : n.source,
      publishedAt: n.publishedAt.toISOString(),
      description: n.description,
      content: n.content,
      image: n.image,
    }));

    res.json({ count: total, totalPages, page, pageSize, items });
  } catch (err) {
    next(err);
  }
};

router.get('/', getNoticesHandler);
export default router;