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
        parent {
          title
          image
        }
        image
        location {
          name
        }
        types
        slug
        status
        featured
        tags
        publishedAt
        dates {
          start
          end
        }
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
      parent {
        id
        title
        image
      }
      image
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
      dates {
        start
        end
      }
      createdAt
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
      image
      description
      location {
        name
        lat
        lon
      }
      url
      types
      dates {
        start
        end
      }
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
      image
      description
      location {
        name
        lat
        lon
      }
      url
      types
      dates {
        start
        end
      }
      status
      tags
      createdAt
      publishedAt
    }
  }
`;
