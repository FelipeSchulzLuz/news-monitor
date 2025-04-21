# 📰 News Monitor

**News Monitor** é uma plataforma de monitoramento de notícias em tempo real, baseada em palavras-chave. O sistema busca artigos em múltiplas fontes (como Google News, G1, BBC, entre outras), salva os resultados relevantes em um banco de dados, e oferece uma interface para consulta e histórico.

---

## 📦 Estrutura do Projeto

Este repositório segue uma arquitetura monorepo contendo:

news-monitor/ 
  ├── backend/ # API RESTful em Node.js + Express + Prisma 
  ├── frontend/ # Interface web com React + Vite + MUI 
  ├── .env # Variáveis de ambiente (exemplo: DATABASE_URL, NEWS_API_KEY) 
  └── README.md


  ---

## 🧠 Funcionalidades

- 🔎 Busca por palavras-chave em múltiplas fontes
- 🧠 Extração inteligente de título, imagem, conteúdo, data e fonte
- 📅 Filtros por data, fonte e ordenação
- 🧾 Histórico salvo no banco de dados PostgreSQL
- 🔄 Scrapers modulares e facilmente extensíveis
- 🧭 Interface limpa com paginação e filtros

---

## 🚀 Como rodar localmente

### 1. Clonar o repositório

```bash
git clone git@github.com:FelipeSchulzLuz/news-monitor.git
cd news-monitor
