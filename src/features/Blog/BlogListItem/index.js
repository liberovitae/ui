import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Avatar, Fade } from '@material-ui/core';
import {
  makeStyles,
  useTheme,
  lighten,
  darken,
} from '@material-ui/core/styles';
import BlogTitle from './BlogTitle';
import { Subtitle } from '../../Shared/Elements';
import { ReactComponent as Logo } from '../../../logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
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
  avatar: {
    border: `1px ${theme.palette.primary.light} solid`,
    backgroundColor: 'transparent',
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(1.5),
    marginTop: theme.spacing(1),
  },
  container: {
    display: 'flex',
  },
  itemEnd: {
    placeSelf: 'flex-end',
    paddingBottom: '1rem',
    paddingRight: '0.5rem',
    textAlign: 'right',
  },
  logo: {
    height: '15px',
    width: '60px',
    display: 'inline',
  },
}));

const BlogListItem = ({ blog }) => {
  const classes = useStyles();
  const theme = useTheme();

  const { title, subtitle } = blog;

  return (
    <Fade in>
      <Link to={`/blog/${blog.slug}`}>
        <Grid
          className={classes.root}
          container
          spacing={1}
          direction="row"
        >
          <Grid item xs={9} className={classes.container}>
            <Avatar className={classes.avatar}>
              <Logo
                fill={theme.palette.primary.main}
                className={classes.logo}
              />
            </Avatar>
            <Box>
              <BlogTitle title={title} />
              <br />
              <Subtitle text={subtitle} />
            </Box>
          </Grid>

          <Grid item xs={3} className={classes.itemEnd}></Grid>
        </Grid>
      </Link>
    </Fade>
  );
};

export default BlogListItem;
