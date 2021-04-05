import gql from 'graphql-tag.macro';

import { COMMENT_CORE } from './fragments';

export const GET_PAGINATED_COMMENTS = gql`
  ${COMMENT_CORE}
  query(
    $postId: ID!
    $cursor: Int
    $limit: Int!
    $filter: CommentFilterInput
    $cache: Boolean
  ) {
    comments(
      postId: $postId
      cursor: $cursor
      limit: $limit
      filter: $filter
      cache: $cache
    ) @connection(key: $postId) {
      # GraphQL doesn't support recursion - find a better way for this
      edges {
        ...CommentCore
        children {
          ...CommentCore
          children {
            ...CommentCore
            children {
              ...CommentCore
              children {
                ...CommentCore
                children {
                  ...CommentCore
                  children {
                    ...CommentCore
                    children {
                      ...CommentCore
                      children {
                        ...CommentCore
                        children {
                          ...CommentCore
                          children {
                            ...CommentCore
                            children {
                              ...CommentCore
                              children {
                                ...CommentCore
                                children {
                                  ...CommentCore
                                  children {
                                    ...CommentCore
                                    children {
                                      ...CommentCore
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
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

export const GET_COMMENT = gql`
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

export const CREATE_COMMENT = gql`
  mutation($input: CommentInput!, $postId: ID!, $parentId: ID) {
    createComment(
      input: $input
      postId: $postId
      parentId: $parentId
    ) {
      id
      author {
        username
      }
      text
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
