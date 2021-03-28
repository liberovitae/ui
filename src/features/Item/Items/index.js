import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useSnackbar } from 'notistack';
import ItemList from './ItemList';
import ContentDrawer from '../../Shared/ContentDrawer';
import CountUp from 'react-countup';
import { scrollTop } from '../../Shared/ScrollTop';
import Loading from '../../Shared/Loading';
import {
  siteHeader,
  backdrop,
  routeConfig,
  tabIndex,
  useLocalCache,
} from '../../../constants/globalVars';
import NoItems from './NoItems';
import NoSearchItems from './NoSeachItems';
import { getQueryString, objCompare } from '../../../helpers';
import { client } from '../../../index';
import ItemPage from '../../Item/ItemPage';
import { GET_ALERT } from '../../Account/Dashboard/queries';
import * as ROUTE_CONFIGS from '../../../constants/routeConfig';

const Items = React.memo(
  ({ limit, history, session }) => {
    const [noItems, setNoItems] = useState(false);
    const reactiveLocalCache = useReactiveVar(useLocalCache);
    const searchVar = routeConfig().searchVar;
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const reactiveSearch = useReactiveVar(searchVar);
    const queryString = getQueryString(reactiveSearch);
    const { slug } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const cachedItems = client.readQuery(
      {
        query: reactiveRouteConfig.queries.getPaginated,
      },
      { variables: { filter: reactiveSearch } },
    );

    useEffect(() => {
      // Default to reading items from cache (if we have them)
      if (cachedItems && !slug) {
        const key = Object.keys(cachedItems)[0];
        useLocalCache(true);

        if (
          !objCompare(
            reactiveSearch,
            routeConfig().INITIAL_SEARCH_STATE,
          )
        ) {
          siteHeader(
            <>
              <CountUp
                duration={1}
                start={0}
                end={cachedItems[key].pageInfo.totalDocs}
              />{' '}
              results
            </>,
          );

          // Update the window query string without pushing to the history stack.
          if (queryString) {
            return window.history.pushState(
              null,
              null,
              `${reactiveRouteConfig.routes.landing}?${queryString}`,
            );
          }

          return;
        }
      }

      siteHeader(reactiveRouteConfig.defaultSiteHeader);
    }, []);

    const { loading: aLoading, data: aData } = useQuery(GET_ALERT, {
      skip: !slug,
      variables: { slug: slug },
      onCompleted: ({ alert }) => {
        const { alertType, keywords, location, types } = alert;
        searchVar({
          alertType: alertType,
          keywords: keywords ?? '',
          location: { name: location ?? '' },
          types: types ?? [],
        });
        useLocalCache(false);
        console.log(alertType);
        routeConfig(ROUTE_CONFIGS[alertType]);
        tabIndex(reactiveRouteConfig.tabIndex);
        delete searchVar().alertType; // Remove alertType to not break search variable
      },
    });

    useLocalCache() && useLocalCache(false);

    const { loading, data, fetchMore } = useQuery(
      reactiveRouteConfig.queries.getPaginated,
      {
        skip: reactiveSearch.alertType || reactiveLocalCache,

        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-only',
        onCompleted: (data) => {
          if (data) {
            const key = Object.keys(data)[0];
            const items = data[key];

            if (items.edges.length) {
              const inputElem = document.getElementById('search');
              inputElem && inputElem.blur();

              if (
                !objCompare(
                  reactiveSearch,
                  reactiveRouteConfig.INITIAL_SEARCH_STATE,
                )
              ) {
                siteHeader(
                  <>
                    <CountUp
                      duration={1}
                      start={0}
                      end={items.pageInfo.totalDocs}
                    />{' '}
                    results
                  </>,
                );
                routeConfig().queries.nextPage = 2;

                scrollTop();
                backdrop(false);

                return;
              } else {
                scrollTop();
                routeConfig().queries.nextPage = 2;
                siteHeader(reactiveRouteConfig.defaultSiteHeader);
                backdrop(false);
                return;
              }
            }

            if (!items.edges.length) {
              siteHeader(<FormattedMessage id="search.not_found" />);
              backdrop(false);
            }
            useLocalCache(false);
          }
        },
        onError: (err) => {
          if (err.message === 'Error: NOCOUNT')
            return setNoItems(true);

          enqueueSnackbar(err.message, { variant: 'error' });
        },
        variables: {
          limit: limit,
          cache: true,
          filter: reactiveSearch,
        },
      },
    );

    if (noItems) {
      scrollTop();
      return <NoItems reactiveRouteConfig={reactiveRouteConfig} />;
    }

    if (loading) {
      return <Loading />;
    }

    if (cachedItems) {
      const key = Object.keys(cachedItems)[0];
      const items = cachedItems[key];

      if (!items.edges.length) {
        return <NoSearchItems />;
      }

      return (
        <>
          <ItemList
            limit={limit}
            items={items}
            history={history}
            fetchMore={fetchMore}
            filter={reactiveSearch}
          />
          <ContentDrawer session={session}>
            <ItemPage session={session} drawer />
          </ContentDrawer>
        </>
      );
    }
    return '';
  },
  (prevProps, nextProps) => {
    if (
      prevProps.history.location.search ===
      nextProps.history.location.search
    )
      return true;
    return false;
  },
);

export default Items;
