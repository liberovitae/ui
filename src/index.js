// import './wdyr';

import React from 'react';
import ReactDOM from 'react-dom';
import { config } from 'dotenv';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { inflate } from 'graphql-deduplicator';
import App from './features/App';
import { Logout } from './features/Account/Logout';
import './index.css';
import { useSnackbar } from 'notistack';
import { createUploadLink } from 'apollo-upload-client';
import { IntlProvider } from 'react-intl';
import Snackbar from './features/Shared/Snackbar';
import { en } from './locales';
import * as serviceWorker from './registerServiceWorker';

const env = process.env.NODE_ENV;

config({ path: `./.env.${env}` });

sessionStorage.clear();

const httpLink = new createUploadLink({
  uri: process.env.REACT_APP_API_URL,
});

const wsLink = new WebSocketLink({
  uri: process.env.REACT_APP_WSS_URL,
  options: {
    reconnect: true,
    lazy: true,
  },
});

const inflateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return inflate(response);
  });
});

const terminatingLink = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return (
      kind === 'OperationDefinition' && operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    const token = localStorage.getItem('token');

    if (token) {
      headers = { ...headers, 'x-token': token };
    }

    return { headers };
  });

  return forward(operation);
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(graphQLErrors);
    graphQLErrors.forEach(
      ({ message, extensions, locations, path }) => {
        if (extensions && extensions.code === 'UNAUTHENTICATED') {
          Logout(client);
          return <Snackbar message={message} variant="error" />;
        }
      },
    );
  }

  if (networkError) {
    if (networkError.statusCode === 401) {
      Logout(client);
    }
  }
});

// cleanTypeName breaks file uploads and caching!

// const cleanTypeName = new ApolloLink((operation, forward) => {
//   if (operation.variables) {
//     const omitTypename = (key, value) =>
//       key === '__typename' ? undefined : value;
//     operation.variables = JSON.parse(
//       JSON.stringify(operation.variables),
//       omitTypename,
//     );
//   }
//   return forward(operation).map((data) => {
//     return data;
//   });
// });

const link = ApolloLink.from([
  inflateLink,
  authLink,
  errorLink,
  // cleanTypeName,
  terminatingLink,
]);

export const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <IntlProvider messages={en} locale="en" defaultLocale="en">
      <App />
    </IntlProvider>
  </ApolloProvider>,
  document.getElementById('root'),
);
serviceWorker.register({
  onUpdate: (registration) => {
    const { enqueueSnackbar } = useSnackbar();
    const waitingServiceWorker = registration.waiting;

    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener(
        'statechange',
        (event) => {
          if (event.target.state === 'activated') {
            enqueueSnackbar(
              `🔄 There is a new version of the app ready. Please reload to update.`,
              {
                variant: 'info',
                onClose: () => window.location.reload(),
              },
            );
          }
        },
      );
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  },
});
