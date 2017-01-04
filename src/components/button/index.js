import React from 'react';

export default ({
  style, 
  path, 
  children
}) => {
  return (
    <div className="btnComponent" style={style}>
        {children}
    </div>    
  );
};