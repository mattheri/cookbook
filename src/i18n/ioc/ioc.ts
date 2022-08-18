import I18N from "i18n/init";
import { AsyncContainerModule, ContainerModule } from "inversify";

const i18nIoC = new AsyncContainerModule(async (bind) => {
  bind(I18N).toSelf().inSingletonScope();
});

export default i18nIoC;
