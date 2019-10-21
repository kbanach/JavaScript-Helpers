import React from 'react';
import { connect } from 'react-redux';

import './Output.css';

const Output = ({ vars, comment }) => {

  let parsedVarsLines = vars.map(v => (
    `console.log('${v}: ', JSON.stringify(${v}, false, '\\t'))`
  ));


  return (
    <div className="card">
      <pre className="card-body">
        <code>

          <div>{comment}</div>

          <div>{parsedVarsLines && parsedVarsLines.map((v, k) => (
            <div key={k}>{v}</div>
          ))}
          </div>

        </code>
      </pre>
    </div>
  );
}

const mapStateToProps = (state) => ({
  vars: state.vars,
  comment: state.comment,
});

export default connect(mapStateToProps)(Output);
