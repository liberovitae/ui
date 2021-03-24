import gql from 'graphql-tag.macro';

export const UPDATE_STATS = gql`
  mutation updateStats(
    $eventType: String!
    $itemType: String!
    $slug: String!
  ) {
    updateStats(
      eventType: $eventType
      itemType: $itemType
      slug: $slug
    )
  }
`;
