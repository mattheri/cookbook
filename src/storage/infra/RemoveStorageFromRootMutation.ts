import { gql } from "@apollo/client";
import STORAGE_FIELD_FRAGMENT from "./StorageFragment";

const REMOVE_STORAGE_FROM_ROOT = gql`
  ${STORAGE_FIELD_FRAGMENT}
  mutation removeStorageRoot($rootId: ID!, $storageId: ID!) {
    removeStorageRoot(rootId: $rootId, storageId: $storageId) {
      _id
      user
      updatedAt
      createdAt
      storages {
        ...StorageFields
      }
      recipes {
        _id
      }
      shared {
        _id
      }
      shoppingLists {
        _id
      }
    }
  }
`;

export default REMOVE_STORAGE_FROM_ROOT;
