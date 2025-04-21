import cron from 'node-cron';
import {runScrapersForKeyword} from "@/src/scrappers";

const defaultKeywords = ['eleições','corrupção','governo'];

cron.schedule('0 * * * *', async () => {
  for (const kw of defaultKeywords) {
    await runScrapersForKeyword(kw);
  }
  console.log('✅ Scrapers agendados rodaram em', new Date().toISOString());
});