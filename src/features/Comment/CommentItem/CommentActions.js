import React from 'react';
import {
  Typography,
  Fade,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import { ExpandMore, MoreVert, Reply } from '@material-ui/icons';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import VoteButtons from './CommentVoteButtons';
import CommentMenu from './CommentMenu';

const styles = (theme) => ({
  card: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },

  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  collapse: {
    width: '100%',
  },
});

const CommentActions = ({
  classes,
  comment,
  session,
  toggleReplies,
  handleReply,
  handleMenuClick,
  handleDelete,
  handleClose,
  anchorEl,
  menuOpen,
  collapse,
  handleEdit,
}) => (
  <div align="right">
    {comment?.children?.length > 0 && (
      <span>
        {collapse[comment.slug] && (
          <Fade in timeout={300}>
            <Typography
              style={{ display: 'unset' }}
              variant="caption"
              component="span"
            >
              Hiding {comment?.children?.length} replies
            </Typography>
          </Fade>
        )}
        <Tooltip title="Show/hide replies">
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: !collapse[comment.slug],
            })}
            onClick={(e) => toggleReplies(e, comment.slug)}
            aria-expanded={collapse[comment.slug]}
            aria-label="Show/hide replies"
          >
            <ExpandMore />
          </IconButton>
        </Tooltip>
      </span>
    )}
    {session?.me && !comment.deleted && (
      <Tooltip
        title={`Reply to ${comment.author.username}'s comment`}
      >
        <IconButton onClick={handleReply}>
          <Reply fontSize="small" />
        </IconButton>
      </Tooltip>
    )}

    {session?.me && (
      <>
        <Tooltip title="More">
          <IconButton
            aria-label="More"
            aria-owns={menuOpen ? 'comment-menu' : null}
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
        <CommentMenu
          //   handleEdit={handleEdit}
          anchorEl={anchorEl}
          menuOpen={menuOpen}
          handleClose={handleClose}
          session={session}
          handleDelete={handleDelete}
          comment={comment}
        />
      </>
    )}
  </div>
);

export default withStyles(styles)(CommentActions);
