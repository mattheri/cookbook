import { injectable } from "inversify";
import i18next, { init, t } from "i18next";
import "reflect-metadata";

@injectable()
class I18N {
  t = t;
  init = init({
    lng: "en",
    debug: process.env.NODE_ENV === "development",
    resources: {},
  });
  add = i18next.addResourceBundle;
}

export default I18N;
