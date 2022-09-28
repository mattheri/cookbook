import { Box, Button, VStack } from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import { useLayoutEffect, useRef, useState, useEffect, FC, lazy } from "react";
import SuspenseWithLoading from "common/components/SuspenseWithLoading";

const ScannedItemsTab = lazy(
  () => import("barcode-scanner/components/ScannedItemsTab")
);

interface Props {
  onScan?: (code: string) => void;
  useCodeDrawer?: boolean;
}

const Scanner: FC<Props> = ({ onScan, useCodeDrawer = true }) => {
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<string[]>([]);
  const barcodeReader = useInjection(BarcodeScannerService);
  const ref = useRef<HTMLDivElement>(null);

  const resume = () => {
    setIsScanning(true);
    barcodeReader.resumeRead();
  };

  const pause = () => {
    setIsScanning(false);
    barcodeReader.pauseRead();
  };

  const start = (target: HTMLElement) => {
    setIsLoading(true);
    barcodeReader.read(target);
  };

  const stop = () => {
    setIsLoading(false);
    barcodeReader.stop();
  };

  const controlRead = () => {
    isScanning ? pause() : resume();
  };

  const handleScan = (newCode: string) => {
    if (onScan) onScan(newCode);

    setProducts((prev) => {
      if (prev.includes(newCode)) {
        return prev;
      }
      return [...prev, newCode];
    });

    pause();
  };

  const onRemoveCode = (code: string) => {
    setProducts((prev) => prev.filter((c) => c !== code));
  };

  useLayoutEffect(() => {
    barcodeReader.onBarcodeRead(handleScan);

    if (ref.current) start(ref.current);

    return () => stop();
  }, [ref]);

  useEffect(() => {
    if (!products.length && !isScanning) {
      resume();
    }
  }, [products]);

  return (
    <VStack minH="100%">
      <Box
        ref={ref}
        w="100%"
        pos="relative"
        display={isLoading ? "grid" : "block"}
        placeItems="center"
      >
        <Button
          onClick={controlRead}
          position="absolute"
          top="1rem"
          right="2rem"
          zIndex="2"
        >
          {isScanning ? "Stop scan" : "Start scan"}
        </Button>
      </Box>
      {useCodeDrawer && (
        <SuspenseWithLoading>
          <ScannedItemsTab
            codes={products}
            onScanAnother={resume}
            isScanning={isScanning}
            onRemoveCode={onRemoveCode}
          />
        </SuspenseWithLoading>
      )}
    </VStack>
  );
};

export default Scanner;
