import useInjection from "common/hooks/UseInjection";
import StorageService from "storage/service/storage-service";

const useDeleteStorage = (storageId: string) => {
  const storageService = useInjection(StorageService);

  return async () => {
    storageService.deleteStorage(storageId);
  };
};

export default useDeleteStorage;
