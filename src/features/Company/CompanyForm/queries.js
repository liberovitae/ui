import gql from 'graphql-tag.macro';

export const CREATE_COMPANY = gql`
  mutation(
    $title: String!
    $image: String
    $website: String
    $tagline: String
    $twitter: String
    $linkedin: String
  ) {
    createCompany(
      title: $title
      image: $image
      website: $website
      tagline: $tagline
      twitter: $twitter
      linkedin: $linkedin
    ) {
      id
      title
      image
      website
      tagline
      twitter
      linkedin
      user {
        id
        usertitle
      }
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation(
    $id: ID!
    $title: String!
    $image: String
    $website: String
    $tagline: String
    $twitter: String
    $linkedin: String
  ) {
    updateCompany(
      id: $id
      title: $title
      image: $image
      website: $website
      tagline: $tagline
      twitter: $twitter
      linkedin: $linkedin
    ) {
      id
      title
      image
      website
      tagline
      twitter
      linkedin
      user {
        id
        usertitle
      }
    }
  }
`;

export const GET_COMPANY = gql`
  query($id: ID) {
    company(id: $id) {
      id
      title
      image
      website
      tagline
      twitter
      linkedin
    }
  }
`;
