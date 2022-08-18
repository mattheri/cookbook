import { ContainerModule } from "inversify";
import BarcodeService from "product/service/barcode-service";
import ProductService from "product/service/product-service";
import CameraService from "product/service/camera-service";
import BarcodeAdapter from "product/service/barcode-adapter";
import BarcodeReaderService from "product/service/barcode-reader-service";
import BarcodeValidator from "product/service/barcode-validator";
import BarcodeServiceConfig from "product/service/barcode-service-config";

const productIoC = new ContainerModule((bind) => {
  bind(BarcodeService).toSelf();
  bind(ProductService).toSelf();
  bind(CameraService).toSelf();
  bind(BarcodeAdapter).toSelf();
  bind(BarcodeReaderService).toSelf();
  bind(BarcodeValidator).toSelf();
  bind(BarcodeServiceConfig).toSelf();
});

export default productIoC;
