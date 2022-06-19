import React from 'react';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import './TableOfContents.css';

const getTitlesOnly = (fileContent: string): string[] => {
  return fileContent.split('\n').filter((s) => s.startsWith('#'));
};

const cleanupReadmeTitle = (titleLine: string): [string, number] => {
  const matches: number = titleLine.match(/#/g)?.length ?? 0;
  const titleWithoutHash = titleLine.replace(/#* /i, '');

  return [titleWithoutHash, matches];
};

const getTableOfContentsFromDoc = (doc: string) => {
  return getTitlesOnly(doc)
    .map((fileLine) => {
      const [line, deepth] = cleanupReadmeTitle(fileLine);

      if (deepth === 1) {
        return '';
      }

      let indent = '';

      if (deepth > 2) {
        indent += ' '.repeat(4 * (deepth - 2));
      }

      const escapedAnchor = line
        .toLowerCase()
        .replace(/ /gi, '-')
        .split('')
        .filter((ch: string) => /[-\w]/gi.test(ch))
        .join('');

      return `${indent}1. [${line}](#${escapedAnchor})`;
    })
    .filter(Boolean)
    .join('\n');
};

const defaultText = `\
# The title, which is ignored

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

## First section

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

### Subsection (of first section)

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Second subsection

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Second section

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

## Third section

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
`;

async function copyToClipboard(text: string): Promise<void> {
  navigator.clipboard.writeText(text);
}

export const TheTableOfContents = () => {
  const [copiedFlag, setCopiedFlag] = useState<Boolean>(false);
  const [hideCopiedPopup, setHideCopiedPopup] = useState<Boolean>(false);
  const [input, setInput] = useState<string>(defaultText);
  const [tableOfContents, setTableOfContents] = useState<string>('');

  const addCopiedPopup = () => {
    setHideCopiedPopup(false);
    setCopiedFlag(true);

    setTimeout(() => {
      setHideCopiedPopup(true);
    }, 1000);
  };

  useEffect(() => {
    setTableOfContents(getTableOfContentsFromDoc(input));
  }, [input]);

  return (
    <div className="table-of-contents">
      <div className="card">
        {/* TODO: remmove code duplication of <pre> with copy on click for TableOfContents and Output */}
        <pre
          className={`card-body ${
            copiedFlag ? 'table-of-contents__copied' : ''
          } ${hideCopiedPopup ? 'hide-popup' : ''}`}
        >
          <code
            onClick={async () => {
              await copyToClipboard(tableOfContents);
              addCopiedPopup();
            }}
          >
            {tableOfContents}
          </code>
        </pre>
      </div>
      <br />

      <Form.Control
        as="textarea"
        onChange={(e) => setInput(e.target.value)}
        rows={20}
        style={{ width: '100%' }}
        value={input}
      />
    </div>
  );
};
