import { injectable } from "inversify";
import { getDefaultScanner, ZBarScanner } from "@undecaf/zbar-wasm";

@injectable()
class Scanner {
  private _scanner: ZBarScanner | undefined;

  get scannerObject(): ZBarScanner {
    if (!this._scanner) {
      getDefaultScanner().then((scanner) => (this._scanner = scanner));
    }

    return this._scanner!;
  }
}

export default Scanner;
