import React from 'react';
import { IconButton } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import TagFaces from '@material-ui/icons/TagFaces';
import { withStyles } from '@material-ui/core/styles';
// import EmojiPicker from './emoji_picker';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import Popper from '@material-ui/core/Popper';
import Tooltip from '@material-ui/core/Tooltip';

const styles = (theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 0,
    width: '100%',
  },
  fileUploader: {
    width: '20%',
  },
});

const CommentInput = ({
  classes,
  text,
  handleChange,
  showEmojiPicker,
  handleEmojiPicker,
  addEmoji,
  autoFocus,
  placeholderText,
  handleSubmit,
  anchorEl,
}) => (
  <React.Fragment>
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Input
        onKeyPress={(e) => {
          if (e.ctrlKey) {
            handleSubmit(e);
          }
        }}
        required
        multiline
        rowsMax={10}
        autoFocus={autoFocus}
        placeholder={placeholderText}
        className={classes.textField}
        value={text}
        onChange={handleChange}
        endAdornment={
          <InputAdornment>
            <Tooltip title="Submit">
              <IconButton type="submit">
                <Send fontSize="small" />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }
      />
      <div style={{ display: 'inline-flex' }}>
        <Tooltip title="Emoji picker">
          <IconButton onClick={handleEmojiPicker}>
            <TagFaces fontSize="small" />
          </IconButton>
        </Tooltip>
      </div>
    </form>
    {/* {showEmojiPicker && (
      <Popper
        open={showEmojiPicker}
        placement="right-start"
        anchorEl={anchorEl}
        transition
      >
        <EmojiPicker
          stopPropagation={stopPropagation}
          addEmoji={addEmoji}
          handleEmojiPicker={handleEmojiPicker}
        />
      </Popper>
    )} */}
  </React.Fragment>
);

export default withStyles(styles)(CommentInput);
