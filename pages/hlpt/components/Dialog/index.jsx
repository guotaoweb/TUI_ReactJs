import '!style!css!postcss!sass!./style.scss'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'

import TUI from '../../utils'
import Actions from "../../actions/index"

class Dialog extends Component {
  render() {
    const {txt, type} = this.props
    let btns = [],
      txtObject = [],
      title = "系统提示"

    //根据type区别显示按钮
    if (type == 0) {
      btns.push(<p key="dialog-onlytxt"><a className="t-dialog_ok" href="javascript:void(0);" onClick={this.closeDialog.bind(this)}>确定</a></p>)
    }
    else if (type == 3) {
      title = txt.title
    }
    else {
      btns.push(<p key="dialog-multy"><a href="javascript:void(0);" onClick={this.closeDialog.bind(this)}>取消</a><a className="t-dialog_ok" href="#">确定</a></p>)
    }

    //根据type区别显示内容
    if (type == 2) {
      let _style = {
        width: "100%",
        height: "80px",
        border: "none",
        resize: "none",
        padding: "5px"
      }
      txtObject.push(<textarea key="dialog-typ2" style={_style} placeholder={txt.placeholder} onChange={this.onChangeByDialog} value={txt.value}></textarea>)
    }
    else if (type == 3) {
      for (let i = 0; i < txt.data.length; i++) {
        let $e = txt.data[i]
        if ($e.url) {
          txtObject.push(<div key={"dialog-type3" + i} className="dialogList"><Link to={$e.url}>{$e.name}</Link></div>)
        }
        else {
          txtObject.push(<div key={"dialog-type3" + i} onClick={this.dialogListFn.bind(this, $e.fn)} className="dialogList"><a href="#">{$e.name}</a></div>)
        }
      }
    }
    else {
      txtObject.push(<span key="dialog-typ1">{txt}</span>)
    }


    return (
      <div>
        <div className="t-coverbg" ref="coverbg"></div>
        <div className="t-dialog" ref="dialog">
          <h3>{title}</h3>
          <div>{txtObject}</div>
          {btns}
        </div>
      </div>
    )
  }

  dialogListFn(param) {
    if (param) { param() }
    this.closeDialog()
  }

  closeDialog() {
    let $dialog = document.querySelector(".t-dialog"),
      $coverbg = document.querySelector(".t-coverbg")
    $dialog.style.top = "100%"
    $dialog.style["transition"] = "transform 200ms ease"
    $dialog.style.opacity = "0"
    $coverbg.style.display = "none"
    $dialog.style["transform"] = "scale(1.3)"
  }

  onChangeByDialog(e) {
    this.props.updateDialog({
      value: e.currentTarget.value
    })
  }
}

let _EVENT_FN
export function _event() {
  
  if (_EVENT_FN) { _EVENT_FN() }
  let d = new Dialog()
  d.closeDialog()
}

export function openDialog(_this, txt, fn) {
  let type = 0

  if (typeof txt == "string" && typeof fn == "function") {
    type = 1
  }
  else if (typeof txt == "object" && typeof fn == "function") {
    type = 2
  }
  else if (typeof txt == "object" && !fn) {
    type = 3
  }
  _this.props.updateDialog({
    txt: txt,
    type: type
  })

  setTimeout(function () {
    let $dialog = document.querySelector(".t-dialog"),
      $coverbg = document.querySelector(".t-coverbg"),
      $dialogOk = document.querySelector(".t-dialog_ok")


    let allWidth = document.documentElement.clientWidth
    let allHeight = document.documentElement.clientHeight
    let dialogWidth = $dialog.offsetWidth
    let dialogHeight = $dialog.offsetHeight

    $dialog.style.left = (allWidth - dialogWidth) / 2 + "px"
    $dialog.style.top = (allHeight - dialogHeight) / 2 + "px"

    $dialog.style["transition"] = "transform 400ms ease"
    $dialog.style.opacity = "1"
    $coverbg.style.display = "block"
    $dialog.style["transform"] = "scale(1)"
    // let _event = function () {
    //   console.info(Math.random())
    //   //if (fn) { fn() }
    //   let d = new Dialog()
    //   d.closeDialog()
    // }

    if ($dialogOk) {
      _EVENT_FN = fn
      $dialogOk.removeEventListener("click",_event)
      $dialogOk.addEventListener("click",_event)
    }
  }, 120)
}

export default TUI._connect({
  txt: "publicInfo.dialogInfo.txt",
  type: "publicInfo.dialogInfo.type",
}, Dialog)