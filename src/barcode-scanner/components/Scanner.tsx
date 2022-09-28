import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import { useLayoutEffect, useRef, useState, useEffect, FC, lazy } from "react";
import SuspenseWithLoading from "common/components/SuspenseWithLoading";
import useTranslate from "common/hooks/UseTranslate";
import { namespace } from "barcode-scanner/i18n/en";

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
  const t = useTranslate(namespace);

  const resume = () => {
    setIsScanning(true);
    barcodeReader.resumeRead();
  };

  const pause = () => {
    setIsScanning(false);
    barcodeReader.pauseRead();
  };

  const start = (target: HTMLElement) => {
    setIsScanning(true);
    barcodeReader.read(target);
  };

  const stop = () => {
    setIsScanning(false);
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

  useEffect(() => {
    barcodeReader.$isLoading.subscribe((status) => {
      setIsLoading(status);
    });
  }, [barcodeReader]);

  return (
    <VStack minH="100%">
      <Box
        ref={ref}
        w="100%"
        minH="100px"
        pos="relative"
        display="grid"
        placeItems="center"
      >
        {isLoading && (
          <Spinner
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
        )}
        {!isLoading && (
          <Button
            onClick={controlRead}
            position="absolute"
            top="1rem"
            right="2rem"
            zIndex="2"
          >
            {t(isScanning ? "pause" : "resume")}
          </Button>
        )}
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
