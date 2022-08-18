import { Container } from "inversify";
import appIoC from "app/ioc/ioc";
import authIoC from "auth/ioc/ioc";
import clientIoC from "client/ioc/ioc";
import commonIoC from "common/ioc/ioc";
import i18nIoC from "i18n/ioc/ioc";
import rootIoC from "root/ioc/ioc";
import scrapingIoC from "scraping/ioc/ioc";
import storageIoC from "storage/ioc/ioc";
import storeIoC from "store/ioc/ioc";
import productIoC from "product/ioc/ioc";

const container = new Container();
container.load(
  i18nIoC,
  commonIoC,
  scrapingIoC,
  clientIoC,
  appIoC,
  authIoC,
  rootIoC,
  storageIoC,
  storeIoC,
  productIoC
);

export default container;
