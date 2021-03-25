import gql from 'graphql-tag.macro';

export const GET_PAGINATED_EVENTS = gql`
  query(
    $cursor: Int
    $limit: Int!
    $filter: EventFilterInput
    $cache: Boolean
  ) {
    events(
      cursor: $cursor
      limit: $limit
      filter: $filter
      cache: $cache
    ) @connection(key: "EventsConnection") {
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
      regions
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

export const CREATE_EVENT = gql`
  mutation($input: EventInput!) {
    createEvent(input: $input) {
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
      regions
      types
      status
      tags
      createdAt
      publishedAt
    }
  }
`;

export const UPDATE_EVENT = gql`
  mutation($id: ID!, $input: EventInput!) {
    updateEvent(id: $id, input: $input) {
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
      regions
      types
      status
      tags
      createdAt
      publishedAt
    }
  }
`;
