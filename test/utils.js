/* eslint "no-unused-expressions": 0 */

import { expect } from 'chai';
import { isLinkValid } from '../common/utils/functions';

describe('utils', () => {
  describe('valid urls', () => {
    describe('youtube links', () => {
      it('multiple query strings', () => {
        const url = 'http://www.youtube.com/watch?v=abc123&feature=index';
        expect(isLinkValid(url)).to.be.true;
      });
    });
  });

});
