import gql from 'graphql-tag.macro';

export const GET_PAGINATED_POSTS = gql`
  query(
    $type: String
    $cursor: Int
    $limit: Int!
    $filter: PostFilterInput
    $cache: Boolean
  ) {
    posts(
      type: $type
      cursor: $cursor
      limit: $limit
      filter: $filter
      cache: $cache
    ) @connection(key: $type) {
      edges {
        id
        title
        type
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
        commentCount
        commentsEnabled
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

export const GET_POST = gql`
  query($slug: String!) {
    post(slug: $slug) {
      id
      title
      parent {
        id
        title
        image
        type
        slug
      }
      image
      location {
        name
        lat
        lon
      }
      text
      status
      types
      tags
      slug
      url
      commentCount
      commentsEnabled
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

export const CREATE_POST = gql`
  mutation($input: PostInput!) {
    createPost(input: $input) {
      id
      title
      image
      text
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

export const UPDATE_POST = gql`
  mutation($id: ID!, $input: PostInput!) {
    updatePost(id: $id, input: $input) {
      id
      title
      image
      text
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
