import gql from 'graphql-tag.macro';

export const GET_LOCATION = gql`
  query($location: String!) {
    location(location: $location) {
      name
      country
      adminCode
      population
      lat
      lon
    }
  }
`;
