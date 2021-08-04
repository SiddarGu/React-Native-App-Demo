export const fetchFileExtention = fileName => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2);
};
