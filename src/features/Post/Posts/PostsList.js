import React, { useState } from 'react';
import PostListItem from '../PostListItem';
import { FormattedMessage } from 'react-intl';
import { useReactiveVar } from '@apollo/client';
import LazyLoad from 'react-lazyload';
import {
  List,
  Divider,
  Fade,
  LinearProgress,
} from '@material-ui/core';
import MorePostsButton from './MorePostsButton';
import { makeStyles } from '@material-ui/core/styles';
import { routeConfig } from '../../../constants/globalVars';

const useStyles = makeStyles({
  list: {
    overflow: 'hidden',
  },
  linearProgress: {
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  morePostsButton: {
    marginTop: '1rem',
    textAlign: 'center',
    width: '100%',
  },
});

const PostList = React.memo(
  ({ history, posts, limit, fetchMore, filter }) => {
    const classes = useStyles();
    const { edges, pageInfo } = posts;
    const { hasNextPage, totalDocs, nextPage } = pageInfo;
    const [moreLoading, setMoreLoading] = useState(false);
    const reactiveRouteConfig = useReactiveVar(routeConfig);

    return (
      <Fade in>
        <List className={classes.list}>
          {edges.map((post) => (
            <LazyLoad
              // unmountIfInvisible
              height={110}
              offset={500}
              key={post.id}
            >
              <PostItem
                reactiveRouteConfig={reactiveRouteConfig}
                history={history}
                post={post}
              />
            </LazyLoad>
          ))}

          {hasNextPage && !moreLoading && (
            <MorePostsButton
              classes={classes}
              reactiveRouteConfig={reactiveRouteConfig}
              limit={limit}
              pageInfo={pageInfo}
              fetchMore={fetchMore}
              nextPage={nextPage}
              filter={filter}
              setMoreLoading={setMoreLoading}
            >
              <FormattedMessage id="posts_list.load_more_button" />
            </MorePostsButton>
          )}
          {moreLoading && (
            <LinearProgress className={classes.linearProgress} />
          )}
        </List>
      </Fade>
    );
  },
  (prevProps, nextProps) => {},
);

const PostItemBase = ({ post, reactiveRouteConfig }) => (
  <>
    <Divider variant="fullWidth" component="li" />

    <PostListItem
      reactiveRouteConfig={reactiveRouteConfig}
      post={post}
    />
  </>
);

const PostItem = PostItemBase;

export default PostList;
