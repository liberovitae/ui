import gql from 'graphql-tag.macro';

export const GET_ME_JOBS = gql`
  query {
    meJobs {
      id
      title
      types
      slug
      status
      createdAt
    }
  }
`;

export const GET_ME_VENUES = gql`
  query {
    meVenues {
      id
      title
      children {
        id
        title
        slug
        status
        types
        dates {
          start
          end
        }
      }
      types
      image
      slug
      status
      createdAt
    }
  }
`;

export const GET_ME_EVENTS = gql`
  query {
    meEvents {
      id
      title
      types
      slug
      status
      createdAt
    }
  }
`;

export const DELETE_VENUE = gql`
  mutation($id: ID!) {
    deleteVenue(id: $id)
  }
`;

export const DELETE_EVENT = gql`
  mutation($id: ID!) {
    deleteEvent(id: $id)
  }
`;

export const SET_VENUE_STATUS = gql`
  mutation($id: ID!, $status: String!) {
    setVenueStatus(id: $id, status: $status)
  }
`;

export const DELETE_JOB = gql`
  mutation($id: ID!) {
    deleteJob(id: $id)
  }
`;

export const GET_ME_COUNTS = gql`
  query {
    meCounts {
      alerts {
        jobs
        venues
      }
      jobs
      venues
      saved {
        jobs
        venues
      }
    }
  }
`;

export const GET_SAVED_ITEMS = gql`
  query {
    savedItems {
      jobs {
        job {
          id
          title
          parent {
            title
          }
          slug
          createdAt
          publishedAt
        }
        reminder
        createdAt
      }
      venues {
        venue {
          id
          title
          slug
          createdAt
          publishedAt
        }
        reminder
        createdAt
      }
      events {
        event {
          id
          title
          slug
          createdAt
          publishedAt
        }
        reminder
        createdAt
      }
    }
  }
`;

export const DELETE_SAVED_ITEM = gql`
  mutation($id: ID!, $itemType: String!) {
    deleteSavedItem(id: $id, itemType: $itemType)
  }
`;

export const DELETE_USER = gql`
  mutation($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const SAVE_ITEM = gql`
  mutation($id: ID!, $itemType: String!, $reminder: Boolean) {
    saveItem(id: $id, itemType: $itemType, reminder: $reminder)
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
      venues {
        id
        alertType
        title
        slug
        frequency
        active
        createdAt
      }
      jobs {
        id
        alertType
        title
        slug
        frequency
        active
        createdAt
      }
      events {
        id
        alertType
        title
        slug
        frequency
        active
        createdAt
      }
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

export const SET_JOB_STATUS = gql`
  mutation($id: ID!, $status: String!) {
    setJobStatus(id: $id, status: $status)
  }
`;
