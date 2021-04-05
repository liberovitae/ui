import React, { useState } from 'react';
import CommentForm from '../CommentForm';
import Collapse from '@material-ui/core/Collapse';
// import CommentList from '../Comments/CommentsList';
import CommentActions from './CommentActions';
import CommentContent from './CommentContent';
import { withSnackbar } from 'notistack';
import LazyLoad from 'react-lazyload';
import { ClickAwayListener } from '@material-ui/core';

// this.state = {
//     replyOpen: false,
//     reportOpen: false,
//     editing: '',
//     anchorEl: null,
//     modalOpen: false,
//     // Use slug for tracking replies collapse
//     [this.props.comment.slug]: true,
//   };

const CommentItem = ({
  comment,
  //   isCorrectUser,
  //   isLoggedIn,
  //   currentUserId,
  newComment,
  //   handleVote,
  //   handleDeleteModal,
  handleCopy,
  //   postAuthor,
  session,
  collapse,
  setCollapse,
  toggleReplies,
  repliesExpanded,
}) => {
  const [state, setState] = useState({
    editing: '',
    replyOpen: false,
  });

  const handleClickAway = (e) => {
    e.stopPropagation();
    setState({
      editing: '',
      replyOpen: false,
    });
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  // const  componentDidMount() {
  //     if (this.props.comment.children && this.props.collapse) {
  //       this.setState({
  //         [this.props.comment.slug]: false,
  //       });
  //     }
  //   }

  const handleMenuClick = (e) => {
    stopPropagation(e);
    setState({ anchorEl: e.currentTarget });
  };

  const handleReply = (e) => {
    stopPropagation(e);
    setState((state) => ({ replyOpen: !state.replyOpen }));
  };

  const handleClose = (e) => {
    e && stopPropagation(e);

    setState({ anchorEl: null });
  };

  const initializeEditComment = (e, commentId) => {
    stopPropagation(e);
    setState({ editing: commentId, anchorEl: null });
  };

  const expandOnReply = () => {
    setState({
      [comment.slug]: true,
    });
  };

  toggleReplies = (e) => {
    stopPropagation(e);
    setCollapse((state) => ({
      [comment.slug]: !state[comment.slug],
    }));
  };

  const { anchorEl, replyOpen } = state;
  const menuOpen = Boolean(anchorEl);

  // Set comment border colour on depth
  for (var i = 0; i < comment.depth; i++) {
    var comcol = i % 5;
  }

  return (
    <div
      style={{
        marginLeft: 4 * comment.depth,
      }}
    >
      <div className={`cd-${comcol}`}>
        <div onClick={comment.children && toggleReplies}>
          <CommentContent
            //   postAuthor={postAuthor.username}
            //   currentUserId={currentUserId}
            comment={comment}
            // toggleReplies={this.toggleReplies}
            editing={state.editing}
            // handleEdit={handleEdit}
            //   stopPropagation={stopPropagation}
          />

          <div>
            <CommentActions
              // handleCopy={handleCopy}
              repliesExpanded={repliesExpanded}
              toggleReplies={toggleReplies}
              handleReply={handleReply}
              //   handleReport={handleReport}
              handleMenuClick={handleMenuClick}
              handleClose={handleClose}
              //   handleEdit={initializeEditComment}
              menuOpen={menuOpen}
              comment={comment}
              anchorEl={anchorEl}
              session={session}
              collapse={collapse}
              //   handleVote={handleVote}
              //   handleDeleteModal={handleDeleteModal}
            />
          </div>
        </div>
        {session && (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Collapse
              in={replyOpen}
              timeout="auto"
              mountOnEnter
              unmountOnExit
            >
              <CommentForm
                onClick={(e) => stopPropagation(e)}
                handleReply={handleReply}
                autoFocus={true}
                placeholderText={`Replying to ${
                  comment.author.username
                }: "${comment.text.slice(0, 50)}"...`}
                parentId={comment.id}
                postId={comment.postId}
                expandOnReply={expandOnReply}
              />
            </Collapse>
          </ClickAwayListener>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
