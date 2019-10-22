import React from 'react';
import PropType from 'prop-types';

const Result = ({ exclamation, emoji, text }) => (
  <div className="result">
    <div className="header">
      <span>
        {exclamation}
      </span>
      <img src={emoji} alt="celebrate" />
    </div>
    <div className="body">{text}</div>
  </div>
);

Result.propTypes = {
  exclamation: PropType.string.isRequired,
  emoji: PropType.string.isRequired,
  text: PropType.string.isRequired,
};

export default Result;
