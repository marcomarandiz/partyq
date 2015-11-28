/* eslint "no-unused-expressions": 0 */

import { expect } from 'chai';
import { isLinkValid } from '../common/utils/functions';

describe('utils', () => {
  describe('valid urls', () => {
    describe('youtube links', () => {
      it('handles multiple query strings', () => {
        const url = 'http://www.youtube.com/watch?v=abc123&feature=index';
        expect(isLinkValid(url)).to.be.ok;
      });

      it('handles /v/id style links', () => {
        const url = 'https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0';

        expect(isLinkValid(url)).to.be.ok;
      });

      it('handles youtu.be/id links', () => {
        const url = 'http://youtu.be/0zM3nApSvMg';

        expect(isLinkValid(url)).to.be.ok;
      });

      it('should not handle google links', () => {
        const url = 'https://google.com';

        expect(isLinkValid(url)).to.not.be.ok;
      });

      it('handles regular single query string links', () => {
        const url = 'https://www.youtube.com/watch?v=mbyG85GZ0PI';

        expect(isLinkValid(url)).to.be.ok;
      });

      it('handles embed links', () => {
        const url = 'http://www.youtube.com/embed/mbyG85GZ0PI?rel=0';

        expect(isLinkValid(url)).to.be.ok;
      });
    });
  });

});