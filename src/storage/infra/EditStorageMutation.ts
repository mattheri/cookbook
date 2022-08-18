import { gql } from "@apollo/client";

const EDIT_STORAGE_MUTATION = gql`
  mutation updateStorage($id: ID!, $input: StorageInput!) {
    updateStorage(_id: $id, input: $input) {
      _id
      createdAt
      updatedAt
      name
      shared
      storageImage {
        url
        name
      }
    }
  }
`;

export default EDIT_STORAGE_MUTATION;
