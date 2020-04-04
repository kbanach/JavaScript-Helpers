import 'jest';
import * as outputHelpers from '../helpers';
import { Settings } from '../../Settings/Settings.interface';

describe('Output helpers', () => {
  let HAPPY_PATH_DEFAULTS: Partial<Settings>;

  beforeEach(() => {
    // only settings that are used in code
    HAPPY_PATH_DEFAULTS = {
      filler: '*',
      lineLength: 60,
      lineStart: 'console.log(',
      lineEnd: ');',
      charEscaper: "'",
      variableConcatenateChar: ', ',
      variableWrapperCodePrefix: 'JSON.stringify(',
      variableWrapperCodePostfix: ", null, '\\t')",
    };
  });

  describe('has method parseEmptyLine', () => {
    test('exposed', () => {
      expect(typeof outputHelpers.parseEmptyLine).toBe('function');
    });

    test('returns string as an output', () => {
      expect(typeof outputHelpers.parseEmptyLine(HAPPY_PATH_DEFAULTS)).toBe('string');
    });

    describe('with default settings', () => {
      test('returns 60 asterisks ("*" x 60)', () => {
        expect(outputHelpers.parseEmptyLine(HAPPY_PATH_DEFAULTS)).toMatch(/\*{60}/ig);
      });

      test('returns "console.log(\'" (with singlequote) on the beginning of string', () => {
        expect(outputHelpers.parseEmptyLine(HAPPY_PATH_DEFAULTS)).toMatch(/^console\.log\('/ig);
      });

      test('is valid JS line', () => {
        expect(function() {
          eval(outputHelpers.parseEmptyLine(HAPPY_PATH_DEFAULTS));
        }).not.toThrow();
      });

      test('returns "\');" (with singlequote) on the end of string', () => {
        expect(outputHelpers.parseEmptyLine(HAPPY_PATH_DEFAULTS)).toMatch(/'\);$/ig);
      });
    });
  });

  describe('has mehthod parseComment', () => {
    const TEST_COMMENT = 'TEST_COMMENT';

    test('exposed', () => {
      expect(typeof outputHelpers.parseComment).toBe('function');
    });

    test('returns string as an output', () => {
      expect(typeof outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_COMMENT)).toBe('string');
    });

    describe('with default settings', () => {
      test('contains comment passed as parameter', () => {
        expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_COMMENT)).toContain(TEST_COMMENT);
      });

      test('surrounds comment with space and asterisks', () => {
        expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_COMMENT)).toContain(`* ${TEST_COMMENT} *`);
      });

      test('does not add extra spaces around comment (trims passed comment)', () => {
        expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, `   ${TEST_COMMENT}    `)).toContain(`* ${TEST_COMMENT} *`);
      });

      test('returns inside console.log 60 chars', () => {
        expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_COMMENT)).toMatch(/^console\.log\('.{60}'\);$/ig);
      });

      test('returns "console.log(\'" (with singlequote) on the beginning of string', () => {
        expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_COMMENT)).toMatch(/^console\.log\('/ig);
      });

      test('is valid JS line', () => {
        expect(function() {
          eval(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_COMMENT));
        }).not.toThrow();
      });

      test('returns "\');" (with singlequote) on the end of string', () => {
        expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_COMMENT)).toMatch(/'\);$/ig);
      });

      test('escapes "escaper" char (e.g. "\'") with slash, that is not counted in line length as it will not print on execution', () => {
        const output = outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, 'TEST_\'_COMMENT');
        
        // so it should be visible on webpage as TEST_\'_COMMENT 
        // and after running a code like console.log('TEST_\'_COMMENT') --> TEST_'_COMMENT
        expect(output).toContain('TEST_\\\'_COMMENT');
        
        // one additional char for escape slash
        expect(output).toMatch(/^console\.log\('.{61}'\);$/ig); 
      });


      describe('with passed multiline comment', () => {
        const TEST_MULTILINE_COMMENT = 'TEST_LINE_1\nTEST_LINE_2';
        test('returns multiline output', () => {
          expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_MULTILINE_COMMENT)).toContain(`* TEST_LINE_1 *`);
          expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_MULTILINE_COMMENT)).toContain(`* TEST_LINE_2 *`);
          
          expect(outputHelpers.parseComment(HAPPY_PATH_DEFAULTS, TEST_MULTILINE_COMMENT))
            .toMatch(/TEST_LINE_1.*\n.*TEST_LINE_2/ig);
        });
      });
    });
  });

  describe('has method parseVar', () => {
    const TEST_VARIABLE = 'TEST_VARIABLE';

    test('exposed', () => {
      expect(typeof outputHelpers.parseVar).toBe('function');
    });

    test('returns string as an output', () => {
      expect(typeof outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE)).toBe('string');
    });

    describe('with default settings', () => {
      test('contains variable passed as parameter', () => {
        expect(outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE)).toContain(TEST_VARIABLE);
      });

      test('returns "console.log(\'* " (with space) on the beginning of string', () => {
        expect(outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE)).toMatch(/^console\.log\('\* /ig);
      });

      test('returns variable just after console.log prefix on the beginning of string', () => {
        expect(outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE)).toMatch(/^console\.log\('\* TEST_VARIABLE/ig);
      });

      test('returns ");" on the end of string', () => {
        expect(outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE)).toMatch(/\);$/ig);
      });

      test('is valid JS line', () => {
        expect(function() {
          eval(outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE));
        }).not.toThrow();
      });

      test('wraps variable with "JSON.stringify(" before it', () => {
        expect(outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE)).toMatch(/JSON.stringify\(TEST_VARIABLE/ig);
      });

      test('wraps variable with ", null, \'\\t\')" after it', () => {
        expect(outputHelpers.parseVar(HAPPY_PATH_DEFAULTS, TEST_VARIABLE)).toMatch(/TEST_VARIABLE, null, '\\t'\)/ig);
      });

    });
  });
});
