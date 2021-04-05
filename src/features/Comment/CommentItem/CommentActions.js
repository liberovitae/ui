import React from 'react';
import Reply from '@material-ui/icons/Reply';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import VoteButtons from './CommentVoteButtons';
import CommentMenu from './CommentMenu';
import Tooltip from '@material-ui/core/Tooltip';

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
    // marginLeft: 'auto',
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
  //   handleVote,
  toggleReplies,
  repliesExpanded,
  handleReply,
  handleMenuClick,
  //   handleDeleteModal,
  handleClose,
  //   handleCopy,
  //   handleReport,
  anchorEl,
  menuOpen,
  collapse,
  handleEdit,
}) => (
  <div align="right">
    {comment?.children?.length > 0 && (
      <span>
        {repliesExpanded && (
          <Fade in timeout={300}>
            <span>
              <Typography
                style={{ display: 'unset' }}
                variant="caption"
              >
                Hiding {comment?.children?.length} replies
              </Typography>
            </span>
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
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </span>
    )}
    {session && !comment.deleted && (
      <Tooltip
        title={`Reply to ${comment.author.username}'s comment`}
      >
        <IconButton onClick={handleReply}>
          <Reply fontSize="small" />
        </IconButton>
      </Tooltip>
    )}
    <Tooltip title="More">
      <IconButton
        aria-label="More"
        aria-owns={menuOpen ? 'long-menu' : null}
        aria-haspopup="true"
        onClick={handleMenuClick}
      >
        <MoreVertIcon />
      </IconButton>
    </Tooltip>
    <CommentMenu
      //   handleReport={handleReport}
      //   handleCopy={handleCopy}
      //   handleEdit={handleEdit}
      anchorEl={anchorEl}
      menuOpen={menuOpen}
      handleClose={handleClose}
      session={session}
      //   handleDeleteModal={handleDeleteModal}
      comment={comment}
    />
  </div>
);

export default withStyles(styles)(CommentActions);
