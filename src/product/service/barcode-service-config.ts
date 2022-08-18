import { InputStreamType } from "@ericblade/quagga2";
import { injectable } from "inversify";

enum Decoders {
  EAN_READER = "ean_reader",
  UPC_READER = "upc_reader",
  CODE_128_READER = "code_128_reader",
  UPC_E_READER = "upc_e_reader",
  EAN_8_READER = "ean_8_reader",
  CODE_39_READER = "code_39_reader",
  CODE_39_VIN_READER = "code_39_vin_reader",
  CODABAR_READER = "codabar_reader",
  IOF5_READER = "i2of5_reader",
  TWOOF5_READER = "2of5_reader",
  CODE_93_READER = "code_93_reader",
}
const DEFAULT_DECODERS = [Decoders.UPC_READER];
const DEFAULT_STREAM_TYPE: InputStreamType = "LiveStream";
const DEFAULT_WORKERS_AMOUNT = 4;
const DEFAULT_CONSTRAINTS = {
  width: 640,
  height: 480,
};
const DEFAULT_LOCATOR_SETTINGS = {
  patchSize: "large",
  halfSample: true,
  debug: {
    showCanvas: true,
    showPatches: true,
    showFoundPatches: true,
    showSkeleton: true,
    showLabels: true,
    showPatchLabels: true,
    showRemainingPatchLabels: true,
    boxFromPatches: {
      showTransformed: true,
      showTransformedBox: true,
      showBB: true,
    },
  },
};
const DEFAULT_LOCATE = false;
const DEFAULT_CANVAS_CONTEXT_FONT = "24px Arial";
const DEFAULT_CANVAS_UNIQUE_BOX_COLOR = "blue";
const DEFAULT_CANVAS_MULTIPLE_BOX_COLOR = "purple";
const DEFAULT_CANVAS_VALIDATED_BOX_COLOR = "green";
const DEFAULT_FREQUENCY = 20;
const DEFAULT_AREA = {
  top: "0%",
  bottom: "0%",
  right: "0%",
  left: "0%",
};

@injectable()
class BarcodeServiceConfig {
  private _defaultConstraints = DEFAULT_CONSTRAINTS;
  private _defaultLocatorSettings = DEFAULT_LOCATOR_SETTINGS;
  private _defaultDecoders = DEFAULT_DECODERS;
  private _defaultStreamType = DEFAULT_STREAM_TYPE;
  private _defaultWorkersAmount = DEFAULT_WORKERS_AMOUNT;
  private _defaultLocate = DEFAULT_LOCATE;
  private _defaultCanvasContextFont = DEFAULT_CANVAS_CONTEXT_FONT;
  private _defaultCanvasColors = {
    uniqueBoxColor: DEFAULT_CANVAS_UNIQUE_BOX_COLOR,
    multipleBoxColor: DEFAULT_CANVAS_MULTIPLE_BOX_COLOR,
    validatedBoxColor: DEFAULT_CANVAS_VALIDATED_BOX_COLOR,
  };
  private _target: HTMLElement | null = null;
  private _defaultFrequency = DEFAULT_FREQUENCY;
  private _defaultArea = DEFAULT_AREA;
  private _defaultDecoderDebug = {
    drawBoundingBox: this.isDevEnv,
    drawScanline: this.isDevEnv,
    showFrequency: this.isDevEnv,
    showPattern: this.isDevEnv,
  };

  get isDevEnv() {
    return process.env.NODE_ENV === "development";
  }

  get constraints() {
    return this._defaultConstraints;
  }

  set constraints(constraints: typeof DEFAULT_CONSTRAINTS) {
    this._defaultConstraints = constraints;
  }

  get locatorSettings() {
    return this._defaultLocatorSettings;
  }

  set locatorSettings(settings: typeof DEFAULT_LOCATOR_SETTINGS) {
    this._defaultLocatorSettings = settings;
  }

  get decoders() {
    return this._defaultDecoders;
  }

  set decoders(decoder: Decoders[]) {
    this._defaultDecoders = decoder;
  }

  get streamType() {
    return this._defaultStreamType;
  }

  set streamType(type: InputStreamType) {
    this._defaultStreamType = type;
  }

  get workersAmount() {
    return this._defaultWorkersAmount;
  }

  set workersAmount(amount: number) {
    this._defaultWorkersAmount = amount;
  }

  get locate() {
    return this._defaultLocate;
  }

  set locate(locate: boolean) {
    this._defaultLocate = locate;
  }

  get canvasTextFont() {
    return this._defaultCanvasContextFont;
  }

  set canvasTextFont(font: string) {
    this._defaultCanvasContextFont = font;
  }

  get canvasColor() {
    return this._defaultCanvasColors;
  }

  set canvasColor(colors: typeof this._defaultCanvasColors) {
    this._defaultCanvasColors = colors;
  }

  get target() {
    return this._target;
  }

  set target(element: HTMLElement | null) {
    this._target = element;
  }

  get frequency() {
    return this._defaultFrequency;
  }

  set frequency(frequency: number) {
    this._defaultFrequency = frequency;
  }

  get area() {
    return this._defaultArea;
  }

  set area(area: typeof this._defaultArea) {
    this._defaultArea = area;
  }

  get decoderDebug() {
    return this._defaultDecoderDebug;
  }

  set decoderDebug(debug: typeof this._defaultDecoderDebug) {
    this._defaultDecoderDebug = debug;
  }
}

export default BarcodeServiceConfig;
