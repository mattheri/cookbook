import { injectable } from "inversify";

enum DeviceKind {
  VIDEO_INPUT = "videoinput",
  AUDIO_INPUT = "audioinput",
}

type CameraId = { deviceId: string } | { deviceId?: string };

const MAX_WIDTH = 4096;
const MAX_HEIGHT = 2160;
const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

@injectable()
class CameraService {
  cameraId: CameraId = {};
  stream: MediaStream | null = null;

  constructor() {
    this.init();
    this.getCameraId();
  }

  get isSupported() {
    const support =
      "mediaDevices" in navigator && "getUserMedia" in navigator.mediaDevices;

    if (!support) {
      throw new Error(
        "Your current device doesn't support letting the browser open the camera"
      );
    }

    return support;
  }

  videoConstraints(deviceId?: string) {
    const device = deviceId ? { exact: deviceId } : {};

    return {
      width: { min: MIN_WIDTH, ideal: MAX_WIDTH },
      height: { min: MIN_HEIGHT, ideal: MAX_HEIGHT },
      facingMode: "environment",
      ...device,
    };
  }

  async getDeviceId() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );

    if (videoDevices.length === 1) return videoDevices[0].deviceId;
  }

  async activateCamera() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        video: this.videoConstraints(await this.getDeviceId()),
      });
    } catch (e) {
      const error = e as Error;

      console.error(error);
    }
  }

  async getCameraId() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const camera = devices.find(
      (device) => device.kind === DeviceKind.VIDEO_INPUT
    );

    await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: MAX_WIDTH },
        height: { ideal: MAX_HEIGHT },
      },
    });

    this.cameraId = camera ? { deviceId: camera.deviceId } : {};
  }

  async stop() {
    this.stream?.getTracks().forEach((track) => track.stop());
  }

  init() {
    navigator.mediaDevices.addEventListener(
      "devicechange",
      this.getCameraId.bind(this)
    );
  }
}

export default CameraService;
