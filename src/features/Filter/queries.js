import gql from 'graphql-tag.macro';

export const SEARCH_QUERY = gql`
  query($filter: JobFilterInput!) {
    jobs(filter: $filter) {
      edges {
        id
        title
        company {
          id
          name
          logo
        }
        location {
          name
          lat
          lon
        }
        regions
        description
        types
        status
        slug
        tags
        url
        createdAt
        publishedAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

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

export const UPDATE_SEARCH = gql`
  mutation UpdateSearch($keywords: String) {
    searchFilter(keywords: $keywords) @client {
      keywords
    }
  }
`;
