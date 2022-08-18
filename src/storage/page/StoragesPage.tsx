import { Container, SimpleGrid } from "@chakra-ui/react";
import PageContainer from "common/components/PageContainer";
import StorageWithActions from "storage/components/StorageWithActions";
import useAppSelector from "store/hooks/UseAppSelector";

const StoragesPage = () => {
  const storages = useAppSelector(({ root }) => root.storages);

  return (
    <PageContainer>
      <SimpleGrid minChildWidth={["300px", "300px", "40%"]} spacing="2rem">
        {storages.map((storage) => (
          <StorageWithActions
            key={storage.updatedAt + storage._id}
            storage={storage}
          />
        ))}
      </SimpleGrid>
    </PageContainer>
  );
};

export default StoragesPage;
