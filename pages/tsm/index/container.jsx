import React, { Component} from 'react'
import ReactDOM from 'react-dom'

import Search from './search'


class Container extends React.Component {
  render() {
    const {sideStatus} = this.props
    return (
      <div className={"t-container " + (sideStatus == "0" ? "t-container--close" : "") } ref="tContainter">
        <Search/>
        {this.props.children}
      </div>
    )
  }
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.tContainter).style.height = document.documentElement.clientHeight + "px";
  }
}


export default TUI._connect({
    sideStatus: "publicInfo.sideStatus"
  }, Container)
