import React from 'react';
import { Grid, Box, Fade } from '@material-ui/core';
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
  item: {
    display: 'flex',
  },
  itemEnd: {
    textAlign: 'right',
  },
}));

const ItemListItem = ({ item, preview, session }) => {
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
    status,
    image,
    slug,
    dates,
  } = item;

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
        <Grid item xs={9} className={classes.item}>
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
            {type === 'event' && <Date listItem dates={dates} />}

            <Box mt={1}>
              {tags &&
                tags.map((tag, index) => (
                  <TagChip tag={tag} key={tag + index} />
                ))}
            </Box>
          </Box>
          <br />
        </Grid>

        <Grid item xs={3} className={classes.itemEnd}>
          <Location location={location} />
          <Box>
            {featured && (
              <>
                <TypeChip featured={featured} />
                <br />
              </>
            )}
            <TypeChip type={types[0]} />

            {!preview && <PublishedTime time={publishedAt} />}
          </Box>

          {preview && <Status status={status} />}
        </Grid>
      </Grid>
    </Fade>
  );
};

export default ItemListItem;
