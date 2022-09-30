import CommandExecutor from "common/utils/CommandExecutor";
import ImageCompression from "common/utils/ImageCompression";
import Pubsub from "common/utils/PubSub";
import Time from "common/utils/Time";
import { ContainerModule } from "inversify";

const commonIoCDependencies = new ContainerModule((bind) => {
  bind(Pubsub).toSelf();
  bind(Time).toSelf();
  bind(CommandExecutor).toSelf();
  bind(ImageCompression).toSelf();
});

export default commonIoCDependencies;
