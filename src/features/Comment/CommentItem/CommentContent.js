import React from 'react';
// import Moment from 'react-moment';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import CardContent from '@material-ui/core/CardContent';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CommentForm from '../CommentForm';
import UserChip from './CommentUserChip';
// import Hashtag from '../../misc/hashtag';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import { PublishedTime } from '../../Shared/Elements';
import EditIcon from '@material-ui/icons/Edit';
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
  commentContent: {
    fontSize: '0.5rem !important',
  },
  link: {
    '&:hover': {
      //   color: theme.anchor.main,
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
  currentUserId,
  //   postAuthor,
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
