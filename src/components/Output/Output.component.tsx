import React, { useState } from 'react';

import { parseComment, parseVar, parseEmptyLine } from './helpers';
import './Output.css';
import { OutputComponentProps } from './Output.interface';

async function copyToClipboard(text: string): Promise<void> {
  navigator.clipboard.writeText(text);
}

export const OutputComponent: React.FC<OutputComponentProps> = ({
  vars,
  comment,
  settings,
}) => {
  const [copiedFlag, setCopiedFlag] = useState<Boolean>(false);
  const [hideCopiedPopup, setHideCopiedPopup] = useState<Boolean>(false);

  const genPrefix = settings.generalPrefix;
  const genPostfix = settings.generalPostfix;
  const emptyLine = parseEmptyLine(settings);
  const parsedVarsLines = vars.map((v) => parseVar(settings, v));
  const parsedComment = parseComment(settings, comment);

  const outputNonEmptyText = [
    genPrefix,
    emptyLine,
    parsedComment,
    emptyLine,
    ...parsedVarsLines,
    parsedVarsLines.length > 0 ? emptyLine : '',
    genPostfix,
  ].filter(Boolean);

  function addCopiedPopup() {
    setHideCopiedPopup(false);
    setCopiedFlag(true);

    setTimeout(() => {
      setHideCopiedPopup(true);
    }, 1000);
  }

  return (
    <div className="output card">
      {/* TODO: remmove code duplication of <pre> with copy on click for TableOfContents and Output */}
      <pre
        className={`card-body ${copiedFlag ? 'output__copied' : ''} ${
          hideCopiedPopup ? 'hide-popup' : ''
        }`}
      >
        <code
          onClick={async () => {
            await copyToClipboard(outputNonEmptyText.join('\n'));
            addCopiedPopup();
          }}
        >
          {outputNonEmptyText.map((l, k) => (
            <div key={k}>{l}</div>
          ))}
        </code>
      </pre>
    </div>
  );
};
