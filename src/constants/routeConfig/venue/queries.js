import gql from 'graphql-tag.macro';

export const GET_PAGINATED_VENUES = gql`
  query(
    $cursor: Int
    $limit: Int!
    $filter: VenueFilterInput
    $cache: Boolean
  ) {
    venues(
      cursor: $cursor
      limit: $limit
      filter: $filter
      cache: $cache
    ) @connection(key: "VenuesConnection") {
      edges {
        id
        title
        logo
        location {
          name
        }
        types
        slug
        status
        featured
        tags
        publishedAt
      }
      pageInfo {
        hasNextPage
        nextPage
        totalDocs
      }
    }
  }
`;

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
      description
      status
      types
      tags
      slug
      url
      publishedAt
      createdAt
      userId
      stats {
        views
        visits
        saves
      }
    }
  }
`;

export const CREATE_VENUE = gql`
  mutation($input: VenueInput!) {
    createVenue(input: $input) {
      id
      title
      logo
      description
      location {
        name
        lat
        lon
      }
      url
      types
      status
      tags
      createdAt
      publishedAt
    }
  }
`;

export const UPDATE_VENUE = gql`
  mutation($id: ID!, $input: VenueInput!) {
    updateVenue(id: $id, input: $input) {
      id
      title
      logo
      description
      location {
        name
        lat
        lon
      }
      url
      types
      status
      tags
      createdAt
      publishedAt
    }
  }
`;
