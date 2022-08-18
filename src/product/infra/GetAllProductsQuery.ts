import { gql } from "@apollo/client";
import PRODUCT_FIELDS_FRAGMENT from "./ProductFieldsFragment";

const GET_ALL_PRODUCTS_QUERY = gql`
  ${PRODUCT_FIELDS_FRAGMENT}
  query products {
    products {
      ...ProductFields
    }
  }
`;

export default GET_ALL_PRODUCTS_QUERY;
