import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Grid, Box } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import ItemDetail from '../ItemDetail';
import Loading from '../../Shared/Loading';
import {
  routeConfig,
  contentDrawer,
  hero,
} from '../../../constants/globalVars';
import NotFound from '../../Shared/404';
import {
  ShareButtons,
  BackButton,
  Stats,
} from '../../Shared/Elements';
import { scrollTop } from '../../Shared/ScrollTop';
import Hero from '../../Shared/Hero';
import { useAnalytics } from 'use-analytics';

const ItemPage = ({ session }) => {
  const reactiveRouteConfig = useReactiveVar(routeConfig);
  const reactiveContentDrawer = useReactiveVar(contentDrawer);
  const slug = reactiveContentDrawer.slug;
  const type = reactiveRouteConfig.type;
  const { slug: paramSlug, type: paramType } = useParams();
  const intl = useIntl();
  const { page } = useAnalytics();

  const combineSlug = slug || paramSlug;
  const combineType = type || paramType;

  const { data, loading, error } = useQuery(
    reactiveRouteConfig.queries.get,
    {
      variables: { slug: combineSlug },
    },
  );

  useEffect(() => {
    scrollTop();

    if (data) {
      // Count our page view after a 5 second timeout
      setTimeout(
        () => page('pageVisit', { type, slug: combineSlug }),
        5000,
      );

      const key = Object.keys(data)[0];
      if (paramSlug) {
        hero({
          title: data[key].title,
          subtitle: data[key].location.name,
          country: data[key].location.name.split(',').pop().trim(),
        });
      }
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (data && !loading) {
    const key = Object.keys(data)[0];
    const item = data[key];

    const {
      name,
      title,
      description,
      company,
      location,
      status,
      stats,
    } = item;

    return (
      <Box>
        <Helmet
          defaultTitle={intl.formatMessage({ id: 'site.name' })}
          titleTemplate={`${intl.formatMessage({
            id: 'site.name',
          })} | %s`}
          title={title}
          meta={[
            {
              name: `description`,
              content: description,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: description,
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
              content: company?.name || name,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: description,
            },
          ]}
        >
          <title>
            {title}
            {company?.name.replace(/^/, ' @ ') ?? ''} -{' '}
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
                This item has been marked as filled.
              </Alert>
            </Box>
          )}
          <ItemDetail type={combineType} item={item} />

          <Stats stats={stats || { views: 0, visits: 0, saves: 0 }} />
          <Grid align="left" item xs={10} sm={10}>
            <ShareButtons title={title} />
          </Grid>
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

export default ItemPage;
