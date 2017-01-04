import React from 'react';
import { connect } from 'react-redux';

let ButtonBody = props => {
  const {
    style,
    title,
  } = props;
  const { body, inner, titleStyle } = style;
  return (
    <div className="btnBody" style={body}>
      <div className="buttonInner" style={inner}>
        <div className="title" style={titleStyle}>
          {title}
        </div>
      </div>
    </div>
  );
};

export default connect()(ButtonBody);
