/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';

const Cell = ({
  className, id, onClick, children, testId,
}) => (
  <div data-testid={testId} className={className} id={id} key={`${id}#`} onClick={onClick}>{children}</div>
);

export default Cell;
