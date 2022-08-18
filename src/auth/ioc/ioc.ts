import AuthService from "auth/service/auth-service";
import GoogleProvider from "auth/service/google-provider";
import LocalProvider from "auth/service/local-provider";
import { ContainerModule } from "inversify";

const authIoCDependencies = new ContainerModule((bind) => {
  bind(AuthService).toSelf().inSingletonScope();
  bind(LocalProvider).toSelf();
  bind(GoogleProvider).toSelf();
});

export default authIoCDependencies;
