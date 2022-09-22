import { inject, injectable } from "inversify";
import { scanImageData } from "@undecaf/zbar-wasm";
import BarcodeValidator from "./barcode-validator";
import StreamService from "./stream-service";

@injectable()
class BarcodeScannerService {
  @inject(BarcodeValidator)
  private readonly barcodeValidator!: BarcodeValidator;
  @inject(StreamService) private readonly streamService!: StreamService;

  timeout: NodeJS.Timeout | null = null;
  scanning = true;
  private _scanInterval = 800;

  get scanInterval() {
    return this._scanInterval;
  }

  set scanInterval(interval: number) {
    this._scanInterval = interval;
  }

  private sleep() {
    return new Promise((resolve) => {
      setTimeout(resolve, this.scanInterval);
    });
  }

  private async scan() {
    if (
      !this.streamService.ctx ||
      !this.streamService.width ||
      !this.streamService.height
    )
      return;

    const res = await scanImageData(
      this.streamService.ctx.getImageData(
        0,
        0,
        this.streamService.width,
        this.streamService.height
      )
    );

    if (res.length) {
      this.streamService.debugRender(res);
      const code = res[0].decode();
      if (this.barcodeValidator.validate(code)) {
        console.log(code);
      }
    }

    await this.sleep();
  }

  async read() {
    if (!this.scanning) this.scanning = true;

    await this.streamService.createStream();

    this.timeout = setInterval(async () => {
      await this.scan();
    }, this.scanInterval);
  }

  destroySelf() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  stop() {
    this.streamService.stopStream();
    this.destroySelf();
  }
}

export default BarcodeScannerService;
