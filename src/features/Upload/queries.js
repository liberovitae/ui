import gql from 'graphql-tag.macro';

export const FILES = gql`
  {
    files
  }
`;

export const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file)
  }
`;
