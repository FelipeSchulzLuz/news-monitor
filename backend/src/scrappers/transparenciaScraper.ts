import { SourceScraper, CollectedNotice } from './types';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { parseDateBR } from '@/src/utils/date';

export const transparenciaScraper: SourceScraper = {
  name: 'Portal da Transparência',

  async fetchNews(keyword: string): Promise<CollectedNotice[]> {
    const noticias: CollectedNotice[] = [];
    const urlBusca = `https://www.portaltransparencia.gov.br/busca?termo=${encodeURIComponent(keyword)}`;

    try {
      const { data: html } = await axios.get(urlBusca, {
        headers: { 'User-Agent': 'Mozilla/5.0' },
      });

      const $ = cheerio.load(html);

      $('.resultado-busca-item').each((_, el) => {
        const title = $(el).find('.resultado-busca-titulo a').text().trim();
        const link = $(el).find('.resultado-busca-titulo a').attr('href');
        const publishDate = $(el).find('.resultado-busca-data').text().trim();
        const source = $(el).find('.resultado-busca-fonte').text().trim();
        const image = $(el).find('.resultado-busca-imagem img').attr('src');
        const description = $(el).find('.resultado-busca-descricao').text().trim();
        const content = $(el).find('.resultado-busca-conteudo').text().trim();
        
        if (title && link) {
          noticias.push({
            title,
            url: `https://www.portaltransparencia.gov.br${link}`,
            publishedAt: parseDateBR(publishDate),
            source,
            image,
            description,
            content,
          });
        }
      });

      return noticias;
    } catch (err) {
      console.error(`❌ Erro ao buscar no Portal da Transparência:`, err);
      return [];
    }
  },
};