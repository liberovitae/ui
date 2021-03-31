import React from 'react';
import BlogListItem from '../Blog/BlogListItem';
import { useReactiveVar } from '@apollo/client';
import { hideBlog, routeConfig } from '../../constants/globalVars';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Close } from '@material-ui/icons';
import { objCompare } from '../../helpers';
const useStyles = makeStyles({
  closeButton: {
    float: 'right',
    marginTop: '-35px',
    top: '50px',
    right: '5px',
  },
});

const Blog = ({ session, blogs }) => {
  const classes = useStyles();
  const reactiveSearch = useReactiveVar(routeConfig().searchVar);

  if (
    objCompare(reactiveSearch, routeConfig().INITIAL_SEARCH_STATE)
  ) {
    return (
      <div id="blog">
        <IconButton
          title="Hide blog posts"
          size="small"
          className={classes.closeButton}
          onClick={() => {
            session?.me
              ? localStorage.setItem('hideBlog', true)
              : hideBlog(true);

            const blog = document.getElementById('blog');
            blog.style.display = 'none';
          }}
        >
          <Close fontSize="small" />
        </IconButton>

        {blogs.map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }

  return '';
};

export default Blog;
