import { gql } from "@apollo/client";

export const CREATE_RIDER = gql`
  mutation ($name: String!) {
    createRider(name: $name) {
      id
      name
      status
    }
  }
`;

export const SET_STATUS = gql`
  mutation ($riderId: ID!, $status: RiderStatus!) {
    setRiderStatus(riderId: $riderId, status: $status) {
      id
      status
    }
  }
`;

export const UPDATE_LOCATION = gql`
  mutation ($riderId: ID!, $lat: Float!, $lng: Float!) {
    updateRiderLocation(riderId: $riderId, lat: $lat, lng: $lng) {
      id
    }
  }
`;
