const youtubeRegex =
  /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=)([a-zA-Z0-9\-_])/;

export function isLinkValid(url) {
  if (youtubeRegex.test(url)) {
    return true;
  }
  return false;
}

export function getVidFromUrl(url) {
  let vid = null;
  if (!(url.indexOf('v=') === -1)) {
    vid = url.split('v=');
    vid = vid[1].split('&');
    return vid[0];
  } else if (url.indexOf('youtu.be') !== -1) {
    vid = url.split('be/');
    return vid[1];
  }
  return 'error';
}
