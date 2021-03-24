import gql from 'graphql-tag.macro';

export const GET_BLOG = gql`
  query($slug: String!) {
    blog(slug: $slug) {
      id
      title
      subtitle
      text
      status
    }
  }
`;

export const GET_ALL_BLOGS = gql`
  query {
    allBlogs {
      id
      title
      subtitle
      text
      status
      slug
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation($input: BlogInput!) {
    createBlog(input: $input) {
      id
      title
      subtitle
      text
      slug
      status
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation($id: ID!, $input: BlogInput!) {
    updateBlog(id: $id, input: $input) {
      id
      title
      subtitle
      text
      slug
      status
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation($id: ID!) {
    deleteBlog(id: $id)
  }
`;

export const SET_BLOG_STATUS = gql`
  mutation($id: ID!, $status: String!) {
    setBlogStatus(id: $id, status: $status)
  }
`;
