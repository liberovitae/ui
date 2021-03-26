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

export const GET_JOB = gql`
  query($slug: String!) {
    job(slug: $slug) {
      id
      title
      company {
        name
        logo
        twitter
        tagline
        linkedin
        website
      }
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
      publishedAt
      stats {
        views
        visits
        saves
      }
    }
  }
`;

export const CREATE_JOB = gql`
  mutation($input: JobInput!) {
    createJob(input: $input) {
      id
      title
      description
      location {
        name
        lat
        lon
      }
      company {
        id
        name
        logo
        website
        tagline
        twitter
        linkedin
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

export const UPDATE_JOB = gql`
  mutation($id: ID!, $input: JobInput!) {
    updateJob(id: $id, input: $input) {
      id
      title
      description
      location {
        name
        lat
        lon
      }
      company {
        id
        name
        logo
        website
        tagline
        twitter
        linkedin
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
