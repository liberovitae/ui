import gql from 'graphql-tag.macro';

export const CREATE_COMPANY = gql`
  mutation(
    $name: String!
    $logo: String
    $website: String
    $tagline: String
    $twitter: String
    $linkedin: String
  ) {
    createCompany(
      name: $name
      logo: $logo
      website: $website
      tagline: $tagline
      twitter: $twitter
      linkedin: $linkedin
    ) {
      id
      name
      logo
      website
      tagline
      twitter
      linkedin
      user {
        id
        username
      }
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation(
    $id: ID!
    $name: String!
    $logo: String
    $website: String
    $tagline: String
    $twitter: String
    $linkedin: String
  ) {
    updateCompany(
      id: $id
      name: $name
      logo: $logo
      website: $website
      tagline: $tagline
      twitter: $twitter
      linkedin: $linkedin
    ) {
      id
      name
      logo
      website
      tagline
      twitter
      linkedin
      user {
        id
        username
      }
    }
  }
`;

export const GET_COMPANY = gql`
  query($id: ID) {
    company(id: $id) {
      id
      name
      logo
      website
      tagline
      twitter
      linkedin
    }
  }
`;
