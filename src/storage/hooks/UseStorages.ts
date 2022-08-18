import useAppSelector from "store/hooks/UseAppSelector";

const useStorages = () => {
  return useAppSelector(({ root }) => root.storages);
};

export default useStorages;
