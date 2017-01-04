import React from 'react';
import { connect } from 'react-redux';

import Modal from './../lib/modal/components/index';

let TreeModal = (props) => {

  const {
    modal,
    //actions
    dispatch,
    commitEditTitle,
    addNode,
    deleteNode,
    setMoveObject,
    completeMove,
    startEditTitle,
    addCard,
    setModal
  } = props;

  let input;

  const { id, path, title } = modal.data;

  const getCardsJsx = () => {
    return (
      <div>
        <button
          onClick={
            () => {
              dispatch(addCard());
            }
          }
        >
          add card
        </button>
      </div>
    );
  };

  const getIdAndPathJsx = () => {
    return (
      <div>
        <p>
          <label>id: </label>
          {id}
        </p>
        <p>
          <label>path: </label>
          {path}
        </p>
      </div>
    );
  };

  const getEditTitleJsx = () => {
    return (
      <div>
        <input
          type="text"
          defaultValue={title}
          ref={
            (node) => {
              input = node;
            }
          }
        ></input>
        <button
          onClick={
            () => {
              dispatch(commitEditTitle(input.value));
              dispatch(setModal({dataSource: ''}));
            }
          }
        >
          Save
        </button>
      </div>
    );
  };

  const getButtonActionsJsx = () => {
    return (
    <div style={{display: "flex", flexDirection: "column"}}>
        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(completeMove(id));
            }
          }
        >
          select
        </button>

        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(deleteNode(id));
            }
          }
        >
          delete
        </button>

        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(setMoveObject(id, 'before'));
            }
          }
        >move before</button>

        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(setMoveObject(id, 'after'));
            }
          }
        >
          move after
        </button>

        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(setMoveObject(id, 'child'));
            }
          }
        >
          move as child
        </button>

        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(addNode(id, 'before'));
            }
          }
        >
          add before
        </button>

        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(addNode(id, 'after'));
            }
          }
        >
          add after
        </button>

        <button
          onClick={
            () => {
              dispatch(setModal({dataSource: ''}));
              dispatch(addNode(id, 'child'));
            }
          }
        >
          add child
        </button>

        <button
          onClick={
            (e) => {
              const data = {path: path, id: id};
              dispatch(setModal({x: e.pageX, y: e.pageY, dataSource: 'idAndPath', data}));
            }
          }
        >
          info
        </button>
        
        <button
          onClick={
            (e) => {
              dispatch(startEditTitle(id, title));
              const data = {title: title};
              dispatch(setModal({x: e.pageX, y: e.pageY, dataSource: 'editTitle', data}));
            }
          }
        >
          set title
        </button>
      </div>
    );
  };

  return (
    <div>
      {modal.dataSource !== '' &&
        <Modal>
          { modal.dataSource === 'idAndPath'     && getIdAndPathJsx() }
          { modal.dataSource === 'editTitle'     && getEditTitleJsx() }
          { modal.dataSource === 'buttonActions' && getButtonActionsJsx() }
          { modal.dataSource === 'cards'         && getCardsJsx() }
        </Modal>
      }
    </div>
  );

};

export default connect(
  state => ({modal: state.modal})
)(TreeModal);
