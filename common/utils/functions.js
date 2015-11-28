const youtubeRegex =
        /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.)?youtube\.com\/(?:watch(?:\.php)?\?.*v=)|v\/|embed\/)([a-zA-Z0-9\-_]+).*/;

export function isLinkValid(url) {
  if (youtubeRegex.test(url)) {
    return true;
  }
  return false;
}

export function getVidFromUrl(url) {
  const match = youtubeRegex.exec(url);

  if (match && match.length >= 1) {
    // Return the first group, which is the youtube id
    return match[1];
  }

  return 'error';
}
