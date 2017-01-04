import React from 'react';

export default ({
  style, 
  hasNext
}) => {
  const { connectorsContainer, connectors} = style;
  return (
    <div className="childrenSublingsConnectors" style={connectorsContainer}>
      { hasNext && <div style={connectors}></div> }
    </div>    
  );  
};