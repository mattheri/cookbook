import useInjection from "common/hooks/UseInjection";
import BarcodeService from "product/service/barcode-service";
import React, { useCallback, useEffect } from "react";

const PickProductForm = () => {
  const barcodeService = useInjection(BarcodeService);

  const queryUpc = useCallback(async () => {
    const resp = await barcodeService.getProduct("061202009055");

    console.log(resp);
  }, [barcodeService]);

  useEffect(() => {
    // queryUpc();
  }, [queryUpc]);

  return <div>PickProductForm</div>;
};

export default PickProductForm;
