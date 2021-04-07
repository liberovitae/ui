import React from 'react';
import {
  ArrowUpward,
  ArrowDownward,
} from '@material-ui/icons/ArrowUpward';
import { IconButton, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  activeUpvote: {
    color: '#00b400',
  },

  activeDownvote: {
    color: 'darkorange',
  },
  upvote: {
    '&:hover': {
      color: '#00b400',
    },
  },
  downvote: {
    '&:hover': {
      color: 'darkorange',
    },
  },
};

const VoteButtons = ({
  classes,
  comment,
  currentUserId,
  handleVote,
}) => (
  <span>
    <Tooltip title="Upvote">
      <IconButton onClick={(e) => handleVote(e, comment, 1)}>
        <ArrowUpward
          className={
            comment.vote.positive.indexOf(currentUserId) >= 0
              ? classes.activeUpvote
              : classes.upvote
          }
          fontSize="small"
        />
      </IconButton>
    </Tooltip>
    <Tooltip title="Downvote">
      <IconButton onClick={(e) => handleVote(e, comment, -1)}>
        <ArrowDownward
          className={
            comment.vote.negative.indexOf(currentUserId) >= 0
              ? classes.activeDownvote
              : classes.downvote
          }
          fontSize="small"
        />
      </IconButton>
    </Tooltip>
  </span>
);

export default withStyles(styles)(VoteButtons);
