import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { DropzoneArea } from 'material-ui-dropzone';
import { UPLOAD_FILE_MUTATION } from './queries';

export const Upload = React.memo(
  ({ name, handleFile, logo, initialFiles }) => {
    const [uploadFile, { data, loading, error }] = useMutation(
      UPLOAD_FILE_MUTATION,
    );

    const onDrop = useCallback(
      ([file]) => {
        uploadFile({
          variables: { file },
        }).then(({ data }) => {
          handleFile(name, data.uploadFile);
        });
      },
      [handleFile],
    );

    return (
      <DropzoneArea
        acceptedFiles={['image/*']}
        initialFiles={initialFiles}
        onDrop={onDrop}
        showAlerts={false}
        filesLimit={1}
      />
    );
  },
  (prevState, nextState) => {
    if (prevState.logo !== nextState.logo) return false;

    return true;
  },
);

export default Upload;
