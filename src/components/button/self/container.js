import React from 'react';

export default ({
  style,
  children
}) => {
  return (
    <div className="btnSelf" style={style}>
      {children}
    </div>
  );
};
