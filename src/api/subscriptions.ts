import { gql } from "@apollo/client";

export const RIDER_ASSIGNED = gql`
  subscription ($riderId: ID!) {
    riderAssigned(riderId: $riderId) {
      id
      status
      pricing {
        total
      }
    }
  }
`;

export const ORDER_UPDATED = gql`
  subscription ($orderId: ID!) {
    orderUpdated(orderId: $orderId) {
      id
      status
    }
  }
`;
