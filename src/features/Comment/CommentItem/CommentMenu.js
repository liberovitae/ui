import React from 'react';
import Create from '@material-ui/icons/Create';
import Report from '@material-ui/icons/Report';
import LinkIcon from '@material-ui/icons/Link';
import Delete from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import { CopyToClipboard } from 'react-copy-to-clipboard';

const ITEM_HEIGHT = 48;

const CommentMenu = ({
  anchorEl,
  menuOpen,
  //   handleCopy,
  handleClose,
  //   handleEdit,
  //   handleReport,
  //   handleDeleteModal,
  session,
  comment,
}) => (
  <Menu
    id="long-menu"
    anchorEl={anchorEl}
    open={menuOpen}
    onClose={handleClose}
    PaperProps={{
      style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        width: 200,
      },
    }}
  >
    {/* <CopyToClipboard
      text={window.location.origin + comment.permalink}
      onCopy={handleCopy}
    > */}
    {/* <MenuItem onClick={handleClose}>
      <LinkIcon fontSize="small" /> Copy URL
    </MenuItem> */}
    {/* </CopyToClipboard> */}
    {/* {session && (
      <MenuItem onClick={handleReport}>
        <Report fontSize="small" /> Report Comment
      </MenuItem>
    )} */}

    {/* {comment.author.id === session.me.id && !comment.deleted && (
      <span>
        <MenuItem onClick={(e) => handleEdit(e, comment._id)}>
          <Create fontSize="small" /> Edit Comment
        </MenuItem>
        <MenuItem onClick={(e) => handleDeleteModal(e, comment)}>
          <Delete fontSize="small" />
          Delete Comment
        </MenuItem>
      </span>
    )} */}
  </Menu>
);

export default CommentMenu;
