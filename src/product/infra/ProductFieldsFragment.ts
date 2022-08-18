import { gql } from "@apollo/client";

const PRODUCT_FIELDS_FRAGMENT = gql`
  fragment ProductFields on Product {
    _id
    title
    createdAt
    updatedAt
    barcodeNumber
    description
    bestBefore
    user
    brand
    category
    productImages {
      url
      name
    }
    storageType {
      _id
      label
      value
    }
  }
`;

export default PRODUCT_FIELDS_FRAGMENT;
