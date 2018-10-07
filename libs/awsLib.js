import { Storage } from "aws-amplify";

export async function s3Upload(file) {
  const fileNameExt = file.uri.split('ImagePicker/');
  const fileNameExtArr = fileNameExt[1].split('.');
  const fileName = `${Date.now()}_${fileNameExt[1]}`;
  const response = await fetch(file.uri);
  const blob = await response.blob();
  const fileType = fileNameExtArr[1].toLowerCase();
  console.log('file: ', file);
  console.log('fileNameExt: ', fileNameExt);
  console.log('fileName: ', fileName);
  console.log('fileType: ', fileType);

  const stored = await Storage.vault.put(
    fileName,
    blob,
    { contentType: fileType }
  );
  return stored.key;
}

export async function s3Delete(file) {
  Storage.vault.remove(file)
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

export async function s3Path(file) {
  const fileURL = await Storage.vault.get(file)
    .then(filePath => {
      console.log('s3Path filePath: ', filePath);
        return filePath;
      } 
    )
    .catch(err => {
      console.log('getImagePath error: ', err);
    });
  console.log('fileURL: ', fileURL);
  return fileURL;
}
