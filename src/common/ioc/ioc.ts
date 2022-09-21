import CommandExecutor from "common/utils/CommandExecutor";
import Pubsub from "common/utils/PubSub";
import Time from "common/utils/Time";
import TypenameRemove from "common/utils/TypenameRemove";
import { ContainerModule } from "inversify";

const commonIoCDependencies = new ContainerModule((bind) => {
  bind(Pubsub).toSelf();
  bind(Time).toSelf();
  bind(CommandExecutor).toSelf();
  bind(TypenameRemove).toSelf();
});

export default commonIoCDependencies;
