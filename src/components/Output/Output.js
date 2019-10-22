import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Output.css';

const Output = ({ vars, comment, settings }) => {

  const parsedVarsLines = vars.map(v => (
    `${settings.lineStart}` +
    `${settings.charEscaper}${v}: ${settings.charEscaper}` +
    `${settings.variableConcatenateChar}` +
    `${settings.variableWrapperCodePrefix}${v}${settings.variableWrapperCodePostfix}`+
    `${settings.lineEnd}`
  ));

  let parsedComment =
  `${settings.lineStart}` +
  `${settings.charEscaper}${comment.replace(new RegExp(settings.charEscaper, 'ig'), `\\${settings.charEscaper}`)}${settings.charEscaper}` +
  `${settings.lineEnd}`;

  return (
    <div className="card">
      <pre className="card-body">
        <code>

          <div>{parsedComment}</div>

          <div>{parsedVarsLines && parsedVarsLines.map((v, k) => (
            <div key={k}>{v}</div>
          ))}
          </div>

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
