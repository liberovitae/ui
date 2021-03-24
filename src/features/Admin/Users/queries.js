import gql from 'graphql-tag.macro';

export const GET_USERS = gql`
  query($limit: Int) {
    users(limit: $limit) {
      username
      email
      verified
      role
    }
  }
`;
