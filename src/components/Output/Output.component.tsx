import React from 'react';

import { parseComment, parseVar, parseEmptyLine } from './helpers';
import './Output.css';
import { OutputComponentProps } from './Output.interface';

export const OutputComponent: React.FC<OutputComponentProps> = ({ vars, comment, settings }) => {
  const genPrefix = settings.generalPrefix;
  const genPostfix = settings.generalPostfix;
  const emptyLine = parseEmptyLine(settings);
  const parsedVarsLines = vars.map(v => parseVar(settings, v));
  const parsedComment = parseComment(settings, comment);

  const outputText = [
    genPrefix,
    emptyLine,
    parsedComment,
    emptyLine,
    ...parsedVarsLines,
    parsedVarsLines.length > 0 ? emptyLine : '',
    genPostfix,
  ];

  return (
    <div className="card">
      <pre className="card-body">
        <code>
          {outputText.filter(Boolean).map((l, k) => (
            <div key={k}>{l}</div>
          ))}
        </code>
      </pre>
    </div>
  );
};
