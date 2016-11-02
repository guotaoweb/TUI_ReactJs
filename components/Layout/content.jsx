import '!style!css!postcss!sass!./style.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import Btn from "../../components/Btn/index"

class Content extends Component {
  render() {
    const {addHref,txt,children} = this.props
    let addBtn
    if (addHref) {
      addBtn = <div style={{ float: "right" }}>
        <Btn type="add" txt="新增" href={addHref} />
      </div>
    }
    return (
      <div className="t-content" ref="tContent">
        <div className="t-content_t">
          <span>{txt}</span>
          {addBtn}
        </div>
        <div style={{padding:"5px 7px"}}>
          {children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    let allHeight = document.documentElement.clientHeight;
    let headerHeight = document.querySelector(".t-header").offsetHeight;
    let marginTop = 15;
    ReactDOM.findDOMNode(this.refs.tContent).style.height = (allHeight - headerHeight - marginTop * 2) + "px";
    ReactDOM.findDOMNode(this.refs.tContent).style.marginTop = marginTop + "px"
  }
};

export default Content;