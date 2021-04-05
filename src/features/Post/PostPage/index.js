import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Grid, Box, useMediaQuery } from '@material-ui/core';
import { useAnalytics } from 'use-analytics';
import { useTheme } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import PostDetail from '../PostDetail';
import { objCompare } from '../../../helpers';
import { Loading, NotFound, scrollTop, Hero } from '../../Shared';
import INITIAL_SEARCH_STATE from '../../../constants/initialSearch';
import {
  routeConfig,
  contentDrawer,
  hero,
} from '../../../constants/globalVars';
import {
  ShareButtons,
  BackButton,
  Stats,
} from '../../Shared/Elements';
import Comments from '../../Comment/Comments';
import { GET_POST } from '../../Post/queries';

const PostPage = ({ session }) => {
  const reactiveRouteConfig = useReactiveVar(routeConfig);
  const reactiveContentDrawer = useReactiveVar(contentDrawer);
  const slug = reactiveContentDrawer.slug;
  const type = reactiveRouteConfig.type;
  const { slug: paramSlug, type: paramType } = useParams();
  const intl = useIntl();
  const { page } = useAnalytics();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  const combineSlug = slug || paramSlug;
  const combineType = type || paramType;

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { slug: combineSlug },
  });

  useEffect(() => {
    scrollTop();

    if (data) {
      const { post } = data;
      // Count our page view after a 5 second timeout
      setTimeout(
        () => page('pageVisit', { type, slug: combineSlug }),
        5000,
      );

      const key = Object.keys(data)[0];
      if (paramSlug) {
        hero({
          title: post.title,
          subtitle: post.location.name,
          country: post.location.name.split(',').pop().trim(),
        });
      }
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (data) {
    const { post } = data;
    const {
      title,
      text,
      parent,
      location,
      status,
      stats,
      comments,
      commentCount,
      commentsEnabled,
    } = post;

    return (
      <Box
        pb={
          matches
            ? !objCompare(
                reactiveRouteConfig.searchVar(),
                INITIAL_SEARCH_STATE,
              )
              ? 10
              : 8
            : 0
        }
      >
        <Helmet
          defaultTitle={intl.formatMessage({ id: 'site.name' })}
          titleTemplate={`${intl.formatMessage({
            id: 'site.name',
          })} | %s`}
          title={title}
          meta={[
            {
              name: `description`,
              content: text,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: text,
            },
            {
              property: `og:type`,
              content: `website`,
            },
            {
              name: `twitter:card`,
              content: `summary`,
            },
            {
              name: `twitter:creator`,
              content: parent?.title || title,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: text,
            },
          ]}
        >
          <title>
            {title}
            {parent?.title.replace(/^/, ' @ ') ?? ''} -{' '}
            {location.name}
          </title>
        </Helmet>

        {!paramSlug && (
          <>
            <Hero
              title={title}
              subtitle={location.name}
              country={location.name.split(',').pop().trim()}
            />
          </>
        )}

        <Grid container spacing={2}>
          {status === 'filled' && (
            <Box mt={2} mb={2}>
              <Alert variant="outlined" severity="error">
                This post has been marked as filled.
              </Alert>
            </Box>
          )}
          <PostDetail type={combineType} post={post} />
          <Stats stats={stats} />
          <Grid align="left" item xs={10} sm={10}>
            <ShareButtons title={title} />
          </Grid>
          {routeConfig().hasComments && commentsEnabled && (
            <Grid id="comments" item xs={12}>
              <Comments
                comments={comments}
                postId={post.id}
                commentCount={commentCount}
                session={session}
              />
            </Grid>
          )}

          <Grid align="left" item xs={12}>
            <BackButton />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!data) {
    return <NotFound />;
  }
};

export default PostPage;
