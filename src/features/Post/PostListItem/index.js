import React from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Box,
  Fade,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import {
  makeStyles,
  lighten,
  darken,
} from '@material-ui/core/styles';

import {
  Avatar,
  Subtitle,
  Title,
  Location,
  PublishedTime,
  Status,
  TagChip,
  TypeChip,
  Date,
} from '../../Shared/Elements';
import {
  contentDrawer,
  routeConfig,
} from '../../../constants/globalVars';
import { Comment } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    '& > *': {
      padding: theme.spacing(1),
    },
    padding: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer',
      backgroundColor:
        theme.palette.type === 'dark'
          ? lighten(theme.palette.background.default, 0.08)
          : darken(theme.palette.background.default, 0.02),
    },
  },
  post: {
    display: 'flex',
  },
  postEnd: {
    textAlign: 'right',
  },
  comments: {
    color: theme.palette.text.primary,
  },
}));

const PostListItem = ({ post, preview, session }) => {
  const classes = useStyles();
  const {
    title,
    subtitle,
    tags,
    parent,
    location,
    featured,
    types,
    publishedAt,
    commentCount,
    commentsEnabled,
    status,
    image,
    slug,
    dates,
  } = post;

  console.log(post);

  const { type, routes } = routeConfig();

  return (
    <Fade in timeout={400}>
      <Grid
        onClick={(e) => {
          e.stopPropagation();
          window.history.pushState(
            null,
            null,
            `${routes.base}/${slug}`,
          );
          !contentDrawer().show &&
            contentDrawer({ show: true, slug: slug });
        }}
        className={classes.root}
        container
        spacing={1}
        direction="row"
      >
        <Grid item xs={8} className={classes.post}>
          <Avatar image={image || parent?.image} title={title} />
          <Box>
            {parent && (
              <>
                <Subtitle text={subtitle || parent?.title} />
                <br />
              </>
            )}

            <Title title={title} />
            <br />
            {type === 'event' && <Date dates={dates} />}

            <Box mt={1}>
              {tags &&
                tags.map((tag, index) => (
                  <TagChip tag={tag} key={tag + index} />
                ))}
            </Box>
          </Box>
          <br />
        </Grid>

        <Grid item xs={4} className={classes.postEnd}>
          <Location location={location} />
          <Grid item>
            {featured && (
              <>
                <TypeChip featured={featured} />
                <br />
              </>
            )}
            <TypeChip type={types[0]} />
          </Grid>
          <Grid item>
            {!preview && <PublishedTime time={publishedAt} />}

            {preview && <Status status={status} />}

            {commentsEnabled && commentCount >= 0 && (
              <Link
                className={classes.comments}
                onClick={(e) => e.stopPropagation()}
                to={`/${type}/${slug}#comments`}
              >
                <Tooltip title={`${commentCount} comments`}>
                  <div>
                    <IconButton size="small">
                      <Comment fontSize="small" />
                    </IconButton>
                    {commentCount}
                  </div>
                </Tooltip>
              </Link>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fade>
  );
};

export default PostListItem;
