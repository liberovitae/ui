import React from 'react';
import {
  FormLabel,
  FormControl,
  FormHelperText,
} from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import UploadAdapter from '../../../helpers/CKEditorUpload';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  input: {
    width: 0,
    height: 0,
    border: 'none',
    backgroundColor: 'transparent',
  },
}));

const editorConfig = {
  toolbar: [
    'heading',
    '|',
    'bold',
    'italic',
    'link',
    'bulletedList',
    'numberedList',
    'blockQuote',
    'imageUpload',
  ],
  extraPlugins: [UploadAdapter],
  heading: {
    options: [
      {
        model: 'paragraph',
        title: 'Paragraph',
        class: 'ck-heading_paragraph',
      },
      {
        model: 'heading1',
        view: 'h1',
        title: 'Heading 1',
        class: 'ck-heading_heading1',
      },
      {
        model: 'heading2',
        view: 'h2',
        title: 'Heading 2',
        class: 'ck-heading_heading2',
      },
    ],
  },
};

const CKEditorInput = ({
  label,
  id,
  name,
  value,
  onChange,
  required,
  helperText,
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const themeSelect = () => {
    const editorWindowList = window.document.getElementsByClassName(
      'ck-editor',
    );
    const editorContentList = window.document.getElementsByClassName(
      'ck-content',
    );

    const editorContent = editorContentList[0];
    const editorWindow = editorWindowList[0];

    if (theme.palette.type === 'dark') {
      editorWindow?.classList.add('dark');
      editorContent?.classList.add('dark');
    } else {
      editorWindow?.classList.remove('dark');
      editorContent?.classList.remove('dark');
    }
  };

  themeSelect();

  return (
    <FormControl required className={classes.formControl}>
      <FormLabel id={id}>{label}</FormLabel>
      {/* Use a hidden (but not hidden type) input for our form validation */}
      <input
        type="text"
        className={classes.input}
        defaultValue={value}
        name={name}
        id={id}
        required={required}
      />
      <CKEditor
        editor={ClassicEditor}
        config={editorConfig}
        data={value}
        name={name}
        required={required}
        id={id}
        UploadAdapter={UploadAdapter}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.

          // Reset our data after component load
          if (value) {
            editor.setData(value);
          }
          //
          themeSelect();
        }}
        onChange={(e, editor) => {
          const data = editor.getData();
          e.target = {
            name: name,
            value: data,
          };
          onChange(e);
          //
        }}
        onBlur={(e, editor) => {
          //
        }}
        onFocus={(e, editor) => {
          //
        }}
      />
      <FormHelperText variant="filled">{helperText}</FormHelperText>
    </FormControl>
  );
};

export default CKEditorInput;
