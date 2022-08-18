import { gql } from "@apollo/client";
import STORAGE_FIELD_FRAGMENT from "storage/infra/StorageFragment";

const UPDATE_ROOT_MUTATION = gql`
  ${STORAGE_FIELD_FRAGMENT}
  mutation updateRoot($_id: ID!, $input: RootInput!) {
    updateRoot(_id: $_id, input: $input) {
      _id
      storages {
        ...StorageFields
      }
    }
  }
`;

export default UPDATE_ROOT_MUTATION;
