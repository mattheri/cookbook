import imageCompression from "browser-image-compression";
import { injectable } from "inversify";
import { BehaviorSubject } from "rxjs";

@injectable()
class ImageCompression {
  private _maxSizeMb = 0.1;
  private _maxWidthOrHeight = 1920;
  private _useWebWorker = true;
  private _compressedImage = new BehaviorSubject<File | null>(null);
  private _progress = new BehaviorSubject<number>(0);

  private $compressedImage = this._compressedImage.asObservable();
  public $progress = this._progress.asObservable();

  get maxSizeMb() {
    return this._maxSizeMb;
  }

  set maxSizeMb(maxSizeMb: number) {
    this._maxSizeMb = maxSizeMb;
  }

  get maxWidthOrHeight() {
    return this._maxWidthOrHeight;
  }

  set maxWidthOrHeight(maxWidthOrHeight: number) {
    this._maxWidthOrHeight = maxWidthOrHeight;
  }

  get useWebWorker() {
    return this._useWebWorker;
  }

  set useWebWorker(useWebWorker: boolean) {
    this._useWebWorker = useWebWorker;
  }

  private get options() {
    return {
      maxSizeMB: this.maxSizeMb,
      maxWidthOrHeight: this.maxWidthOrHeight,
      useWebWorker: this.useWebWorker,
      onProgress: this.onProgress.bind(this),
    };
  }

  private onProgress = (progress: number) => {
    this._progress.next(progress);
  };

  private onCompress = (compressedImage: File) => {
    this._compressedImage.next(compressedImage);
  };

  private onReject = (error: Error) => {
    throw new Error(error.message);
  };

  public compress(image: File) {
    imageCompression(image, this.options).then(
      this.onCompress.bind(this),
      this.onReject.bind(this)
    );
    return this.$compressedImage;
  }
}

export default ImageCompression;
