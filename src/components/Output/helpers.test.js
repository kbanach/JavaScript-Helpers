import 'jest';

import { parseEmptyLine, parseComment } from './helpers';

const minSettings = {
  filler: 'x',
  lineLength: 20,
  charEscaper: '%',
  lineStart: '<',
  lineEnd: '>',
};

describe('Output helpers', () => {
  let settings;

  beforeEach(() => {
    settings = {
      ...minSettings,
    };
  });

  describe('have method parseEmptyLine', () => {
    it('should return a line with length of 20', () => {
      expect(parseEmptyLine(settings).match(/x/gi).length).toBe(20);
    });

    it('should return a line with length of 60 when such settings are passed', () => {
      settings.lineLength = 60;
      expect(parseEmptyLine(settings).match(/x/gi).length).toBe(60);
    });

    it('should return a line that starts with lineStart', () => {
      expect(parseEmptyLine(settings)).toMatch(/^</);
    });

    it('should return a line that ends with lineEnd', () => {
      expect(parseEmptyLine(settings)).toMatch(/>$/);
    });

    it('should return a charEscaper between lineStart and first filler', () => {
      expect(parseEmptyLine(settings)).toMatch(/<%x/);
    });

    it('should return a charEscaper between last filler and lineEnd', () => {
      expect(parseEmptyLine(settings)).toMatch(/x%>/);
    });
  });

  describe('have method parseComment', () => {
    const TEST_COMMENT = 'test comment';

    it('should return a line with test comment', () => {
      expect(parseComment(settings, TEST_COMMENT)).toMatch(/test comment/gi);
    });

    it('should wrap test comment with empty space before and after the comment', () => {
      expect(parseComment(settings, TEST_COMMENT)).toMatch(/ test comment /gi);
    });

    it('should return a line that starts with lineStart', () => {
      expect(parseComment(settings, TEST_COMMENT)).toMatch(/^</);
    });

    it('should return a line that starts with lineEnd', () => {
      expect(parseComment(settings, TEST_COMMENT)).toMatch(/>$/);
    });

    it('should return entire comment between charEscapers of length of 20', () => {
      const everythingBetweenCharEscapers = (/\%([* \S]+)\%/ig).exec(parseComment(settings, TEST_COMMENT)).pop();

      expect(everythingBetweenCharEscapers.length).toBe(20);
    });


    it('should return entire comment between charEscapers when the comment is longer than 20 chars', () => {
      const longTestComment = 'z'.repeat(21);

      const everythingBetweenCharEscapers = (/\%([* \S]+)\%/ig).exec(parseComment(settings, longTestComment)).pop();

      expect(everythingBetweenCharEscapers).toMatch(longTestComment);
      expect(everythingBetweenCharEscapers.length).toBe(21);
    });

    it('should return line of fillers when passed comment is empty', () => {
      expect(parseComment(settings, '')).toMatch(/\%x{20}\%/);
    });
  });
});
