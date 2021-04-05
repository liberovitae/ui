import React from 'react';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
const EmojiPicker = ({
  handleEmojiPicker,
  addEmoji,
  stopPropagation,
}) => (
  <ClickAwayListener onClickAway={handleEmojiPicker}>
    <Paper
      elevation={10}
      // style={{
      //   position: 'absolute',
      //   right: '5px',
      //   zIndex: 1500
      // }}
    >
      <Picker
        emojiTooltip={true}
        emoji={false}
        perLine={7}
        onClick={(emoji, event) => {
          stopPropagation(event);
        }}
        onSelect={addEmoji}
        title={false}
      />
    </Paper>
  </ClickAwayListener>
);

export default EmojiPicker;
