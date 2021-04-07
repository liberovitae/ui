import React, { useState } from 'react';
import CommentItem from '../CommentItem';
import { Fade } from '@material-ui/core';
import { Collapse } from '@material-ui/core';

const CommentList = ({ comments, session, handleDelete }) => {
  const [collapse, setCollapse] = useState({});

  return comments.map((comment) => {
    return (
      <Fade in timeout={300} key={comment.id}>
        <div>
          <CommentItem
            collapse={collapse}
            setCollapse={setCollapse}
            handleDelete={handleDelete}
            session={session}
            comment={comment}
          />
          {comment?.children?.length > 0 && (
            <Collapse
              timeout="auto"
              mountOnEnter
              unmountOnExit
              key={comment.slug}
              in={!collapse[comment.slug]}
            >
              <CommentList
                collapse={collapse}
                setCollapse={setCollapse}
                handleDelete={handleDelete}
                session={session}
                comments={comment.children}
              />
            </Collapse>
          )}
        </div>
      </Fade>
    );
  });
};
export default CommentList;
