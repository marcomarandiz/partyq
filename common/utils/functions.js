module.exports = {
  linkIsValid: function(url) {
    // lazy query string parse for vid
    if (url.indexOf('v=') === -1) {
      return false;
    }
    return true;
  },
  getVidFromUrl: function(url) {
    const temp = url.split('v=');
    const vid = temp[1].split('&');
    return vid[0];
  }
};
