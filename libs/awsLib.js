import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const fileName = `${Date.now()}-${file.filename}`;
  const fileExt = file.uri.split('ext=');
  const fileType = fileExt[1].toLowerCase();
  console.log('file: ', file);
  console.log('fileName: ', fileName);
  console.log('fileExt: ', fileExt);
  console.log('fileType: ', fileType);

  const stored = await Storage.vault.put(fileName, file.uri, {
    contentType: fileType
  });
  return stored.key;
}