import { inject, injectable } from "inversify";
import Quagga, {
  QuaggaJSResultObject,
  InputStreamType,
} from "@ericblade/quagga2";
import BarcodeAdapter from "./barcode-adapter";
import CameraService from "./camera-service";
import BarcodeValidator from "./barcode-validator";
import BarcodeServiceConfig from "./barcode-service-config";

enum ErrorTypes {
  NO_CALLBACK_PROVIDED = "dev/no-callback-provided",
  BAD_BARCODE_PROVIDED = "user/bad-barcode-provided",
  QUAGGA_ERROR = "quagga/quagga-error",
}

interface DrawBoxArgs {
  result: QuaggaJSResultObject;
  context: CanvasRenderingContext2D;
  canvas?: HTMLCanvasElement;
}

interface InitArgs {
  target: HTMLElement;
  onDetectCallback: (code: string) => void;
  onInitCallback?: () => void;
  constraints?: {
    height: number;
    width: number;
  };
}

@injectable()
class BarcodeReaderService {
  private _detectionCallback: ((code: string) => void) | null = null;
  private _onInitCallback: (() => void) | null = null;

  @inject(BarcodeAdapter) private readonly barcodeAdapter!: BarcodeAdapter;
  @inject(BarcodeValidator) private readonly validator!: BarcodeValidator;
  @inject(CameraService) private readonly camera!: CameraService;
  @inject(BarcodeServiceConfig) public readonly config!: BarcodeServiceConfig;

  get detectionCallback() {
    return this._detectionCallback;
  }

  set detectionCallback(callback: ((code: string) => void) | null) {
    this._detectionCallback = callback;
  }

  get onInitCallback() {
    return this._onInitCallback;
  }

  set onInitCallback(callback: (() => void) | null) {
    this._onInitCallback = callback;
  }

  get isDevEnv() {
    return !(process.env.NODE_ENV === "production");
  }

  async restart() {
    await this.stop();

    setTimeout(this.start.bind(this), 500);
  }

  changeDetectionThreshold(threshold: number) {
    this.barcodeAdapter.defaultErrorThreshold = threshold;
  }

  async switchInputStreamType(type: InputStreamType) {
    this.config.streamType = type;
    await this.stop();
    await this.init({
      target: this.config.target!,
      onDetectCallback: this.detectionCallback!,
      constraints: this.config.constraints,
    });
  }

  drawMultipleBoxes({ result, context, canvas }: DrawBoxArgs) {
    if (!canvas) return;

    const width = parseInt(
      canvas.getAttribute("width") || this.config.constraints.width.toString()
    );
    const height = parseInt(
      canvas.getAttribute("height") || this.config.constraints.height.toString()
    );
    context.clearRect(0, 0, width, height);

    result.boxes
      .filter((box) => box !== result.box)
      .forEach((box) => {
        Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, context, {
          color: this.config.canvasColor.multipleBoxColor,
          lineWidth: 2,
        });
      });
  }

  drawUniqueBox({ result, context }: DrawBoxArgs) {
    Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, context, {
      color: this.config.canvasColor.uniqueBoxColor,
      lineWidth: 2,
    });
  }

  process(result?: QuaggaJSResultObject) {
    if (!result) return;
    if (!this.detectionCallback) {
      return this.throwError(ErrorTypes.NO_CALLBACK_PROVIDED);
    }
    const drawingContext = Quagga.canvas.ctx.overlay;
    const drawingCanvas = Quagga.canvas.dom.overlay;

    drawingContext.font = this.config.canvasTextFont;
    drawingContext.fillStyle = this.config.canvasColor.validatedBoxColor;

    if (result.boxes)
      this.drawMultipleBoxes({
        result,
        context: drawingContext,
        canvas: drawingCanvas,
      });

    if (result.box)
      this.drawUniqueBox({
        result,
        context: drawingContext,
      });

    if (result.codeResult && result.codeResult.code) {
      const code = result.codeResult.code;
      console.log(code);
      if (!this.validator.validate(code)) return;

      drawingContext.fillText(code, 10, 20);
      this.detectionCallback(code);
    }
  }

  onDetected(result: QuaggaJSResultObject) {
    if (!this.detectionCallback) {
      return this.throwError(ErrorTypes.NO_CALLBACK_PROVIDED);
    }

    const code = this.barcodeAdapter.getErrors(result);

    if (code) {
      if (!this.validator.validate(code)) return;

      this.detectionCallback(code);
    }
  }

  async init(args: InitArgs) {
    this.config.target = args.target;
    this.detectionCallback = args.onDetectCallback;

    if (args.onInitCallback) {
      this.onInitCallback = args.onInitCallback;
    }

    if (args.constraints) {
      this.config.constraints = args.constraints;
    }

    try {
      if (!this.config.target) return;

      Quagga.init(
        {
          inputStream: {
            type: this.config.streamType,
            constraints: {
              ...this.config.constraints,
              ...this.camera.cameraId,
            },
            target: this.config.target,
            area: this.config.area,
          },
          locator: this.config.locatorSettings,
          numOfWorkers: this.config.workersAmount,
          frequency: this.config.frequency,
          decoder: {
            readers: this.config.decoders,
            debug: this.config.decoderDebug,
          },
          locate: this.config.locate,
          debug: this.config.isDevEnv,
        },
        (err) => {
          if (this.onInitCallback) this.onInitCallback();
          Quagga.onProcessed(this.process.bind(this));

          if (err) {
            return this.throwError(ErrorTypes.QUAGGA_ERROR, err);
          }
          this.start();
        }
      );

      Quagga.onDetected(this.onDetected.bind(this));
    } catch (e) {
      const error = e as Error;

      console.log(error);
    }
  }

  start() {
    Quagga.start();
  }

  stop() {
    return new Promise((resolve) => {
      Quagga.offDetected(this.onDetected.bind(this));
      Quagga.offProcessed(this.process.bind(this));
      Quagga.stop().then(resolve);
    });
  }

  throwError(type: ErrorTypes, customMessage?: string) {
    switch (type) {
      case ErrorTypes.NO_CALLBACK_PROVIDED:
        throw new Error(
          customMessage ||
            "No callabck has been provided for when a code is detected"
        );
      case ErrorTypes.BAD_BARCODE_PROVIDED:
        throw new Error(
          customMessage || "The barcode scanned is not recognized"
        );
      case ErrorTypes.QUAGGA_ERROR:
        throw new Error(customMessage || "An error occured");
    }
  }
}

export default BarcodeReaderService;
