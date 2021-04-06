import React from 'react';
import { MenuItem, Menu } from '@material-ui/core';
import { Create, Delete } from '@material-ui/icons';

const CommentMenu = ({
  anchorEl,
  menuOpen,
  handleClose,
  handleEdit,
  handleDelete,
  session,
  comment,
}) => (
  <Menu
    id="comment-menu"
    anchorEl={anchorEl}
    open={menuOpen}
    onClose={handleClose}
  >
    {session?.me?.id === comment.author.id && !comment.deleted && (
      <span onClick={handleClose}>
        <MenuItem onClick={(e) => handleEdit(e, comment._id)}>
          <Create
            style={{ marginRight: '0.25rem' }}
            fontSize="small"
          />{' '}
          Edit Comment
        </MenuItem>
        <MenuItem onClick={(e) => handleDelete(e, comment.id)}>
          <Delete
            style={{ marginRight: '0.25rem' }}
            fontSize="small"
          />
          Delete Comment
        </MenuItem>
      </span>
    )}
  </Menu>
);

export default CommentMenu;
