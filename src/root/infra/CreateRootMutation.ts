import { gql } from "@apollo/client";

const CREATE_ROOT_MUTATION = gql`
  mutation createRoot($user: String!) {
    createRoot(
      input: {
        user: $user
        shared: []
        shoppingLists: []
        storages: []
        recipes: []
      }
    ) {
      user
      _id
      updatedAt
      createdAt
    }
  }
`;

export default CREATE_ROOT_MUTATION;
