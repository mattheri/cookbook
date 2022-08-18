import CommandExecutor from "common/utils/CommandExecutor";
import CommandMapper from "common/utils/CommandMapper";
import KeyboardShortcutsService from "common/utils/KeyboardShortcutsService";
import Pubsub from "common/utils/PubSub";
import Time from "common/utils/Time";
import TypenameRemove from "common/utils/TypenameRemove";
import { ContainerModule } from "inversify";

const commonIoCDependencies = new ContainerModule((bind) => {
  bind(Pubsub).toSelf();
  bind(Time).toSelf();
  bind(CommandMapper).toSelf();
  bind(CommandExecutor).toSelf();
  bind(TypenameRemove).toSelf();
  bind(KeyboardShortcutsService).toSelf();
});

export default commonIoCDependencies;
