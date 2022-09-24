import { ContainerModule } from "inversify";
import CameraService from "barcode-scanner/service/camera-service";
import BarcodeAdapter from "barcode-scanner/service/barcode-adapter";
import BarcodeValidator from "barcode-scanner/service/barcode-validator";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import Canvas from "barcode-scanner/service/canvas";

const barcodeScannerIoC = new ContainerModule((bind) => {
  bind(CameraService).toSelf();
  bind(BarcodeAdapter).toSelf();
  bind(BarcodeValidator).toSelf();
  bind(BarcodeScannerService).toSelf();
  bind(Canvas).toSelf();
});

export default barcodeScannerIoC;
