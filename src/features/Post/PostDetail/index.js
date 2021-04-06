import React, { useState, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import { LocationOn } from '@material-ui/icons';
import {
  Grid,
  Hidden,
  Button,
  Box,
  IconButton,
  Collapse,
  Fade,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import isEmail from 'validator/es/lib/isEmail';
import {
  Avatar,
  TagChip,
  Title,
  Location,
  TypeChip,
  SocialLinks,
  Subtitle,
  Tagline,
  Status,
  PublishedTime,
  Tooltip,
  Date,
} from '../../Shared/Elements';
import { useAnalytics } from 'use-analytics';

const PostMap = React.lazy(() => import('../../Shared/Elements/Map'));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    margin: 'auto',
  },
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  postContent: {
    justifyContent: 'flex-start',
    display: 'flex',
    alignSelf: 'flex-start',
  },
  typeChips: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  parentLinks: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 0,
  },
  title: {
    textAlign: 'left',
    display: 'inline-grid',
    alignItems: 'stretch',
  },
  applyButton: {
    width: '100%',
    marginBottom: '1rem',
  },
  saveButton: {
    width: '100%',
  },
  largeButtons: {
    marginTop: '2rem',
  },
}));

const PostDetail = React.memo(
  ({ post, preview, type, session, reactiveRouteConfig }) => {
    const classes = useStyles();
    const { track } = useAnalytics();

    const [showMap, setShowMap] = useState(false);
    const {
      title,
      subtitle,
      tags,
      text,
      parent,
      location,
      tagline,
      featured,
      types,
      publishedAt,
      status,
      image,
      url,
      slug,
      dates,
    } = post;

    const urlIsEmail = isEmail(url);

    return (
      <Fade in>
        <Grid
          className={classes.root}
          container
          spacing={2}
          align="center"
          justify="center"
          alignItems="center"
        >
          {preview && (
            <Grid item xs={12}>
              <Title title={title} />
              <br />
              <Location location={location} />
            </Grid>
          )}

          <Grid item xs={6} sm={6} className={classes.typeChips}>
            {featured && (
              <span style={{ marginRight: '0.5rem' }}>
                <TypeChip featured={featured} />
              </span>
            )}
            <TypeChip text={types[0]} />
          </Grid>
          <Grid
            item
            xs={6}
            sm={6}
            className={classes.parentLinks}
          ></Grid>

          <Grid item xs={12} sm={8} className={classes.postContent}>
            <Avatar
              name={title || parent?.title}
              image={image || parent?.image}
            />

            <Grid item xs={12} className={classes.title}>
              <Subtitle text={subtitle || parent?.title} />
              {post?.dates?.start && post?.dates?.end && (
                <Date dates={dates} />
              )}
              <br />

              <Tagline tagline={tagline || parent?.tagline} />
            </Grid>
            {location.lat && location.lon && (
              <Grid item xs={2}>
                <IconButton
                  onClick={() => setShowMap(!showMap)}
                  title="Show on map"
                >
                  <LocationOn />
                </IconButton>
              </Grid>
            )}
          </Grid>

          <Hidden xsDown>
            <Grid item xs={12} sm={4}>
              <Tooltip type={type} url={url}>
                <a
                  target="_blank"
                  href={
                    status === 'published'
                      ? urlIsEmail
                        ? `mailto:${url}`
                        : `//${url}`
                      : null
                  }
                >
                  <Button
                    disabled={
                      (!preview && status !== 'published') || !url
                    }
                    className={classes.applyButton}
                    color="primary"
                    variant="contained"
                    size="small"
                    onClick={() =>
                      track('visitClick', { slug, type })
                    }
                  >
                    {type === 'job' && (
                      <FormattedMessage id="job_detail.apply_button" />
                    )}

                    {type !== 'job' && urlIsEmail && (
                      <FormattedMessage
                        id="post_detail.contact_button"
                        values={{ type }}
                      />
                    )}

                    {type !== 'job' && !urlIsEmail && (
                      <FormattedMessage id="post_detail.visit_button" />
                    )}
                  </Button>
                </a>
              </Tooltip>

              <Link
                to={
                  status === 'published'
                    ? `/${type}/save/${slug}`
                    : '#'
                }
              >
                <Button
                  disabled={!preview && status !== 'published'}
                  className={classes.saveButton}
                  color="primary"
                  variant="outlined"
                  size="small"
                >
                  {type === 'job' && (
                    <FormattedMessage id="job_detail.apply_later_button" />
                  )}

                  {type !== 'job' && (
                    <FormattedMessage
                      id="post_detail.save_later_button"
                      values={{ type: type }}
                    />
                  )}
                </Button>
              </Link>
              {!preview && (
                <Box textAlign="right" m={2}>
                  <PublishedTime time={publishedAt} />
                </Box>
              )}
              {preview && (
                <Box textAlign="right" m={2}>
                  <Status status={status} />
                </Box>
              )}
            </Grid>
          </Hidden>

          <Grid item xs={12} sm={12}>
            {location.lat && location.lon && (
              <Suspense fallback={<div />}>
                <Collapse in={showMap}>
                  <PostMap position={location} />
                </Collapse>
              </Suspense>
            )}

            <Box textAlign="left">{renderHTML(text)}</Box>
          </Grid>
          <Grid className={classes.largeButtons} item xs={12} sm={12}>
            <Tooltip type={type} url={url}>
              <a
                target="_blank"
                href={
                  status === 'published'
                    ? urlIsEmail
                      ? `mailto:${url}`
                      : `//${url}`
                    : null
                }
              >
                <Button
                  disabled={
                    (!preview && status !== 'published') || !url
                  }
                  className={classes.applyButton}
                  color="primary"
                  variant="contained"
                  size="small"
                >
                  {type === 'job' && (
                    <FormattedMessage id="job_detail.apply_button" />
                  )}

                  {type !== 'job' && urlIsEmail && (
                    <FormattedMessage
                      id="post_detail.contact_button"
                      values={{ type: type }}
                    />
                  )}

                  {type !== 'job' && !urlIsEmail && (
                    <FormattedMessage id="post_detail.visit_button" />
                  )}
                </Button>
              </a>
            </Tooltip>

            <Link
              to={
                status === 'published' && slug
                  ? `/${type}/save/${slug}`
                  : '#'
              }
            >
              <Button
                disabled={!preview && status !== 'published'}
                className={classes.saveButton}
                color="primary"
                variant="outlined"
                size="small"
              >
                {type === 'job' && (
                  <FormattedMessage id="job_detail.apply_later_button" />
                )}

                {type !== 'job' && (
                  <FormattedMessage
                    id="post_detail.save_later_button"
                    values={{ type: type }}
                  />
                )}
              </Button>
            </Link>
          </Grid>
          <Grid align="left" item xs={12} sm={12}>
            Tags:{' '}
            {tags &&
              tags.map((tag, index) => (
                <TagChip tag={tag} key={tag + index} />
              ))}
          </Grid>
        </Grid>
      </Fade>
    );
  },
  (prevProps, nextProps) => {
    if (prevProps.post === nextProps.post) return true;
    return false;
  },
);

export default PostDetail;
