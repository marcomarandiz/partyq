/* eslint "no-unused-expressions": 0 */

import { expect } from 'chai';
import { isLinkValid } from '../common/utils/functions';

describe('utils', () => {
  describe('valid urls', () => {
    describe('youtube links', () => {
      it('handles multiple query strings', () => {
        const url = 'http://www.youtube.com/watch?v=abc123&feature=index';
        expect(isLinkValid(url)).to.be.true;
      });

      /* FAILING TEST */
      it('handles /v/id style links', () => {
        const url = 'https://www.youtube.com/v/0zM3nApSvMg?fs=1&amp;hl=en_US&amp;rel=0';

        expect(isLinkValid(url)).to.be.true;
      });
    });
  });

});
