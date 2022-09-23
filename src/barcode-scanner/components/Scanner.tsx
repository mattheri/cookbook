import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import BarcodeService from "product/service/barcode-service";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[] | null>(null);
  const [isOnFormStep, setIsOnFormStep] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const [containerBoundingRect, setContainerBounding] = useState({
    width: 0,
    height: 0,
  });
  const barcodeReader = useInjection(BarcodeScannerService);
  const barcodeService = useInjection(BarcodeService);
  const ref = useRef<HTMLDivElement>(null);

  const queryUpc = useCallback(
    async (code: string) => {
      barcodeReader.pauseRead();
      console.log(code);
      // const product = await barcodeService.getProduct(code);
      // setProducts([...(products || []), product]);
      // setIsScanning(false);
    },
    [barcodeService]
  );

  const onInit = () => {
    setIsLoading(false);
    setIsScanning(true);
  };

  const onScanAnother = () => {
    setIsScanning(true);
  };

  const onScanDone = () => {
    setIsOnFormStep(true);
  };

  useLayoutEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    if (!rect.height) return;

    setDimensions({
      h: rect.height,
      w: rect.width,
    });

    barcodeReader.read();

    return () => barcodeReader.stop();
  }, [ref]);

  useEffect(() => {
    barcodeReader.onBarcodeRead(queryUpc);
  }, [barcodeReader]);

  return (
    <VStack minH="100%">
      <Box
        ref={ref}
        w="100%"
        maxW="calc(100vw - 2rem)"
        h="calc(100vh - 15rem)"
        pos="relative"
        display={isLoading ? "grid" : "block"}
        placeItems="center"
      >
        {dimensions.h && (
          <canvas
            id="stream-data"
            style={{
              left: "0px",
              height: `${dimensions.h}px`,
              width: `${dimensions.w}px`,
              position: "absolute",
            }}
            width={dimensions.w}
            height={dimensions.h}
          />
        )}
      </Box>
      <Button
        colorScheme="green"
        w="100%"
        disabled={isScanning}
        onClick={onScanAnother}
      >
        Add and scan another
      </Button>
      <Button w="100%" disabled={!products} onClick={onScanDone}>
        Add
      </Button>
    </VStack>
  );
};

export default Scanner;
