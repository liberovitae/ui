import gql from 'graphql-tag.macro';

export const GET_VENUE = gql`
  query($slug: String!) {
    venue(slug: $slug) {
      id
      title
      logo
      location {
        name
        lat
        lon
      }
      regions
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
