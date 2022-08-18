import { gql } from "@apollo/client";
import STORAGE_FIELD_FRAGMENT from "./StorageFragment";

const CREATE_STORAGE_ROOT_MUTATION = gql`
  ${STORAGE_FIELD_FRAGMENT}
  mutation createStorage($id: ID!, $input: StorageInput!) {
    addStorageRoot(_id: $id, storageInput: $input) {
      _id
      user
      updatedAt
      createdAt
      recipes {
        _id
      }
      storages {
        ...StorageFields
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

export default CREATE_STORAGE_ROOT_MUTATION;
