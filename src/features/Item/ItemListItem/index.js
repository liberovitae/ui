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
} from '../../Shared/Elements';
import { useReactiveVar } from '@apollo/client';
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
  const reactiveRouteConfig = useReactiveVar(routeConfig);
  const {
    title,
    name,
    subtitle,
    tags,
    company,
    location,
    featured,
    types,
    publishedAt,
    status,
    logo,
    slug,
  } = item;

  return (
    <Fade in timeout={400}>
      <Grid
        onClick={(e) => {
          e.stopPropagation();
          window.history.pushState(
            null,
            null,
            `${reactiveRouteConfig.routes.base}/${slug}`,
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
          <Avatar logo={logo || company?.logo} name={name} />
          <Box>
            {reactiveRouteConfig.type === 'job' && (
              <>
                <Subtitle text={subtitle || company?.name} />
                <br />
              </>
            )}

            <Title title={title} />
            <br />

            <Box mt={reactiveRouteConfig.type === 'job' ? 1 : 2}>
              {tags &&
                tags.map((tag) => (
                  <TagChip tag={tag} key={slug + tag} />
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
