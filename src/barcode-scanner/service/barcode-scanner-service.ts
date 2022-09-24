import { inject, injectable } from "inversify";
import Pubsub from "common/utils/PubSub";
import BarcodeAdapter from "./barcode-adapter";
import { scanImageData, ZBarSymbol } from "@undecaf/zbar-wasm";
import Canvas from "./canvas";

export enum BarcodeScannerEvents {
  BARCODE_SCAN = "BARCODE_SCAN",
}

@injectable()
class BarcodeScannerService {
  @inject(BarcodeAdapter) private readonly barcodeAdapter!: BarcodeAdapter;
  @inject(Pubsub) private readonly pubsub!: Pubsub<BarcodeScannerEvents>;
  @inject(Canvas) private readonly canvas!: Canvas;

  private _debugEnabled = process.env.NODE_ENV === "development";
  private _frame: number | null = null;

  get debugEnabled() {
    return this._debugEnabled;
  }

  set debugEnabled(debugEnabled: boolean) {
    this._debugEnabled = debugEnabled;
  }

  private debug(symbol: ZBarSymbol) {
    if (this.canvas.context && this.debugEnabled) {
      const ctx = this.canvas.context;
      const width = this.canvas.video?.videoWidth || 1;
      const height = this.canvas.video?.videoHeight || 1;
      const lastPoint = symbol.points[symbol.points.length - 1];

      ctx.moveTo(lastPoint.x, lastPoint.y);
      symbol.points.forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.lineWidth = Math.max(Math.min(height, width) / 100, 1);
      ctx.strokeStyle = "#00e00060";
      ctx.stroke();
    }
  }

  private async scan() {
    const imageData = await this.canvas.getImageData();

    const symbols = await scanImageData(imageData);

    if (symbols.length)
      symbols.forEach((symbol) => {
        this.debug(symbol);
        const code = symbol.decode();
        if (this.barcodeAdapter.validateBarcode(code))
          this.pubsub.publish(BarcodeScannerEvents.BARCODE_SCAN, code);
      });

    this._frame = requestAnimationFrame(this.scan.bind(this));
  }

  async read(target: HTMLElement) {
    this.canvas.target = target;
    this.debugEnabled = true;

    this._frame = requestAnimationFrame(this.scan.bind(this));
  }

  private destroySelf() {
    if (this._frame) cancelAnimationFrame(this._frame);
  }

  onBarcodeRead(callback: (code: any) => any) {
    this.pubsub.subscribe(BarcodeScannerEvents.BARCODE_SCAN, callback);
  }

  pauseRead() {
    this.destroySelf();
  }

  stop() {
    try {
      this.destroySelf();
      this.canvas.stop();
    } catch (error) {
      console.error(error);

      this.stop();
    }
  }
}

export default BarcodeScannerService;
