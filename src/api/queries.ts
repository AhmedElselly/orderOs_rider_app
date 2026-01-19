import { gql } from "@apollo/client";

export const GET_RIDER = gql`
  query ($id: ID!) {
    rider(id: $id) {
      id
      name
      status
    }
  }
`;
