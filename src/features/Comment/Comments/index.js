import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_PAGINATED_COMMENTS } from '../queries';
import CommentForm from '../CommentForm';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import AuthBlock from './AuthBlock';
import Comment from '@material-ui/icons/Comment';
import CommentList from './CommentsList';
// import { getNestedChildren } from "../../../util/comments";
// import DeleteModal from '../../shared/delete_modal';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Comments = ({ postId, session }) => {
  const { data, loading, error } = useQuery(GET_PAGINATED_COMMENTS, {
    skip: !postId,
    variables: { postId: postId, limit: 20 },
  });

  useEffect(() => {
    if (window.location?.hash) {
      const element = document.querySelector(window.location.hash);
      const topPos =
        element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: topPos, // scroll so that the element is at the top of the view
        behavior: 'smooth', // smooth scroll
      });
    }
  }, [data]);

  //   const handleDeleteModal = (e, comment) => {
  //     this.setState((state) => ({
  //       modalOpen: !state.modalOpen,
  //       comment: comment,
  //     }));
  //     // this.handleClose();
  //   };

  //   const handleReport = (e) => {
  //     this.handleClose(e);
  //     this.stopPropagation(e);
  //   };

  //   const handleVote = (e, comment, val) => {
  //     e.preventDefault();
  //     this.stopPropagation(e);
  //     this.props.voteComment(comment.post_id, comment._id, val);
  //   };

  //   const handleDelete = (e, id) => {
  //     e.preventDefault();
  //     this.props.deleteComment(id);
  //     // this.handleClose();
  //     this.setState({ modalOpen: false });
  //   };

  //   const handleEdit = (postId, comment_id, text) => {
  //     this.props.editComment(
  //       this.props.comment.post_id,
  //       comment_id,
  //       text,
  //     );
  //     this.setState({ editing: '' });
  //   };

  //   const handleCopy = () => {
  //     this.props.enqueueSnackbar('Copied URL to clipboard');
  //   };

  // Sort comments into hiearchy with children
  // let commentsSorted = getNestedChildren(comments);

  // Limit the amount of comments shown on card drop down and collapse child comments on render
  // let collapse;
  // if (limit) {
  //   commentsSorted = commentsSorted.slice(0, 5);
  //   collapse = true;
  // }

  if (data) {
    const { comments } = data;

    console.log(session);

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
            //   postAuthor={post.author.username}
            //   handleVote={handleVote}
            //   handleDeleteModal={handleDeleteModal}
            //   handleReport={handleReport}
            // collapse={collapse}
            //   deleteComment={this.props.deleteComment}
            //   voteComment={this.props.voteComment}
            // currentUserId={session?.me?.id}
            session={session}
            comments={comments.edges}
            //   isLoggedIn={currentUser.isAuthenticated}
            //   handleCopy={handleCopy}
          />
          {/* {commentCount !== 0 && limit && (
          <div align="center">
            <Link to={post.permalink}>
              <Button>
                <Typography variant="caption" color="textSecondary">
                  Showing {comments.length} of {commentCount} comments
                </Typography>
              </Button>
            </Link>
          </div>
        )} */}
        </CardContent>
        {/* <DeleteModal
        content={comment}
        open={this.state.modalOpen}
        handleDelete={handleDelete}
        handleDeleteModal={handleDeleteModal}
      /> */}
        {/* //<Report
        //   post={comment}
        //   postType="comment"
        //   handleReport={this.handleReport}
        //   open={this.state.reportOpen}
        // /> */}
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
