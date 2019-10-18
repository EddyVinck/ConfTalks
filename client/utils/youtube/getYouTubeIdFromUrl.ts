// adapted from https://gist.github.com/takien/4077195
// this version returns an empty string if the ID isn't found
function getYouTubeIdFromUrl(url): string {
  let ID = "";
  url = url
    .replace(/(>|<)/gi, "")
    .split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  if (url[2] !== undefined) {
    ID = url[2].split(/[^0-9a-z_\-]/i);
    ID = ID[0];
  }
  return ID;
}

export { getYouTubeIdFromUrl };
