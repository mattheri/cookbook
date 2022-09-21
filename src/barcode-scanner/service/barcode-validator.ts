import { injectable } from "inversify";
import Barcoder from "barcoder";

@injectable()
class BarcodeValidator {
  detectionHashMap = new Map();

  validate(code: string) {
    if (Barcoder.validate(code)) {
      if (this.detectionHashMap.has(code)) {
        this.detectionHashMap.set(code, this.detectionHashMap.get(code) + 1);
      } else {
        this.detectionHashMap.set(code, 1);
      }

      if (this.detectionHashMap.get(code) > 10) {
        return true;
      }
    }

    return false;
  }
}

export default BarcodeValidator;
