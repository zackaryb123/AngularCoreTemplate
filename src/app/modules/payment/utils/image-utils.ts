// Example Usage
// const imageBlob = this.dataURItoBlob(compressedImageUri.split(',')[1]);
export function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const int8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    int8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([int8Array], { type: 'image/jpeg' });
}

export function webCamURItoFile(dataUri, name) {
  const arr = dataUri.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], name, { type: mime });
}

export function downloadFile(imageUri, fileName) {
  const link = document.createElement('a');
  link.href = imageUri;
  link.download = fileName;
  link.click();
  link.remove();
}
