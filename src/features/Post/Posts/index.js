import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { useSnackbar } from 'notistack';
import PostsList from './PostsList';
import ContentDrawer from '../../Shared/ContentDrawer';
import CountUp from 'react-countup';
import { scrollTop } from '../../Shared/ScrollTop';
import {
  siteHeader,
  backdrop,
  routeConfig,
  tabIndex,
  useLocalCache,
} from '../../../constants/globalVars';
import NoPosts from './NoPosts';
import NoSearchPosts from './NoSearchPosts';
import { objCompare, getQueryString } from '../../../helpers';
import PostPage from '../../Post/PostPage';
import INITIAL_SEARCH_STATE from '../../../constants/initialSearch';
import { GET_ALERT } from '../../Account/Dashboard/queries';
import * as ROUTE_CONFIGS from '../../../constants/routeConfig';
import PostListSkeleton from '../../Post/PostListItem/Skeleton';
import { GET_PAGINATED_POSTS } from '../queries';
import { client } from '../../../index';
const Posts = React.memo(
  ({ limit, history, session }) => {
    const [noPosts, setNoPosts] = useState(false);
    const reactiveLocalCache = useReactiveVar(useLocalCache);
    const searchVar = routeConfig().searchVar;
    const reactiveRouteConfig = useReactiveVar(routeConfig);
    const reactiveSearch = useReactiveVar(searchVar);
    const { slug } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const queryString = getQueryString(reactiveSearch);

    const { type } = reactiveRouteConfig;

    useEffect(() => {
      if (cachedPosts && !slug) {
        const { posts } = cachedPosts;
        useLocalCache(true);

        if (!objCompare(reactiveSearch, INITIAL_SEARCH_STATE)) {
          siteHeader(
            <>
              <CountUp
                duration={1}
                start={0}
                end={posts.pageInfo.totalDocs}
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

    const cachedPosts = client.cache.readQuery({
      query: GET_PAGINATED_POSTS,
      variables: { type },
    });

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
        routeConfig(ROUTE_CONFIGS[alertType]);
        tabIndex(reactiveRouteConfig.tabIndex);
        delete searchVar().alertType; // Remove alertType to not conflict with search variable
      },
    });

    useLocalCache() && useLocalCache(false);

    const { loading, data, fetchMore } = useQuery(
      GET_PAGINATED_POSTS,
      {
        variables: { type },
        skip: reactiveSearch.alertType || reactiveLocalCache,

        fetchPolicy: 'cache-and-network',
        nextFetchPolicy: 'cache-only',
        onCompleted: ({ posts }) => {
          if (posts.edges.length) {
            const inputElem = document.getElementById('search');
            inputElem && inputElem.blur();

            if (!objCompare(reactiveSearch, INITIAL_SEARCH_STATE)) {
              siteHeader(
                <>
                  <CountUp
                    duration={1}
                    start={0}
                    end={posts.pageInfo.totalDocs}
                  />{' '}
                  results
                </>,
              );
              scrollTop();
              backdrop(false);

              return;
            } else {
              scrollTop();
              siteHeader(reactiveRouteConfig.defaultSiteHeader);
              backdrop(false);
              return;
            }
          }

          if (!posts.edges.length) {
            siteHeader(<FormattedMessage id="search.not_found" />);
            backdrop(false);
          }
          useLocalCache(false);
        },
        onError: (err) => {
          if (err.message === 'Error: NOCOUNT')
            return setNoPosts(true);

          enqueueSnackbar(err.message, { variant: 'error' });
        },
        variables: {
          type,
          limit: limit,
          cache: true,
          filter: reactiveSearch,
        },
      },
    );

    if (noPosts) {
      scrollTop();
      return <NoPosts type={type} />;
    }

    if (loading) {
      let arr = [];
      for (let i = 0; i < 19; i++) {
        arr.push(<PostListSkeleton key={i} />);
      }
      return arr;
    }

    if (cachedPosts) {
      const { posts } = cachedPosts;

      if (!posts.edges.length) {
        return <NoSearchPosts />;
      }

      return (
        <>
          <PostsList
            limit={limit}
            posts={posts}
            history={history}
            fetchMore={fetchMore}
            filter={reactiveSearch}
          />
          <ContentDrawer session={session}>
            <PostPage session={session} drawer />
          </ContentDrawer>
        </>
      );
    }
    return '';
  },
  (prevProps, nextProps) => {
    if (prevProps.session === nextProps.session) {
      return true;
    }
    return false;
  },
);

export default Posts;
