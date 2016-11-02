import '!style!css!postcss!sass!./style.scss'
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import TUI from '../../utils'
import Actions from "../../actions/index"

class SidePage extends Component {
  render() {
    return (
      <div>
        <div id={this.props.id} className="t-sidepage" ref="sidePage">
          {this.props.children.length ? this.props.children[1] : this.props.children}
        </div>
        <div id={this.props.id + "_min"} className="t-sidepage_min" ref="sidePageMin">
          {this.props.children.length > 1 ? this.props.children[0] : ""}
        </div>
      </div>
    )
  }
  componentDidUpdate() {
    const {sidePageInfo} = this.props
    let allHeight = document.documentElement.clientHeight
    let headerHeight = document.querySelector(".t-header") ? document.querySelector(".t-header").offsetHeight : 0

    let allWidth = document.documentElement.clientWidth
    let sideWidth = document.querySelector(".t-side") ? document.querySelector(".t-side").offsetWidth : 0
    let contentSideWidth = document.querySelector(".t-content3_side") ? document.querySelector(".t-content3_side").offsetWidth : 0

    let $sidePage = ReactDOM.findDOMNode(this.refs.sidePage)
    let $sidePageMin = ReactDOM.findDOMNode(this.refs.sidePageMin)
    let sidePageWidth = sidePageInfo.width ? parseInt(sidePageInfo.width) : (allWidth - sideWidth - contentSideWidth)

    if (sidePageInfo.type == 1) {
      sidePageWidth -= $sidePageMin.offsetWidth
    }

    $sidePage.style.width = sidePageWidth + "px"

    $sidePage.style.height = (allHeight - headerHeight) + "px"
    $sidePage.style.top = headerHeight + "px"

    if (sidePageInfo.type == 1) {
      $sidePageMin.style.height = (allHeight - headerHeight) + "px"
      $sidePageMin.style.top = headerHeight + "px"
    }
  }
}

export default TUI._connect({
  sidePageInfo: "publicInfo.sidePageInfo"
}, SidePage)

export function openSidePage(_this, params) {
  _this.props.updateSidePageInfo({
    status: params.status,
    width: params.width,
    gateWay: params.gateWay,
    type: params.type,
    id: params.id
  })

  let sidepage = document.querySelector(".t-sidepage")
  if (params.id) {
    sidepage = document.getElementById(params.id)
  }
  sidepage.style["transition"] = "right 200ms ease"
  sidepage.style.right = "0px"

  if (params.type == 1) {
    let sidepagemin = document.querySelector(".t-sidepage_min")
    if (params.id) {
      sidepagemin = document.getElementById(params.id + "_min")
    }
    let sideWidth = document.querySelector(".t-side") ? document.querySelector(".t-side").offsetWidth : 0
    sidepagemin.style["transition"] = "left 200ms ease"
    sidepagemin.style.left = sideWidth + "px"
  }
}

export function closeSidePage(params) {
  let sidepage = document.querySelector(".t-sidepage")
  let sidepagemin = document.querySelector(".t-sidepage_min")
  if (params) {
    sidepage = document.getElementById(params.id)
    sidepagemin = document.getElementById(params.id + "_min")
  }
  sidepage.style["transition"] = "right 200ms ease"
  sidepage.style.right = "-2000px"
  sidepagemin.style["transition"] = "left 200ms ease"
  sidepagemin.style.left = "-2000px"
}
