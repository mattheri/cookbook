import { QuaggaJSResultObject } from "@ericblade/quagga2";
import { injectable } from "inversify";
import Barcoder from "barcoder";

export type QuaggaJSDecodedCode =
  QuaggaJSResultObject["codeResult"]["decodedCodes"][0];

const DEFAULT_ERROR_THRESHOLD = 0.25;

@injectable()
class BarcodeAdapter {
  toGrayScale(image: ImageData, ctx: CanvasRenderingContext2D) {
    const pixels = image.data;

    for (let i = 0; i < pixels.length; i += 4) {
      const ligntness =
        0.2126 * pixels[i] + 0.715 * pixels[i + 1] + 0.0722 * pixels[i + 2];
      pixels[i] = ligntness;
      pixels[i + 1] = ligntness;
      pixels[i + 2] = ligntness;
    }

    ctx.putImageData(image, 0, 0);
  }

  validateBarcode(code: string) {
    return Barcoder.validate(code);
  }
}

export default BarcodeAdapter;
