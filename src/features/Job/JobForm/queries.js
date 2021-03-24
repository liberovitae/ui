import gql from 'graphql-tag.macro';

export const GET_JOB = gql`
  query($slug: String!) {
    job(slug: $slug) {
      id
      title
      company {
        id
        name
        logo
        tagline
      }
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
