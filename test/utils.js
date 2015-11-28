/* eslint "no-unused-expressions": 0 */

import { expect } from 'chai';
import { isLinkValid } from '../common/utils/functions';

describe('utils', () => {
  const multipleQueryStringUrl = 'http://www.youtube.com/watch?v=abc123&feature=index';
  const vIdUrl = 'https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0';
  const shortYoutubeUrl = 'http://youtu.be/0zM3nApSvMg';
  const googleUrl = 'https://google.com';
  const regularUrl = 'https://www.youtube.com/watch?v=mbyG85GZ0PI';
  const embedUrl = 'http://www.youtube.com/embed/mbyG85GZ0PI?rel=0';

  describe('valid urls', () => {
    describe('youtube links', () => {
      it('handles multiple query strings', () => {
        expect(isLinkValid(multipleQueryStringUrl)).to.be.ok;
      });

      it('handles /v/id style links', () => {
        expect(isLinkValid(vIdUrl)).to.be.ok;
      });

      it('handles youtu.be/id links', () => {
        expect(isLinkValid(shortYoutubeUrl)).to.be.ok;
      });

      it('should not handle google links', () => {
        expect(isLinkValid(googleUrl)).to.not.be.ok;
      });

      it('handles regular single query string links', () => {
        expect(isLinkValid(regularUrl)).to.be.ok;
      });

      it('handles embed links', () => {
        expect(isLinkValid(embedUrl)).to.be.ok;
      });
    });
  });

});
