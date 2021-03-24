import gql from 'graphql-tag.macro';

export const SET_PASSWORD = gql`
  mutation($token: String!, $password: String!) {
    resetPassword(token: $token, password: $password)
  }
`;
