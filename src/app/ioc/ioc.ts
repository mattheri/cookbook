import AppService from "app/service/app-service";
import { ContainerModule } from "inversify";

const appIoCDependencies = new ContainerModule((bind) => {
  bind(AppService).toSelf().inSingletonScope();
});

export default appIoCDependencies;
