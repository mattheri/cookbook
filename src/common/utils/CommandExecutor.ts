import { ICommand, Newable } from "common/common";
import { injectable } from "inversify";

@injectable()
class CommandExecutor<T extends Newable<ICommand>, K = any[]> {
  private Command: ICommand;
  constructor(Command: T, executeFnArgs?: K) {
    this.Command = new Command();
    this.selfExecute(executeFnArgs);
  }

  cancel() {}

  execute<K = any[]>(args?: K) {
    this.cancel = this.Command.execute(args);
  }

  private selfExecute<K = any[]>(args?: K) {
    if (this.Command.selfExecute) {
      this.cancel = this.Command.selfExecute(args);
    }
  }
}

export default CommandExecutor;
