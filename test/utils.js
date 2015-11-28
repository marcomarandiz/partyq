/* eslint "no-unused-expressions": 0 */

import { expect } from 'chai';
import { isLinkValid } from '../common/utils/functions';

describe('utils', () => {
  describe('youtube links', () => {
    it('validifies urls with multiple query strings', () => {
      const url = 'http://www.youtube.com/watch?v=abc123&feature=index';
      expect(isLinkValid(url)).to.be.true;
    });
  });

});
