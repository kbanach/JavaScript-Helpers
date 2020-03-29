import 'jest';
import * as outputHelpers from '../helpers';

describe('Output helpers', () => {
  let settingsDefaults;

  beforeEach(() => {
    settingsDefaults = {
      presetType: 'Default',
      filler: '*',
      lineLength: 60,
      lineStart: 'console.log(',
      lineEnd: ');',
      charEscaper: "'",
      variableConcatenateChar: ', ',
      variableWrapperCodePrefix: 'JSON.stringify(',
      variableWrapperCodePostfix: ", null, '\\t')",
      generalPrefix: '',
      generalPostfix: ''
    };
  });

  describe('has method parseEmptyLine', () => {
    test('exposed', () => {
      expect(typeof outputHelpers.parseEmptyLine).toBe('function');
    });

    test('returns string as an output', () => {
      expect(typeof outputHelpers.parseEmptyLine(settingsDefaults)).toBe('string');
    });

    describe('with default settings', () => {
      test('returns 60 asterisks ("*" x 60)', () => {
        expect(outputHelpers.parseEmptyLine(settingsDefaults)).toMatch(/\*{60}/ig);
      });

      test('returns "console.log(\'" on the beginning of string', () => {
        expect(outputHelpers.parseEmptyLine(settingsDefaults)).toMatch(/^console\.log\('/ig);
      });

      test('returns "\');" on the end of string', () => {
        expect(outputHelpers.parseEmptyLine(settingsDefaults)).toMatch(/'\);$/ig);
      });
    });
  });

  describe('has mehthod parseComment', () => {
    const TEST_COMMENT = 'TEST_COMMENT';

    test('exposed', () => {
      expect(typeof outputHelpers.parseComment).toBe('function');
    });

    test('returns string as an output', () => {
      expect(typeof outputHelpers.parseComment(settingsDefaults, TEST_COMMENT)).toBe('string');
    });

    describe('with default settings', () => {
      test('contains comment passed as parameter', () => {
        expect(outputHelpers.parseComment(settingsDefaults, TEST_COMMENT)).toContain(TEST_COMMENT);
      });

      test('surrounds comment with space and asterisks', () => {
        expect(outputHelpers.parseComment(settingsDefaults, TEST_COMMENT)).toContain(`* ${TEST_COMMENT} *`);
      });

      test('does not add extra spaces around comment (trims passed comment)', () => {
        expect(outputHelpers.parseComment(settingsDefaults, `   ${TEST_COMMENT}    `)).toContain(`* ${TEST_COMMENT} *`);
      });

      test('returns inside console.log 60 chars', () => {
        expect(outputHelpers.parseComment(settingsDefaults, TEST_COMMENT)).toMatch(/^console\.log\('.{60}'\);$/ig);
      });

      test('returns "console.log(\'" on the beginning of string', () => {
        expect(outputHelpers.parseComment(settingsDefaults, TEST_COMMENT)).toMatch(/^console\.log\('/ig);
      });

      test('returns "\');" on the end of string', () => {
        expect(outputHelpers.parseComment(settingsDefaults, TEST_COMMENT)).toMatch(/'\);$/ig);
      });

      describe('with passed multiline comment', () => {
        const TEST_MULTILINE_COMMENT = 'TEST_LINE_1\nTEST_LINE_2';
        test('returns multiline output', () => {
          expect(outputHelpers.parseComment(settingsDefaults, TEST_MULTILINE_COMMENT)).toContain(`* TEST_LINE_1 *`);
          expect(outputHelpers.parseComment(settingsDefaults, TEST_MULTILINE_COMMENT)).toContain(`* TEST_LINE_2 *`);
          
          expect(outputHelpers.parseComment(settingsDefaults, TEST_MULTILINE_COMMENT))
            .toMatch(/TEST_LINE_1.*\n.*TEST_LINE_2/ig);
        });
      });
    });
  });
});