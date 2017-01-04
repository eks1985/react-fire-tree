import React from 'react';

export default ({
  style,
  children
}) => {
  return (
    <div className="btnChildrenContainer" style={style}>
      {children}
    </div>
  );
};
