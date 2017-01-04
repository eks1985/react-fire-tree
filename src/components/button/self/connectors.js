import React from 'react';
import { connect } from 'react-redux';

let Connectors = (props) => {

  const {
    style,
    childrenLength,
    first,
    hasNext,
    id,
    path,
    title,
    collapsed,
    //actions
    dispatch,
    expand,
    collapse,
    setModal,
  } = props;

  const paneStyle = {
    width: "100px",
    alignItems: "stretch",
    cursor: "pointer",
    background: "#d9d9d9 url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MiIgaGVpZ2h0PSI0MiI+PGcgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIuOSIgPjxwYXRoIGQ9Ik0xNCAxNS43aDE0LjQiLz48cGF0aCBkPSJNMTQgMjEuNGgxNC40Ii8+PHBhdGggZD0iTTE0IDI3LjFoMTQuNCIvPjwvZz4KPC9zdmc+') no-repeat 50%",
  };
  
  return (
    <div className="connectorsContainer" style={style.container} >
      <div style={style.handle} className="handle" >
        <div
          style={paneStyle}
          onClick={
            (e) => {
              dispatch(setModal({
                x: e.pageX,
                y: e.pageY,
                dataSource: 'buttonActions',
                data: {id, path, title}
              }));
            }
          }
        >
        </div>
      </div>
      { !first && <div className="parentTop" style={style.parentTop}></div> }
      <div className="parentLeft" style={style.parentLeft}></div>
      { hasNext && <div className="sublings" style={style.sublings}></div> }
      { childrenLength > 0 && !collapsed && <div className="children" style={style.children}></div> }
      { childrenLength > 0 &&
        <button
          style={style.expandButton}
          onClick={() => {
            if (collapsed) {
              dispatch(expand(id, props));
            } else {
              dispatch(collapse(id, props));
            }
          }
        }>
          {collapsed === true ? "+" : "-"}
        </button>
      }
    </div>
  );
};

Connectors = connect()(Connectors);

export default Connectors;
