import { Box, VStack } from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import ScannedItemsTab from "./ScannedItemsTab";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<string[]>([]);
  const barcodeReader = useInjection(BarcodeScannerService);
  const ref = useRef<HTMLDivElement>(null);

  const handleScan = (newCode: string) => {
    setProducts((prev) => {
      if (prev.includes(newCode)) {
        return prev;
      }
      return [...prev, newCode];
    });

    barcodeReader.pauseRead();

    setIsScanning(false);
  };

  const handleScanAnother = () => {
    setIsScanning(true);
    barcodeReader.resumeRead();
  };

  const onRemoveCode = (code: string) => {
    setProducts((prev) => prev.filter((c) => c !== code));
  };

  useLayoutEffect(() => {
    barcodeReader.onBarcodeRead(handleScan);

    if (ref.current) {
      barcodeReader.read(ref.current);
    }

    return () => barcodeReader.stop();
  }, [ref]);

  useEffect(() => {
    if (!products.length && !isScanning) {
      handleScanAnother();
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
      ></Box>
      <ScannedItemsTab
        codes={products}
        onScanAnother={handleScanAnother}
        isScanning={isScanning}
        onRemoveCode={onRemoveCode}
      />
    </VStack>
  );
};

export default Scanner;
