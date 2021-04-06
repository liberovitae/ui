import gql from 'graphql-tag.macro';

export const COMMENT_CORE = gql`
  fragment CommentCore on Comment {
    id
    text
    depth
    author {
      id
      username
    }
    slug
    postId
    parentId
    createdAt
  }
`;
