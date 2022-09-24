import { inject, injectable } from "inversify";
import CameraService from "./camera-service";

type IOffscreenCanvas = HTMLCanvasElement;

@injectable()
class Canvas {
  @inject(CameraService) private readonly cameraService!: CameraService;

  private _canvas: HTMLCanvasElement | IOffscreenCanvas | null = null;
  private _target: HTMLElement | null = null;
  private _video: HTMLVideoElement | null = null;
  private _constraints = {
    width: 0,
    height: 0,
  };
  private _context: CanvasRenderingContext2D | null = null;
  private _frame: number | null = null;

  private get canvas() {
    return this._canvas;
  }

  private set canvas(canvas: HTMLCanvasElement | IOffscreenCanvas | null) {
    this._canvas = canvas;
  }

  get video() {
    return this._video;
  }

  private set video(video: HTMLVideoElement | null) {
    this._video = video;
  }

  get context() {
    return this._context;
  }

  private set context(context: CanvasRenderingContext2D | null) {
    this._context = context;
  }

  get target() {
    return this._target;
  }

  set target(target: HTMLElement | null) {
    this._target = target;
  }

  get constrants() {
    return this._constraints;
  }

  set constraints(constraints: { width: number; height: number }) {
    this._constraints = constraints;
  }

  private async injectVideo() {
    const video = document.createElement("video");

    video.setAttribute("playsinline", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("muted", "");
    (this.target || document.body).appendChild(video);

    return video;
  }

  private async stream() {
    while (!this.cameraService.stream) {
      await this.cameraService.activateCamera();
    }

    this.video = await this.injectVideo();
    this.video.srcObject = this.cameraService.stream;
  }

  private async sleep(ms: number = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async setConstraints() {
    while (!this.video || (!this.video.videoWidth && !this.video.videoHeight)) {
      await this.stream();
      await this.sleep();
    }

    this.constraints = {
      width: this.video.videoWidth,
      height: this.video.videoHeight,
    };
  }

  private async createCanvas() {
    return new Promise((resolve) => {
      this.canvas = document.createElement("canvas");
      (this.target || document.body).appendChild(this.canvas);

      this.canvas.setAttribute(
        "style",
        "position: absolute; top: 0; left: 0; z-index: 1; visibility: hidden;"
      );

      resolve(true);
    });
  }

  private async get2dContext() {
    await this.setConstraints();

    if (!this.canvas) {
      await this.createCanvas();
    }

    this.canvas!.width = this.video?.videoWidth || 0;
    this.canvas!.height = this.video?.videoHeight || 0;

    return this.canvas!.getContext("2d");
  }

  private loop() {
    this.context!.drawImage(
      this.video!,
      0,
      0,
      this.video?.videoWidth || 0,
      this.video?.videoHeight || 0
    );

    this._frame = requestAnimationFrame(this.loop.bind(this));
  }

  async getImageData() {
    if (!this.video || !this.context) {
      this.context = await this.get2dContext();
    }

    this.loop();

    return this.context!.getImageData(
      0,
      0,
      this.video?.videoWidth || 0,
      this.video?.videoHeight || 0
    );
  }

  async stop() {
    if (this.video?.srcObject) {
      await this.cameraService.stop();
      this.video.srcObject = null;

      if (this.video.parentElement) {
        this.video.parentElement.removeChild(this.video);
        this.canvas?.parentElement?.removeChild(this.canvas);
      }
    }

    if (this._frame) {
      cancelAnimationFrame(this._frame);
    }
  }
}

export default Canvas;
