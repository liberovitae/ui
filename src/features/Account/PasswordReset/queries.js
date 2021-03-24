import gql from 'graphql-tag.macro';

export const RESET_PASSWORD = gql`
  mutation($email: String!) {
    requestReset(email: $email)
  }
`;
