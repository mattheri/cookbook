import { inject, injectable } from "inversify";
import Pubsub from "common/utils/PubSub";
import BarcodeAdapter from "./barcode-adapter";
import {
  scanImageData,
  ZBarSymbol,
  ZBarConfigType,
  ZBarSymbolType,
} from "@undecaf/zbar-wasm";
import Canvas from "./canvas";
import Scanner from "./scanner";
import { BehaviorSubject } from "rxjs";

export enum BarcodeScannerEvents {
  BARCODE_SCAN = "BARCODE_SCAN",
}

@injectable()
class BarcodeScannerService {
  @inject(BarcodeAdapter) private readonly barcodeAdapter!: BarcodeAdapter;
  @inject(Pubsub) private readonly pubsub!: Pubsub<BarcodeScannerEvents>;
  @inject(Canvas) private readonly canvas!: Canvas;
  @inject(Scanner) private readonly _scanner!: Scanner;

  private _debugEnabled = process.env.NODE_ENV === "development";
  private _frame: number | null = null;
  private _isPaused = false;

  private _isLoading = new BehaviorSubject<boolean>(true);
  public $isLoading = this._isLoading.asObservable();

  get scanner() {
    return this._scanner.scannerObject;
  }

  get debugEnabled() {
    return this._debugEnabled;
  }

  set debugEnabled(debugEnabled: boolean) {
    this._debugEnabled = debugEnabled;
  }

  get paused() {
    return this._isPaused;
  }

  private set paused(paused: boolean) {
    this._isPaused = paused;
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
    if (this.paused || !this.scanner) return;

    const imageData = await this.canvas.getImageData();

    const symbols = await scanImageData(imageData, this.scanner);

    if (symbols.length) {
      symbols.forEach((symbol) => {
        this.debug(symbol);
        const code = symbol.decode();
        if (this.barcodeAdapter.validateBarcode(code))
          this.pubsub.publish(BarcodeScannerEvents.BARCODE_SCAN, code);
      });
    }

    this._frame = requestAnimationFrame(this.scan.bind(this));
  }

  async read(target: HTMLElement) {
    this.canvas.target = target;
    this._scanner.configureScanner([
      [ZBarSymbolType.ZBAR_NONE, ZBarConfigType.ZBAR_CFG_ENABLE, 0],
      [ZBarSymbolType.ZBAR_EAN13, ZBarConfigType.ZBAR_CFG_ENABLE, 1],
    ]);
    this._frame = requestAnimationFrame(this.scan.bind(this));
    this.canvas.$imageLoaded.subscribe((loaded) => {
      this._isLoading.next(!loaded);
    });
  }

  async resumeRead() {
    this.paused = false;
    this._frame = requestAnimationFrame(this.scan.bind(this));
  }

  private destroySelf() {
    if (this._frame) cancelAnimationFrame(this._frame);
    if (this.scanner) this._scanner.destroy();
  }

  onBarcodeRead(callback: (code: any) => any) {
    this.pubsub.subscribe(BarcodeScannerEvents.BARCODE_SCAN, callback);
  }

  pauseRead() {
    this.paused = true;
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
