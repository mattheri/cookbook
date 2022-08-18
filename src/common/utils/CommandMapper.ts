import { AnyCallback } from "common/common";
import { inject, injectable } from "inversify";
import KeyboardShortcutsService from "./KeyboardShortcutsService";

enum OS {
  Windows = "Windows",
  MacOS = "MacOS",
  Linux = "Linux",
  Android = "Android",
  iOS = "iOS",
}

enum CTRL {
  MacOS = "⌃",
  Other = "CTRL",
}

enum Alt {
  MacOS = "⌥",
  Other = "Alt",
}

enum Command {
  MacOS = "⌘",
  Other = "⊞",
}

const Shift = "Shift ⇧";
const Tab = "Tab ↹";

@injectable()
class CommandMapper {
  private _command: string = "";
  private _separator: string = "";
  private _commandNumber = 0;
  private _internalCommandNumber = 0;
  private _internalCommand = "";
  @inject(KeyboardShortcutsService)
  private readonly kbService!: KeyboardShortcutsService;

  private OS = {
    macOs: {
      shortcut: "mac",
      fullname: OS.MacOS,
    },
    windows: {
      shortcut: "win",
      fullname: OS.Windows,
    },
    linux: {
      shortcut: "lin",
      fullname: OS.Linux,
    },
    android: {
      shortcut: "and",
      fullname: OS.Android,
    },
    iOs: {
      shortcut: "ip",
      fullname: OS.iOS,
    },
  };

  private get currentOs() {
    const currentPlatform = navigator.platform;

    return (
      Object.values(this.OS).find((os) => {
        if (currentPlatform.toLowerCase().startsWith(os.shortcut)) return os;
      })?.fullname || OS.Android
    );
  }

  private get canHaveKeyboardMap() {
    return (
      this.currentOs === OS.MacOS ||
      this.currentOs === OS.Linux ||
      this.currentOs === OS.Windows
    );
  }

  private addToCommand(newCommand: string) {
    const command = this.isNew
      ? `${newCommand}`
      : `${this.command}${this.separator}${newCommand}`;
    this.command = command;
    this.commandNumber = this.commandNumber + 1;
  }

  private addToInternalCommand(newCommand: string) {
    const command =
      this._internalCommandNumber === 0
        ? `${newCommand}`
        : `${this._internalCommand}${this.separator}${newCommand}`;
    this._internalCommand = command;
    this._internalCommandNumber = this._internalCommandNumber + 1;
  }

  ctrl() {
    if (!this.canHaveKeyboardMap) return this;

    const ctrl = this.currentOs === OS.MacOS ? CTRL.MacOS : CTRL.Other;
    this.addToCommand(ctrl);
    this.addToInternalCommand("mod");

    return this;
  }

  alt() {
    if (!this.canHaveKeyboardMap) return this;

    const alt = this.currentOs === OS.MacOS ? Alt.MacOS : Alt.Other;
    this.addToCommand(alt);
    this.addToInternalCommand("alt");

    return this;
  }

  commandKey() {
    if (!this.canHaveKeyboardMap) return this;

    const commandKey =
      this.currentOs === OS.MacOS ? Command.MacOS : Command.Other;
    this.addToCommand(commandKey);
    this.addToInternalCommand("mod");

    return this;
  }

  tab() {
    if (!this.canHaveKeyboardMap) return this;

    const tab = Tab;
    this.addToCommand(tab);
    this.addToInternalCommand("tab");

    return this;
  }

  shift() {
    if (!this.canHaveKeyboardMap) return this;

    const shift = Shift;
    this.addToCommand(shift);
    this.addToInternalCommand("shift");

    return this;
  }

  key(keyboardKey: string) {
    if (!this.canHaveKeyboardMap) return this;

    this.addToCommand(keyboardKey);
    this.addToInternalCommand(keyboardKey);

    return this;
  }

  withSeparator(separator: string) {
    this.separator = separator;

    return this;
  }

  exec(callback: AnyCallback) {
    console.log(this._internalCommand);
    this.kbService.register(this._internalCommand, callback);

    return this;
  }

  get command() {
    return this._command;
  }

  set command(newCommand: string) {
    this._command = newCommand;
  }

  get separator() {
    return this._separator;
  }

  set separator(newSparator: string) {
    this._separator = newSparator;
  }

  private get commandNumber() {
    return this._commandNumber;
  }

  private set commandNumber(number: number) {
    this._commandNumber = number;
  }

  private get isNew() {
    return this.commandNumber === 0;
  }
}

export default CommandMapper;
