import React, { useState } from 'react';
import CommentForm from '../CommentForm';
import Collapse from '@material-ui/core/Collapse';
import CommentActions from './CommentActions';
import CommentContent from './CommentContent';
import { withSnackbar } from 'notistack';
import LazyLoad from 'react-lazyload';
import { ClickAwayListener } from '@material-ui/core';

const CommentItem = ({
  comment,
  handleDelete,
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
            comment={comment}
            // toggleReplies={this.toggleReplies}
            editing={state.editing}
            // handleEdit={handleEdit}
          />

          <div>
            <CommentActions
              repliesExpanded={repliesExpanded}
              toggleReplies={toggleReplies}
              handleReply={handleReply}
              handleMenuClick={handleMenuClick}
              handleClose={handleClose}
              handleDelete={handleDelete}
              //   handleEdit={initializeEditComment}
              menuOpen={menuOpen}
              comment={comment}
              anchorEl={anchorEl}
              session={session}
              collapse={collapse}
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
