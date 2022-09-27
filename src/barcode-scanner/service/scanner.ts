import { injectable } from "inversify";
import {
  ZBarScanner,
  ZBarConfigType,
  ZBarSymbolType,
} from "@undecaf/zbar-wasm";
import { Observable } from "rxjs";

type Config = [ZBarSymbolType, ZBarConfigType, number][];

@injectable()
class Scanner {
  private _scanner: ZBarScanner | undefined;
  private _createScanner = new Observable<ZBarScanner>((subscriber) => {
    ZBarScanner.create().then((scanner) => subscriber.next(scanner));
  });

  get scannerObject() {
    if (!this._scanner) {
      this._createScanner.subscribe((scanner) => (this._scanner = scanner));
    }

    return this._scanner!;
  }

  configureScanner(config: Config) {
    if (this.scannerObject && config) {
      config.forEach((config) => {
        this.scannerObject.setConfig(config[0], config[1], config[2]);
      });
    }
  }

  destroy() {
    if (this.scannerObject) {
      this.scannerObject.destroy();
      this._scanner = undefined;
    }
  }
}

export default Scanner;
