import Analytics from 'analytics';
import { UPDATE_STATS } from './queries';
import { client } from '../index';

export const doNotTrackPlugin = (userConfig = {}) => {
  return {
    name: 'do-not-track',
    config: Object.assign({}, userConfig),
    initializeStart: ({ abort, config }) => {
      if (doNotTrackEnabled()) {
        return abort(
          'Cancel the initialize call because do-not-track enabled',
        );
      }
    },
    pageStart: ({ abort, config }) => {
      if (doNotTrackEnabled()) {
        return abort(
          'Cancel the page call because do-not-track enabled',
        );
      }
    },
    identifyStart: ({ abort, config }) => {
      if (doNotTrackEnabled()) {
        return abort(
          'Cancel the identify call because do-not-track enabled',
        );
      }
    },
    trackStart: ({ abort, config }) => {
      if (doNotTrackEnabled()) {
        return abort(
          'Cancel the track call because do-not-track enabled',
        );
      }
    },
  };
};

/* This is an example plugin */
export const analyticsPlugin = (userConfig = {}) => {
  return {
    NAMESPACE: 'liberovitae',
    config: userConfig,
    initialize: ({ payload }) => {
      // console.log('Load stuff');
    },
    page: ({ payload }) => {
      client.mutate({
        mutation: UPDATE_STATS,
        variables: {
          eventType: payload.type,
          itemType: payload.options.type,
          slug: payload.options.slug,
        },
      });

      // console.log(
      //   `Example Page > [payload: ${JSON.stringify(
      //     payload,
      //     null,
      //     2,
      //   )}]`,
      // );
    },
    /* Track event */
    track: ({ payload }) => {
      client.mutate({
        mutation: UPDATE_STATS,
        variables: {
          eventType: payload.type,
          itemType: payload.properties.type,
          slug: payload.properties.slug,
        },
      });

      // console.log(
      //   `Example Track > [${
      //     payload.event
      //   }] [payload: ${JSON.stringify(payload, null, 2)}]`,
      // );
    },
    /* Identify user */
    identify: ({ payload }) => {
      console.log(
        `Example identify > [payload: ${JSON.stringify(
          payload,
          null,
          2,
        )}]`,
      );
    },
    loaded: () => {
      return true;
    },
    ready: () => {
      // console.log('ready: exampleProviderPlugin');
    },
  };
};

/* Initialize analytics & load plugins */
export const analytics = Analytics({
  app: 'liberovitae',
  plugins: [analyticsPlugin()],
});

export default analytics;
