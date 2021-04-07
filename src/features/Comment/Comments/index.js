import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PAGINATED_COMMENTS, DELETE_COMMENT } from '../queries';
import { Typography, CardContent } from '@material-ui/core';
import AuthBlock from './AuthBlock';
import { Comment } from '@material-ui/icons';
import CommentList from './CommentsList';
import CommentForm from '../CommentForm';

const Comments = ({ postId, session }) => {
  const { data, loading, error } = useQuery(GET_PAGINATED_COMMENTS, {
    skip: !postId,
    variables: { postId: postId, limit: 20 },
  });

  const [deleteComment, { client }] = useMutation(DELETE_COMMENT, {
    refetchQueries: [
      {
        query: GET_PAGINATED_COMMENTS,
        variables: { postId, limit: 20 },
      },
    ],
  });

  useEffect(() => {
    if (window.location?.hash) {
      const scroller =
        document.getElementById('contentDrawer') || window;

      const element = document.querySelector(window.location.hash);

      const topPos =
        element.getBoundingClientRect().top + window.pageYOffset;

      console.log(topPos);

      scroller.scrollTo({
        top: topPos, // scroll so that the element is at the top of the view
        behavior: 'smooth', // smooth scroll
      });
    }
  }, []);

  //   const handleVote = (e, comment, val) => {
  //     e.preventDefault();
  //     this.stopPropagation(e);
  //     this.props.voteComment(comment.post_id, comment._id, val);
  //   };

  const handleDelete = (e, id) => {
    e.preventDefault();
    const r = window.confirm(
      'Are you sure you want to delete this comment?',
    );
    if (r === true) {
      deleteComment({
        variables: { id },
      });
    } else {
      return false;
    }
  };

  //   const handleEdit = (postId, comment_id, text) => {
  //     this.props.editComment(
  //       this.props.comment.post_id,
  //       comment_id,
  //       text,
  //     );
  //     this.setState({ editing: '' });
  //   };

  if (data) {
    const { comments } = data;

    return (
      <>
        <Typography variant="h6" gutterBottom>
          <Comment style={{ verticalAlign: 'sub' }} />{' '}
          {comments.pageInfo.totalDocs}{' '}
          {comments.pageInfo.totalDocs !== 1 ? 'Comments' : 'Comment'}
        </Typography>

        {!session?.me ? (
          <AuthBlock />
        ) : (
          <CommentForm
            placeholderText="Write your comment..."
            postId={postId}
          />
        )}

        <CardContent style={{ padding: 0 }}>
          <CommentList
            handleDelete={handleDelete}
            session={session}
            comments={comments.edges}
          />
        </CardContent>
      </>
    );
  }

  if (!session?.me) return <AuthBlock />;

  return (
    <CommentForm
      placeholderText="Write your comment..."
      postId={postId}
    />
  );
};

export default Comments;
