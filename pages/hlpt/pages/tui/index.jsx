import '!style!css!postcss!sass!./style.scss'
import React, {Component} from 'react'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'

import TUI from '../../utils'
import Actions from "../../actions/index"
import ReactCSSTransitionGroup  from 'react-addons-css-transition-group'

import Side from "./side"
import Container from "./container"
import TipTool from "../../components/TipTool/index"
import Dialog from "../../components/Dialog/index"
import ModalDialog from "../../components/ModalDialog/index"
import Loading from "../../components/Loading/index"

class Index extends Component {
  render() {
    const {children} = this.props

    return (
      <div className="t-page">
        <Side/>
        <Container>
          {children}
        </Container>
        <TipTool/> 
        <Dialog/>
        <ModalDialog/>
        <Loading/>
      </div>
    )
  }
}

export default TUI._connect({
  pageStatus: "manages.pageStatus"
}, Index)

// {this.props.children}
// <ReactCSSTransitionGroup component="div"  transitionName={pageStatus}  transitionEnterTimeout={config.ANIMATE_TIME}  transitionLeaveTimeout={config.ANIMATE_TIME}>
//   {React.cloneElement(this.props.children, {
//     key: this.props.location.pathname
//   }) }
// </ReactCSSTransitionGroup>