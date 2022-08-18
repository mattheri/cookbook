import { ContainerModule } from "inversify";
import StoreService from "store/service/store-service";

const storeIoC = new ContainerModule((bind) => {
  bind(StoreService).toSelf().inSingletonScope();
});

export default storeIoC;
