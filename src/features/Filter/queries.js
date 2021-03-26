import gql from 'graphql-tag.macro';

export const GET_NEAREST_CITY = gql`
  query NearestCity($lat: Float!, $lon: Float!) {
    nearestCity(lat: $lat, lon: $lon) {
      name
      country
      lat
      lon
    }
  }
`;
