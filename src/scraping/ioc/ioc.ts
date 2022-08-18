import { ContainerModule } from "inversify";
import ScrapingService from "scraping/service/scraping-service";

const scrapingIoC = new ContainerModule((bind) => {
  bind(ScrapingService).toSelf();
});

export default scrapingIoC;
