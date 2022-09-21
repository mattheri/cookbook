import { inject, injectable } from "inversify";
import {
  scanImageData,
  getDefaultScanner,
  ZBarScanner,
  getInstance,
  ZBarSymbolType,
  ZBarConfigType,
} from "@undecaf/zbar-wasm";
import BarcodeValidator from "./barcode-validator";
import StreamService from "./stream-service";

@injectable()
class BarcodeScannerService {
  @inject(BarcodeValidator)
  private readonly barcodeValidator!: BarcodeValidator;
  @inject(StreamService) private readonly streamService!: StreamService;

  scanner: ZBarScanner | undefined = undefined;
  timeout: NodeJS.Timeout | null = null;

  async read() {
    await this.streamService.createStream();
    this.scanner = await getDefaultScanner();
    this.scanner.setConfig(
      ZBarSymbolType.ZBAR_UPCE,
      ZBarConfigType.ZBAR_CFG_ENABLE,
      0
    );

    this.timeout = setInterval(async () => {
      if (
        !this.streamService.ctx ||
        !this.streamService.width ||
        !this.streamService.height ||
        !this.scanner
      )
        return;

      const res = await scanImageData(
        this.streamService.ctx.getImageData(
          0,
          0,
          this.streamService.width,
          this.streamService.height
        ),
        this.scanner
      );
      if (res.length) {
        this.streamService.debugRender(res);
        const code = res[0].decode();
        if (this.barcodeValidator.validate(code)) {
          console.log(code);
        }
      }
    }, 800);
  }

  destroySelf() {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.scanner) this.scanner.destroy();
  }

  stop() {
    this.streamService.stopStream();
  }
}

export default BarcodeScannerService;
