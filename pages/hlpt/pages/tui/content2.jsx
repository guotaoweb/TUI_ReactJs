import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

class Content extends Component {
  render() {
    const {tabs} = this.props
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
      <div className="t-content2" ref="tContent2">
        <div className="t-content2_sub" ref="tContent2Sub">
          <ul className="t-contetn2_tab">
            {tabsArry}
          </ul>
          {this.props.children}
        </div>
      </div>
    );
  }

  componentDidMount() {
    let _this = this
    let didMount = function () {
      let allHeight = document.documentElement.clientHeight
      let headerHeight = document.querySelector(".t-header").offsetHeight
      ReactDOM.findDOMNode(_this.refs.tContent2).style.height = (allHeight - headerHeight) + "px"
      

      let sidePageScrollHeight = document.querySelector(".t-sidepage").scrollHeight
      let bodyScrollHeight = document.documentElement.scrollHeight
      let scrollHeight = bodyScrollHeight<sidePageScrollHeight?sidePageScrollHeight:bodyScrollHeight
      ReactDOM.findDOMNode(_this.refs.tContent2Sub).style.height = (scrollHeight - headerHeight - 30) + "px"
    }
    setTimeout(didMount, 0)
  }
};

export default Content;