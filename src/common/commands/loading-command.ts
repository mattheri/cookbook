import { ICommand } from "common/common";
import { LoadingRef } from "common/components/StatefulLoading";
import CommandExecutor from "common/utils/CommandExecutor";

class LoadingCommand implements ICommand {
  selfExecute() {
    LoadingRef.current.start();
    return this.cancel.bind(this);
  }

  execute() {
    return this.selfExecute();
  }

  cancel() {
    LoadingRef.current.stop();
  }
}

export default CommandExecutor.bind(CommandExecutor, LoadingCommand);
