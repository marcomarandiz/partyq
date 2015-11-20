export function isLinkValid(url) {
  // lazy query string parse for vid
  if (url.indexOf('v=') === -1) {
    return false;
  }
  return true;
}
  
export function getVidFromUrl(url) {
  const temp = url.split('v=');
  const vid = temp[1].split('&');
  return vid[0];
}
