export type FontePadrao = {
  dominio: string;
  nome: string;
  categoria: 'news' | 'governo' | 'transparencia' | 'outros';
};

export const FONTES_PADRAO: FontePadrao[] = [
  { dominio: 'news.google.com', nome: 'Google News', categoria: 'news' },
  { dominio: 'google.com', nome: 'Google', categoria: 'news' },
  { dominio: 'g1.globo.com', nome: 'G1 - Globo', categoria: 'news' },
  { dominio: 'bbc.com', nome: 'BBC News', categoria: 'news' },
  { dominio: 'bbc.co.uk', nome: 'BBC News UK', categoria: 'news' },
  { dominio: 'transparencia.gov.br', nome: 'Portal da Transparência', categoria: 'transparencia' },
  { dominio: 'gov.br', nome: 'Governo Federal', categoria: 'governo' },
  { dominio: 'planalto.gov.br', nome: 'Planalto', categoria: 'governo' },
  { dominio: 'dados.gov.br', nome: 'Dados Abertos - Governo', categoria: 'transparencia' },
  { dominio: 'folha.uol.com.br', nome: 'Folha de S.Paulo', categoria: 'news' },
  { dominio: 'estadao.com.br', nome: 'O Estado de S.Paulo', categoria: 'news' },
  { dominio: 'jornaldoBrasil.com.br', nome: 'Jornal do Brasil', categoria: 'news' },
  { dominio: 'jornaldoBrasilonline.com.br', nome: 'Jornal do Brasil Online', categoria: 'news' },
  { dominio: 'jornalopovo.com.br', nome: 'Jornal O Povo', categoria: 'news' },
  { dominio: 'correiodobrasil.com.br', nome: 'Correio do Brasil', categoria: 'news' },
  { dominio: 'noticias.r7.com', nome: 'R7 Notícias', categoria: 'news' },
  { dominio: 'terra.com.br', nome: 'Terra Notícias', categoria: 'news' },
  { dominio: 'uol.com.br', nome: 'UOL Notícias', categoria: 'news' },
  // { dominio: '', nome: '', categoria: '' }, // Placeholder for unknown sources\
  
  
  
];

/**
 * Retorna o nome amigável da fonte,
 soURL de entrada.
 * Se não encontrar, devolve o hostname sem "www."
 */
export function formatSource(url: string): string {
  try {
    const { hostname } = new URL(url);
    const source = FONTES_PADRAO.find(f => hostname.includes(f.dominio));
    return source?.nome ?? hostname.replace(/^www\./, '');
  } catch {
    return 'fonte-desconhecida';
  }
}

/**
 * Retorna a categoria ('news' | 'governo' | 'transparencia' | 'outros')
 * com base no domínio da URL.
 */
export function getFonteCategoria(url: string): FontePadrao['categoria'] {
  try {
    const { hostname } = new URL(url);
    const fonte = FONTES_PADRAO.find(f => hostname.includes(f.dominio));
    return fonte?.categoria ?? 'outros';
  } catch {
    return 'outros';
  }
}