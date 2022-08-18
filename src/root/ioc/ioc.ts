import { ContainerModule } from "inversify";
import RootAdapter from "root/service/root-adapter";
import RootService from "root/service/root-service";

const rootIoC = new ContainerModule((bind) => {
  bind(RootService).toSelf();
  bind(RootAdapter).toSelf();
});

export default rootIoC;
