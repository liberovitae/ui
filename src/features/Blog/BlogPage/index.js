import React, { useEffect } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useParams, useHistory, Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { useLastLocation } from 'react-router-last-location';
import { Helmet } from 'react-helmet';
import { useQuery } from '@apollo/client';
import { Grid, Button, Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Loading from '../../Shared/Loading';
import NotFound from '../../Shared/404';
import { ShareButtons } from '../../Shared/Elements';
import { LANDING } from '../../../constants/routes';
import { GET_BLOG } from '../queries';
import { hero } from '../../../constants/globalVars';

const BlogPage = ({ session }) => {
  const history = useHistory();
  const intl = useIntl();
  const lastLocation = useLastLocation();

  const { slug } = useParams();
  const { data, loading, error } = useQuery(GET_BLOG, {
    variables: { slug: slug },
  });

  useEffect(() => {
    if (data) {
      hero({
        title: data.blog.title,
        subtitle: data.blog.subtitle,
      });
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  if (data && !loading) {
    const { blog } = data;

    const { title, subtitle, text, slug } = blog;

    return (
      <Box p={1}>
        <Helmet
          defaultTitle={intl.formatMessage({ id: 'site.name' })}
          titleTemplate={`${intl.formatMessage({
            id: 'site.name',
          })} | %s`}
          title={title}
          meta={[
            {
              name: `description`,
              content: subtitle,
            },
            {
              property: `og:title`,
              content: title,
            },
            {
              property: `og:description`,
              content: subtitle,
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
              content: process.env.REACT_APP_SITE_NAME,
            },
            {
              name: `twitter:title`,
              content: title,
            },
            {
              name: `twitter:description`,
              content: subtitle,
            },
          ]}
        >
          <title>{title}</title>
        </Helmet>
        <Box pb={2}>{renderHTML(text)}</Box>
        <Grid container spacing={2}>
          <Grid align="left" item xs={11} sm={11}>
            <ShareButtons title={title} />
          </Grid>

          {session?.me?.role === 'ADMIN' && (
            <Grid item xs={1}>
              <Link to={`/blog/post/${slug}`}>
                <IconButton title="Edit blog post">
                  <EditIcon />
                </IconButton>
              </Link>
            </Grid>
          )}

          <Grid align="left" item xs={12}>
            <Button
              onClick={() =>
                lastLocation && lastLocation.pathname === LANDING
                  ? history.goBack()
                  : history.push(LANDING)
              }
              color="primary"
            >
              <FormattedMessage id="common.back" />
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (!data) {
    return <NotFound />;
  }
};

export default BlogPage;
