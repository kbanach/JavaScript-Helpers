import React from 'react';
import { connect } from 'react-redux';

import './Output.css';

const Output = ({ vars, comment }) => {
  return (
    <div className="card">
      <pre className="card-body">
        <code>
          <div>Vars: {vars && vars.map((v, k) => (
            <div key={k}>{v}</div>
          ))}
          </div>

          <div>
          Comment: {comment}
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
