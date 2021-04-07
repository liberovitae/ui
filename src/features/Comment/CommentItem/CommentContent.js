import React from 'react';
import {
  Fade,
  Tooltip,
  ListItemText,
  CardContent,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentForm from '../CommentForm';
import UserChip from './CommentUserChip';
import { PublishedTime } from '../../Shared/Elements';
import { Edit } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    paddingLeft: 0,
    paddingRight: 0,
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
  commentContent: {
    fontSize: '0.5rem !important',
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '0.25rem',
  },
  link: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  editedAt: {
    display: 'inline-flex',
  },
  activeUpvote: {
    color: '#00b400',
  },

  activeDownvote: {
    color: 'darkorange',
  },
  opIcon: {
    fontSize: '1rem',
    verticalAlign: 'sub',
    marginRight: '5px',
    marginLeft: '5px',
  },
}));

const CommentContent = ({
  comment,
  toggleReplies,
  editing,
  handleEdit,
}) => {
  const classes = useStyles();

  return (
    <CardContent onClick={toggleReplies} className={classes.card}>
      <div style={{ paddingLeft: '10px', width: '100%' }}>
        <div className={classes.commentContent}>
          <UserChip
            //   avatar={comment.author.profileImage}
            username={comment.author.username}
          />

          <PublishedTime time={comment.createdAt} />

          {comment.updatedAt && (
            <Tooltip
              enterTouchDelay={0}
              title={
                <React.Fragment>
                  Last edited:{' '}
                  {/* <Moment format="dddd, MMMM Do YYYY, HH:mm:ss">
                  {comment.updatedAt}
                </Moment> */}
                </React.Fragment>
              }
            >
              <EditIcon className={classes.opIcon} />
            </Tooltip>
          )}
        </div>
        {comment.id === editing ? (
          <CommentForm
            autoFocus={true}
            // editComment={handleEdit}
            commentId={comment.id}
            text={comment.text}
            id={comment.id}
          />
        ) : (
          <div id={comment.id}>
            {comment.deleted ? (
              <Fade unmountOnExit in timeout={500}>
                <ListItemText>
                  <Tooltip enterTouchDelay={0}>
                    <em>{comment.text}</em>
                  </Tooltip>
                </ListItemText>
              </Fade>
            ) : (
              <Fade unmountOnExit in timeout={500}>
                <ListItemText>{comment.text}</ListItemText>
              </Fade>
            )}
          </div>
        )}
      </div>
    </CardContent>
  );
};

export default CommentContent;
