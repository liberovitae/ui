import gql from 'graphql-tag.macro';

export const CREATE_JOB = gql`
  mutation($input: JobInput!) {
    createJob(input: $input) {
      id
      title
      description
      location {
        name
        lat
        lon
      }
      company {
        id
        name
        logo
        website
        tagline
        twitter
        linkedin
      }
      url
      regions
      types
      status
      tags
      createdAt
      publishedAt
    }
  }
`;

export const UPDATE_JOB = gql`
  mutation($id: ID!, $input: JobInput!) {
    updateJob(id: $id, input: $input) {
      id
      title
      description
      location {
        name
        lat
        lon
      }
      company {
        id
        name
        logo
        website
        tagline
        twitter
        linkedin
      }
      url
      regions
      types
      status
      tags
      createdAt
      publishedAt
    }
  }
`;
