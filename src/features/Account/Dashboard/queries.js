import gql from 'graphql-tag.macro';

export const GET_MY_POSTS = gql`
  query($type: String) {
    myPosts(type: $type) {
      id
      title
      type
      types
      image
      slug
      tags
      location {
        name
      }
      url
      status
      dates {
        start
        end
      }
      createdAt
      children {
        id
        title
        image
        type
        types
        slug
        status
        dates {
          start
          end
        }
        createdAt
      }
    }
  }
`;

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id)
  }
`;

export const SET_POST_STATUS = gql`
  mutation($id: ID!, $status: String!) {
    setPostStatus(id: $id, status: $status)
  }
`;

export const GET_MY_COUNTS = gql`
  query {
    myCounts {
      alerts
      posts
      saved
    }
  }
`;

export const GET_SAVED_POSTS = gql`
  query {
    savedPosts {
      post {
        id
        type
        title
        slug
        createdAt
        publishedAt
        parent {
          id
          type
          title
          slug
          createdAt
          publishedAt
        }
      }
      reminder
      createdAt
    }
  }
`;

export const DELETE_SAVED_POST = gql`
  mutation($id: ID!) {
    deleteSavedPost(id: $id)
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const SAVE_POST = gql`
  mutation($id: ID!, $reminder: Boolean) {
    savePost(id: $id, reminder: $reminder)
  }
`;

export const EDIT_ACCOUNT = gql`
  mutation($email: String!) {
    updateUser(email: $email) {
      id
      username
      email
    }
  }
`;

export const REVERT_EMAIL = gql`
  mutation {
    revertEmail
  }
`;

export const VERIFY_USER = gql`
  mutation($token: String, $type: String) {
    verifyUser(token: $token, type: $type) {
      token
    }
  }
`;
export const EDIT_PASSWORD = gql`
  mutation($oldPassword: String!, $newPassword: String!) {
    updatePassword(
      oldPassword: $oldPassword
      newPassword: $newPassword
    )
  }
`;

export const CREATE_ALERT = gql`
  mutation($input: AlertInput!) {
    createAlert(input: $input) {
      title
      alertType
      keywords
      location
      types
      frequency
      active
      email
      notification
      subscription {
        endpoint
        expirationTime
        p256dh
        auth
      }
    }
  }
`;

export const UPDATE_ALERT = gql`
  mutation($id: ID!, $input: AlertInput!) {
    updateAlert(id: $id, input: $input) {
      id
      title
      keywords
      location
      types
      frequency
      active
      email
      notification
      subscription {
        endpoint
        expirationTime
        p256dh
        auth
      }
    }
  }
`;

export const GET_ALERTS = gql`
  query {
    alerts {
      id
      alertType
      title
      slug
      frequency
      active
      createdAt
    }
  }
`;

export const DELETE_ALERT = gql`
  mutation($id: ID!) {
    deleteAlert(id: $id)
  }
`;

export const TOGGLE_ACTIVATE = gql`
  mutation($id: ID!) {
    toggleActivate(id: $id)
  }
`;

export const GET_ALERT = gql`
  query($slug: String!) {
    alert(slug: $slug) {
      id
      title
      alertType
      keywords
      location
      types
      slug
      frequency
      active
      email
      notification
    }
  }
`;
