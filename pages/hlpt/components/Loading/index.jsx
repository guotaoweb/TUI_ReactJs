import '!style!css!postcss!sass!./style.scss'
import React, { Component, PropTypes } from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import TUI from '../../utils'
import Actions from "../../actions/index"
import loading from "!url!./img/loading.png"

class Loading extends Component {
  render() {
    return (
      <div className="t-loading">
        <div className="t_loading_img">
          <img src={loading} />
        </div>
      </div>
    )
  }
}


export default Loading

export function openLoading() {
  let sidepage = document.querySelector(".t-loading")
  sidepage.style["transition"] = "opacity 200ms ease"
  sidepage.style.opacity = "1"
  sidepage.style.display = "block"
}

export function closeLoading() {
  setTimeout(function () {
    let sidepage = document.querySelector(".t-loading")
    sidepage.style["transition"] = "opacity 200ms ease"
    sidepage.style.opacity = "0"
    setTimeout(function () {
      sidepage.style.display = "none"
    }, 201)
  }, 500)
}