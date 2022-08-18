import { ContainerModule } from "inversify";
import StorageService from "storage/service/storage-service";

const storageIoC = new ContainerModule((bind) => {
  bind(StorageService).toSelf();
});

export default storageIoC;
