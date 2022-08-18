import Client from "client/client";
import RestClient from "client/rest-client";
import { ContainerModule } from "inversify";

const clientIoC = new ContainerModule((bind) => {
  bind(Client).toSelf().inSingletonScope();
  bind(RestClient).toSelf();
});

export default clientIoC;
