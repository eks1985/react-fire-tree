import React, { Component } from 'react';
import { getChildrenQty } from '../common';
import ButtonContainer            from './button/index';
import ButtonSelfContainer        from './button/self/container';
import ButtonConnectors           from './button/self/connectors';
import ButtonBody                 from './button/self/body';
import ChildrenContainer          from './button/children/container';
import ChildrenSublingsConnectors from './button/children/connectors';
import TreeModal                  from './tree-modal';
import style                      from './styles';

export default class App extends Component {
  
  constructor () {
    super();
    this.prepareStyles();
  }

  traverse = () => {
    const { data, order: keys }  = this.props;
    let topLevelNodeLength = keys.reduce( (result, key) => data[key].path.length === 1 ? result + 1 : result, 0);
    let firstTop = 0; //first top
    return keys.reduce((result, key, i) => {
      const topLevel = data[key].path.length === 1;
      firstTop = topLevel ? firstTop += 1 : firstTop;
      return topLevel ?
      result.concat(this.getBtnJSX({
        children: this.getBtnChildrenJSX(data[key]), //inside getBtnChildrenJSX chidlren of children will be calculated recursively,
        first: firstTop === 1,
        hasNext:  result.length + 1 !== topLevelNodeLength, //if this is last top node then it has no next
        nodeData: data[key]
      })) :
      result; //if not a top level just return prev result to the next reduce call
    }, []);
  }

  getBtnChildrenJSX = btnObject => {
    const { data, order: keys }  = this.props; 
    const { pathStr } = btnObject;
    return keys.reduce((result, key) => {
      let nodeData = data[key];
      return nodeData.parentPathStr === pathStr ?
      result.concat(
        this.getBtnJSX({
        children: this.getBtnChildrenJSX(nodeData),
        hasNext:  getChildrenQty(pathStr, data, keys) !== result.length + 1,
        nodeData
      })) : 
      result;
    }, []);
  }

  getBtnJSX({ children = [], first = false, hasNext = false, nodeData } = {} ){
    const { data } = this.props;
    const { content, button, childrenSublings, connectors, childrenWwapper} = style;
    return (
      <ButtonContainer style={content} key={nodeData.id} >
        <ButtonSelfContainer style={button.container} >
          <ButtonConnectors {...this.props} style={connectors} childrenLength={children.length} first={first} hasNext={hasNext} {...nodeData} />
          <ButtonBody style={button} {...nodeData} />
        </ButtonSelfContainer>
        {children.length > 0 && !data[nodeData.id].collapsed &&
          <ChildrenContainer style={childrenSublings.container} >
            <ChildrenSublingsConnectors style={childrenSublings} hasNext={hasNext} />
            <div style={childrenWwapper}>
              {children}
            </div>
          </ChildrenContainer>
        }
      </ButtonContainer>
    );
  }

  addPixels = val => val.toString() + "px";

  prepareStyles = () => {
    const innerHeight   = 36;
    const margin        = 8;
    const expandBtnSize = 20;
    const lineWidth     = 1;
    const lineColor     = "#555";
    const px            = this.addPixels;
    style.button.inner.height                       = px(innerHeight);
    style.button.container.height                   = px(innerHeight + margin);
    style.childrenSublings.connectors.width         = px(lineWidth);
    style.childrenSublings.connectors.left          = px(innerHeight/2 - lineWidth/2);
    style.childrenSublings.connectorsContainer.flex = "0 0 " + px(innerHeight);
    style.connectors.children.top                   = px(innerHeight);
    style.connectors.children.left                  = px(innerHeight + innerHeight/2 - lineWidth/2);
    style.connectors.children.width                 = px(lineWidth);
    style.connectors.container.flex                 = "0 0 " + px(innerHeight*2); //don't grow, don't shrink, width = innerHeigth / 2
    style.connectors.handle.left                    = px(innerHeight);
    style.connectors.handle.height                  = px(innerHeight);
    style.connectors.parentTop.height               = px(innerHeight/2);
    style.connectors.parentTop.left                 = px(innerHeight/2 - lineWidth/2);
    style.connectors.parentTop.width                = px(lineWidth);
    style.connectors.parentLeft.top                 = px(innerHeight/2);
    style.connectors.parentLeft.height              = px(lineWidth);
    style.connectors.parentLeft.right               = px(innerHeight);
    style.connectors.parentLeft.left                = px(innerHeight/2 - lineWidth/2);
    style.connectors.sublings.top                   = px(innerHeight/2);
    style.connectors.sublings.left                  = px(innerHeight/2 - lineWidth/2);
    style.connectors.sublings.width                 = px(lineWidth);
    style.connectors.expandButton.top               = px(innerHeight/2 - expandBtnSize/2);
    style.connectors.expandButton.left              = px(innerHeight/2 - expandBtnSize/2 - lineWidth/2);
    style.connectors.expandButton.height            = px(expandBtnSize);
    style.connectors.expandButton.width             = px(expandBtnSize);
    style.connectors.expandButton.fontSize          = px(expandBtnSize - 8);
    style.connectors.children.background            = lineColor;
    style.connectors.parentTop.background           = lineColor;
    style.connectors.parentLeft.background          = lineColor;
    style.connectors.sublings.background            = lineColor;
    style.connectors.children.background            = lineColor;
    style.childrenSublings.connectors.background    = lineColor;
    style.connectors.expandButton.border            = px(lineWidth) + " solid " + lineColor;
    style.connectors.expandButton.color             = lineColor;
  }

  render() {
    return (
      <div className="Tree" style={{padding: 10}}>
        {this.traverse()}
        <TreeModal { ...this.props } />
      </div>
    );
  }

}
