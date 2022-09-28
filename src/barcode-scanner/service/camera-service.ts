import { injectable } from "inversify";
import { BehaviorSubject } from "rxjs";

const MAX_WIDTH = 4096;
const MAX_HEIGHT = 2160;
const MIN_WIDTH = 1280;
const MIN_HEIGHT = 720;

@injectable()
class CameraService {
  stream = new BehaviorSubject<MediaStream | null>(null);
  canUseTorch: boolean = false;

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
    this.stream.next(
      await navigator.mediaDevices.getUserMedia({
        video: this.videoConstraints(await this.getDeviceId()),
      })
    );

    return this.stream.asObservable();
  }

  async stop() {
    return new Promise((resolve) => {
      if (!this.stream) return resolve(true);

      if (this.stream.value) {
        this.stream.value.getTracks().forEach((track) => track.stop());
      }

      this.stream.next(null);

      resolve(true);
    });
  }
}

export default CameraService;
