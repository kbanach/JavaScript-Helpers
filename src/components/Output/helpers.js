function wrapLine(settings, line) {
  return `${settings.lineStart}${settings.charEscaper}` +
  `${line}` +
  `${settings.charEscaper}${settings.lineEnd}`;
}

function fillLine(settings, line) {
  const targetLen = settings.lineLength;
  const currentLen = line.length;

  const gap = targetLen - currentLen - 2; // minus 2 empty spaces around "line"

  if (gap <= 0) {
    return line;
  }

  const filledLine = settings.filler.repeat(Math.floor(gap / 2)) +
  ' ' + line + ' ' +
  settings.filler.repeat(Math.ceil(gap / 2));

  return filledLine;
}

function parseLine(settings, line) {
  const filledLine = fillLine(
    settings,
    line.replace(new RegExp(settings.charEscaper, 'ig'), `\\${settings.charEscaper}`)
  );

  return wrapLine(
    settings,
    filledLine
  );
}

export function parseEmptyLine(settings) {
  const emptyLine = settings.filler.repeat(settings.lineLength);
  return wrapLine(settings, emptyLine);
}

export function parseComment(settings, comment) {
  return comment.split('\n')
    .map(l => l.trim())
    .map((l) => {
      if (l) return parseLine(settings, l);
      return parseEmptyLine(settings);
    })
    .join('\n')
}

export function parseVar(settings, variable) {
  return wrapLine(settings,
    `${variable}: ${settings.charEscaper}` +
    `${settings.variableConcatenateChar}` +
    `${settings.variableWrapperCodePrefix}${variable}${settings.variableWrapperCodePostfix}`
  );
}
