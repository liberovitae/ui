import gql from 'graphql-tag.macro';

export const GET_ME = gql`
  {
    me {
      id
      username
      email
      secondaryEmail
      role
      verified
    }
  }
`;
