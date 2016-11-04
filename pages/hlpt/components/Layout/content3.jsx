import '!style!css!postcss!sass!./style.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Btn from "../../components/Btn/index"

class Content extends Component {
  render() {
    const {tabs, side} = this.props
    let tabsArry = []
    if (this.props.tabs) {
      for (var index = 0; index < tabs.length; index++) {
        var $li = tabs[index];
        if (index == 0) {
          tabsArry.push(<li key='content2_editVteam_0' className="t-contetn2_tab--active">{$li.name}</li>)
        }
        else {
          tabsArry.push(<li key={"content2_editVteam_" + index}>{$li.name}</li>)
        }
      }
    }

    return (
      <div className="t-content3" ref="tContent3">
        <div className="t-content3_side" ref="tContent3Side">
          {this.props.children[0]}
        </div>
        <div className="t-content3_c">
          {this.props.children[1]}
          <div className="tblContent" ref="tblContent">
            {this.props.children[2]}
            {this.props.children[3]}
            {this.props.children[4]}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    let allHeight = document.documentElement.clientHeight
    let headerHeight = document.querySelector(".t-header")?document.querySelector(".t-header").offsetHeight:0
    ReactDOM.findDOMNode(this.refs.tContent3).style.height = (allHeight - headerHeight) + "px"
    ReactDOM.findDOMNode(this.refs.tContent3Side).style.height = (allHeight - headerHeight) + "px"

    let tip = ReactDOM.findDOMNode(this.refs.tblContent).previousSibling.offsetHeight
    tip= tip>0?tip+30:20;
    ReactDOM.findDOMNode(this.refs.tblContent).style.height = (allHeight - headerHeight - tip) + "px"
  }
};

export default Content;