import { client } from '../index';
import { UPLOAD_FILE_MUTATION } from '../features/Upload/queries';

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          const toBase64 = (file) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });

          return toBase64(file).then((cFile) => {
            return client
              .mutate({
                mutation: UPLOAD_FILE_MUTATION,
                variables: { file: file },
              })
              .then(({ data }) => {
                if (data.uploadFile) {
                  this.loader.uploaded = true;
                  resolve({
                    default: data.uploadFile,
                  });
                } else {
                  reject(`Couldn't upload file: ${file.name}.`);
                }
              });
          });
        }),
    );
  }
}

export default function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (
    loader,
  ) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(loader);
  };
}
