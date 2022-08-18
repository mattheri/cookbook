import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import { Product } from "product/product";
import BarcodeReaderService from "product/service/barcode-reader-service";
import BarcodeService from "product/service/barcode-service";
import { useCallback, useEffect, useRef, useState } from "react";
import "./Scanner.css";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[] | null>(null);
  const [isOnFormStep, setIsOnFormStep] = useState(false);
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });
  const barcodeReader = useInjection(BarcodeReaderService);
  const barcodeService = useInjection(BarcodeService);
  const ref = useRef<HTMLDivElement>(null);

  const queryUpc = useCallback(
    async (code: string) => {
      console.log(code);
      const product = await barcodeService.getProduct(code);
      setProducts([...(products || []), product]);
      setIsScanning(false);
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

  useEffect(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    if (dimensions.w === 0 || dimensions.h === 0) {
      setDimensions({
        w: rect.width,
        h: rect.height,
      });

      return;
    }

    barcodeReader.init({
      target: ref.current,
      onDetectCallback: queryUpc,
      constraints: {
        height: dimensions.h,
        width: dimensions.w,
      },
      onInitCallback: onInit,
    });

    return () => {
      barcodeReader.stop();
    };
  }, [ref, dimensions.w, dimensions.h, dimensions, barcodeReader]);

  return (
    <VStack>
      <Box
        ref={ref}
        w="100%"
        minH="300px"
        pos="relative"
        display={isLoading ? "grid" : "block"}
        placeItems="center"
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <canvas
            style={{
              position: "absolute",
              left: "0px",
              height: `${dimensions.h}px`,
              width: `${dimensions.w}px`,
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
