import { gql } from "@apollo/client";

const STORAGE_FIELD_FRAGMENT = gql`
  fragment StorageFields on Storage {
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
`;

export default STORAGE_FIELD_FRAGMENT;
