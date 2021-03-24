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
      company {
        id
        name
        logo
        website
        tagline
        twitter
        linkedin
      }
    }
  }
`;
