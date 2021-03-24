import gql from 'graphql-tag.macro';

export const GET_BLOGS = gql`
  query {
    blogs {
      id
      title
      subtitle
      text
      status
      slug
    }
  }
`;
