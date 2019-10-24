import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { parseComment, parseVar, parseEmptyLine } from './helpers';
import './Output.css';

const Output = ({ vars, comment, settings }) => {

  const emptyLine = parseEmptyLine(settings);
  const parsedVarsLines = vars.map(v => (parseVar(settings, v)));
  const parsedComment = parseComment(settings, comment);

  return (
    <div className="card">
      <pre className="card-body">
        <code>

          <div>{emptyLine}</div>
          <div>{parsedComment}</div>
          <div>{emptyLine}</div>

          <div>{parsedVarsLines && parsedVarsLines.map((v, k) => (
            <div key={k}>{v}</div>
          ))}
          </div>

          <div>{emptyLine}</div>

        </code>
      </pre>
    </div>
  );
}

Output.propTypes = {
  vars: PropTypes.arrayOf(PropTypes.string).isRequired,
  comment: PropTypes.string.isRequired,
  settings: PropTypes.shape({
    filler: PropTypes.string,
    lineLength: PropTypes.number,
    showAdvancedSettings: PropTypes.bool,
    lineStart: PropTypes.string,
    lineEnd: PropTypes.string,
    charEscaper: PropTypes.string,
    variableConcatenateChar: PropTypes.string,
    variableWrapperCodePrefix: PropTypes.string,
    variableWrapperCodePostfix: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  vars: state.vars.vars,
  comment: state.comment,
  settings: state.settings,
});

export default connect(mapStateToProps)(Output);
