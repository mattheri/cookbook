import { AnyCallback } from "common/common";
import { injectable } from "inversify";
import moustetrap from "mousetrap";

type KeyboardEvent = "keydown" | "keypress" | "keyup";

@injectable()
class KeyboardShortcutsService {
  private _defaultEvent: KeyboardEvent = "keydown";
  register(command: string | string[], callback: AnyCallback) {
    moustetrap().bind(command, (e, combo) => {
      callback();
      return false;
    });
  }

  get defaultEvent() {
    return this._defaultEvent;
  }

  set defaultEvent(event: KeyboardEvent) {
    this._defaultEvent = event;
  }
}

export default KeyboardShortcutsService;
