import { QuaggaJSResultObject } from "@ericblade/quagga2";
import { injectable } from "inversify";
import Barcoder from "barcoder";

export type QuaggaJSDecodedCode =
  QuaggaJSResultObject["codeResult"]["decodedCodes"][0];

const DEFAULT_ERROR_THRESHOLD = 0.25;

@injectable()
class BarcodeAdapter {
  private _defaultErrorThreshold = DEFAULT_ERROR_THRESHOLD;

  get defaultErrorThreshold() {
    return this._defaultErrorThreshold;
  }

  set defaultErrorThreshold(threshold: number) {
    this._defaultErrorThreshold = threshold;
  }

  getMedian(array: number[]) {
    array.sort((a, b) => a - b);
    const half = Math.floor(array.length / 2);

    if (array.length % 2 === 1) {
      return array[half];
    }

    return array[half - 1] + array[half] / 2;
  }

  getMedianOfErrorCodes(decodedCodes: QuaggaJSDecodedCode[]) {
    const errors = decodedCodes
      .filter((code) => code.error !== undefined)
      .map((code) => code.error) as number[];
    const median = this.getMedian(errors);

    return median;
  }

  getErrors(result: QuaggaJSResultObject) {
    const error = this.getMedianOfErrorCodes(result.codeResult.decodedCodes);

    if (error < this.defaultErrorThreshold) return result.codeResult.code;

    return null;
  }

  validateBarcode(code: string) {
    return Barcoder.validate(code);
  }
}

export default BarcodeAdapter;
