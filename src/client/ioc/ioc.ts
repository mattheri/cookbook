import Client from "client/client";
import FakeApiObject from "client/fake-api-object";
import RestClient from "client/rest-client";
import { ContainerModule } from "inversify";

const clientIoC = new ContainerModule((bind) => {
  bind(Client).toSelf().inSingletonScope();
  bind(RestClient).toSelf();
  bind(FakeApiObject).toSelf();
});

export default clientIoC;
