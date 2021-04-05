import React, { useState } from 'react';
import CommentInput from './CommentInput';
import JSEMOJI from 'emoji-js';
import { useMutation } from '@apollo/client';
import { CREATE_COMMENT, GET_PAGINATED_COMMENTS } from '../queries';
import { GET_POST } from '../../Post/queries';
//emoji set up
let jsemoji = new JSEMOJI();
// set the style to emojione (default - apple)
jsemoji.img_set = 'emojione';
jsemoji.include_title = true;
jsemoji.replace_mode = 'unified';
jsemoji.allow_native = true;

const CommentForm = ({
  autoFocus,
  parentId,
  postId,
  placeholderText,
  handleReply,
}) => {
  console.log(parentId);
  const [state, setState] = useState({});

  const [createComment, { data, loading, error }] = useMutation(
    CREATE_COMMENT,
    {
      variables: {
        input: state,
        postId: postId,
        parentId: parentId,
      },
      refetchQueries: [
        {
          query: GET_PAGINATED_COMMENTS,
          variables: { limit: 20, postId: postId },
        },
      ],
    },
  );

  const handleChange = (e) => {
    setState({
      text: e.target.value,
    });
  };
  const addEmoji = (emoji, event) => {
    let emojiPic = jsemoji.replace_colons(`${emoji.colons}`);
    setState({
      text: this.state.text + emojiPic,
    });
  };

  const handleEmojiPicker = (e) => {
    const { currentTarget } = e;

    setState((state) => ({
      showEmojiPicker: !state.showEmojiPicker,
      anchorEl: currentTarget,
    }));
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e, e.target.value);
    handleReply && handleReply(e);
    createComment();
    setState({ text: '' });

    // if (this.state.parentId) {
    //   this.props.handleReply(e);
    //   this.props.expandOnReply();
    // }
    // // If we already have a comment ID then edit comment else new comment
    // if (this.state.id) {
    //   this.props.editComment(this.props.postId, this.state.id, this.state.text);
    // } else {
    //   this.props.newComment(
    //     this.props.postId,
    //     this.state.text,
    //     this.props.parentId,
    //     this.props.parentAuthor
    //   );
    //   this.setState({
    //     text: "",
    //     id: "",
    //   });
    //   if (!this.props.newComment) {
    //     this.props.handleClose(e);
    //   }
    // }
  };

  const { showEmojiPicker, text, anchorEl } = state;

  return (
    <CommentInput
      placeholderText={placeholderText}
      text={text}
      //   emojiPicker={emojiPicker}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      //   handleEmojiPicker={handleEmojiPicker}
      //   addEmoji={addEmoji}
      //   showEmojiPicker={showEmojiPicker}
      autoFocus={autoFocus}
      //   anchorEl={anchorEl}
    />
  );
};

export default CommentForm;
