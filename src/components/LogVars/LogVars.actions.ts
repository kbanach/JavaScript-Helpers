import { VarsState } from './LogVars.reducers';

export const consLogGenActions = {
  RESET_VARS: 'RESET_VARS',
  UPDATE_VARS: 'UPDATE_VARS',
};

export function resetVars() {
  return {
    type: consLogGenActions.RESET_VARS,
  };
}

type OpeningBrackets = '(' | '{' | '[';
type ClosingBrackets = ')' | '}' | ']';

const getClosingBracket = (
  closing: OpeningBrackets,
): ClosingBrackets | undefined => {
  switch (closing) {
    case '(':
      return ')' as ClosingBrackets;
    case '{':
      return '}' as ClosingBrackets;
    case '[':
      return ']' as ClosingBrackets;
  }
};

const isOpeningBracket = (val: any): val is OpeningBrackets => {
  const openingBrackets: RegExp = /[({[]/;
  return openingBrackets.test(val);
};

const isClosingBracket = (val: any): val is ClosingBrackets => {
  const closingBrackets: RegExp = /[)}\]]/;
  return closingBrackets.test(val);
};

export function setVars(rawVars: VarsState['rawVars']) {
  const separator: RegExp = /[ ,;]/;
  const varsList: string[] = [];

  let currentVar: string = '';
  let bracketsQueue: OpeningBrackets[] = [];
  let bracketsError: string = '';

  for (let char of rawVars) {
    if (bracketsError.length > 0) {
      break;
    }

    // current char is not a separator OR any bracket is not opened
    if (!separator.test(char) || bracketsQueue.length > 0) {
      currentVar += char;

      if (isOpeningBracket(char)) {
        bracketsQueue.push(char);
      }

      if (isClosingBracket(char)) {
        const lastOpenedBracket = bracketsQueue[bracketsQueue.length - 1];

        if (
          bracketsQueue.length &&
          char === getClosingBracket(lastOpenedBracket)
        ) {
          bracketsQueue.pop();
        } else {
          bracketsError = `Closing bracket "${char}" does not match`;

          if (lastOpenedBracket) {
            bracketsError += ` last opened "${lastOpenedBracket}"`;
          } else {
            bracketsError += ` any opening bracket`;
          }
        }
      }
    } else {
      // if char IS empty
      // AND currentVar str is not empty, then dump it to varsList and reset to empty string
      if (currentVar.trim()) {
        varsList.push(currentVar);
        currentVar = '';
      }
    }
  }

  // if anything is still left in currentVar, then push it to varsList
  if (currentVar.trim() && !bracketsError) {
    varsList.push(currentVar);
  }

  if (bracketsQueue.length) {
    bracketsError = `Last unclosed bracket "${
      bracketsQueue[bracketsQueue.length - 1]
    }" does not have closing bracket pair.`;
  }

  return {
    type: consLogGenActions.UPDATE_VARS,
    rawVars,
    vars: varsList,
    bracketsError,
  };
}
