import { inject, injectable } from "inversify";
import {
  scanImageData,
  getDefaultScanner,
  ZBarImage,
  ZBarConfigType,
  ZBarOrientation,
} from "@undecaf/zbar-wasm";
import StreamService from "./stream-service";
import Pubsub from "common/utils/PubSub";
import BarcodeAdapter from "./barcode-adapter";

export enum BarcodeScannerEvents {
  BARCODE_SCAN = "BARCODE_SCAN",
}

@injectable()
class BarcodeScannerService {
  @inject(BarcodeAdapter) private readonly barcodeAdapter!: BarcodeAdapter;
  @inject(StreamService) private readonly streamService!: StreamService;
  @inject(Pubsub) private readonly pubsub!: Pubsub<BarcodeScannerEvents>;

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

    const imageData = this.streamService.ctx.getImageData(
      0,
      0,
      this.streamService.width,
      this.streamService.height
    );
    const res = await scanImageData(imageData);

    if (res.length) {
      this.streamService.debugRender(res);
      const code = res[0].decode();
      if (this.barcodeAdapter.validateBarcode(code)) {
        this.pubsub.publish(BarcodeScannerEvents.BARCODE_SCAN, code);
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

  private destroySelf() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  onBarcodeRead(callback: (code: any) => any) {
    this.pubsub.subscribe(BarcodeScannerEvents.BARCODE_SCAN, callback);
  }

  pauseRead() {
    this.destroySelf();
  }

  stop() {
    this.streamService.stopStream();
    this.destroySelf();
  }
}

export default BarcodeScannerService;
