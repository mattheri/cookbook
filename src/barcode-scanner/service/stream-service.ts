import { ZBarSymbol } from "@undecaf/zbar-wasm";
import { inject, injectable } from "inversify";
import CameraService from "./camera-service";

@injectable()
class StreamService {
  @inject(CameraService) private readonly cameraService!: CameraService;
  canvasId = "stream-data";
  videoId = "stream";
  delimitationId = "delimitation";
  height: number = 0;
  width: number = 0;
  video: HTMLVideoElement | null = null;
  canvas: HTMLCanvasElement | null = null;
  ctx: CanvasRenderingContext2D | null | undefined = null;
  timeout: NodeJS.Timeout | null = null;

  get fps() {
    return {
      30: 1000 / 30,
      60: 1000 / 60,
      120: 1000 / 120,
    };
  }

  async createStream() {
    await this.cameraService.activateCamera();

    this.canvas = document.getElementById(
      this.canvasId
    ) as HTMLCanvasElement | null;

    if (!this.canvas || !this.cameraService.stream) return;

    this.ctx = this.canvas.getContext("2d");

    if (!this.ctx) return;

    const rect = this.canvas.getBoundingClientRect();

    this.video = await this.createVideo(rect.width, rect.height);

    if (!this.video) return;

    this.width = this.video.videoWidth;
    this.height = this.video.videoHeight;

    this.video.addEventListener(
      "play",
      this.streamMedia.bind(this, this.video, this.ctx, this.width, this.height)
    );
  }

  async stopStream() {
    this.video?.pause();
    if (this.canvas) {
      this.canvas.remove();
      this.canvas = null;
      this.ctx = null;
    }
    if (this.timeout) clearTimeout(this.timeout);
    await this.cameraService.stop();
  }

  async debugRender(symbols: ZBarSymbol[]) {
    if (!this.ctx) return;

    this.ctx.font = "20px serif";
    this.ctx.strokeStyle = "#00ff00";
    this.ctx.fillStyle = "#ff0000";
    this.ctx.lineWidth = 6;

    for (let i = 0; i < symbols.length; i++) {
      const sym = symbols[i];
      const points = sym.points;
      this.ctx.beginPath();
      for (let j = 0; j < points.length; ++j) {
        const { x, y } = points[j];
        if (j === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.fillText("#" + i, points[0].x, points[0].y - 10);
    }
  }

  private streamMedia(
    video: HTMLVideoElement,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    if (!video.ended || !video.paused) {
      ctx.drawImage(video, 0, 0, width, height);
      this.timeout = setTimeout(
        this.streamMedia.bind(this, video, ctx, width, height),
        this.fps[30]
      );
    }
  }

  private async createVideo(
    width: number,
    height: number
  ): Promise<HTMLVideoElement> {
    return new Promise((resolve) => {
      let video: HTMLVideoElement | null =
        this.video ||
        (document.getElementById(this.videoId) as HTMLVideoElement);

      if (!document.getElementById(this.videoId)) {
        video = document.createElement("video");
        video.width = width;
        video.height = height;
        video.srcObject = this.cameraService.stream;
        video.id = this.videoId;
        video.setAttribute("playsinline", "");
        video.play();
        if (this.canvas) this.append(this.canvas, video);
      }

      resolve(video as HTMLVideoElement);
    });
  }

  private append(element1: HTMLElement, element2: HTMLElement) {
    element1.parentElement?.append(element2);
  }
}

export default StreamService;
