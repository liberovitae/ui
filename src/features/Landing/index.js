import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BLOGS } from './queries';
import Helmet from 'react-helmet';
import { Box } from '@material-ui/core';
import { useIntl } from 'react-intl';
import { hero, hideBlog } from '../../constants/globalVars';
import SiteHeader from './SiteHeader';
import SwipeableViews from './SwipeableViews';
import Blog from './Blog';

const Landing = React.memo(
  ({ history, session }) => {
    const intl = useIntl();

    useEffect(() => {
      hero(null);
    }, []);

    const { data } = useQuery(GET_BLOGS, { skip: hideBlog() });

    let blogs;

    if (data) blogs = data.blogs;

    return (
      <>
        <Helmet
          title={`${intl.formatMessage({
            id: 'site.name',
          })} | ${intl.formatMessage({ id: 'site.header' })}`}
          meta={[
            {
              property: 'og:title',
              content: intl.formatMessage({ id: 'site.name' }),
            },
          ]}
        >
          <meta
            property="og:title"
            content={intl.formatMessage({ id: 'site.name' })}
          />
          <meta
            property="og:description"
            content={`${intl.formatMessage({ id: 'site.header' })}`}
          />
          <meta
            property="og:image"
            content={`${process.env.REACT_APP_UI_URL}/img/logo.png`}
          />
        </Helmet>

        <Box pt={4}>
          <SiteHeader />

          {blogs && blogs.length > 0 && (
            <Blog history={history} session={session} blogs={blogs} />
          )}

          <SwipeableViews history={history} session={session} />
        </Box>
      </>
    );
  },
  (prevProps, nextProps) => {
    if (
      prevProps.history.location.pathname !==
        nextProps.history.location.pathname ||
      prevProps.session !== nextProps.session
    )
      return false;
    return true;
  },
);

export default Landing;
