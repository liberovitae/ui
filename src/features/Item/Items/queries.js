import gql from 'graphql-tag.macro';

export const GET_PAGINATED_JOBS = gql`
  query(
    $cursor: Int
    $limit: Int!
    $filter: JobFilterInput
    $cache: Boolean
  ) {
    jobs(
      cursor: $cursor
      limit: $limit
      filter: $filter
      cache: $cache
    ) @connection(key: "JobsConnection") {
      edges {
        id
        title
        company {
          name
          logo
        }
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
