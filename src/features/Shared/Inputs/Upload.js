import React, { useEffect, useState } from 'react';
import { FormLabel, FormControl } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Upload from '../../Upload';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: '100%',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function useAsync(value, onSuccess) {
  useEffect(() => {
    let isMounted = true;
    if (value && isMounted) {
      onSuccess([`${value}`]);
    }
    return () => {
      isMounted = false;
      value = '';
    };
  }, [value, onSuccess]);
}

const UploadInput = React.memo(
  ({ value, name, id, handleFile, label }) => {
    const classes = useStyles();

    const [initialFiles, setInitialFiles] = useState();

    useAsync(value, setInitialFiles);

    return (
      <FormControl className={classes.formControl}>
        <FormLabel id={id}>{label}</FormLabel>

        <Upload
          key={initialFiles}
          initialFiles={initialFiles}
          name={name}
          logo={value}
          handleFile={handleFile}
        />
      </FormControl>
    );
  },
  (prevState, nextState) => {
    if (prevState.value === nextState.value) return true;

    return false;
  },
);

export default UploadInput;
