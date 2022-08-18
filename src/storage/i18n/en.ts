import I18N from "i18n/init";
import container from "ioc-container/ioc-container";
import en from "./en.json";

const lng = "en";
export const storageNamespace = "storage";

const i18n = container.get(I18N);

i18n.add(lng, storageNamespace, en);
