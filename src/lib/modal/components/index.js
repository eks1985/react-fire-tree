import React from 'react';
import * as modalActions from '../../modal/actions/index';
import { connect } from 'react-redux';

let Modal = ({
  children,
  x,
  y,
  fullScreen,
  //actions
  setModal
}) => {
  const style = {
    position: "absolute",
    left: x,
    top: y,
    background: "#ddd",
    border: "1px solid #bbb",
    padding: "10px",
    zIndex: 1000
  };
  if (fullScreen) {
    style.left   = "0px";
    style.right  = "0px";
    style.top    = "0px";
    style.bottom = "0px";
  }
  return (
    <div style={style}>
      <div>
        {children}
      </div>
      <button
        onClick={
          () => {
            setModal({dataSource: ''});
          }
        }
      >сlose</button>
    </div>
  );
};

export default connect(
  state => ({fullScreen: state.modal.fullScreen, x: state.modal.x, y: state.modal.y}),
  modalActions
)(Modal);
