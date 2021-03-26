import gql from 'graphql-tag.macro';

export const GET_EVENT = gql`
  query($slug: String!) {
    event(slug: $slug) {
      id
      title
      logo
      location {
        name
        lat
        lon
      }
      description
      status
      types
      tags
      slug
      url
      createdAt
    }
  }
`;

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
