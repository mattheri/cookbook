import { lazy, Suspense, useContext } from "react";
import {
  CreateProductModalId,
  CreateStorageModalId,
  EditStorageModalId,
} from "common/constants/constants";
import ModalContext from "./context/ModalContext";

const CreateStorageModal = lazy(
  () => import("storage/components/CreateStorageModal")
);
const EditStorageModal = lazy(
  () => import("storage/components/EditStorageModal")
);
const CreateProductModal = lazy(
  () => import("product/components/create/CreateProductModal")
);

const Modals = () => {
  const { isCurrentlyOpen } = useContext(ModalContext);

  return (
    <Suspense>
      {isCurrentlyOpen === CreateStorageModalId && <CreateStorageModal />}
      {isCurrentlyOpen === EditStorageModalId && <EditStorageModal />}
      {isCurrentlyOpen === CreateProductModalId && <CreateProductModal />}
    </Suspense>
  );
};

export default Modals;
