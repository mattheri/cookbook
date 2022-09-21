import { ContainerModule } from "inversify";
import CameraService from "barcode-scanner/service/camera-service";
import BarcodeAdapter from "barcode-scanner/service/barcode-adapter";
import BarcodeValidator from "barcode-scanner/service/barcode-validator";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import StreamService from "barcode-scanner/service/stream-service";

const barcodeScannerIoC = new ContainerModule((bind) => {
  bind(CameraService).toSelf();
  bind(BarcodeAdapter).toSelf();
  bind(BarcodeValidator).toSelf();
  bind(BarcodeScannerService).toSelf();
  bind(StreamService).toSelf();
});

export default barcodeScannerIoC;
