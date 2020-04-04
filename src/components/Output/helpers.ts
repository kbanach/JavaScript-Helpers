import { Settings } from "../Settings/Settings.interface";

function wrapLineInPreAndPostFix(settings: Settings, line: string) {
  return `${settings.lineStart}${line}${settings.lineEnd}`;
}

function wrapStringWithEscaperChar(settings: Settings, stringToWrap: string) {
  return settings.charEscaper + stringToWrap + settings.charEscaper;
}

function centerTextAndFillGapsAround(settings: Settings, line: string) {
  const targetLen = settings.lineLength;
  const currentLen = line.length;

  const gap = targetLen - currentLen - 2; // minus 2 empty spaces around "line"

  if (gap <= 0) {
    return line;
  }

  const filledLine =
    settings.filler.repeat(Math.floor(gap / 2)) +
    ' ' +
    line +
    ' ' +
    settings.filler.repeat(Math.ceil(gap / 2));

  return filledLine;
}

function transformStringToCenteredAndEscapedString(settings: Settings, line: string) {
  const filledLine = centerTextAndFillGapsAround(settings, line);

  let lineWithEscapedChars = filledLine;

  if (settings.charEscaper) {
    lineWithEscapedChars = lineWithEscapedChars.replace(
      new RegExp(settings.charEscaper, 'ig'),
      `\\${settings.charEscaper}`,
    );
  }

  return wrapLineInPreAndPostFix(
    settings,
    wrapStringWithEscaperChar(settings, lineWithEscapedChars),
  );
}

export function parseEmptyLine(settings: Settings) {
  const emptyLine = wrapStringWithEscaperChar(
    settings,
    settings.filler.repeat(settings.lineLength),
  );

  return wrapLineInPreAndPostFix(settings, emptyLine);
}

export function parseComment(settings: Settings, comment: string) {
  return comment
    .split('\n')
    .map(l => l.trim())
    .map(l => {
      if (l) return transformStringToCenteredAndEscapedString(settings, l);
      return parseEmptyLine(settings);
    })
    .join('\n');
}

export function parseVar(settings: Settings, variable: string) {
  return wrapLineInPreAndPostFix(
    settings,
    wrapStringWithEscaperChar(settings, `${settings.filler} ${variable}: `) +
      `${settings.variableConcatenateChar}` +
      `${settings.variableWrapperCodePrefix}${variable}${settings.variableWrapperCodePostfix}`,
  );
}
