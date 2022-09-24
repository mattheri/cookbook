import { Box, Button, Spinner, VStack } from "@chakra-ui/react";
import useInjection from "common/hooks/UseInjection";
import BarcodeScannerService from "barcode-scanner/service/barcode-scanner-service";
import { useLayoutEffect, useRef, useState } from "react";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[] | null>(null);
  const barcodeReader = useInjection(BarcodeScannerService);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
      <Button colorScheme="green" w="100%" disabled={isScanning}>
        Add and scan another
      </Button>
      <Button w="100%" disabled={!products}>
        Add
      </Button>
    </VStack>
  );
};

export default Scanner;
