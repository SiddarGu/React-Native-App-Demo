export const removeFirstOccurrence = (str, searchstr) => {
  let index = str.indexOf(searchstr);
  if (index === -1) {
    return str;
  }
  return str.slice(0, index) + str.slice(index + searchstr.length);
};
