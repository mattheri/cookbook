import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import { useLayoutEffect, useRef, useState } from "react";

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

  useLayoutEffect(() => {
    barcodeReader.onBarcodeRead(handleScan);

    if (ref.current) {
      barcodeReader.read(ref.current);
    }

    return () => barcodeReader.stop();
  }, [ref]);

  return (
    <VStack minH="100%">
      <Box
        ref={ref}
        w="100%"
        pos="relative"
        display={isLoading ? "grid" : "block"}
        placeItems="center"
      ></Box>
      <code>
        {products.map((product) => (
          <>
            <div>{product}</div>
            <br />
          </>
        ))}
      </code>
      <Button
        colorScheme="green"
        w="100%"
        disabled={isScanning}
        onClick={handleScanAnother}
      >
        Add and scan another
      </Button>
      <Button w="100%" disabled={!products.length}>
        Add
      </Button>
    </VStack>
  );
};

export default Scanner;
