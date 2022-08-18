import { gql } from "@apollo/client";
import STORAGE_FIELD_FRAGMENT from "storage/infra/StorageFragment";

const ROOT_QUERY = gql`
  ${STORAGE_FIELD_FRAGMENT}
  query rootByUser($user: String!) {
    rootByUser(user: $user) {
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

export default ROOT_QUERY;
