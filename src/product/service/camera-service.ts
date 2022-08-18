import { QuaggaJSResultObject } from "@ericblade/quagga2";
import { injectable } from "inversify";

enum DeviceKind {
  VIDEO_INPUT = "videoinput",
  AUDIO_INPUT = "audioinput",
}

type CameraId = { deviceId: string } | { deviceId?: string };

const IDEAL_WIDTH = 4096;
const IDEAL_HEIGHT = 2160;

@injectable()
class CameraService {
  cameraId: CameraId = {};

  constructor() {
    this.init();
    this.getCameraId();
  }

  async getCameraId() {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const camera = devices.find(
      (device) => device.kind === DeviceKind.VIDEO_INPUT
    );

    await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: IDEAL_WIDTH },
        height: { ideal: IDEAL_HEIGHT },
      },
    });

    this.cameraId = camera ? { deviceId: camera.deviceId } : {};
  }

  init() {
    navigator.mediaDevices.addEventListener(
      "devicechange",
      this.getCameraId.bind(this)
    );
  }
}

export default CameraService;
